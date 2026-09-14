let tokenCache = { token: "", expiresAt: 0 };

function json(data, status = 200, cors = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...cors
    }
  });
}

function getCorsHeaders(request, env) {
  const origin = request.headers.get("Origin") || "";
  const configured = String(env.ALLOWED_ORIGINS || "*")
    .split(",")
    .map(x => x.trim())
    .filter(Boolean);

  let allowOrigin = "*";
  if (!configured.includes("*")) {
    // file:// pages commonly send Origin: null.
    if (configured.includes(origin)) allowOrigin = origin;
    else if (!origin && configured.includes("null")) allowOrigin = "null";
    else return null;
  }

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
    "Vary": "Origin"
  };
}

function validIata(value) {
  return /^[A-Z]{3}$/.test(value || "");
}

function validDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value || "");
}

function clampAdults(value) {
  const n = Number(value || 1);
  return Number.isInteger(n) && n >= 1 && n <= 9 ? n : 1;
}

function apiHost(env) {
  return env.AMADEUS_ENV === "production"
    ? "https://api.amadeus.com"
    : "https://test.api.amadeus.com";
}

async function getAccessToken(env) {
  if (tokenCache.token && Date.now() < tokenCache.expiresAt - 60000) {
    return tokenCache.token;
  }

  if (!env.AMADEUS_API_KEY || !env.AMADEUS_API_SECRET) {
    throw new Error("AMADUES_SECRETS_MISSING");
  }

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: env.AMADEUS_API_KEY,
    client_secret: env.AMADEUS_API_SECRET
  });

  const res = await fetch(`${apiHost(env)}/v1/security/oauth2/token`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body
  });

  const data = await res.json();
  if (!res.ok || !data.access_token) {
    console.error("Amadeus token error", res.status, data?.error || data?.title || "unknown");
    throw new Error("AMADEUS_AUTH_FAILED");
  }

  tokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + Number(data.expires_in || 1800) * 1000
  };
  return tokenCache.token;
}

async function amadeusGet(env, path, params) {
  const token = await getAccessToken(env);
  const url = new URL(`${apiHost(env)}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  const res = await fetch(url.toString(), {
    headers: {
      "authorization": `Bearer ${token}`,
      "accept": "application/json"
    }
  });

  const data = await res.json();
  if (!res.ok) {
    console.error("Amadeus API error", path, res.status, data?.errors?.[0]?.code || data?.error || "unknown");
    const err = new Error("AMADEUS_REQUEST_FAILED");
    err.status = res.status;
    throw err;
  }
  return data;
}

function flightLabel(offer) {
  const validating = offer.validatingAirlineCodes?.[0] || "";
  const first = offer.itineraries?.[0]?.segments?.[0];
  const last = offer.itineraries?.[0]?.segments?.slice(-1)?.[0];
  const route = first && last ? `${first.departure?.iataCode || ""}→${last.arrival?.iataCode || ""}` : "";
  return { airline: validating, route };
}

async function searchFlights(env, q) {
  const origin = (q.get("origin") || "").toUpperCase();
  const destination = (q.get("destination") || "").toUpperCase();
  const departureDate = q.get("departureDate");
  const returnDate = q.get("returnDate");
  const adults = clampAdults(q.get("adults"));
  const currency = (q.get("currency") || "KRW").toUpperCase();

  if (!validIata(origin) || !validIata(destination) || !validDate(departureDate) || !validDate(returnDate)) {
    const err = new Error("INVALID_QUERY");
    err.status = 400;
    throw err;
  }

  const data = await amadeusGet(env, "/v2/shopping/flight-offers", {
    originLocationCode: origin,
    destinationLocationCode: destination,
    departureDate,
    returnDate,
    adults,
    nonStop: "true",
    currencyCode: currency,
    max: 20
  });

  const items = (data.data || [])
    .map(offer => {
      const labels = flightLabel(offer);
      return {
        airline: labels.airline,
        route: labels.route,
        price: Number(offer.price?.grandTotal || offer.price?.total || 0),
        currency: offer.price?.currency || currency
      };
    })
    .filter(x => x.price > 0)
    .sort((a, b) => a.price - b.price)
    .slice(0, 5);

  return { items, provider: "Amadeus", nonStop: true };
}

async function searchHotels(env, q) {
  const cityCode = (q.get("cityCode") || "").toUpperCase();
  const checkInDate = q.get("checkInDate");
  const checkOutDate = q.get("checkOutDate");
  const adults = clampAdults(q.get("adults"));
  const currency = (q.get("currency") || "KRW").toUpperCase();

  if (!validIata(cityCode) || !validDate(checkInDate) || !validDate(checkOutDate)) {
    const err = new Error("INVALID_QUERY");
    err.status = 400;
    throw err;
  }

  const list = await amadeusGet(env, "/v1/reference-data/locations/hotels/by-city", {
    cityCode,
    radius: 20,
    radiusUnit: "KM",
    hotelSource: "ALL"
  });

  const hotels = (list.data || []).slice(0, 25);
  if (!hotels.length) return { items: [], provider: "Amadeus" };

  const ids = hotels.map(h => h.hotelId).filter(Boolean).join(",");
  const offers = await amadeusGet(env, "/v3/shopping/hotel-offers", {
    hotelIds: ids,
    adults,
    checkInDate,
    checkOutDate,
    roomQuantity: 1,
    currency,
    bestRateOnly: "true"
  });

  const hotelById = new Map(hotels.map(h => [h.hotelId, h]));
  const items = (offers.data || [])
    .map(row => {
      const firstOffer = row.offers?.[0];
      const total = Number(firstOffer?.price?.total || firstOffer?.price?.base || 0);
      const nights = Math.max(1, Math.round(
        (new Date(checkOutDate + "T00:00:00Z") - new Date(checkInDate + "T00:00:00Z")) / 86400000
      ));
      return {
        name: row.hotel?.name || hotelById.get(row.hotel?.hotelId)?.name || "Hotel",
        type: "호텔",
        nightly: total > 0 ? total / nights : 0,
        total,
        currency: firstOffer?.price?.currency || currency
      };
    })
    .filter(x => x.nightly > 0)
    .sort((a, b) => a.nightly - b.nightly)
    .slice(0, 5);

  return { items, provider: "Amadeus" };
}

export default {
  async fetch(request, env) {
    const cors = getCorsHeaders(request, env);
    if (!cors) {
      return json({ error: "허용되지 않은 웹사이트에서 온 요청입니다." }, 403);
    }

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method !== "GET") {
      return json({ error: "GET 요청만 허용됩니다." }, 405, cors);
    }

    const url = new URL(request.url);

    try {
      if (url.pathname === "/api/health") {
        return json({
          ok: true,
          provider: "Amadeus",
          mode: env.AMADEUS_ENV === "production" ? "production" : "test"
        }, 200, cors);
      }

      if (url.pathname === "/api/flights") {
        return json(await searchFlights(env, url.searchParams), 200, cors);
      }

      if (url.pathname === "/api/hotels") {
        return json(await searchHotels(env, url.searchParams), 200, cors);
      }

      return json({ error: "Not found" }, 404, cors);
    } catch (err) {
      const status = err.status || 500;
      const friendly =
        err.message === "INVALID_QUERY" ? "조회 조건이 올바르지 않습니다." :
        err.message === "AMADUES_SECRETS_MISSING" ? "Worker에 Amadeus API 키가 설정되지 않았습니다." :
        err.message === "AMADEUS_AUTH_FAILED" ? "Amadeus 인증에 실패했습니다." :
        err.message === "AMADEUS_REQUEST_FAILED" ? "Amadeus에서 가격 정보를 가져오지 못했습니다." :
        "서버리스 조회 중 오류가 발생했습니다.";

      return json({ error: friendly }, status, cors);
    }
  }
};

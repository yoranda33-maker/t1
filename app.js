const STORAGE_KEY = "wanderplan_v1";

const destinations = [
  { id: "tokyo", city: "도쿄", country: "일본", continent: "아시아", region: "동북아", airport: "TYO", emoji: "🗼", season: "봄·가을", tags: ["도시", "쇼핑", "가족"] },
  { id: "osaka", city: "오사카", country: "일본", continent: "아시아", region: "동북아", airport: "OSA", emoji: "🏯", season: "봄·가을", tags: ["미식", "가족", "테마파크"] },
  { id: "hongkong", city: "홍콩", country: "홍콩", continent: "아시아", region: "동북아", airport: "HKG", emoji: "🌃", season: "가을·겨울", tags: ["야경", "쇼핑", "미식"] },

  { id: "bangkok", city: "방콕", country: "태국", continent: "아시아", region: "동남아", airport: "BKK", emoji: "🛕", season: "11~2월", tags: ["미식", "쇼핑", "가성비"] },
  { id: "phuket", city: "푸켓", country: "태국", continent: "아시아", region: "동남아", airport: "HKT", emoji: "🏝️", season: "11~4월", tags: ["리조트", "해변", "가족"] },
  { id: "chiangmai", city: "치앙마이", country: "태국", continent: "아시아", region: "동남아", airport: "CNX", emoji: "🌿", season: "11~2월", tags: ["힐링", "카페", "가성비"] },

  { id: "danang", city: "다낭", country: "베트남", continent: "아시아", region: "동남아", airport: "DAD", emoji: "🌊", season: "2~8월", tags: ["가족", "리조트", "가성비"] },
  { id: "nhatrang", city: "나트랑", country: "베트남", continent: "아시아", region: "동남아", airport: "CXR", emoji: "🏖️", season: "1~8월", tags: ["리조트", "가족", "해변"] },
  { id: "hanoi", city: "하노이", country: "베트남", continent: "아시아", region: "동남아", airport: "HAN", emoji: "🏮", season: "10~4월", tags: ["미식", "도시", "문화"] },
  { id: "hochiminh", city: "호치민", country: "베트남", continent: "아시아", region: "동남아", airport: "SGN", emoji: "🌆", season: "12~4월", tags: ["도시", "미식", "쇼핑"] },

  { id: "bali", city: "발리", country: "인도네시아", continent: "아시아", region: "동남아", airport: "DPS", emoji: "🌺", season: "4~10월", tags: ["리조트", "휴양", "자연"] },

  { id: "cebu", city: "세부", country: "필리핀", continent: "아시아", region: "동남아", airport: "CEB", emoji: "🐠", season: "12~5월", tags: ["호핑", "리조트", "가족"] },
  { id: "boracay", city: "보라카이", country: "필리핀", continent: "아시아", region: "동남아", airport: "MPH", emoji: "⛱️", season: "11~5월", tags: ["해변", "휴양", "리조트"] },
  { id: "manila", city: "마닐라", country: "필리핀", continent: "아시아", region: "동남아", airport: "MNL", emoji: "🌇", season: "12~4월", tags: ["도시", "쇼핑", "미식"] },

  { id: "singapore", city: "싱가포르", country: "싱가포르", continent: "아시아", region: "동남아", airport: "SIN", emoji: "🌴", season: "연중", tags: ["가족", "도시", "미식"] },

  { id: "kualalumpur", city: "쿠알라룸푸르", country: "말레이시아", continent: "아시아", region: "동남아", airport: "KUL", emoji: "🏙️", season: "연중", tags: ["가성비", "도시", "미식"] },
  { id: "kotakinabalu", city: "코타키나발루", country: "말레이시아", continent: "아시아", region: "동남아", airport: "BKI", emoji: "🌅", season: "1~4월", tags: ["선셋", "리조트", "가족"] },

  { id: "luangprabang", city: "루앙프라방", country: "라오스", continent: "아시아", region: "동남아", airport: "LPQ", emoji: "🌄", season: "11~2월", tags: ["문화", "힐링", "자연"] },
  { id: "siemreap", city: "씨엠립", country: "캄보디아", continent: "아시아", region: "동남아", airport: "SAI", emoji: "🛕", season: "11~2월", tags: ["유적", "문화", "가성비"] },

  { id: "paris", city: "파리", country: "프랑스", continent: "유럽", region: "유럽", airport: "PAR", emoji: "🗼", season: "봄·가을", tags: ["예술", "미식", "도시"] },
  { id: "rome", city: "로마", country: "이탈리아", continent: "유럽", region: "유럽", airport: "ROM", emoji: "🏛️", season: "봄·가을", tags: ["역사", "미식", "도시"] },
  { id: "barcelona", city: "바르셀로나", country: "스페인", continent: "유럽", region: "유럽", airport: "BCN", emoji: "⛪", season: "봄·가을", tags: ["건축", "해변", "미식"] },
  { id: "vancouver", city: "밴쿠버", country: "캐나다", continent: "미주", region: "미주", airport: "YVR", emoji: "🏔️", season: "여름", tags: ["자연", "가족", "도시"] },
  { id: "newyork", city: "뉴욕", country: "미국", continent: "미주", region: "미주", airport: "NYC", emoji: "🗽", season: "봄·가을", tags: ["도시", "공연", "쇼핑"] },
  { id: "sydney", city: "시드니", country: "호주", continent: "오세아니아", region: "오세아니아", airport: "SYD", emoji: "🌊", season: "봄·가을", tags: ["해변", "도시", "자연"] }
];

const defaultState = {
  trip: { name: "", origin: "", startDate: "", endDate: "", memo: "" },
  compare: {
    startDate: "",
    endDate: "",
    destinations: []
  },
  savedDestinations: [],
  itinerary: [],
  budget: [],
  packing: [
    { id: cryptoId(), text: "여권", done: false },
    { id: cryptoId(), text: "충전기 / 보조배터리", done: false },
    { id: cryptoId(), text: "해외 결제 카드", done: false }
  ]
};

let state = loadState();

function emptyCompareDestination(destinationId) {
  return {
    destinationId,
    flights: Array.from({ length: 5 }, (_, i) => ({
      rank: i + 1,
      airline: "",
      price: ""
    })),
    hotels: Array.from({ length: 5 }, (_, i) => ({
      rank: i + 1,
      name: "",
      type: "호텔",
      nightly: ""
    })),
    meals: {
      casualFor1: "",
      casualFor2: "",
      nicerFor1: "",
      nicerFor2: ""
    }
  };
}

function getTripNights() {
  const s = state.compare?.startDate;
  const e = state.compare?.endDate;
  if (!s || !e) return 0;
  const start = new Date(s + "T00:00:00");
  const end = new Date(e + "T00:00:00");
  const diff = Math.round((end - start) / 86400000);
  return diff > 0 ? diff : 0;
}

function numericValues(list, key) {
  return list.map(x => Number(x[key])).filter(v => Number.isFinite(v) && v > 0);
}

function getCompareMetrics(item) {
  const nights = getTripNights();
  const flightValues = numericValues(item.flights, "price");
  const hotelValues = numericValues(item.hotels, "nightly");

  const minFlight = flightValues.length ? Math.min(...flightValues) : 0;
  const avgFlight = flightValues.length
    ? Math.round(flightValues.reduce((a, b) => a + b, 0) / flightValues.length)
    : 0;

  const minHotelNight = hotelValues.length ? Math.min(...hotelValues) : 0;
  const avgHotelNight = hotelValues.length
    ? Math.round(hotelValues.reduce((a, b) => a + b, 0) / hotelValues.length)
    : 0;

  const mealDaily = Number(item.meals.casualFor1 || 0) * 2 + Number(item.meals.nicerFor1 || 0);
  const totalEstimate = avgFlight + (avgHotelNight * nights) + (mealDaily * Math.max(1, nights + 1));

  return {
    nights,
    minFlight,
    avgFlight,
    minHotelNight,
    avgHotelNight,
    mealDaily,
    totalEstimate
  };
}

function ensureCompareState() {
  if (!state.compare) state.compare = { startDate: "", endDate: "", destinations: [] };
  if (!Array.isArray(state.compare.destinations)) state.compare.destinations = [];
}


function cryptoId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return structuredCloneSafe(defaultState);
    const parsed = JSON.parse(saved);
    return {
      ...structuredCloneSafe(defaultState),
      ...parsed,
      compare: {
        ...structuredCloneSafe(defaultState.compare),
        ...(parsed.compare || {})
      }
    };
  } catch {
    return structuredCloneSafe(defaultState);
  }
}

function structuredCloneSafe(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  renderAll();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1700);
}

function formatWon(value) {
  return "₩" + Number(value || 0).toLocaleString("ko-KR");
}

function switchView(viewName) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(b => b.classList.remove("active"));
  document.getElementById(viewName).classList.add("active");
  document.querySelector(`.nav-item[data-view="${viewName}"]`)?.classList.add("active");

  const titles = {
    dashboard: "나의 여행 대시보드",
    compare: "여행지 비교",
    destinations: "여행지 탐색",
    itinerary: "여행 일정",
    budget: "예산 관리",
    packing: "짐 체크리스트"
  };
  document.getElementById("pageTitle").textContent = titles[viewName] || "";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderTrip() {
  const trip = state.trip;
  document.getElementById("tripName").value = trip.name || "";
  document.getElementById("origin").value = trip.origin || "";
  document.getElementById("startDate").value = trip.startDate || "";
  document.getElementById("endDate").value = trip.endDate || "";
  document.getElementById("tripMemo").value = trip.memo || "";

  const summary = document.getElementById("tripSummary");
  const title = document.getElementById("tripSummaryTitle");

  if (!trip.name && !trip.startDate && !trip.endDate) {
    title.textContent = "아직 여행 정보가 없습니다";
    summary.className = "empty-state";
    summary.textContent = "왼쪽에서 여행 기본 정보를 입력하면 이곳에 요약이 표시됩니다.";
    return;
  }

  title.textContent = trip.name || "나의 해외 여행";
  summary.className = "summary-box";
  summary.innerHTML = `
    <div class="summary-line"><span>출발지</span><strong>${escapeHtml(trip.origin || "-")}</strong></div>
    <div class="summary-line"><span>여행 기간</span><strong>${escapeHtml(trip.startDate || "-")} ~ ${escapeHtml(trip.endDate || "-")}</strong></div>
    <div class="summary-line"><span>메모</span><strong>${escapeHtml(trip.memo || "-")}</strong></div>
  `;
}


function renderCompare() {
  ensureCompareState();

  const start = document.getElementById("compareStartDate");
  const end = document.getElementById("compareEndDate");
  if (start) start.value = state.compare.startDate || "";
  if (end) end.value = state.compare.endDate || "";

  const select = document.getElementById("compareDestinationSelect");
  if (select) {
    const selectedIds = new Set(state.compare.destinations.map(x => x.destinationId));
    select.innerHTML = destinations
      .filter(d => !selectedIds.has(d.id))
      .map(d => `<option value="${d.id}">${d.city} · ${d.country}</option>`)
      .join("");
    if (!select.innerHTML) select.innerHTML = `<option value="">추가 가능한 여행지가 없습니다</option>`;
  }

  const grid = document.getElementById("compareGrid");
  const empty = document.getElementById("compareEmpty");
  if (!grid || !empty) return;

  empty.style.display = state.compare.destinations.length ? "none" : "grid";
  grid.innerHTML = state.compare.destinations.map(item => {
    const d = destinations.find(x => x.id === item.destinationId);
    if (!d) return "";
    const m = getCompareMetrics(item);

    return `
      <article class="compare-card card" data-compare-card="${d.id}">
        <div class="compare-card-head">
          <span class="emoji">${d.emoji}</span>
          <div>
            <h4>${d.city}</h4>
            <p>${d.country} · ${d.continent}</p>
          </div>
          <button class="remove-compare" data-remove-compare="${d.id}">후보 삭제</button>
        </div>

        <div class="compare-card-body">
          <div class="cost-block">
            <div class="cost-block-title">
              <h5>✈ 직항 항공권 Top 5</h5>
              <span>왕복 · 1인 기준</span>
            </div>
            <div class="price-list">
              ${item.flights.map((f, i) => `
                <div class="price-row">
                  <span class="rank-chip">${i + 1}</span>
                  <input data-field="flight-airline" data-index="${i}" value="${escapeHtml(f.airline)}" placeholder="항공사 / 시간대" />
                  <input data-field="flight-price" data-index="${i}" type="number" min="0" step="1000" value="${f.price}" placeholder="가격(원)" />
                </div>
              `).join("")}
            </div>
          </div>

          <div class="cost-block">
            <div class="cost-block-title">
              <h5>🏨 호텔·리조트 Top 5</h5>
              <span>여행자 선호도 순 · 1박</span>
            </div>
            <div class="price-list">
              ${item.hotels.map((h, i) => `
                <div class="price-row hotel">
                  <span class="rank-chip">${i + 1}</span>
                  <input data-field="hotel-name" data-index="${i}" value="${escapeHtml(h.name)}" placeholder="숙소명" />
                  <select data-field="hotel-type" data-index="${i}">
                    <option ${h.type === "호텔" ? "selected" : ""}>호텔</option>
                    <option ${h.type === "리조트" ? "selected" : ""}>리조트</option>
                    <option ${h.type === "레지던스" ? "selected" : ""}>레지던스</option>
                  </select>
                  <input data-field="hotel-nightly" data-index="${i}" type="number" min="0" step="1000" value="${h.nightly}" placeholder="1박(원)" />
                </div>
              `).join("")}
            </div>
          </div>

          <div class="cost-block">
            <div class="cost-block-title">
              <h5>🍽 현지 식비 감 잡기</h5>
              <span>주변 식당 예상가 입력</span>
            </div>
            <div class="meal-cost-grid">
              <label>가벼운 식사 · 1인
                <input data-field="meal-casual-1" type="number" min="0" step="1000" value="${item.meals.casualFor1}" placeholder="예: 15,000" />
              </label>
              <label>가벼운 식사 · 2인
                <input data-field="meal-casual-2" type="number" min="0" step="1000" value="${item.meals.casualFor2}" placeholder="예: 30,000" />
              </label>
              <label>괜찮은 식당 · 1인
                <input data-field="meal-nicer-1" type="number" min="0" step="1000" value="${item.meals.nicerFor1}" placeholder="예: 35,000" />
              </label>
              <label>괜찮은 식당 · 2인
                <input data-field="meal-nicer-2" type="number" min="0" step="1000" value="${item.meals.nicerFor2}" placeholder="예: 70,000" />
              </label>
            </div>
            <p class="local-cost-hint">※ 하루 식비 추정은 ‘가벼운 식사 2회 + 괜찮은 식당 1회(1인 기준)’로 계산합니다.</p>
          </div>

          <div class="compare-card-total">
            <span>${m.nights || "-"}박 기준 예상 비용</span>
            <strong>${m.totalEstimate ? formatWon(m.totalEstimate) : "입력 필요"}</strong>
          </div>
        </div>
      </article>
    `;
  }).join("");

  grid.querySelectorAll("[data-remove-compare]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.compare.destinations = state.compare.destinations.filter(x => x.destinationId !== btn.dataset.removeCompare);
      saveState();
    });
  });

  grid.querySelectorAll("[data-compare-card]").forEach(card => {
    const destinationId = card.dataset.compareCard;
    const item = state.compare.destinations.find(x => x.destinationId === destinationId);
    if (!item) return;

    card.querySelectorAll("[data-field]").forEach(input => {
      input.addEventListener("change", () => {
        const field = input.dataset.field;
        const idx = Number(input.dataset.index);

        if (field === "flight-airline") item.flights[idx].airline = input.value;
        if (field === "flight-price") item.flights[idx].price = input.value;
        if (field === "hotel-name") item.hotels[idx].name = input.value;
        if (field === "hotel-type") item.hotels[idx].type = input.value;
        if (field === "hotel-nightly") item.hotels[idx].nightly = input.value;
        if (field === "meal-casual-1") item.meals.casualFor1 = input.value;
        if (field === "meal-casual-2") item.meals.casualFor2 = input.value;
        if (field === "meal-nicer-1") item.meals.nicerFor1 = input.value;
        if (field === "meal-nicer-2") item.meals.nicerFor2 = input.value;

        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        renderCompareSummary();
      });
    });
  });

  renderCompareSummary();
}

function renderCompareSummary() {
  const wrap = document.getElementById("compareSummaryTable");
  if (!wrap) return;

  if (!state.compare?.destinations?.length) {
    wrap.innerHTML = `<div class="empty-state">후보 여행지를 추가하면 비교표가 표시됩니다.</div>`;
    return;
  }

  const rows = state.compare.destinations.map(item => {
    const d = destinations.find(x => x.id === item.destinationId);
    return { d, m: getCompareMetrics(item) };
  }).filter(x => x.d);

  const totals = rows.map(x => x.m.totalEstimate).filter(v => v > 0);
  const bestTotal = totals.length ? Math.min(...totals) : 0;

  wrap.innerHTML = `
    <table class="comparison-table">
      <thead>
        <tr>
          <th>항목</th>
          ${rows.map(x => `<th>${x.d.emoji} ${x.d.city}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>직항 항공권 최저가</td>
          ${rows.map(x => `<td>${x.m.minFlight ? formatWon(x.m.minFlight) : "-"}</td>`).join("")}
        </tr>
        <tr>
          <td>직항 항공권 평균</td>
          ${rows.map(x => `<td>${x.m.avgFlight ? formatWon(x.m.avgFlight) : "-"}</td>`).join("")}
        </tr>
        <tr>
          <td>숙소 최저 1박</td>
          ${rows.map(x => `<td>${x.m.minHotelNight ? formatWon(x.m.minHotelNight) : "-"}</td>`).join("")}
        </tr>
        <tr>
          <td>숙소 평균 1박</td>
          ${rows.map(x => `<td>${x.m.avgHotelNight ? formatWon(x.m.avgHotelNight) : "-"}</td>`).join("")}
        </tr>
        <tr>
          <td>하루 식비 추정</td>
          ${rows.map(x => `<td>${x.m.mealDaily ? formatWon(x.m.mealDaily) : "-"}</td>`).join("")}
        </tr>
        <tr>
          <td>총 예상 비용</td>
          ${rows.map(x => `<td class="${bestTotal && x.m.totalEstimate === bestTotal ? "best" : ""}">
            ${x.m.totalEstimate ? formatWon(x.m.totalEstimate) : "-"}
          </td>`).join("")}
        </tr>
      </tbody>
    </table>
    <p class="small-muted">총 예상 비용 = 항공권 Top5 평균 + 숙소 Top5 평균 × 숙박일수 + 하루 식비 × 여행일수</p>
  `;
}

function renderDestinations() {
  const query = document.getElementById("destinationSearch")?.value?.trim().toLowerCase() || "";
  const continent = document.getElementById("continentFilter")?.value || "all";
  const grid = document.getElementById("destinationGrid");

  const filtered = destinations.filter(d => {
    const matchesText = !query || `${d.city} ${d.country}`.toLowerCase().includes(query);
    const matchesContinent = continent === "all" || d.continent === continent || d.region === continent;
    return matchesText && matchesContinent;
  });

  grid.innerHTML = filtered.map(d => {
    const saved = state.savedDestinations.includes(d.id);
    return `
      <article class="destination-card card">
        <div class="destination-cover">
          <span class="destination-emoji">${d.emoji}</span>
        </div>
        <div class="destination-body">
          <h4>${d.city}</h4>
          <div class="destination-meta">${d.country} · ${d.region} · ${d.airport} · 추천 시기 ${d.season}</div>
          <div class="tags">${d.tags.map(t => `<span class="tag">#${t}</span>`).join("")}</div>
          <button class="primary save-dest ${saved ? "saved" : ""}" data-dest="${d.id}">
            ${saved ? "✓ 후보에 저장됨" : "+ 여행지 후보에 저장"}
          </button>
        </div>
      </article>
    `;
  }).join("");

  grid.querySelectorAll("[data-dest]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.dest;
      const exists = state.savedDestinations.includes(id);
      state.savedDestinations = exists
        ? state.savedDestinations.filter(x => x !== id)
        : [...state.savedDestinations, id];
      saveState();
      showToast(exists ? "여행지 후보에서 제거했어요." : "여행지 후보에 저장했어요.");
    });
  });
}

function renderItinerary() {
  const list = document.getElementById("itineraryList");
  const items = [...state.itinerary].sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));

  if (!items.length) {
    list.innerHTML = `<div class="empty-state">아직 등록된 일정이 없습니다.</div>`;
    return;
  }

  list.innerHTML = items.map(item => `
    <div class="list-item">
      <div>
        <h4>${escapeHtml(item.place)} <span class="tag">${escapeHtml(item.category)}</span></h4>
        <p>${escapeHtml(item.date || "날짜 미정")} ${escapeHtml(item.time || "")}${item.note ? " · " + escapeHtml(item.note) : ""}</p>
      </div>
      <button class="remove-btn" data-remove-plan="${item.id}">삭제</button>
    </div>
  `).join("");

  list.querySelectorAll("[data-remove-plan]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.itinerary = state.itinerary.filter(x => x.id !== btn.dataset.removePlan);
      saveState();
    });
  });
}

function renderBudget() {
  const list = document.getElementById("budgetList");
  const total = state.budget.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  document.getElementById("budgetGrandTotal").textContent = formatWon(total);

  if (!state.budget.length) {
    list.innerHTML = `<div class="empty-state">아직 추가된 예산 항목이 없습니다.</div>`;
    return;
  }

  list.innerHTML = state.budget.map(item => `
    <div class="list-item">
      <div>
        <h4>${escapeHtml(item.name)} <span class="tag">${escapeHtml(item.category)}</span></h4>
        <p>${formatWon(item.amount)}</p>
      </div>
      <button class="remove-btn" data-remove-budget="${item.id}">삭제</button>
    </div>
  `).join("");

  list.querySelectorAll("[data-remove-budget]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.budget = state.budget.filter(x => x.id !== btn.dataset.removeBudget);
      saveState();
    });
  });
}

function renderPacking() {
  const list = document.getElementById("packingList");
  const doneCount = state.packing.filter(x => x.done).length;
  const progress = state.packing.length ? Math.round(doneCount / state.packing.length * 100) : 0;

  document.getElementById("packingBar").style.width = progress + "%";
  document.getElementById("packingProgress").textContent = progress + "%";

  if (!state.packing.length) {
    list.innerHTML = `<div class="empty-state">준비물을 추가해보세요.</div>`;
    return;
  }

  list.innerHTML = state.packing.map(item => `
    <div class="check-row ${item.done ? "done" : ""}">
      <input type="checkbox" data-check="${item.id}" ${item.done ? "checked" : ""} />
      <span>${escapeHtml(item.text)}</span>
      <button data-remove-pack="${item.id}" aria-label="삭제">✕</button>
    </div>
  `).join("");

  list.querySelectorAll("[data-check]").forEach(check => {
    check.addEventListener("change", () => {
      const item = state.packing.find(x => x.id === check.dataset.check);
      if (item) item.done = check.checked;
      saveState();
    });
  });

  list.querySelectorAll("[data-remove-pack]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.packing = state.packing.filter(x => x.id !== btn.dataset.removePack);
      saveState();
    });
  });
}

function renderStats() {
  document.getElementById("savedDestCount").textContent = state.savedDestinations.length;
  document.getElementById("itineraryCount").textContent = state.itinerary.length;
  const total = state.budget.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  document.getElementById("budgetTotal").textContent = formatWon(total);
}

function renderAll() {
  renderTrip();
  renderCompare();
  renderDestinations();
  renderItinerary();
  renderBudget();
  renderPacking();
  renderStats();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.querySelectorAll(".nav-item").forEach(btn => {
  btn.addEventListener("click", () => switchView(btn.dataset.view));
});

document.querySelectorAll("[data-jump]").forEach(btn => {
  btn.addEventListener("click", () => switchView(btn.dataset.jump));
});

document.getElementById("saveTripBtn").addEventListener("click", () => {
  state.trip = {
    name: document.getElementById("tripName").value.trim(),
    origin: document.getElementById("origin").value.trim(),
    startDate: document.getElementById("startDate").value,
    endDate: document.getElementById("endDate").value,
    memo: document.getElementById("tripMemo").value.trim()
  };
  saveState();
  document.getElementById("saveTripMsg").textContent = "저장되었습니다.";
  showToast("여행 기본 정보를 저장했어요.");
  setTimeout(() => document.getElementById("saveTripMsg").textContent = "", 1600);
});

document.getElementById("destinationSearch").addEventListener("input", renderDestinations);
document.getElementById("continentFilter").addEventListener("change", renderDestinations);

document.getElementById("addPlanBtn").addEventListener("click", () => {
  const place = document.getElementById("planPlace").value.trim();
  if (!place) return showToast("장소를 입력해주세요.");

  state.itinerary.push({
    id: cryptoId(),
    date: document.getElementById("planDate").value,
    time: document.getElementById("planTime").value,
    place,
    category: document.getElementById("planCategory").value,
    note: document.getElementById("planNote").value.trim()
  });

  document.getElementById("planPlace").value = "";
  document.getElementById("planNote").value = "";
  saveState();
  showToast("일정을 추가했어요.");
});

document.getElementById("clearPlansBtn").addEventListener("click", () => {
  if (!state.itinerary.length) return;
  if (confirm("등록된 일정을 모두 삭제할까요?")) {
    state.itinerary = [];
    saveState();
  }
});

document.getElementById("addBudgetBtn").addEventListener("click", () => {
  const name = document.getElementById("budgetName").value.trim();
  const amount = Number(document.getElementById("budgetAmount").value);
  if (!name) return showToast("예산 항목명을 입력해주세요.");
  if (!amount || amount < 0) return showToast("금액을 입력해주세요.");

  state.budget.push({
    id: cryptoId(),
    name,
    category: document.getElementById("budgetCategory").value,
    amount
  });

  document.getElementById("budgetName").value = "";
  document.getElementById("budgetAmount").value = "";
  saveState();
  showToast("예산 항목을 추가했어요.");
});

const presets = ["여권", "eSIM / 유심", "보조배터리", "충전기", "상비약", "세면도구", "환전 / 카드", "우산"];
const presetButtons = document.getElementById("presetButtons");

presets.forEach(text => {
  const btn = document.createElement("button");
  btn.textContent = "+ " + text;
  btn.addEventListener("click", () => addPacking(text));
  presetButtons.appendChild(btn);
});

function addPacking(text) {
  const value = text.trim();
  if (!value) return;
  const duplicated = state.packing.some(x => x.text === value);
  if (duplicated) return showToast("이미 체크리스트에 있어요.");

  state.packing.push({ id: cryptoId(), text: value, done: false });
  document.getElementById("packingItem").value = "";
  saveState();
  showToast("준비물을 추가했어요.");
}

document.getElementById("addPackingBtn").addEventListener("click", () => {
  addPacking(document.getElementById("packingItem").value);
});

document.getElementById("packingItem").addEventListener("keydown", (e) => {
  if (e.key === "Enter") addPacking(e.currentTarget.value);
});

document.getElementById("clearPackingBtn").addEventListener("click", () => {
  if (!state.packing.length) return;
  if (confirm("짐 체크리스트를 모두 비울까요?")) {
    state.packing = [];
    saveState();
  }
});

document.getElementById("resetAllBtn").addEventListener("click", () => {
  if (confirm("저장된 여행 데이터를 모두 초기화할까요?")) {
    state = structuredCloneSafe(defaultState);
    localStorage.removeItem(STORAGE_KEY);
    saveState();
    showToast("전체 데이터를 초기화했어요.");
  }
});


document.getElementById("saveCompareDatesBtn").addEventListener("click", () => {
  ensureCompareState();
  const start = document.getElementById("compareStartDate").value;
  const end = document.getElementById("compareEndDate").value;

  if (start && end && new Date(end) <= new Date(start)) {
    return showToast("귀국일은 출발일보다 뒤여야 합니다.");
  }

  state.compare.startDate = start;
  state.compare.endDate = end;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  renderCompare();
  showToast("비교 일정을 저장했어요.");
});

document.getElementById("addCompareDestinationBtn").addEventListener("click", () => {
  ensureCompareState();
  const select = document.getElementById("compareDestinationSelect");
  const id = select.value;
  if (!id) return;

  if (state.compare.destinations.length >= 4) {
    return showToast("비교 여행지는 최대 4곳까지 추가할 수 있어요.");
  }

  if (state.compare.destinations.some(x => x.destinationId === id)) {
    return showToast("이미 비교 중인 여행지예요.");
  }

  state.compare.destinations.push(emptyCompareDestination(id));
  saveState();
  showToast("비교 후보를 추가했어요.");
});

renderAll();

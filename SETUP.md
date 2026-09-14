# WanderPlan Cloudflare Worker 설정

이 폴더는 항공권/숙박 가격 조회만 담당합니다. 프론트엔드의 HTML/CSS/JS에는 Amadeus API Secret을 넣지 않습니다.

## 1. Amadeus 개발자 계정에서 API Key / API Secret 발급
Self-Service 앱을 만든 뒤 키 2개를 준비합니다.

## 2. Cloudflare Worker 생성
Cloudflare Dashboard > Workers & Pages > Create Worker에서 Worker를 하나 만듭니다.
가장 간단한 방법은 Dashboard 편집기에 `worker.js` 내용을 붙여 넣는 것입니다.

## 3. Secret 저장
Worker > Settings > Variables and Secrets에서 아래 두 값을 **Secret** 타입으로 추가합니다.

- `AMADEUS_API_KEY`
- `AMADEUS_API_SECRET`

중요: 이 값을 GitHub 저장소나 `app.js`에 넣지 마세요.

## 4. 일반 변수
아래 값은 Secret이 아니므로 일반 변수로 둘 수 있습니다.

- `AMADEUS_ENV`: 처음에는 `test`
- `ALLOWED_ORIGINS`: 처음 로컬 파일 테스트 때는 `*`
  - GitHub Pages 배포 후에는 예: `https://USERNAME.github.io`
  - 로컬 file:// 실행도 계속 허용하려면 `https://USERNAME.github.io,null`

## 5. 배포 후
배포된 주소가 예를 들어 아래라면:

`https://wanderplan-api.USERNAME.workers.dev`

WanderPlan > 여행지 비교 > Cloudflare Worker 주소에 이 값을 넣고 **주소 저장 → 연결 테스트**를 누릅니다.

## 6. 사용
비교 일정, 출발 공항, 성인 수를 저장하고 여행지 카드에서:
- `직항 항공권 Top 5 > 자동 조회`
- `호텔·리조트 Top 5 > 자동 조회`

를 누릅니다.

## 보안 메모
CORS는 브라우저에서 다른 사이트가 Worker를 호출하는 것을 제한하는 장치이지, Worker 자체의 완전한 인증 수단은 아닙니다.
실제 사용량/비용이 커지면 Cloudflare Rate Limiting 또는 별도 인증을 추가하는 것이 좋습니다.

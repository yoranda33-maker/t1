WanderPlan v4 - 로컬 여행 플래너 + 부분 실시간 조회

실행
1) ZIP 압축 해제
2) index.html 더블클릭
3) 여행지 비교 화면에서 여행 조건 저장

로컬 기능
- 여행지 후보 비교
- 일정
- 예산
- 짐 체크리스트
- localStorage 저장

v4 추가
- 출발 공항(ICN/GMP/PUS) / 성인 인원 설정
- 각 여행지별 '항공권 자동 조회' 버튼
- 각 여행지별 '숙소 자동 조회' 버튼
- Cloudflare Worker 주소 저장 / 연결 테스트
- 조회한 실시간 가격을 기존 Top 5 비교표에 자동 입력
- API가 연결되지 않아도 모든 기존 수동 입력/로컬 기능은 계속 사용 가능

서버리스
- cloudflare-worker 폴더의 worker.js 참고
- Amadeus API Key / Secret은 Worker Secret으로만 저장
- 프론트엔드 코드에는 Secret을 넣지 않음
- 자세한 배포 절차는 cloudflare-worker/SETUP.md 참고

주의
- Amadeus Self-Service 데이터 범위에는 일부 항공사/LCC가 포함되지 않을 수 있습니다.
- 처음에는 AMADEUS_ENV=test로 테스트하세요.
- 실제 운영 시에는 Cloudflare 호출 제한과 ALLOWED_ORIGINS 제한을 권장합니다.

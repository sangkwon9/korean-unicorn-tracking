# 🦄 Korean Unicorn Tracking Dashboard

한국 유니콘 기업들의 성장 과정과 HR 전략 인사이트를 한눈에 확인할 수 있는 대시보드입니다.

## 🌟 주요 기능

### 왼쪽 섹션: 유니콘 기업 인력 추이
- 한국 유니콘 기업들의 연도별 직원 수 변화 추적
- 유니콘 달성 전후 인력 성장률 분석
- 신뢰할 수 있는 출처 기반의 데이터 제공
- 대상 기업: 크래프톤, 우아한형제들, 무신사, 야놀자, 당근마켓, 토스 등

### 오른쪽 섹션: HR 인사이트 기사
- 유니콘 기업의 HR 전략 관련 영문 기사 큐레이션
- Harvard Business Review, MIT Sloan Management Review, McKinsey & Company 등 공신력 있는 출처
- 각 기사별 5문장 이내 요약 제공
- 매일 오후 12시(한국 시간) 자동 업데이트

## 🚀 시작하기

### 필수 요구사항
- Node.js 18+ 
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 시작
npm start
```

애플리케이션은 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

## 📊 데이터 출처

### 유니콘 기업 인력 데이터
- 각 기업의 공식 발표자료, 투자 유치 보도자료
- 상장 공시자료 및 사업보고서
- 업계 리포트 및 신뢰할 수 있는 언론 보도

### HR 기사 데이터
- Harvard Business Review
- MIT Sloan Management Review  
- McKinsey & Company
- 기타 경영 전문 매체

## 🛠 기술 스택

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **API**: Next.js API Routes
- **Scheduling**: node-cron
- **Build Tool**: npm

## 📱 주요 컴포넌트

- `UnicornTable`: 유니콘 기업 데이터 표시 컴포넌트
- `HRArticles`: HR 기사 목록 표시 컴포넌트
- `ArticleScheduler`: 자동 업데이트 스케줄러

## 🔄 자동 업데이트

HR 기사 섹션은 매일 오후 12시(한국 시간 기준)에 자동으로 업데이트됩니다. 
수동 업데이트는 다음 API 엔드포인트를 통해 가능합니다:

```bash
# 기사 목록 조회
GET /api/articles

# 기사 수동 업데이트
POST /api/articles
```

## 📋 향후 개선 계획

- [ ] 실시간 데이터 연동 (웹 스크래핑)
- [ ] 더 많은 유니콘 기업 추가
- [ ] 차트 및 시각화 기능 강화
- [ ] 모바일 반응형 디자인 개선
- [ ] 사용자 즐겨찾기 기능
- [ ] 데이터 내보내기 기능

## 🤝 기여하기

버그 리포트나 기능 제안은 이슈로 등록해 주세요.

## �� 라이선스

MIT License

# 🚀 실시간 HR 인사이트 업데이트 설정 가이드

## 📰 News API 연동 완료!

이제 Korean Unicorn Tracking Dashboard가 **실제 뉴스 API**에서 HR 관련 최신 기사들을 자동으로 가져옵니다!

## 🔧 설정 방법

### 1. News API 키 발급받기
1. [NewsAPI.org](https://newsapi.org/register)에서 무료 계정 생성
2. 이메일 인증 후 API 키 발급받기
3. 무료 플랜: **하루 1,000회 요청** (충분함!)

### 2. 환경 변수 설정
프로젝트 루트에 `.env.local` 파일 생성:

```bash
# .env.local 파일 생성
NEXT_PUBLIC_NEWS_API_KEY=여기에_발급받은_API_키_입력
```

### 3. 로컬 테스트
```bash
npm run dev
```

## ✨ 새로운 기능들

### 🔄 **실시간 업데이트**
- News API에서 실제 HR 관련 기사 수집
- 12시간 캐싱으로 API 호출 최적화
- 새로고침 버튼으로 수동 업데이트 가능

### 🎯 **스마트 필터링**
- HR 관련 키워드 자동 매칭
- 관련성 점수 계산 (30점 이상만 표시)
- 신뢰할 수 있는 소스 우선 표시

### 📊 **지원하는 소스**
- Harvard Business Review
- Wall Street Journal  
- Bloomberg
- Reuters
- Fortune
- Business Insider
- 기타 주요 비즈니스 미디어

### 🔍 **검색 키워드**
- Human Resources Strategy
- Employee Engagement
- Talent Management
- Workplace Culture
- HR Technology Innovation

## 🚀 배포하기

### GitHub Pages 배포
```bash
git add .
git commit -m "Add real-time HR insights with News API"
git push origin main
```

### 환경 변수 설정 (GitHub)
1. GitHub 저장소 → Settings → Secrets and variables → Actions
2. `NEXT_PUBLIC_NEWS_API_KEY` 추가
3. 자동 배포 완료!

## 🎉 완성!

이제 사이트에서:
- ✅ 실시간 HR 기사 업데이트
- ✅ 관련성 점수 표시  
- ✅ 신뢰할 수 있는 소스
- ✅ 자동 캐싱 시스템
- ✅ 에러 처리 및 fallback

**URL**: https://sangkwon9.github.io/korean-unicorn-tracking/

---

## 🔧 문제 해결

### API 키가 작동하지 않는 경우
1. `.env.local` 파일이 프로젝트 루트에 있는지 확인
2. 서버 재시작: `npm run dev`
3. 브라우저 캐시 삭제

### 기사가 로드되지 않는 경우
- 기본 데이터가 fallback으로 표시됩니다
- 새로고침 버튼(↻) 클릭해보세요
- 개발자 도구에서 네트워크 오류 확인

### CORS 오류가 발생하는 경우
- News API는 클라이언트 사이드에서 직접 호출 가능
- GitHub Pages에서는 정상 작동합니다 
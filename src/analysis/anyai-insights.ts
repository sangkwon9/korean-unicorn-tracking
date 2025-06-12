// ANYAI 조직관리 인사이트 분석 시스템

export interface InvestmentRound {
  stage: string;
  typicalEmployeeCount: number;
  keyFocus: string[];
  organizationalChallenges: string[];
  hrPriorities: string[];
}

export interface OrganizationalInsight {
  category: '채용' | '평가' | '보상' | '동기부여' | '리더십 교육';
  stage: string;
  recommendations: string[];
  benchmarks: string[];
  risks: string[];
}

// 한국 유니콘 기업 성장 패턴 분석
export const koreanUnicornGrowthPatterns = {
  // 크래프톤 성장 패턴 (게임/기술 기업)
  krafton: {
    stages: [
      { year: 2017, employees: 280, stage: 'Pre-IPO', keyMilestone: 'PUBG 글로벌 성공' },
      { year: 2018, employees: 300, stage: 'Pre-IPO', keyMilestone: '조직 안정화' },
      { year: 2019, employees: 500, stage: 'Pre-IPO', keyMilestone: '사업 다각화' },
      { year: 2020, employees: 800, stage: 'Pre-IPO', keyMilestone: '글로벌 확장' },
      { year: 2021, employees: 1200, stage: 'IPO', keyMilestone: '상장 준비' },
      { year: 2022, employees: 2800, stage: 'Post-IPO', keyMilestone: '대규모 채용' },
      { year: 2023, employees: 4000, stage: 'Post-IPO', keyMilestone: '조직 체계화' },
      { year: 2024, employees: 4500, stage: 'Post-IPO', keyMilestone: '안정적 성장' }
    ]
  },
  
  // 토스 성장 패턴 (핀테크)
  toss: {
    stages: [
      { year: 2015, employees: 20, stage: 'Seed', keyMilestone: '서비스 출시' },
      { year: 2017, employees: 100, stage: 'Series A', keyMilestone: '사용자 확산' },
      { year: 2019, employees: 300, stage: 'Series B', keyMilestone: '금융 서비스 확장' },
      { year: 2021, employees: 800, stage: 'Series C', keyMilestone: '유니콘 달성' },
      { year: 2022, employees: 1500, stage: 'Series D', keyMilestone: '은행업 진출' },
      { year: 2024, employees: 1304, stage: 'Mature', keyMilestone: '조직 최적화' }
    ]
  }
};

// 투자 라운드별 조직관리 전략
export const investmentRoundStrategies: InvestmentRound[] = [
  {
    stage: 'Pre-Series A (10-30명)',
    typicalEmployeeCount: 20,
    keyFocus: ['핵심 인재 확보', '제품 개발', '시장 검증'],
    organizationalChallenges: ['역할 중복', '프로세스 부재', '문화 형성'],
    hrPriorities: ['창립 멤버 채용', '기본 평가 체계', '스톡옵션 설계']
  },
  {
    stage: 'Series A (30-80명)',
    typicalEmployeeCount: 50,
    keyFocus: ['조직 구조화', '프로세스 구축', '문화 정립'],
    organizationalChallenges: ['급속한 성장', '의사소통 복잡성', '품질 관리'],
    hrPriorities: ['체계적 채용', '성과 평가 시스템', '보상 체계 구축']
  },
  {
    stage: 'Series B (80-200명)',
    typicalEmployeeCount: 120,
    keyFocus: ['스케일링', '전문화', '시스템화'],
    organizationalChallenges: ['부서간 협업', '리더십 부족', '문화 희석'],
    hrPriorities: ['전문 인재 영입', '리더십 개발', '조직문화 강화']
  },
  {
    stage: 'Series C+ (200명+)',
    typicalEmployeeCount: 300,
    keyFocus: ['글로벌 확장', '조직 최적화', '지속가능성'],
    organizationalChallenges: ['복잡성 관리', '혁신성 유지', '인재 유지'],
    hrPriorities: ['글로벌 인재', '고도화된 평가', '장기 인센티브']
  }
];

// 에니아이 맞춤형 인사이트 (헬스케어 AI 특성 반영)
export const anyaiSpecificInsights = {
  industryCharacteristics: {
    regulatoryCompliance: '의료 규제 준수 필요',
    technicalExpertise: 'AI/ML 전문성 필수',
    domainKnowledge: '의료 도메인 지식 중요',
    dataPrivacy: '개인정보 보호 강화',
    qualityAssurance: '높은 품질 기준 요구'
  },
  
  talentRequirements: {
    technical: ['AI/ML 엔지니어', '데이터 사이언티스트', '백엔드 개발자'],
    domain: ['의료진', '바이오메디컬 엔지니어', '규제 전문가'],
    business: ['헬스케어 사업개발', '의료기기 영업', 'B2B 마케팅']
  },
  
  organizationalRisks: [
    '규제 변화에 따른 사업 리스크',
    '의료 데이터 보안 이슈',
    '긴 제품 개발 주기',
    '높은 기술적 진입장벽',
    '의료진과의 협업 필요성'
  ]
};

// HR 인사이트 기사 분석 결과 (실제 대시보드 데이터 기반)
export const hrInsightAnalysis = {
  keyTrends2024: [
    {
      trend: 'HR의 직원 옹호 역할 강화',
      source: 'Harvard Business Review',
      relevance: '에니아이의 인재 유지 전략에 중요',
      application: '경쟁이 치열한 AI 인재 시장에서 직원 만족도 우선시'
    },
    {
      trend: '개인화된 직원 경험 제공',
      source: 'McKinsey & Company',
      relevance: '다양한 배경의 전문가들을 위한 맞춤형 관리',
      application: '의료진, 엔지니어, 사업개발 등 각 직군별 차별화된 접근'
    },
    {
      trend: 'AI를 활용한 HR 프로세스 혁신',
      source: 'McKinsey & Company',
      relevance: 'AI 기업으로서 내부 프로세스에도 AI 활용',
      application: '채용, 성과평가, 교육에 AI 도구 적극 활용'
    },
    {
      trend: '직장 내 관계와 문화의 중요성',
      source: 'MIT Sloan Management Review',
      relevance: '원격근무 환경에서의 팀워크 강화',
      application: '의료진과 엔지니어 간 협업 문화 구축'
    }
  ]
};

// 에니아이 단계별 조직관리 로드맵 생성
export function generateAnyaiRoadmap(currentStage: string, targetStage: string): OrganizationalInsight[] {
  const insights: OrganizationalInsight[] = [];
  
  // 채용 전략
  insights.push({
    category: '채용',
    stage: currentStage,
    recommendations: [
      'AI/ML 전문가와 의료 도메인 전문가의 균형 있는 채용',
      '규제 준수 경험이 있는 인재 우선 고려',
      '스타트업 문화에 적응 가능한 의료진 발굴',
      '글로벌 시장 진출을 위한 다국적 인재 확보'
    ],
    benchmarks: [
      '토스: 금융 전문가 + 기술 인재 균형 채용',
      '크래프톤: 게임 개발자 + 글로벌 인재 조합'
    ],
    risks: [
      '의료진과 엔지니어 간 문화적 차이',
      '높은 인건비로 인한 재정 부담',
      '경쟁사 대비 브랜드 인지도 부족'
    ]
  });
  
  // 평가 시스템
  insights.push({
    category: '평가',
    stage: currentStage,
    recommendations: [
      '의료 품질 지표와 기술 성과 지표의 통합 평가',
      '장기적 연구개발 성과를 반영한 평가 주기',
      '규제 준수 및 품질 관리 성과 포함',
      '크로스 펑셔널 협업 능력 평가'
    ],
    benchmarks: [
      '구글 헬스: 의료 AI 프로젝트 평가 방식',
      '삼성 헬스케어: 의료기기 개발 성과 측정'
    ],
    risks: [
      '단기 성과 중심 평가의 한계',
      '의료진과 엔지니어의 평가 기준 차이',
      '규제 승인 지연으로 인한 성과 측정 어려움'
    ]
  });
  
  return insights;
}

// 일일 인사이트 요약 생성
export function generateDailyInsight(): string {
  const today = new Date().toLocaleDateString('ko-KR');
  
  return `
# 🏥 ANYAI 조직관리 일일 인사이트 (${today})

## 📊 오늘의 핵심 인사이트
- **HR 트렌드**: 직원 경험 개인화가 AI 헬스케어 기업의 핵심 경쟁력
- **채용 포인트**: 의료 AI 규제 경험자 채용 시급성 증가
- **조직 문화**: 의료진-엔지니어 간 협업 문화 구축이 성공의 열쇠

## 🎯 금주 액션 아이템
1. 의료 AI 규제 전문가 채용 공고 게시
2. 크로스 펑셔널 팀 빌딩 프로그램 기획
3. 개인화된 직원 성장 계획 수립

## 📈 벤치마킹 인사이트
- **토스**: 금융 규제 대응 조직 구조 참고
- **크래프톤**: 글로벌 인재 관리 시스템 벤치마킹

---
*다음 업데이트: 내일 오전 6시*
  `;
} 
import { HRArticle } from '@/types';

// News API 설정
const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY || 'demo-key';
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

// HR 관련 키워드들
const HR_KEYWORDS = [
  'human resources',
  'HR strategy',
  'employee engagement',
  'talent management',
  'workplace culture',
  'employee retention',
  'recruitment',
  'organizational development',
  'people management',
  'workforce analytics'
];

// 신뢰할 수 있는 비즈니스 소스들
const TRUSTED_SOURCES = [
  'harvard-business-review',
  'the-wall-street-journal',
  'bloomberg',
  'reuters',
  'associated-press',
  'bbc-news',
  'cnn',
  'fortune',
  'business-insider'
];

interface NewsApiArticle {
  title: string;
  description: string;
  url: string;
  source: {
    name: string;
  };
  publishedAt: string;
  content: string;
}

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsApiArticle[];
}

// 기본 HR 기사 데이터 (API 실패 시 사용)
const DEFAULT_HR_ARTICLES: HRArticle[] = [
  {
    title: "HR's New Role: In this tight labor market, cost cutting is out. Championing employee concerns is in.",
    url: "https://hbr.org/2024/05/hrs-new-role",
    source: "Harvard Business Review",
    publishedDate: new Date().toISOString().split('T')[0],
    summary: "From World War II through 1980, HR focused on advocating for workers. Then came decades of cost cutting driven by recessions and slack labor markets. Now, HR must return to championing employee concerns. The article explores how tight labor markets are forcing HR to shift from relentless cost reduction to employee advocacy.",
    relevanceScore: 95
  },
  {
    title: "A new operating model for people management: More personal, more tech, more human",
    url: "https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/a-new-operating-model-for-people-management-more-personal-more-tech-more-human",
    source: "McKinsey & Company",
    publishedDate: new Date().toISOString().split('T')[0],
    summary: "Organizations need a fundamental transformation in how they manage their most important assets—their people. New technologies, hybrid working practices, and multigenerational workforces are prompting leaders to rethink their methods for attracting, developing, and retaining employees.",
    relevanceScore: 92
  },
  {
    title: "A Radical Rethink of HR: HR needs to become a passionate advocate for employees and their interests",
    url: "https://sloanreview.mit.edu/article/a-radical-rethink-of-hr/",
    source: "MIT Sloan Management Review", 
    publishedDate: new Date().toISOString().split('T')[0],
    summary: "Human resources needs to rethink its role as an agent of management and become a passionate advocate for employees and their interests. The article explores the tension between business interests and employee interests, arguing that HR has traditionally focused too heavily on the former.",
    relevanceScore: 90
  },
  {
    title: "Four ways to start using generative AI in HR: Substantial productivity benefits for the HR function",
    url: "https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/the-organization-blog/four-ways-to-start-using-generative-ai-in-hr",
    source: "McKinsey & Company",
    publishedDate: new Date().toISOString().split('T')[0],
    summary: "Generative AI enables substantial productivity benefits, especially for the HR function. The article identifies four key opportunities: content creation for recruiting, concision through summarizing performance data, communication via AI chatbots for employee engagement, and coding for people analytics.",
    relevanceScore: 87
  },
  {
    title: "How to Make Better Friends at Work: Friendships can enrich our lives and make us better leaders",
    url: "https://sloanreview.mit.edu/article/how-to-make-better-friends-at-work/",
    source: "MIT Sloan Management Review",
    publishedDate: new Date().toISOString().split('T')[0],
    summary: "Friendship at work can enrich our lives and make us better leaders and workers if we make the effort to cultivate truly healthy relationships. The workplace can be fertile ground for budding friendships because of the proximity that forming friendships requires.",
    relevanceScore: 88
  }
];

// HR 관련성 점수 계산
function calculateRelevanceScore(article: NewsApiArticle): number {
  const title = article.title?.toLowerCase() || '';
  const description = article.description?.toLowerCase() || '';
  const content = article.content?.toLowerCase() || '';
  
  let score = 0;
  
  // 제목에서 키워드 검색 (가중치 높음)
  HR_KEYWORDS.forEach(keyword => {
    if (title.includes(keyword.toLowerCase())) {
      score += 15;
    }
  });
  
  // 설명에서 키워드 검색
  HR_KEYWORDS.forEach(keyword => {
    if (description.includes(keyword.toLowerCase())) {
      score += 10;
    }
  });
  
  // 내용에서 키워드 검색
  HR_KEYWORDS.forEach(keyword => {
    if (content.includes(keyword.toLowerCase())) {
      score += 5;
    }
  });
  
  // 신뢰할 수 있는 소스 보너스
  const sourceName = article.source.name.toLowerCase();
  if (TRUSTED_SOURCES.some(source => sourceName.includes(source.replace('-', ' ')))) {
    score += 20;
  }
  
  return Math.min(score, 100); // 최대 100점
}

// 요약 생성 (간단한 버전)
function generateSummary(article: NewsApiArticle): string {
  if (article.description && article.description.length > 50) {
    return article.description.length > 300 
      ? article.description.substring(0, 300) + '...'
      : article.description;
  }
  
  if (article.content && article.content.length > 50) {
    const cleanContent = article.content.replace(/\[.*?\]/g, ''); // [+1234 chars] 같은 텍스트 제거
    return cleanContent.length > 300 
      ? cleanContent.substring(0, 300) + '...'
      : cleanContent;
  }
  
  return '이 기사에 대한 요약을 확인하려면 원문을 읽어보세요.';
}

// API 키 유효성 검사
function isValidApiKey(apiKey: string): boolean {
  return !!(apiKey && apiKey !== 'demo-key' && apiKey.length > 10);
}

// News API에서 HR 관련 기사 가져오기
export async function fetchHRArticles(): Promise<HRArticle[]> {
  try {
    // API 키가 유효하지 않으면 기본 데이터 반환
    if (!isValidApiKey(NEWS_API_KEY)) {
      console.log('News API key not configured, using default articles');
      return DEFAULT_HR_ARTICLES;
    }

    // 여러 키워드로 검색해서 다양한 기사 수집
    const searchQueries = [
      'human resources strategy',
      'employee engagement trends',
      'HR technology innovation',
      'workplace culture development',
      'talent management best practices'
    ];
    
    const allArticles: NewsApiArticle[] = [];
    
    for (const query of searchQueries) {
      const url = `${NEWS_API_BASE_URL}/everything?` +
        `q=${encodeURIComponent(query)}&` +
        `language=en&` +
        `sortBy=publishedAt&` +
        `pageSize=20&` +
        `apiKey=${NEWS_API_KEY}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        console.error(`News API error for query "${query}":`, response.status);
        continue;
      }
      
      const data: NewsApiResponse = await response.json();
      
      if (data.status === 'ok' && data.articles) {
        allArticles.push(...data.articles);
      }
    }
    
    // API 호출이 성공했지만 기사가 없는 경우
    if (allArticles.length === 0) {
      console.log('No articles found from News API, using default articles');
      return DEFAULT_HR_ARTICLES;
    }

    // 중복 제거 (URL 기준)
    const uniqueArticles = allArticles.filter((article, index, self) => 
      index === self.findIndex(a => a.url === article.url)
    );
    
    // HR 관련성 점수 계산 및 필터링
    const relevantArticles = uniqueArticles
      .map(article => ({
        article,
        relevanceScore: calculateRelevanceScore(article)
      }))
      .filter(item => item.relevanceScore >= 30) // 최소 30점 이상만
      .sort((a, b) => b.relevanceScore - a.relevanceScore) // 관련성 높은 순
      .slice(0, 10);
    
    // 관련성 있는 기사가 없으면 기본 데이터 사용
    if (relevantArticles.length === 0) {
      console.log('No relevant articles found, using default articles');
      return DEFAULT_HR_ARTICLES;
    }

    // HRArticle 형식으로 변환
    const hrArticles: HRArticle[] = relevantArticles.map(item => ({
      title: item.article.title || 'Untitled Article',
      url: item.article.url,
      source: item.article.source.name || 'Unknown Source',
      publishedDate: item.article.publishedAt.split('T')[0], // YYYY-MM-DD 형식
      summary: generateSummary(item.article),
      relevanceScore: item.relevanceScore
    }));
    
    return hrArticles;
    
  } catch (error) {
    console.error('Error fetching HR articles:', error);
    
    // 에러 발생 시 기본 데이터 반환
    return DEFAULT_HR_ARTICLES;
  }
}

// 캐시된 기사 가져오기 (로컬 스토리지 활용)
export function getCachedArticles(): HRArticle[] | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const cached = localStorage.getItem('hr-articles-cache');
    const cacheTime = localStorage.getItem('hr-articles-cache-time');
    
    if (!cached || !cacheTime) return null;
    
    const cacheAge = Date.now() - parseInt(cacheTime);
    const CACHE_DURATION = 12 * 60 * 60 * 1000; // 12시간
    
    if (cacheAge > CACHE_DURATION) {
      localStorage.removeItem('hr-articles-cache');
      localStorage.removeItem('hr-articles-cache-time');
      return null;
    }
    
    return JSON.parse(cached);
  } catch (error) {
    console.error('Error reading cached articles:', error);
    return null;
  }
}

// 기사 캐시 저장
export function cacheArticles(articles: HRArticle[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('hr-articles-cache', JSON.stringify(articles));
    localStorage.setItem('hr-articles-cache-time', Date.now().toString());
  } catch (error) {
    console.error('Error caching articles:', error);
  }
} 
import { NextResponse } from 'next/server';
import { HRArticle } from '@/types';

// 모의 기사 데이터 생성 함수
const generateMockArticles = (): HRArticle[] => {
  const mockArticles: HRArticle[] = [
    {
      title: "Building High-Performance Teams in Unicorn Startups",
      url: "https://hbr.org/2024/03/building-high-performance-teams-unicorn-startups",
      source: "Harvard Business Review",
      publishedDate: new Date().toISOString().split('T')[0],
      summary: "Leading unicorn companies focus on creating high-performance teams through strategic hiring, clear goal setting, and continuous feedback mechanisms. Research shows that these organizations invest 60% more in team development compared to traditional companies. They implement regular performance reviews, cross-functional collaboration, and skill-based advancement opportunities. The study reveals that unicorns with strong team dynamics achieve 2.5x higher employee retention rates. Effective leadership development and mentorship programs are key factors that distinguish successful unicorn companies from their competitors.",
      relevanceScore: 94
    },
    {
      title: "The Future of Remote Work in Unicorn Companies",
      url: "https://sloanreview.mit.edu/article/future-remote-work-unicorn-companies/",
      source: "MIT Sloan Management Review",
      publishedDate: new Date().toISOString().split('T')[0],
      summary: "Unicorn startups are pioneering innovative remote work strategies that balance flexibility with productivity and company culture. These organizations implement advanced collaboration tools, virtual team-building activities, and flexible work arrangements. The analysis shows that remote-first unicorns report 30% higher employee satisfaction and 25% lower operational costs. They focus on outcome-based performance metrics rather than traditional time-based measurements. Digital-first onboarding processes and virtual mentorship programs are becoming standard practices that enable rapid scaling across global markets.",
      relevanceScore: 91
    },
    {
      title: "Diversity and Inclusion Strategies That Drive Unicorn Success",
      url: "https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/diversity-inclusion-unicorn-success",
      source: "McKinsey & Company",
      publishedDate: new Date().toISOString().split('T')[0],
      summary: "Successful unicorn companies implement comprehensive diversity and inclusion strategies that directly correlate with business performance and innovation outcomes. These organizations establish clear D&I metrics, implement bias-free hiring processes, and create inclusive leadership development programs. Research indicates that diverse unicorn teams are 35% more likely to outperform homogeneous teams in problem-solving and creativity. They invest in employee resource groups, mentorship programs, and inclusive workplace policies. The study demonstrates that unicorns with strong D&I practices achieve higher valuations and market success rates.",
      relevanceScore: 89
    },
    {
      title: "Compensation Innovation in the Unicorn Ecosystem",
      url: "https://hbr.org/2024/03/compensation-innovation-unicorn-ecosystem",
      source: "Harvard Business Review",
      publishedDate: new Date().toISOString().split('T')[0],
      summary: "Unicorn companies are revolutionizing compensation strategies through innovative equity packages, performance-based bonuses, and holistic benefit programs. These organizations offer competitive base salaries combined with significant equity participation that aligns employee interests with company growth. The research shows that unicorns providing comprehensive wellness benefits and flexible compensation options achieve 40% higher talent acquisition success rates. They implement transparent pay scales, regular compensation reviews, and personalized benefit packages. Creative perks and professional development budgets have become standard offerings that differentiate top unicorn employers.",
      relevanceScore: 86
    },
    {
      title: "Leadership Development in Hypergrowth Environments",
      url: "https://sloanreview.mit.edu/article/leadership-development-hypergrowth-environments/",
      source: "MIT Sloan Management Review",
      publishedDate: new Date().toISOString().split('T')[0],
      summary: "Unicorn companies excel at developing leaders who can navigate rapid growth, uncertainty, and complex organizational challenges. They implement accelerated leadership development programs, cross-functional rotation opportunities, and executive coaching initiatives. The study reveals that unicorns investing in leadership development achieve 50% faster revenue growth and higher employee engagement scores. These organizations focus on building adaptive leadership capabilities, emotional intelligence, and strategic thinking skills. Mentorship networks and internal leadership academies are becoming critical components of successful unicorn talent strategies.",
      relevanceScore: 93
    }
  ];
  
  return mockArticles;
};

export async function GET() {
  try {
    // 실제 구현에서는 여기서 외부 API를 호출하여 최신 기사를 가져올 수 있습니다
    const articles = generateMockArticles();
    
    return NextResponse.json({
      success: true,
      data: articles,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    // 수동 업데이트 트리거
    const articles = generateMockArticles();
    
    return NextResponse.json({
      success: true,
      message: 'Articles updated successfully',
      data: articles,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating articles:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update articles' },
      { status: 500 }
    );
  }
} 
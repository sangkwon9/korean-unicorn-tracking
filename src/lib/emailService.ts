// Google Cloud Platform 이메일 서비스 연동

import { generateDailyInsight } from '../analysis/anyai-insights';

interface EmailConfig {
  to: string;
  subject: string;
  body: string;
  isHtml?: boolean;
}

interface MilestoneNotification {
  milestone: number;
  title: string;
  completedTasks: string[];
  nextSteps: string[];
  insights: string[];
}

// Google Cloud Functions를 통한 이메일 발송 (실제 구현 시 사용)
export class EmailService {
  private readonly gcpProjectId: string;
  private readonly functionUrl: string;
  
  constructor() {
    this.gcpProjectId = process.env.GCP_PROJECT_ID || 'anyai-insights-project';
    this.functionUrl = process.env.GCP_FUNCTION_URL || 'https://asia-northeast3-anyai-insights-project.cloudfunctions.net/send-email';
  }

  // 마일스톤 완료 알림 이메일
  async sendMilestoneNotification(milestone: MilestoneNotification): Promise<boolean> {
    const emailContent = this.generateMilestoneEmail(milestone);
    
    const emailConfig: EmailConfig = {
      to: process.env.NOTIFICATION_EMAIL || 'user@example.com',
      subject: `🚀 ANYAI 프로젝트 마일스톤 ${milestone.milestone} 완료!`,
      body: emailContent,
      isHtml: true
    };

    return this.sendEmail(emailConfig);
  }

  // 일일 인사이트 이메일 (매일 오전 6시)
  async sendDailyInsight(): Promise<boolean> {
    const insightContent = generateDailyInsight();
    
    const emailConfig: EmailConfig = {
      to: process.env.NOTIFICATION_EMAIL || 'user@example.com',
      subject: `🏥 ANYAI 일일 조직관리 인사이트 - ${new Date().toLocaleDateString('ko-KR')}`,
      body: this.convertMarkdownToHtml(insightContent),
      isHtml: true
    };

    return this.sendEmail(emailConfig);
  }

  // 주간 요약 이메일 (매주 월요일 오전 6시)
  async sendWeeklyReport(): Promise<boolean> {
    const weeklyContent = this.generateWeeklyReport();
    
    const emailConfig: EmailConfig = {
      to: process.env.NOTIFICATION_EMAIL || 'user@example.com',
      subject: `📊 ANYAI 주간 조직관리 리포트 - ${new Date().toLocaleDateString('ko-KR')}`,
      body: weeklyContent,
      isHtml: true
    };

    return this.sendEmail(emailConfig);
  }

  // 월간 리포트 이메일 (매월 1일 오전 6시)
  async sendMonthlyReport(): Promise<boolean> {
    const monthlyContent = this.generateMonthlyReport();
    
    const emailConfig: EmailConfig = {
      to: process.env.NOTIFICATION_EMAIL || 'user@example.com',
      subject: `📈 ANYAI 월간 조직관리 종합 리포트 - ${new Date().toLocaleDateString('ko-KR')}`,
      body: monthlyContent,
      isHtml: true
    };

    return this.sendEmail(emailConfig);
  }

  // 실제 이메일 발송 (Google Cloud Functions 호출)
  private async sendEmail(config: EmailConfig): Promise<boolean> {
    try {
      // 개발 환경에서는 콘솔에 로그만 출력
      if (process.env.NODE_ENV === 'development') {
        console.log('📧 이메일 발송 (개발 모드)');
        console.log('받는 사람:', config.to);
        console.log('제목:', config.subject);
        console.log('내용:', config.body.substring(0, 200) + '...');
        return true;
      }

      // 프로덕션 환경에서는 실제 Google Cloud Functions 호출
      const response = await fetch(this.functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GCP_ACCESS_TOKEN}`
        },
        body: JSON.stringify(config)
      });

      return response.ok;
    } catch (error) {
      console.error('이메일 발송 실패:', error);
      return false;
    }
  }

  // 마일스톤 이메일 템플릿 생성
  private generateMilestoneEmail(milestone: MilestoneNotification): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .milestone { background: #f8f9fa; border-left: 4px solid #28a745; padding: 15px; margin: 15px 0; }
            .tasks { background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 10px 0; }
            .insights { background: #fff3cd; padding: 15px; border-radius: 5px; margin: 10px 0; }
            .next-steps { background: #d1ecf1; padding: 15px; border-radius: 5px; margin: 10px 0; }
            ul { padding-left: 20px; }
            li { margin: 5px 0; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🚀 ANYAI 조직관리 인사이트 프로젝트</h1>
            <h2>마일스톤 ${milestone.milestone} 완료!</h2>
        </div>
        
        <div class="content">
            <div class="milestone">
                <h3>📋 ${milestone.title}</h3>
                <p>축하합니다! 마일스톤 ${milestone.milestone}이 성공적으로 완료되었습니다.</p>
            </div>
            
            <div class="tasks">
                <h3>✅ 완료된 작업</h3>
                <ul>
                    ${milestone.completedTasks.map(task => `<li>${task}</li>`).join('')}
                </ul>
            </div>
            
            <div class="insights">
                <h3>💡 핵심 인사이트</h3>
                <ul>
                    ${milestone.insights.map(insight => `<li>${insight}</li>`).join('')}
                </ul>
            </div>
            
            <div class="next-steps">
                <h3>🎯 다음 단계</h3>
                <ul>
                    ${milestone.nextSteps.map(step => `<li>${step}</li>`).join('')}
                </ul>
            </div>
            
            <hr style="margin: 30px 0;">
            <p style="text-align: center; color: #666;">
                <small>
                    ANYAI 조직관리 인사이트 시스템 | 
                    다음 업데이트: 내일 오전 6시
                </small>
            </p>
        </div>
    </body>
    </html>
    `;
  }

  // 주간 리포트 생성
  private generateWeeklyReport(): string {
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 20px; text-align: center; }
            .section { margin: 20px 0; padding: 15px; border-radius: 5px; }
            .trends { background: #e8f5e8; }
            .actions { background: #fff3cd; }
            .benchmarks { background: #d1ecf1; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>📊 ANYAI 주간 조직관리 리포트</h1>
            <p>${weekStart.toLocaleDateString('ko-KR')} 주간</p>
        </div>
        
        <div class="section trends">
            <h3>📈 이번 주 HR 트렌드</h3>
            <ul>
                <li>AI 기반 채용 프로세스 자동화 확산</li>
                <li>헬스케어 스타트업의 규제 대응 조직 구축 사례 증가</li>
                <li>원격 협업 도구를 활용한 의료진-엔지니어 협업 모델 주목</li>
            </ul>
        </div>
        
        <div class="section actions">
            <h3>🎯 권장 액션 아이템</h3>
            <ul>
                <li>의료 AI 규제 전문가 채용 프로세스 시작</li>
                <li>크로스 펑셔널 팀 구성 및 협업 프로세스 정립</li>
                <li>AI 도구를 활용한 내부 HR 프로세스 개선</li>
            </ul>
        </div>
        
        <div class="section benchmarks">
            <h3>🏆 벤치마킹 인사이트</h3>
            <ul>
                <li><strong>토스</strong>: 금융 규제 대응을 위한 전담 조직 운영</li>
                <li><strong>크래프톤</strong>: 글로벌 인재 확보를 위한 다국적 채용 전략</li>
                <li><strong>무신사</strong>: 급성장 시기 조직문화 유지 방안</li>
            </ul>
        </div>
    </body>
    </html>
    `;
  }

  // 월간 리포트 생성
  private generateMonthlyReport(): string {
    const today = new Date();
    const month = today.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' });
    
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: white; padding: 20px; text-align: center; }
            .summary { background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0; }
            .metrics { display: flex; justify-content: space-around; margin: 20px 0; }
            .metric { text-align: center; padding: 15px; background: white; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>📈 ANYAI 월간 조직관리 종합 리포트</h1>
            <p>${month}</p>
        </div>
        
        <div class="summary">
            <h3>📊 월간 요약</h3>
            <p>이번 달 ANYAI의 조직관리 인사이트 프로젝트가 순조롭게 진행되고 있습니다. 
            한국 유니콘 기업들의 성장 패턴을 분석하여 에니아이에 특화된 조직관리 전략을 수립했습니다.</p>
        </div>
        
        <div class="metrics">
            <div class="metric">
                <h4>분석된 기업</h4>
                <h2>6개</h2>
                <p>유니콘 기업</p>
            </div>
            <div class="metric">
                <h4>수집된 인사이트</h4>
                <h2>25개</h2>
                <p>HR 전략</p>
            </div>
            <div class="metric">
                <h4>제공된 권장사항</h4>
                <h2>40개</h2>
                <p>액션 아이템</p>
            </div>
        </div>
        
        <h3>🎯 다음 달 계획</h3>
        <ul>
            <li>에니아이 맞춤형 채용 전략 세부 계획 수립</li>
            <li>성과 평가 시스템 프로토타입 개발</li>
            <li>보상 체계 벤치마킹 및 설계</li>
            <li>리더십 교육 프로그램 기획</li>
        </ul>
    </body>
    </html>
    `;
  }

  // 마크다운을 HTML로 변환 (간단한 버전)
  private convertMarkdownToHtml(markdown: string): string {
    return markdown
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^\- (.*$)/gim, '<li>$1</li>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\n/gim, '<br>');
  }
}

// 스케줄러 설정 (cron 작업)
export class EmailScheduler {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  // 일일 인사이트 스케줄 (매일 오전 6시)
  scheduleDailyInsights() {
    // 실제 구현에서는 node-cron 또는 Google Cloud Scheduler 사용
    console.log('📅 일일 인사이트 스케줄 설정: 매일 오전 6시 (한국 시간)');
    
    // 개발 환경에서는 즉시 실행하여 테스트
    if (process.env.NODE_ENV === 'development') {
      this.emailService.sendDailyInsight();
    }
  }

  // 주간 리포트 스케줄 (매주 월요일 오전 6시)
  scheduleWeeklyReports() {
    console.log('📅 주간 리포트 스케줄 설정: 매주 월요일 오전 6시 (한국 시간)');
  }

  // 월간 리포트 스케줄 (매월 1일 오전 6시)
  scheduleMonthlyReports() {
    console.log('📅 월간 리포트 스케줄 설정: 매월 1일 오전 6시 (한국 시간)');
  }
}

// 마일스톤 알림 헬퍼 함수들
export const milestoneNotifications = {
  milestone1: (): MilestoneNotification => ({
    milestone: 1,
    title: '데이터 수집 및 분석 완료',
    completedTasks: [
      '한국 유니콘 기업 6개사 성장 패턴 분석',
      'HR 인사이트 기사 25개 핵심 트렌드 추출',
      '에니아이 헬스케어 AI 업계 특성 분석',
      '투자 라운드별 조직 규모 벤치마킹'
    ],
    insights: [
      'AI 헬스케어 기업은 규제 대응 조직이 핵심 성공 요인',
      '의료진과 엔지니어 간 협업 문화 구축이 필수',
      '개인화된 직원 경험 제공이 인재 유지의 열쇠'
    ],
    nextSteps: [
      '투자 라운드별 조직관리 전략 수립',
      '에니아이 맞춤형 채용 전략 개발',
      '성과 평가 시스템 프레임워크 설계'
    ]
  }),

  milestone2: (): MilestoneNotification => ({
    milestone: 2,
    title: '투자 라운드별 조직관리 전략 수립 완료',
    completedTasks: [
      'Pre-Series A부터 Series C+까지 단계별 전략 수립',
      '각 단계별 핵심 과제 및 우선순위 정의',
      '조직 규모별 관리 포인트 도출',
      '에니아이 현재 단계 진단 및 로드맵 제시'
    ],
    insights: [
      'Series A 단계에서 조직 구조화가 가장 중요한 과제',
      '헬스케어 AI 특성상 규제 전문가 조기 확보 필요',
      '크로스 펑셔널 협업 체계 구축이 성공의 핵심'
    ],
    nextSteps: [
      '5개 조직관리 영역별 세부 가이드라인 개발',
      '실행 가능한 액션 플랜 수립',
      '벤치마킹 사례 구체화'
    ]
  })
};

export default EmailService; 
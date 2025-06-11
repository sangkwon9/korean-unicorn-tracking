import * as cron from 'node-cron';

export class ArticleScheduler {
  private static instance: ArticleScheduler;
  private scheduledTask: cron.ScheduledTask | null = null;

  private constructor() {}

  public static getInstance(): ArticleScheduler {
    if (!ArticleScheduler.instance) {
      ArticleScheduler.instance = new ArticleScheduler();
    }
    return ArticleScheduler.instance;
  }

  public startScheduler(): void {
    if (this.scheduledTask) {
      console.log('Scheduler is already running');
      return;
    }

    // 매일 오후 12시(한국 시간)에 실행 - 0 12 * * *
    this.scheduledTask = cron.schedule('0 12 * * *', async () => {
      try {
        console.log('🕛 Starting scheduled article update at', new Date().toLocaleString('ko-KR'));
        
        // API 엔드포인트 호출
        const response = await fetch('/api/articles', {
          method: 'POST',
        });

        if (response.ok) {
          const result = await response.json();
          console.log('✅ Articles updated successfully:', result.lastUpdated);
        } else {
          console.error('❌ Failed to update articles:', response.statusText);
        }
      } catch (error) {
        console.error('❌ Error during scheduled update:', error);
      }
    }, {
      timezone: 'Asia/Seoul' // 한국 시간대 설정
    });

    console.log('📅 Article scheduler started - Updates daily at 12:00 PM KST');
  }

  public stopScheduler(): void {
    if (this.scheduledTask) {
      this.scheduledTask.stop();
      this.scheduledTask = null;
      console.log('📅 Article scheduler stopped');
    }
  }

  public getNextScheduledTime(): string | null {
    if (this.scheduledTask) {
      // 다음 실행 시간 계산 (간단한 구현)
      const now = new Date();
      const nextRun = new Date();
      nextRun.setHours(12, 0, 0, 0);
      
      if (now >= nextRun) {
        nextRun.setDate(nextRun.getDate() + 1);
      }
      
      return nextRun.toLocaleString('ko-KR');
    }
    return null;
  }

  public isRunning(): boolean {
    return this.scheduledTask !== null;
  }
}

// 전역 스케줄러 인스턴스
export const articleScheduler = ArticleScheduler.getInstance(); 
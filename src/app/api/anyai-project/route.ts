// ANYAI 조직관리 인사이트 프로젝트 API

import { NextRequest, NextResponse } from 'next/server';
import EmailService, { EmailScheduler, milestoneNotifications } from '@/lib/emailService';
import { generateAnyaiRoadmap, koreanUnicornGrowthPatterns, investmentRoundStrategies } from '@/analysis/anyai-insights';

const emailService = new EmailService();
const emailScheduler = new EmailScheduler();

// 프로젝트 상태 관리
interface ProjectStatus {
  currentMilestone: number;
  completedMilestones: number[];
  startDate: string;
  lastUpdate: string;
  nextMilestoneDate: string;
}

let projectStatus: ProjectStatus = {
  currentMilestone: 1,
  completedMilestones: [],
  startDate: new Date().toISOString(),
  lastUpdate: new Date().toISOString(),
  nextMilestoneDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 1주 후
};

// GET: 프로젝트 현재 상태 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    switch (action) {
      case 'status':
        return NextResponse.json({
          success: true,
          data: {
            ...projectStatus,
            milestoneProgress: {
              total: 4,
              completed: projectStatus.completedMilestones.length,
              current: projectStatus.currentMilestone
            },
            unicornAnalysis: koreanUnicornGrowthPatterns,
            investmentStrategies: investmentRoundStrategies
          }
        });

      case 'insights':
        const roadmap = generateAnyaiRoadmap('Series A', 'Series B');
        return NextResponse.json({
          success: true,
          data: {
            roadmap,
            lastGenerated: new Date().toISOString()
          }
        });

      case 'schedule':
        // 스케줄 상태 확인
        return NextResponse.json({
          success: true,
          data: {
            dailyInsights: '매일 오전 6시 (한국 시간)',
            weeklyReports: '매주 월요일 오전 6시',
            monthlyReports: '매월 1일 오전 6시',
            nextScheduledEmail: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
          }
        });

      default:
        return NextResponse.json({
          success: true,
          message: 'ANYAI 조직관리 인사이트 프로젝트 API',
          availableActions: ['status', 'insights', 'schedule']
        });
    }
  } catch (error) {
    console.error('API 오류:', error);
    return NextResponse.json({
      success: false,
      error: 'API 처리 중 오류가 발생했습니다.'
    }, { status: 500 });
  }
}

// POST: 마일스톤 완료 처리 및 이메일 발송
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, milestone, email } = body;

    switch (action) {
      case 'complete-milestone':
        if (!milestone || milestone < 1 || milestone > 4) {
          return NextResponse.json({
            success: false,
            error: '유효하지 않은 마일스톤 번호입니다.'
          }, { status: 400 });
        }

        // 마일스톤 완료 처리
        if (!projectStatus.completedMilestones.includes(milestone)) {
          projectStatus.completedMilestones.push(milestone);
          projectStatus.currentMilestone = milestone + 1;
          projectStatus.lastUpdate = new Date().toISOString();
          
          // 다음 마일스톤 날짜 설정 (1주 후)
          projectStatus.nextMilestoneDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
        }

        // 마일스톤 완료 이메일 발송
        let notificationData;
        switch (milestone) {
          case 1:
            notificationData = milestoneNotifications.milestone1();
            break;
          case 2:
            notificationData = milestoneNotifications.milestone2();
            break;
          default:
            notificationData = {
              milestone,
              title: `마일스톤 ${milestone} 완료`,
              completedTasks: ['마일스톤 작업 완료'],
              insights: ['프로젝트가 순조롭게 진행되고 있습니다'],
              nextSteps: ['다음 마일스톤 준비']
            };
        }

        const emailSent = await emailService.sendMilestoneNotification(notificationData);

        return NextResponse.json({
          success: true,
          data: {
            milestone,
            completed: true,
            emailSent,
            projectStatus,
            message: `마일스톤 ${milestone}이 완료되었습니다!`
          }
        });

      case 'send-daily-insight':
        const dailyEmailSent = await emailService.sendDailyInsight();
        return NextResponse.json({
          success: true,
          data: {
            emailSent: dailyEmailSent,
            sentAt: new Date().toISOString(),
            message: '일일 인사이트 이메일이 발송되었습니다.'
          }
        });

      case 'send-weekly-report':
        const weeklyEmailSent = await emailService.sendWeeklyReport();
        return NextResponse.json({
          success: true,
          data: {
            emailSent: weeklyEmailSent,
            sentAt: new Date().toISOString(),
            message: '주간 리포트 이메일이 발송되었습니다.'
          }
        });

      case 'send-monthly-report':
        const monthlyEmailSent = await emailService.sendMonthlyReport();
        return NextResponse.json({
          success: true,
          data: {
            emailSent: monthlyEmailSent,
            sentAt: new Date().toISOString(),
            message: '월간 리포트 이메일이 발송되었습니다.'
          }
        });

      case 'setup-schedule':
        // 이메일 스케줄 설정
        emailScheduler.scheduleDailyInsights();
        emailScheduler.scheduleWeeklyReports();
        emailScheduler.scheduleMonthlyReports();

        return NextResponse.json({
          success: true,
          data: {
            message: '이메일 스케줄이 설정되었습니다.',
            schedules: {
              daily: '매일 오전 6시 (한국 시간)',
              weekly: '매주 월요일 오전 6시',
              monthly: '매월 1일 오전 6시'
            }
          }
        });

      default:
        return NextResponse.json({
          success: false,
          error: '지원하지 않는 액션입니다.'
        }, { status: 400 });
    }
  } catch (error) {
    console.error('POST API 오류:', error);
    return NextResponse.json({
      success: false,
      error: 'API 처리 중 오류가 발생했습니다.'
    }, { status: 500 });
  }
}

// PUT: 프로젝트 설정 업데이트
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, gcpProjectId, notificationSettings } = body;

    // 환경 변수 업데이트 (실제로는 .env 파일 또는 설정 파일 수정)
    if (email) {
      process.env.NOTIFICATION_EMAIL = email;
    }
    
    if (gcpProjectId) {
      process.env.GCP_PROJECT_ID = gcpProjectId;
    }

    return NextResponse.json({
      success: true,
      data: {
        message: '프로젝트 설정이 업데이트되었습니다.',
        settings: {
          email: process.env.NOTIFICATION_EMAIL,
          gcpProjectId: process.env.GCP_PROJECT_ID,
          updatedAt: new Date().toISOString()
        }
      }
    });
  } catch (error) {
    console.error('PUT API 오류:', error);
    return NextResponse.json({
      success: false,
      error: '설정 업데이트 중 오류가 발생했습니다.'
    }, { status: 500 });
  }
} 
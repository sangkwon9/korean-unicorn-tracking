import UnicornTable from '@/components/UnicornTable';
import HRArticles from '@/components/HRArticles';
import { koreanUnicornCompanies } from '@/data/unicornCompanies';
import { hrArticles } from '@/data/hrArticles';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-full mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-900">
            🦄 Korean Unicorn Tracking Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            한국 유니콘 기업들의 성장 과정과 HR 전략 인사이트를 한눈에 확인하세요
          </p>
        </div>
      </header>

      {/* 메인 콘텐츠 - 반반 분할 */}
      <main className="max-w-full mx-auto flex h-[calc(100vh-120px)]">
        {/* 왼쪽: 유니콘 기업 데이터 */}
        <section className="w-1/2 bg-white border-r border-gray-200">
          <UnicornTable companies={koreanUnicornCompanies} />
        </section>

        {/* 오른쪽: HR 기사 */}
        <section className="w-1/2 bg-gray-50">
          <HRArticles articles={hrArticles} />
        </section>
      </main>
    </div>
  );
}

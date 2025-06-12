import UnicornTable from '@/components/UnicornTable';
import HRArticles from '@/components/HRArticles';
import { koreanUnicornCompanies } from '@/data/unicornCompanies';
import { hrArticles } from '@/data/hrArticles';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            🦄 Korean Unicorn Tracking Dashboard
          </h1>
          <p className="text-center text-gray-600 mt-2">
            한국 유니콘 기업들의 성장 과정과 HR 전략 인사이트를 한눈에 확인하세요
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
          {/* Left Panel - Unicorn Companies Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <UnicornTable companies={koreanUnicornCompanies} />
          </div>

          {/* Right Panel - HR Articles */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <HRArticles articles={hrArticles} />
          </div>
        </div>
      </main>
    </div>
  );
}

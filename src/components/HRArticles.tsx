'use client';

import { HRArticle } from '@/types';
import { useState, useEffect } from 'react';

interface HRArticlesProps {
  articles: HRArticle[];
}

export default function HRArticles({ articles }: HRArticlesProps) {
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    // 현재 시간을 한국 시간으로 설정
    const now = new Date();
    const koreanTime = new Date(now.getTime() + (9 * 60 * 60 * 1000)); // UTC+9
    setLastUpdated(koreanTime.toLocaleString('ko-KR'));
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getSourceColor = (source: string) => {
    const colors: { [key: string]: string } = {
      'Harvard Business Review': 'bg-red-100 text-red-800',
      'MIT Sloan Management Review': 'bg-blue-100 text-blue-800',
      'McKinsey & Company': 'bg-green-100 text-green-800',
      'Stanford Business': 'bg-purple-100 text-purple-800',
      'Wharton Business': 'bg-orange-100 text-orange-800'
    };
    return colors[source] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="h-full overflow-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">유니콘 HR 인사이트</h2>
        <div className="text-sm text-gray-500">
          최종 업데이트: {lastUpdated}
        </div>
      </div>

      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          📚 매일 오후 12시에 업데이트되는 유니콘 기업의 HR 전략 관련 최신 기사들입니다.
        </p>
      </div>

      <div className="space-y-6">
        {articles
          .sort((a, b) => b.relevanceScore - a.relevanceScore)
          .map((article, index) => (
            <article
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-start mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSourceColor(article.source)}`}>
                  {article.source}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
                    관련도: {article.relevanceScore}%
                  </span>
                  <span className="text-xs text-gray-400">|</span>
                  <span className="text-xs text-gray-500">
                    {formatDate(article.publishedDate)}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 leading-tight">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  {article.title}
                </a>
              </h3>

              <p className="text-gray-600 leading-relaxed mb-4">
                {article.summary}
              </p>

              <div className="flex items-center justify-between">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  원문 읽기
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
                
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>📈</span>
                  <span>유니콘 성장 전략</span>
                </div>
              </div>
            </article>
          ))}
      </div>

      <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">자동 업데이트 정보</h3>
        <p className="text-sm text-gray-600">
          이 섹션은 한국 시간 기준 매일 오후 12시에 자동으로 업데이트됩니다. 
          Harvard Business Review, MIT Sloan Management Review, McKinsey & Company 등 
          신뢰할 수 있는 출처에서 최신 HR 인사이트를 제공합니다.
        </p>
      </div>
    </div>
  );
} 
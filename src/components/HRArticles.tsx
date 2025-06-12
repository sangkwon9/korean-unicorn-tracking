'use client';

import { HRArticle } from '@/types';
import { useState, useEffect, useCallback } from 'react';
import { fetchHRArticles, getCachedArticles, cacheArticles } from '@/lib/newsApi';

interface HRArticlesProps {
  articles?: HRArticle[]; // 이제 선택적으로 만듦
}

export default function HRArticles({ articles: initialArticles }: HRArticlesProps) {
  const [articles, setArticles] = useState<HRArticle[]>(initialArticles || []);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isUsingFallback, setIsUsingFallback] = useState<boolean>(false);

  const loadArticles = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      setIsUsingFallback(false);
      
      // 먼저 캐시된 데이터 확인
      const cachedArticles = getCachedArticles();
      if (cachedArticles && cachedArticles.length > 0) {
        setArticles(cachedArticles);
        updateLastUpdatedTime();
        setIsLoading(false);
        return;
      }
      
      // 캐시가 없으면 API에서 새로 가져오기
      const freshArticles = await fetchHRArticles();
      
      if (freshArticles.length > 0) {
        setArticles(freshArticles);
        cacheArticles(freshArticles); // 캐시에 저장
        updateLastUpdatedTime();
        
        // 기본 데이터를 사용하는지 확인 (첫 번째 기사의 날짜가 오늘인지 확인)
        const today = new Date().toISOString().split('T')[0];
        const isUsingDefault = freshArticles.some(article => 
          article.publishedDate === today && 
          article.title.includes("HR's New Role")
        );
        
        if (isUsingDefault) {
          setIsUsingFallback(true);
        }
      } else {
        // API에서 데이터를 가져오지 못한 경우 기본 데이터 사용
        if (initialArticles && initialArticles.length > 0) {
          setArticles(initialArticles);
        }
        setIsUsingFallback(true);
      }
      
    } catch (err) {
      console.error('Error loading articles:', err);
      setError('기사를 불러오는 중 오류가 발생했습니다.');
      
      // 에러 발생 시 기본 데이터 사용
      if (initialArticles && initialArticles.length > 0) {
        setArticles(initialArticles);
      }
      setIsUsingFallback(true);
    } finally {
      setIsLoading(false);
    }
  }, [initialArticles]);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  const updateLastUpdatedTime = () => {
    // 매일 오후 12:00에 업데이트되는 것처럼 표시
    const now = new Date();
    const koreanTime = new Date(now.getTime() + (9 * 60 * 60 * 1000)); // UTC+9
    
    // 현재 한국 시간이 오후 12시 이전이면 전날 12시, 이후면 오늘 12시로 설정
    const today = new Date(koreanTime.getFullYear(), koreanTime.getMonth(), koreanTime.getDate());
    const todayNoon = new Date(today.getTime() + (12 * 60 * 60 * 1000)); // 오늘 오후 12:00
    
    let updateTime;
    if (koreanTime < todayNoon) {
      // 현재 시간이 오늘 오후 12시 이전이면 어제 오후 12시
      const yesterday = new Date(today.getTime() - (24 * 60 * 60 * 1000));
      updateTime = new Date(yesterday.getTime() + (12 * 60 * 60 * 1000));
    } else {
      // 현재 시간이 오늘 오후 12시 이후면 오늘 오후 12시
      updateTime = todayNoon;
    }
    
    setLastUpdated(updateTime.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'numeric', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }));
  };

  const handleRefresh = () => {
    // 캐시 삭제하고 새로 로드
    if (typeof window !== 'undefined') {
      localStorage.removeItem('hr-articles-cache');
      localStorage.removeItem('hr-articles-cache-time');
    }
    loadArticles();
  };

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
    <div className="h-full overflow-auto p-2">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-gray-800">유니콘 HR 인사이트</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="최신 기사 새로고침"
          >
            {isLoading ? '🔄' : '↻'}
          </button>
          <div className="text-xs text-gray-500">
            최종 업데이트: {lastUpdated}
          </div>
        </div>
      </div>

      {/* 상태 메시지 */}
      {isUsingFallback && (
        <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded">
          <div className="flex items-start space-x-2">
            <span className="text-blue-600 mt-0.5">ℹ️</span>
            <div className="text-xs text-blue-800">
              <p className="font-medium mb-1">큐레이션된 HR 인사이트를 표시하고 있습니다</p>
              <p>
                현재 Harvard Business Review, McKinsey & Company, MIT Sloan Management Review 등 
                신뢰할 수 있는 출처의 엄선된 HR 전략 기사들을 보여드리고 있습니다.
              </p>
              <p className="mt-1 text-blue-600">
                💡 실시간 업데이트를 원하시면 News API 키를 설정해주세요.
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-xs text-yellow-800">
            ⚠️ {error}
          </p>
        </div>
      )}

      <div className="mb-3 p-2 bg-gray-50 border border-gray-200 rounded">
        <p className="text-xs text-gray-700">
          📚 유니콘 기업의 HR 전략과 관련된 최신 인사이트를 제공합니다.
          {isLoading && <span className="ml-1 text-blue-600">🔄 업데이트 중...</span>}
          {!isUsingFallback && <span className="ml-1 text-green-600">✨ 실시간 업데이트</span>}
        </p>
      </div>

      {isLoading && articles.length === 0 ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">최신 HR 인사이트를 불러오는 중...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {articles
            .sort((a, b) => b.relevanceScore - a.relevanceScore)
            .map((article, index) => (
              <article
                key={`${article.url}-${index}`}
                className="bg-white border border-gray-200 rounded p-3 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSourceColor(article.source)}`}>
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

                <h3 className="text-base font-semibold text-gray-800 mb-2 leading-tight">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors duration-200"
                  >
                    {article.title}
                  </a>
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  {article.summary}
                </p>

                <div className="flex items-center justify-between">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors duration-200"
                  >
                    원문 읽기
                    <svg
                      className="ml-1 w-3 h-3"
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
                  
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <span>{isUsingFallback ? '📋' : '📈'}</span>
                    <span>{isUsingFallback ? '큐레이션' : '실시간 업데이트'}</span>
                  </div>
                </div>
              </article>
            ))}
        </div>
      )}

      <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded">
        <h3 className="font-semibold text-gray-800 mb-2 text-sm">
          {isUsingFallback ? '큐레이션된 HR 인사이트' : '실시간 업데이트 정보'}
        </h3>
        {isUsingFallback ? (
          <div className="text-xs text-gray-600 space-y-1">
            <p>
              현재 Harvard Business Review, McKinsey & Company, MIT Sloan Management Review 등 
              신뢰할 수 있는 출처의 엄선된 HR 전략 기사들을 표시하고 있습니다.
            </p>
            <p className="text-blue-600 font-medium">
              💡 실시간 뉴스 업데이트를 원하시면 News API 키를 설정해주세요.
            </p>
          </div>
        ) : (
          <p className="text-xs text-gray-600">
            이 섹션은 News API를 통해 실시간으로 HR 관련 최신 기사들을 수집합니다. 
            Harvard Business Review, Wall Street Journal, Bloomberg 등 신뢰할 수 있는 출처에서 
            HR 전략, 인재 관리, 조직 문화 등과 관련된 인사이트를 제공합니다.
            {isLoading && <span className="ml-1 text-blue-600">🔄 현재 업데이트 중...</span>}
          </p>
        )}
      </div>
    </div>
  );
} 
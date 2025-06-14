'use client';

import { UnicornCompany } from '@/types';
import { useState } from 'react';
import React from 'react';

interface UnicornTableProps {
  companies: UnicornCompany[];
}

export default function UnicornTable({ companies }: UnicornTableProps) {
  const [selectedCompany, setSelectedCompany] = useState<UnicornCompany | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('ko-KR');
  };

  return (
    <div className="h-full overflow-auto p-2">
      <h2 className="text-xl font-bold mb-3 text-gray-800">한국 유니콘 기업 인력 추이</h2>
      
      {/* 기업 목록 */}
      <div className="mb-3">
        {/* 기업 카드 그리드 */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {companies.map((company, index) => (
            <div key={index} className="w-full">
              <div
                className={`p-3 border rounded cursor-pointer transition-all duration-200 h-full ${
                  selectedCompany === company
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedCompany(selectedCompany === company ? null : company)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-base text-gray-800">{company.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">{company.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      유니콘 달성: {formatDate(company.unicornDate)} | 현재 인원: {formatNumber(company.currentEmployees)}명
                    </p>
                  </div>
                  <div className="text-xl text-gray-400 ml-2">
                    {selectedCompany === company ? '−' : '+'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 상세 정보 */}
        {selectedCompany && (
          <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              {selectedCompany.name} - 연도별 인력 변화
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-2 py-2 text-left font-semibold text-gray-700">연도</th>
                    <th className="border border-gray-200 px-2 py-2 text-left font-semibold text-gray-700">직원 수</th>
                    <th className="border border-gray-200 px-2 py-2 text-left font-semibold text-gray-700">증가율</th>
                    <th className="border border-gray-200 px-2 py-2 text-left font-semibold text-gray-700">출처</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCompany.employeeHistory.map((record, idx) => {
                    const prevRecord = selectedCompany.employeeHistory[idx - 1];
                    const growthRate = prevRecord
                      ? ((record.employees - prevRecord.employees) / prevRecord.employees * 100).toFixed(1)
                      : null;
                    return (
                      <tr key={record.year} className="hover:bg-gray-50">
                        <td className="border border-gray-200 px-2 py-2 font-medium text-gray-800">
                          {record.year}년
                        </td>
                        <td className="border border-gray-200 px-2 py-2 text-gray-700">
                          {formatNumber(record.employees)}명
                        </td>
                        <td className="border border-gray-200 px-2 py-2">
                          {growthRate ? (
                            <span className={`font-medium ${parseFloat(growthRate) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {parseFloat(growthRate) >= 0 ? '+' : ''}{growthRate}%
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="border border-gray-200 px-2 py-2 text-xs text-gray-600">
                          {record.source}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-xs text-yellow-800">
                💡 <strong>유니콘 달성 시점:</strong> {formatDate(selectedCompany.unicornDate)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
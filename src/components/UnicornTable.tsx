'use client';

import { UnicornCompany } from '@/types';
import { useState } from 'react';

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
    <div className="h-full overflow-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">한국 유니콘 기업 인력 추이</h2>
      
      {/* 기업 목록 */}
      <div className="grid gap-4 mb-6">
        {companies.map((company, index) => (
          <div
            key={index}
            className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
              selectedCompany === company
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setSelectedCompany(selectedCompany === company ? null : company)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{company.name}</h3>
                <p className="text-sm text-gray-600">{company.description}</p>
                <p className="text-sm text-gray-500 mt-1">
                  유니콘 달성: {formatDate(company.unicornDate)} | 현재 인원: {formatNumber(company.currentEmployees)}명
                </p>
              </div>
              <div className="text-2xl text-gray-400">
                {selectedCompany === company ? '−' : '+'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 선택된 기업의 상세 정보 */}
      {selectedCompany && (
        <div className="mt-6 p-6 bg-white border rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            {selectedCompany.name} - 연도별 인력 변화
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">연도</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">직원 수</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">전년 대비 증가율</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">자료 출처</th>
                </tr>
              </thead>
              <tbody>
                {selectedCompany.employeeHistory.map((record, index) => {
                  const prevRecord = selectedCompany.employeeHistory[index - 1];
                  const growthRate = prevRecord 
                    ? ((record.employees - prevRecord.employees) / prevRecord.employees * 100).toFixed(1)
                    : null;

                  return (
                    <tr key={record.year} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 font-medium text-gray-800">
                        {record.year}년
                      </td>
                      <td className="border border-gray-200 px-4 py-3 text-gray-700">
                        {formatNumber(record.employees)}명
                      </td>
                      <td className="border border-gray-200 px-4 py-3">
                        {growthRate ? (
                          <span className={`font-medium ${parseFloat(growthRate) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {parseFloat(growthRate) >= 0 ? '+' : ''}{growthRate}%
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">
                        {record.source}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 유니콘 달성 시점 하이라이트 */}
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">
              💡 <strong>유니콘 달성 시점:</strong> {formatDate(selectedCompany.unicornDate)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 
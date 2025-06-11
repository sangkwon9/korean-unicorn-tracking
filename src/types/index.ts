export interface UnicornCompany {
  name: string;
  unicornDate: string;
  currentEmployees: number;
  employeeHistory: {
    year: number;
    employees: number;
    source: string;
  }[];
  description: string;
}

export interface HRArticle {
  title: string;
  url: string;
  source: string;
  publishedDate: string;
  summary: string;
  relevanceScore: number;
} 
export const MAX_API = 500;
export const DEF_VAC = 4;

export const START_PROPERTY = {
  id: 0,
  profession: '',
  payment_from: 0,
  address: '',
  favorite: false,
  type_of_work: {
    id: 0,
    title: '',
  },
  town: {
    id: 0,
    title: '',
  },
  vacancyRichText: '',
  currency: '',
};
export interface Vacancy {
  id: number;
  profession: string;
  payment_from: number;
  address: string;
  favorite: boolean;
  type_of_work: {
    id: number;
    title: string;
  };
  town: {
    id: number;
    title: string;
  };
  currency: string;
  vacancyRichText: string;
}

export interface VacanciesProps {
  vacancies: Vacancy[];
  isErr: boolean;
  isLoaded: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  handleFilteredJobs: (filteredJobs: Vacancy[]) => void;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  handlePageChange: (newPage: number) => void;
  currentPage: number;
  setJobs: React.Dispatch<React.SetStateAction<Vacancy[]>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface FilterCardProps {
  handleFilteredJobs: (filteredJobs: Vacancy[]) => void;
  search: string;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export interface Categories {
  key: number;
  title: string;
}

export interface JobCardProps {
  el: Vacancy;
}

export const REMOVE_SALARY_TO = localStorage.removeItem('SalaryTo');
export const REMOVE_SALARY_FROM = localStorage.removeItem('SalaryFrom');
export const REMOVE_CATEGORY = localStorage.removeItem('Category');

export const API_URL_PASSWORD =
  'https://startup-summer-2023-proxy.onrender.com/2.0/oauth2/password/';
export const CLIENT_SECRET =
  'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948';
export const API_URL_VACANCIES = 'https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/';
export const API_URL_CATALOGUES = 'https://startup-summer-2023-proxy.onrender.com/2.0/catalogues/';
export const SECRET_KEY = 'GEU4nvd3rej*jeh.eqp';

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

export interface SearchBarProps {
  handleFilteredJobs: (filteredJobs: Vacancy[]) => void;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  currentPage: number;
  handleApplyPage: (totalPages: number) => void;
}

export const REMOVE_SALARY_TO = localStorage.removeItem('SalaryTo');
export const REMOVE_SALARY_FROM = localStorage.removeItem('SalaryFrom');
export const REMOVE_CATEGORY = localStorage.removeItem('Category');

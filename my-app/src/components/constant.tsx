export interface Vacancy {
  id: number;
  title: string;
  location: string;
  salary: string;
  timeSchedule: string;
  sphere: string;
  favorite: boolean;
}

const vacancies = [
  {
    id: 1,
    title: 'Frontend Developer',
    location: 'New York',
    salary: '100000 USD',
    timeSchedule: 'Full-time',
    sphere: 'IT',
    favorite: false,
  },
  {
    id: 2,
    title: 'Sales Manager',
    location: 'London',
    salary: '80000 USD',
    timeSchedule: 'Full-time',
    sphere: 'Sales',
    favorite: true,
  },
  {
    id: 3,
    title: 'Graphic Designer',
    location: 'Paris',
    salary: '70000 USD',
    timeSchedule: 'Part-time',
    sphere: 'Design',
    favorite: false,
  },
  {
    id: 4,
    title: 'Marketing Specialist',
    location: 'Berlin',
    salary: '90000 USD',
    timeSchedule: 'Full-time',
    sphere: 'Marketing',
    favorite: true,
  },
  {
    id: 5,
    title: 'Data Analyst',
    location: 'San Francisco',
    salary: '95000 USD',
    timeSchedule: 'Full-time',
    sphere: 'Analytics',
    favorite: false,
  },
  {
    id: 6,
    title: 'Backend Developer',
    location: 'Tokyo',
    salary: '110000 USD',
    timeSchedule: 'Full-time',
    sphere: 'IT',
    favorite: false,
  },
  {
    id: 7,
    title: 'HR Manager',
    location: 'Dubai',
    salary: '85000 USD',
    timeSchedule: 'Full-time',
    sphere: 'Human Resources',
    favorite: true,
  },
  {
    id: 8,
    title: 'Content Writer',
    location: 'Singapore',
    salary: '75000 USD',
    timeSchedule: 'Part-time',
    sphere: 'Writing',
    favorite: false,
  },
  {
    id: 9,
    title: 'Product Manager',
    location: 'Sydney',
    salary: '120000 USD',
    timeSchedule: 'Full-time',
    sphere: 'Management',
    favorite: true,
  },
  {
    id: 10,
    title: 'Network Administrator',
    location: 'Toronto',
    salary: '95000 USD',
    timeSchedule: 'Full-time',
    sphere: 'IT',
    favorite: true,
  },
];

export default vacancies;

export const PAGE_SIZE = 5; 

export const VALIDATION = {
  TODAY: new Date(),
  HIRE_DATE_MIN_DATE: new Date("2020-01-01"),
  MIN_DATE_OF_BIRTH: new Date("1950-01-01"),
  MAX_DATE_OF_BIRTH: new Date("2007-01-01")
} as const

export const NAVIGATION = {
  LOGIN: '/login', 
  HOME: '/',
  EMPLOYEES: '/employees',
  IMPORT_EMPLOYEES: '/import-employees',
  IMPORT_EMPLOYEES_HISTORY: '/import-employees-history',
  ADD_EMPLOYEE: '/add-employee',
  EDIT_EMPLOYEE: '/edit-employee',
  EMPLOYEE_DETAILS: '/employee-details',
  EMPLOYEE_PHOTO_UPLOAD: '/employees/photo/upload/',
  EMPLOYEE_SEARCH: '/employees/search',
  EMPLOYMENT: '/employment',
  JOBS: '/jobs',  
  DEPARTMENTS: '/departments'
} as const;
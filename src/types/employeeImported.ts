import { Employee } from "./employee"

export type PagedEmployees = {
  employees: Employee[]
  page: number
  totalPages: number
  totalEmployees: number
}   
 
export type EmployeeImportHistory = {
  id: number
  date: string
}   

export type ApiEmployeePagingResponse = {
  employees: Employee[]
  page: number
  totalPages: number
  totalEmployees: number
}  

export type ApiExistingEmployeePagingResponse = {
  existingEmployees: Employee[]
  page: number
  totalPages: number
  totalEmployees: number
}  
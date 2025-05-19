
export type Employee = 
{
  id: number;  
  surname: string; 
  firstName: string;
  dateOfBirth: string | null;  
  email: string | null; 
  hireDate: string | null; 
  phoneNumber: string | null;
  photo: string;
  departmentId: number | null; 
  department: Department | null; 
}

export type Department = 
{
  id: number;
  name: string; 
}

export function isEmployee(obj: any): obj is Employee {
  return obj && typeof obj.id === "number" 
                    && typeof obj.surname === "string" 
                        && obj.firstName === "string" 
                            && (obj.hireDate === "string" || obj.hireDate === null) ;
}
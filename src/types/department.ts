export type Department = 
{
  id: number;
  name: string; 
}

export function isDepartment(obj: any): obj is Department {
  return obj && typeof obj.id === "number" 
                    && typeof obj.name === "string";
}
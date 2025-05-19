import { z } from "zod"; 

export const employeeSchema = z.object({
  surname: z.string().min(1, { message: 'Surname is required' }).max(25, { message: 'Surname must be less than or equal to 25 characters' }),
  firstName: z.string().min(1, { message: 'First name is required' }).max(25, { message: 'First name must be less than or equal to 25 characters' }), 
  dateOfBirth: z
    .string() 
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Please enter a valid date of birth",
    })
    .nullable()   
    .optional(),
  hireDate: z
    .string() 
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Please enter a valid hire date",
    })
    .nullable()   
    .optional(),  
  email: z
    .string()
    .min(0).max(250, { message: 'Email must be less than or equal to 250 characters' })
    .email({ message: "Invalid email address" })
    .nullable()   
    .optional(),
  departmentId: z
   .number()
   .min(0).max(7, { message: 'Department id not valid' })
   .nullable()
   .optional(), 
   phoneNumber: z
   .string()
   .min(0).max(25, { message: 'Phone number must be less than or equal to 25 characters' })
   .nullable()   
   .optional(),

   // TODO - validate dates
}); 
 
export type EmployeeSchema = z.infer<typeof employeeSchema>;
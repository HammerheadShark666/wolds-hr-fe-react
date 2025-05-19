import { z } from "zod"; 

export const authenticationSchema = z.object({ 
  email: z
    .string()
    .min(0).max(250, { message: 'Email must be less than or equal to 250 characters' })
    .email({ message: "Invalid email address" }),
   password: z
   .string()
   .min(8, { message: 'Password must be greater than or equal to 8 characters' })
   .max(15, { message: 'Password must be less than or equal to 15 characters' })
}); 
 
export type AuthorizationuthenticationSchema = z.infer<typeof authenticationSchema>;
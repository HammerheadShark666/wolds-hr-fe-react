import { z } from "zod"; 

export const authenticationSchema = z.object({ 
  username: z
    .string()
    .min(0).max(250, { message: 'Username must be less than or equal to 250 characters' })
    .email({ message: "Invalid username" }),
   password: z
   .string()
   .min(8, { message: 'Password must be greater than or equal to 8 characters' })
   .max(15, { message: 'Password must be less than or equal to 15 characters' })
}); 
 
export type AuthorizationuthenticationSchema = z.infer<typeof authenticationSchema>;
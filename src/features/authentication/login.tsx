import { useDispatch, useSelector } from 'react-redux'; 
import { AppDispatch, RootState } from '../../app/store';  
import { loginUser } from './authenticationThunk';
import { LoginRequest } from '../../types/loginRequest';
import { logout } from './authenticationSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authenticationSchema } from './validation/authenticationSchema'; 
import ErrorToast from "../../components/ErrorToasts";
import { z } from 'zod';
import styles from "../authentication/css/Login.module.css"; 

type FormData = z.infer<typeof authenticationSchema>;

export default function LoginForm() {
 
  const dispatch: AppDispatch = useDispatch(); 
  const authentication = useSelector((state: RootState) => state.authentication);
  const { validationErrors } = useSelector((state: RootState) => state.authentication);

   function populateLoginRequest(data: FormData) : LoginRequest { 
      return {        
        email: data.email?.trim(),
        password: data.password?.trim()
      }  
    }  

  const { 
    handleSubmit, 
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(authenticationSchema),
  });

  const onSubmit = async (data: FormData) => {    
    
    try {
      var resultAction = await dispatch(loginUser(populateLoginRequest(data)));
      unwrapResult(resultAction);
    }
    catch(error)
    {
      console.log('Error submitting employee:', error);
    }
  }
 
  return (
    <div>
      {authentication.token ? (
        <>
          <p>You are logged in</p>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </>
      ) : (
        <div className={styles["login-container"]}>
        <div className={styles["login-box"]}>
          <h2>Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>  
            <div className={styles["input-group"]}>
              <label htmlFor="email">Email:</label>
              <input id="email" autoComplete="email" type="email" {...register("email")} />
              {errors.email && <span className="error">{errors.email.message}</span>}             
            </div>
            <div className={styles["input-group"]}>
              <label htmlFor="password">Password:</label>
              <input id="password" autoComplete="current-password" type="password" {...register("password")} />
              {errors.password && <span className="error">{errors.password.message}</span>}              
            </div>
            <div className={styles["button-group"]}>
              <button type="submit" disabled={authentication.status === 'loading'}>
                {authentication.status === 'loading' ? 'Logging in...' : 'Login'}
              </button> 
            </div>          
            {authentication.error && <p style={{ color: 'red' }}>{authentication.error}</p>}         
          </form>
        </div>  
      </div>  
      )}
      <ErrorToast errors={validationErrors} /> 
    </div>
  );
}
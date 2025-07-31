import { useDispatch, useSelector } from 'react-redux'; 
import { AppDispatch, RootState } from '../../app/store';  
import { login } from './authenticationThunk';
import { LoginRequest } from '../../types/request/loginRequest';
import { clearValidationErrors } from './authenticationSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authenticationSchema } from './validation/authenticationSchema';
import { z } from 'zod';
import styles from "../authentication/css/Login.module.css"; 
import ToastErrors from '../../components/ErrorToasts';
import { useNavigate } from 'react-router-dom';

type FormData = z.infer<typeof authenticationSchema>;

export default function LoginForm() {
 
  const navigate = useNavigate(); 
  const dispatch: AppDispatch = useDispatch(); 
  const authentication = useSelector((state: RootState) => state.authentication);
  const { validationErrors } = useSelector((state: RootState) => state.authentication);

   function populateLoginRequest(data: FormData) : LoginRequest { 
      return {        
        username: data.username?.trim(),
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
      var resultAction = await dispatch(login(populateLoginRequest(data)));
      unwrapResult(resultAction); 
      navigate("/");
    }
    catch(error)
    {
      console.log('Error submitting employee:', error);
    }
  }
 
  return (
    <div> 
        <div className={styles["login-container"]}>
        <div className={styles["login-box"]}>
          <h2>Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>  
            <div className={styles["input-group"]}>
              <label htmlFor="username">Username:</label>
              <input id="username" autoComplete="username" type="username" {...register("username")} />
              {errors.username && <span className="error">{errors.username.message}</span>}             
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
      <ToastErrors errors={validationErrors} onClear={() => dispatch(clearValidationErrors())} />
    </div>
  );
}
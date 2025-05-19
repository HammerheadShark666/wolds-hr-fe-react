import React from 'react';
import { toast } from 'react-toastify';

interface ErrorToastProps {
  errors?: string[] | null; 
  error?: string | null;
}

const ErrorToasts: React.FC<ErrorToastProps> = ({ errors = [], error }) => {
  React.useEffect(() => {
    
    if(error) { 
      errors?.push(error)
    }      

    errors?.forEach((error) => {
      toast.error(error, {
        position: 'top-right',
        autoClose: false,  
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
    });
  }, [error, errors]);

  return null;
};

export default ErrorToasts;
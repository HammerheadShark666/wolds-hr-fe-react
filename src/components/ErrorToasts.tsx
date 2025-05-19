import { useEffect } from 'react';
import { toast } from 'react-toastify';
 

interface Props {
  errors?: string[] | null; 
  error?: string | null;
  onClear?: () => void;
}
 
export default function ToastErrors({ errors, error, onClear }: Props) { 
  
   useEffect(() => {

    const allErrors = [...(errors || [])];
    if (error) {
      allErrors.push(error);
    } 

   allErrors?.forEach((error) => {
      toast.error(error, {
        position: 'top-right',
        autoClose: false,  
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        toastId: error
      });
    });
    onClear?.();
  }, [error, errors, onClear]);

  return null;
};
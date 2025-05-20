import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ToastClearOnRouteChange() {
  const location = useLocation();
  const navigationType = useNavigationType(); 

  useEffect(() => {
    if (navigationType !== 'POP') {
      toast.dismiss();
    }
  }, [location.key, navigationType]);

  return null;
}

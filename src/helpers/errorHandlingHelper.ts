import { AxiosError } from 'axios';

export function handleError(error: unknown, rejectWithValue: (value: any) => void) {
  console.log(error);
  if (error instanceof AxiosError && error.response) {   
    return rejectWithValue(error.response.data.errors || error.response.data.message || error.message);
  } else if (error instanceof Error) {    
    return rejectWithValue([error.message || 'An unknown error occurred']);
  } else {    
    return rejectWithValue(['An unknown error occurred']);
  }
}
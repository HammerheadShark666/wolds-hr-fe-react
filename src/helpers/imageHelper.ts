 
export function getEmployeePhotoUrl(filename: string) : string { 
  return `${window.env?.REACT_APP_AZURE_STORAGE_URL}${window.env?.REACT_APP_STORAGE_EMPLOYEES}/${filename}`; 
}
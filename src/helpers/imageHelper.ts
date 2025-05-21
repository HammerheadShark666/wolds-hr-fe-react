 
export function getEmployeePhotoUrl(filename: string) : string { 

  if(filename !== null && filename !== '') {
    return `${window.env?.REACT_APP_AZURE_STORAGE_URL}${window.env?.REACT_APP_STORAGE_EMPLOYEES}/${filename}`; 
  }

  return `${window.location.origin}/images/employees/default.png`;
}
import { useEffect } from "react";
import EmployeesImportHistoryToolBar from "./EmployeesImportHistoryToolBar";

const EmployeesImportHistoryContainer = () => {

  useEffect(() => {
    document.getElementById('import-history')?.focus();
  });

  return (    
    <EmployeesImportHistoryToolBar />     
  );
};

export default EmployeesImportHistoryContainer;
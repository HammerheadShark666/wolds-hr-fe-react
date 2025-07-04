import { useEffect } from "react";
import styles from "../css/Employee-import.module.css";
import { fetchDepartments } from "../../department/departmentThunks";
import { useAppDispatch } from "../../../app/hooks";
import EmployeesImportContainer from "../components/EmployeesImportContainer";

const EmployeesImport: React.FC = () => {

  const dispatch = useAppDispatch();
  
  useEffect(() => { 
    dispatch(fetchDepartments());
  });

  return  (  
    <>   
      <div className={styles["employee-container"]}>
        <div className={styles["employee-list"]}>  
          <EmployeesImportContainer></EmployeesImportContainer>
        </div>       
      </div>
    </>
  )     
};

export default EmployeesImport;
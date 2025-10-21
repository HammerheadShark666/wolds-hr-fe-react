import { useEffect } from "react";
import styles from "../css/Import-employee.module.css";
import { fetchDepartments } from "../../department/departmentThunks";
import { useAppDispatch } from "../../../app/hooks";
import ImportEmployeesContainer from "../components/ImportEmployeeContainer";

const ImportEmployees: React.FC = () => {

  const dispatch = useAppDispatch();
  
  useEffect(() => { 
    dispatch(fetchDepartments());
  });

  return  (  
    <>   
      <div className={styles["employee-container"]}>
        <div className={styles["employee-list"]}>  
          <ImportEmployeesContainer></ImportEmployeesContainer>
        </div>       
      </div>
    </>
  )     
};

export default ImportEmployees;
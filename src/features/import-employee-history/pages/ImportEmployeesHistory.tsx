import { useEffect } from "react";
import styles from "../css/Import-employee-history.module.css";
import { fetchDepartments } from "../../department/departmentThunks";
import { useAppDispatch } from "../../../app/hooks"; 
import ImportEmployeesHistoryContainer from "../components/ImportEmployeesHistoryContainer";

const ImportEmployeesHistory: React.FC = () => {

  const dispatch = useAppDispatch();
  
  useEffect(() => { 
    dispatch(fetchDepartments());
  });

  return  (  
    <>   
      <div className={styles["employee-container"]}>
        <div className={styles["employee-list"]}>  
            <ImportEmployeesHistoryContainer></ImportEmployeesHistoryContainer>
        </div>       
      </div>
    </>
  )     
};

export default ImportEmployeesHistory;
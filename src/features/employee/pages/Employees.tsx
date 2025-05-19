import { useEffect } from "react";
import EmployeesContainer from "../components/employeesList/EmployeesContainer";
import styles from "../css/Employee.module.css";
import { fetchDepartments } from "../../department/departmentThunks";
import { useAppDispatch } from "../../../app/hooks";

const Employees: React.FC = () => {

  const dispatch = useAppDispatch();
  
  useEffect(() => { 
    dispatch(fetchDepartments());
  });

  return  (  
    <>   
      <div className={styles["employee-container"]}>
        <div className={styles["employee-list"]}> 
          <EmployeesContainer></EmployeesContainer>
        </div>       
      </div>
    </>
  )     
};

export default Employees;
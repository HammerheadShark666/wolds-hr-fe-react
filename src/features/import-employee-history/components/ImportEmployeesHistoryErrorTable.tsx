import {  useSelector } from "react-redux"; 
import styles from "../../../components/css/EmployeesTable.module.css";
import { RootState } from "../../../app/store";    
import { ImportEmployeeError } from "../../../types/importEmployee";

interface IProps {
  rows: ImportEmployeeError[];
};  
  
const ImportEmployeesHistoryErrorTable = ({ rows }: IProps) => {
 
  const { loading } = useSelector((state: RootState) => state.employeeList);
      
  if (loading) {
    return <p>Loading...</p>;
  } 
  
  return (
    <>
      <table className={styles["employee-list-table"]}>
        <thead>
          <tr> 
            <th>Employee</th>
            <th>Error</th>            
          </tr>
      </thead>
      <tbody>
          {rows.map((employee) => {           
            return (
              <tr>
                <td>              
                  {employee.employee}
                </td> 
                <td>              
                  { <ul>
                    {employee.errors.map((err, index) => (
                      <li key={index}>{err}</li>
                    ))
                  }
                  </ul>}
                </td>             
              </tr>   
            );
          })}
        </tbody> 
      </table>
    </>
  )
};
  
export default ImportEmployeesHistoryErrorTable;
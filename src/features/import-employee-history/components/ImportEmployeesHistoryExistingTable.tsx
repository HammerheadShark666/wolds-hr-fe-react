import {  useSelector } from "react-redux"; 
import styles from "../../../components/css/EmployeesTable.module.css";    
import { Employee } from "../../../types/employee";
import { RootState } from "../../../app/store"; 
import EmployeePhoto from "../../../components/EmployeePhoto";
import { formatDate } from "../../../helpers/dateHelper";

interface IProps {
  rows: Employee[];
};  
  
const ImportEmployeesHistoryExistingTable = ({ rows }: IProps) => {
 
  const { loading } = useSelector((state: RootState) => state.employeeList);
      
  if (loading) {
    return <p>Loading...</p>;
  } 
  
  return (
    <>
      <table className={styles["employee-list-table"]}>
        <thead>
          <tr> 
            <th></th>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Dob</th>
            <th>Department</th>
            <th>Contact</th> 
          </tr>
      </thead>
      <tbody>
          {rows.map((employee) => {           
            return (
              <tr>
                <td className={styles["employee-photo-cell"]}>              
                  <EmployeePhoto employee={employee}></EmployeePhoto>
                </td>
                <td>{employee.id}</td>
                <td>{employee.firstName} {employee.surname}</td> 
                <td>{employee.dateOfBirth ? formatDate(employee.dateOfBirth) : ''}</td>
                <td>{employee.department ? employee.department.name : ""}</td>
                <td><div><div className={styles["employee-phone-number"]}>{employee.phoneNumber}</div><div className={styles["employee-email"]}><a href={`mailto:${employee.email}`}>{employee.email}</a></div></div></td>
              </tr>   
            );
          })}
        </tbody> 
      </table>
    </>
  )
};
  
export default ImportEmployeesHistoryExistingTable;
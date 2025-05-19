import { useEffect, useRef, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux"; 
import styles from "./css/EmployeesTable.module.css";    
import { Employee } from "../types/employee";
import { AppDispatch, RootState } from "../app/store";
import EmployeePhoto from "./EmployeePhoto";
import EmployeePopupForm from "../features/employee/components/employeeForm/EmployeePopupForm";
import { deleteEmployee } from "../features/employee/employeeThunks";
import { setSelectedEmployee } from "../features/employee/employeeSlice";

interface IProps {
  rows: Employee[];
  setShowEmployeePopUpForm: React.Dispatch<React.SetStateAction<boolean>>;
  showEmployeePopUpForm: boolean; 
};  
  
const EmployeesTable = ({ rows, setShowEmployeePopUpForm, showEmployeePopUpForm }: IProps) => {

  const dispatch = useDispatch<AppDispatch>();
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null); 
  const { loading } = useSelector((state: RootState) => state.employeeList);
    
  const onEditClick = () => {  
    setShowEmployeePopUpForm(true);
    setOpenMenu(0);
  } 

  const onRowClick = (employee: Employee) => { 
    dispatch(setSelectedEmployee(employee));
  };

  const onDeleteClick = (employeeId: number) => {
    setOpenMenu(0);
    const confirmed = window.confirm("Are you sure you want to delete this employee?");
    if (confirmed) { 
      dispatch(deleteEmployee(employeeId));
      dispatch(setSelectedEmployee(null));
    }
  }
 
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(0);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);    
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  } 
  
  return (
    <table className={styles["employee-list-table"]}>
      <thead>
        <tr> 
          <th></th>
          <th>Employee ID</th>
          <th>Name</th>
          <th>Department</th>
          <th>Contact</th>
          <th>Hire Date</th>
          <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {rows.map((employee) => {           
          return (
            <tr key={employee.id} onClick={() => onRowClick(employee)}>
              <td className={styles["employee-photo-cell"]}>              
                <EmployeePhoto employee={employee}></EmployeePhoto>
              </td>
              <td>{employee.id}</td>
              <td>{employee.firstName} {employee.surname}</td> 
              <td>{employee.department ? employee.department.name : ""}</td>
              <td><div><div className={styles["employee-phone-number"]}>{employee.phoneNumber}</div><div className={styles["employee-email"]}><a href={`mailto:${employee.email}`}>{employee.email}</a></div></div></td>
              <td>{employee.hireDate ? employee.hireDate : ""}</td> 
              <td className={`row ${openMenu === employee.id ? 'active' : ''}`}> 
                <div className={styles["employee-list-actions-menu-container"]}>  
                  <button onClick={() => setOpenMenu(openMenu === employee.id ? null : employee.id)} className={styles["employee-list-actions-menu-button"]}>
                    ⋮
                  </button>
                  {openMenu === employee.id && (
                    <div ref={menuRef} className={styles["employee-list-actions-menu"]}>
                      <div className={styles["employee-list-actions-menu-item"]} onClick={() => onEditClick()}>Edit</div>
                      <div className={styles["employee-list-actions-menu-item"]} onClick={() => onDeleteClick(employee.id)}>Delete</div> 
                    </div>
                  )} 
                </div>
              </td> 
            </tr>   
          );
        })}
      </tbody>
      {showEmployeePopUpForm && (
        <EmployeePopupForm setShowEmployeePopUpForm={setShowEmployeePopUpForm} />
      )}
    </table>    
  )
};
  
export default EmployeesTable;
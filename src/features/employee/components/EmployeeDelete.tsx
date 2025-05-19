 
import React from "react";
import { useAppDispatch } from "../../../app/hooks";   
import { RootState } from "../../../app/store";
import { useSelector } from "react-redux";
import { deleteEmployee } from "../employeeThunks";

interface IProps {
  employeeId: number; 
}
 
const EmployeeDelete: React.FC<IProps> = ({ employeeId }) => {

  const { loading, error } = useSelector((state: RootState) => state.employee);
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteEmployee(employeeId));
  };

  return (  
    <>
      {loading && <p>Adding employee...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <button onClick={handleDelete}>❌</button>  
    </>        
  );
};

export default EmployeeDelete;
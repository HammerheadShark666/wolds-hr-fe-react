import React, { useEffect } from 'react'; 
import globals from "../../../components/css/Toolbar.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { getImportedEmployeeHistory } from '../employeeImportHistoryThunk'; 
//import { getImportedEmployee, getImportedExistingEmployee } from '../../employee-import/employeeImportThunks';
//import { setEmployeeImportId } from '../../employee-import/employeeImportSlice';
 

type Props = {
  onSelectChange: (employeeImportHistoryId: number, employeeImportHistoryDate: string) => void; 
  employeeImportHistoryId: number; 
};
 
 


const EmployeesImportHistoryToolBar = ({ onSelectChange, employeeImportHistoryId }: Props) => {
 
  const dispatch = useDispatch<AppDispatch>(); 
  // const [importHistoryId, setImportHistoryId] = useState(0);


  //have handle change in container
 

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {

    onSelectChange(e.target.value ? parseInt(e.target.value) : 0, e.target.options[e.target.selectedIndex].text ? e.target.options[e.target.selectedIndex].text : "");


    // var importHistoryId = parseInt(e.target.value);

    //   setImportHistoryId(importHistoryId);
    //   dispatch(setEmployeeImportId(importHistoryId));

    // await dispatch(getImportedEmployee({ id: importHistoryId, page: 1, pageSize: 5 }));
    // await dispatch(getImportedExistingEmployee({ id: importHistoryId, page: 1, pageSize: 5 }));
  };
  
   
  useEffect(() => {
    document.getElementById('import-history')?.focus();
    dispatch(getImportedEmployeeHistory())
  }, [dispatch]);

  const importEmployeeHistory = useSelector((state: RootState) =>
    state.employeeImportHistory.employeeImportHistory
  );
 

  return ( 
    <div className={globals["toolbar"]}> 
      <div className={globals["toolbar-title"]}> 
        <span>Employees Import History</span>
      </div>
      <div className={globals["toolbar-buttons"]}>     
        <select id="import-history" value={employeeImportHistoryId} onChange={handleChange} >
            <option value="0">Select</option>
            {importEmployeeHistory.map((item) => (
              <option key={item.id} value={item.id}>
                {new Date(item.date).toLocaleString('en-GB', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
              </option>
            ))}
          </select> 
      </div>
    </div>  
  );
};

export default EmployeesImportHistoryToolBar;
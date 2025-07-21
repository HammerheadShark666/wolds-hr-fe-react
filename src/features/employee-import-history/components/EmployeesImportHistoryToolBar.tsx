import React from 'react'; 
import globals from "../../../components/css/Toolbar.module.css";
import styles from "../css/Employee-import-history-toolbar.module.css";
import { useSelector } from 'react-redux';
import {  RootState } from '../../../app/store'; 

type Props = {
  onSelectChange: (employeeImportHistoryId: string | null, employeeImportHistoryDate: string) => void; 
  employeeImportHistoryId: string | null;
}; 

const EmployeesImportHistoryToolBar = ({ onSelectChange, employeeImportHistoryId }: Props) => {
 
  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectChange(e.target.value ? e.target.value : '0', e.target.options[e.target.selectedIndex].text ? e.target.options[e.target.selectedIndex].text : "");
  };

  const importEmployeeHistory = useSelector((state: RootState) =>
    state.employeeImportHistory.employeeImportHistory
  ); 

  const importEmployeeHistoryId = useSelector((state: RootState) =>  
    state.employeeImportHistory.employeeImportHistoryId 
  ); 

  const importEmployeeHistoryDate = useSelector((state: RootState) =>
  {
    var date = state.employeeImportHistory.employeeImportHistoryDate;
    if(date !== undefined && date !== "" && date !== null && date !== "Select") {
      return "(" + date + ")";
    }
    return "";
  });  

  return ( 
    <div className={globals["toolbar"]}> 
      <div className={styles["toolbar-title"]}> 
        <span>Employees Import History {importEmployeeHistoryDate}</span>
      </div>
      <div className={globals["toolbar-buttons"]}>    
        <div> 
          <label htmlFor="import-history" className={globals["toolbar-label"]}>Import History</label>
          <select id="import-history" value={importEmployeeHistoryId === null ? '0' : importEmployeeHistoryId} onChange={handleChange} className={styles["select"]} >
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
    </div>  
  );
};

export default EmployeesImportHistoryToolBar;
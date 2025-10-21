import React from 'react';
import globals from "../../../components/css/Toolbar.module.css";
import styles from "../css/Import-employee-history-toolbar.module.css";
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { formatDateTime } from '../../../helpers/dateHelper';

type Props = {
  onSelectChange: (importEmployeeHistoryId: string, importEmployeeHistoryDate: string) => void;
  importEmployeeHistoryId: string | null;
};

const ImportEmployeesHistoryToolBar = ({ onSelectChange, importEmployeeHistoryId }: Props) => {
  const importEmployeeHistory = useSelector(
    (state: RootState) => state.importEmployeeHistory.importEmployeeHistory
  );
 
  const selectedImportEmployeeHistory = importEmployeeHistory.find(item => item.id === importEmployeeHistoryId);
   
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selected = importEmployeeHistory.find(item => item.id === selectedId);
    if (selected) {
      onSelectChange(selected.id, selected.date);
    } else {
      onSelectChange('0', '');
    }
  };

  return (
    <div className={globals["toolbar"]}>
      <div className={styles["toolbar-title"]}>
        <span>Employees Import History {formatDateTime(selectedImportEmployeeHistory?.date)}</span>
      </div>

      <div className={globals["toolbar-buttons"]}>
        <div>
          <label htmlFor="import-history" className={globals["toolbar-label"]}>Import History</label>
          <select
            id="import-history"
            value={importEmployeeHistoryId || '0'}
            onChange={handleChange}
            className={styles["select"]}
          >
            <option value="0">Select</option>
            {importEmployeeHistory.map(item => (
              <option key={item.id} value={item.id}>
                {formatDateTime(item.date)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ImportEmployeesHistoryToolBar;

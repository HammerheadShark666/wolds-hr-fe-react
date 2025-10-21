import { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { getImportedEmployeeHistoryLatest } from "../../import-employee-history/importEmployeeHistoryThunk"; 
import styles from "../css/home-latest-employee-imports.module.css";
import { useNavigate } from "react-router-dom";
import { NAVIGATION } from "../../../helpers/constants";

const LastEmployeeImports = () => { 
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { importedEmployeesLatest } = useSelector((state: RootState) => state.importEmployeeHistory);

  useEffect(() => {
    const fetchLatestImportEmployeeHistory = async () => {
      try {       
        dispatch(getImportedEmployeeHistoryLatest());  
      } catch (err) {
        setError("Failed to load employee imports.");
      } finally {
        setLoading(false);
      }
    };
    fetchLatestImportEmployeeHistory();
  }, [dispatch]);
 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Latest Employee Imports</h2>
      <table className={styles["employee-import-latest-table"]}>
        <thead>
          <tr>
            <th>Date/Time</th>
            <th>Successful Imports</th>
            <th>Existing Records</th>
            <th>Failed Imports</th>
          </tr>
        </thead>
        <tbody>
          {importedEmployeesLatest.map((imported) => (
            <tr key={imported.id} onClick={() => navigate(NAVIGATION.IMPORT_EMPLOYEES_HISTORY + `/${imported.id}`)}>             
              <td>
                {new Date(imported.date).toLocaleString()}
              </td>
              <td className={styles["employee-import-latest-table-counts"]}>{imported.importedEmployeesCount}</td>
              <td className={styles["employee-import-latest-table-counts"]}>{imported.importedEmployeesExistingCount}</td>
              <td className={styles["employee-import-latest-table-counts"]}>{imported.importedEmployeesErrorsCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LastEmployeeImports;
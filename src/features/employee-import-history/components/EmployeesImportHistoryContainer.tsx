import { useCallback, useEffect, useState } from "react";
import EmployeesImportHistoryToolBar from "./EmployeesImportHistoryToolBar";
import ToastErrors from "../../../components/ErrorToasts";
import { clearImportedEmployeesHistory, clearValidationError, setEmployeeImportHistoryDate, setEmployeeImportId, setImportedEmployeesHistoryPage, setImportedExistingEmployeesHistoryPage } from "../../employee-import-history/employeeImportHistorySlice";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import Pagination from "../../../components/EmployeePagination";
import EmployeesTable from "../../../components/EmployeesTable";
import { AppDispatch, RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { getImportedEmployeeHistory,  getImportedEmployeesHistory, getImportedExistingEmployeesHistory } from "../employeeImportHistoryThunk";
import styles from "../css/Employee-import-history.module.css"; 
import EmployeesImportHistoryExistingEmployeesTable from "./EmployeesImportHistoryExistingEmployeesTable"; 

const EmployeesImportHistoryContainer = () => {

  const pageSize : number = 5;
  const dispatch = useDispatch<AppDispatch>();
  const [showEmployeePopUpForm, setShowEmployeePopUpForm] = useState(false);
  const { importedEmployeesHistory, importedExistingEmployeesHistory, loading, error } = useSelector((state: RootState) => state.employeeImportHistory);
  const [activeTab, setActiveTab] = useState("imported-employees-history");
  
  const [employeeImportHistoryId, setEmployeeImportHistoryId] = useState<string | null>(null); 

  useEffect(() => {
    document.getElementById('import-history')?.focus();
    dispatch(getImportedEmployeeHistory())
  }, [dispatch]);
   
  const handleOnSelectChange = useCallback(
    async (employeeImportHistoryId: string | null, employeeImportHistoryDate: string) => {

      if(employeeImportHistoryId === null) {
        dispatch(clearImportedEmployeesHistory());
      }
      else {
        setEmployeeImportHistoryId(employeeImportHistoryId);
        dispatch(setEmployeeImportId(employeeImportHistoryId));
        dispatch(setEmployeeImportHistoryDate(employeeImportHistoryDate));

        await dispatch(getImportedEmployeesHistory({ id: employeeImportHistoryId, page: 1, pageSize: 5 }));
        await dispatch(getImportedExistingEmployeesHistory({ id: employeeImportHistoryId, page: 1, pageSize: 5 }));
      }

    }, [dispatch]
);
  
  const handlePageChangeIportedEmployees = async (pageNumber: number) => {
    if(employeeImportHistoryId !== null ) { 
      dispatch(setImportedEmployeesHistoryPage(pageNumber));
      await dispatch(getImportedEmployeesHistory({ page: pageNumber, id: employeeImportHistoryId, pageSize: pageSize })); 
    }
  };

  const handlePageChangeImportedExistingEmployees = async (pageNumber: number) => {
    if(employeeImportHistoryId !== null ) { 
      dispatch(setImportedExistingEmployeesHistoryPage(pageNumber)); 
      dispatch(getImportedExistingEmployeesHistory({ id: employeeImportHistoryId, page: pageNumber, pageSize: pageSize }));
    }
  };

  return (   
    <div className="p-4"> 
      <ToastErrors error={error} onClear={() => dispatch(clearValidationError())} /> 
      {loading ? 
        <p>Loading...</p> :        
          <>   
            <EmployeesImportHistoryToolBar onSelectChange={handleOnSelectChange} employeeImportHistoryId={employeeImportHistoryId} />  
            <Tabs className={styles["employee-import-history-tabs"]} value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger className={styles["employee-import-history-tab"]} value="imported-employees-history">Imported Employees</TabsTrigger>
                <TabsTrigger className={styles["employee-import-history-tab"]} value="existing-employees-history">Existing Employees</TabsTrigger>
                <TabsTrigger className={styles["employee-import-history-tab"]} value="failed-employees-history">Failed Imports</TabsTrigger>
              </TabsList>  
              <TabsContent value="imported-employees-history">
                <EmployeesTable setShowEmployeePopUpForm={setShowEmployeePopUpForm} showEmployeePopUpForm={showEmployeePopUpForm} rows={importedEmployeesHistory.employees} />
                <Pagination pagedEmployees={importedEmployeesHistory} onPageChange={handlePageChangeIportedEmployees} title={"Imported Employees"} />
              </TabsContent>
              <TabsContent value="existing-employees-history">
                <EmployeesImportHistoryExistingEmployeesTable rows={importedExistingEmployeesHistory.employees} />
                <Pagination pagedEmployees={importedExistingEmployeesHistory} onPageChange={handlePageChangeImportedExistingEmployees} title={"Imported Existing Employees"} />
              </TabsContent>
              <TabsContent value="failed-employees-history">failed-employees</TabsContent>   
            </Tabs>          
         </> 
      }
      </div>   
  );
};

export default EmployeesImportHistoryContainer;
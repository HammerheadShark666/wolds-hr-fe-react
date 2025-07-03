import { useEffect, useState } from "react";
import EmployeesImportHistoryToolBar from "./EmployeesImportHistoryToolBar";
import ToastErrors from "../../../components/ErrorToasts";
import { clearValidationError, setEmployeeImportId, setImportedEmployeesPage, setImportedExistingEmployeesPage } from "../../employee-import/employeeImportSlice";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import Pagination from "../../../components/Pagination";
import EmployeesTable from "../../../components/EmployeesTable";
import { AppDispatch, RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { getImportedEmployee, getImportedExistingEmployee } from "../../employee-import/employeeImportThunks";
import styles from "../css/Employee-import.module.css"; 

const EmployeesImportHistoryContainer = () => {

  const pageSize : number = 5;
   const dispatch = useDispatch<AppDispatch>();
  const [showEmployeePopUpForm, setShowEmployeePopUpForm] = useState(false);
   
   const { employeeImportId, importedEmployees, importedExistingEmployees, loading, error } = useSelector((state: RootState) => state.employeeImport);
  const [activeTab, setActiveTab] = useState("imported-employees");
  
const [employeeImportHistoryId, setEmployeeImportHistoryId] = useState(0);
const [employeeImportHistoryDate, setEmployeeImportHistoryDate] = useState("");

  useEffect(() => {
    document.getElementById('import-history')?.focus();
  });

   
  const handleOnSelectChange = async (employeeImportHistoryId: number, employeeImportHistoryDate: string) => { 

    setEmployeeImportHistoryDate(employeeImportHistoryDate);
    setEmployeeImportHistoryId(employeeImportHistoryId);
    dispatch(setEmployeeImportId(employeeImportHistoryId));
    
    await dispatch(getImportedEmployee({ id: employeeImportHistoryId, page: 1, pageSize: 5 }));
    await dispatch(getImportedExistingEmployee({ id: employeeImportHistoryId, page: 1, pageSize: 5 }));
  }


  //  const handleSearch = (importDate: string) => { 
  //    if(importDate !== null) {
  //       dispatch(setImportSearchDate(importDate));
  //       if(employeeImportId !== null) {
  //         dispatch(getImportedEmployee({ page: 1, id: employeeImportId, pageSize: pageSize }));
  //         dispatch(getImportedExistingEmployee({ id: employeeImportId, page: 1, pageSize: pageSize }));
  //       } 
  //     } else {
  //       dispatch(clearImportedEmployees());
  //     }
  //   };
  
    const handlePageChangeIportedEmployees = async (pageNumber: number) => {
      dispatch(setImportedEmployeesPage(pageNumber)); 
      if(employeeImportId !== null) {
        await dispatch(getImportedEmployee({ page: pageNumber, id: employeeImportId, pageSize: pageSize })); 
      }
    };
  
    const handlePageChangeImportedExistingEmployees = async (pageNumber: number) => {
      dispatch(setImportedExistingEmployeesPage(pageNumber)); 
      if(employeeImportId !== null) { 
        dispatch(getImportedExistingEmployee({ id: employeeImportId, page: pageNumber, pageSize: pageSize }));
      }
    };

  return (   
    <div className="p-4"> 
      <ToastErrors error={error} onClear={() => dispatch(clearValidationError())} /> 
      {loading ? 
        <p>Loading...</p> :        
          <>         
          <h2>{employeeImportHistoryDate}</h2>
           <EmployeesImportHistoryToolBar onSelectChange={handleOnSelectChange} employeeImportHistoryId={employeeImportHistoryId} />          
            <Tabs className={styles["employee-import-tabs"]} value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger className={styles["employee-import-tab"]} value="imported-employees-history">Imported Employees</TabsTrigger>
                <TabsTrigger className={styles["employee-import-tab"]} value="existing-employees-history">Existing Employees</TabsTrigger>
                <TabsTrigger className={styles["employee-import-tab"]} value="failed-employees-history">Failed Imports</TabsTrigger>
              </TabsList>
              <TabsContent value="imported-employees-history">
                <EmployeesTable setShowEmployeePopUpForm={setShowEmployeePopUpForm} showEmployeePopUpForm={showEmployeePopUpForm} rows={importedEmployees.employees} />
                <Pagination totalPages={importedEmployees.totalPages} totalRecords={importedEmployees.totalEmployees} currentPage={importedEmployees.page} onPageChange={handlePageChangeIportedEmployees} title={"Imported Employees"} />
              </TabsContent>
              <TabsContent value="existing-employees-history">
                <EmployeesTable setShowEmployeePopUpForm={setShowEmployeePopUpForm} showEmployeePopUpForm={showEmployeePopUpForm} rows={importedExistingEmployees.employees} />
                <Pagination totalPages={importedExistingEmployees.totalPages} totalRecords={importedExistingEmployees.totalEmployees} currentPage={importedExistingEmployees.page} onPageChange={handlePageChangeImportedExistingEmployees} title={"Imported Existing Employees"} />
              </TabsContent>
              <TabsContent value="failed-employees-history">failed-employees</TabsContent>   
            </Tabs>          
         </> 
      }
      </div> 
   
  );
};

export default EmployeesImportHistoryContainer;
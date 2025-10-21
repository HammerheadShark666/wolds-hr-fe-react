'use client';

import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import ImportEmployeesHistoryToolBar from "./ImportEmployeesHistoryToolBar";
import ToastErrors from "../../../components/ErrorToasts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import Pagination from "../../../components/EmployeePagination";
import EmployeesTable from "../../../components/EmployeesTable";
import ImportEmployeesHistoryExistingTable from "./ImportEmployeesHistoryExistingTable";
import ImportEmployeesHistoryErrorTable from "./ImportEmployeesHistoryErrorTable"; 
import styles from "../css/Import-employee-history.module.css";
import { AppDispatch, RootState } from "../../../app/store";
import { PAGE_SIZE } from "../../../helpers/constants";
import {
  clearImportedEmployeesHistory,
  clearValidationError,
  setImportEmployeeId,
  setImportedEmployeesHistoryPage,
  setImportedEmployeesExistingHistoryPage,
} from "../importEmployeeHistorySlice";
import {
  getImportedEmployeeHistory,
  getImportedEmployeesHistory,
  getImportedEmployeesErrorHistory,
  getImportedEmployeesExistingHistory,
} from "../importEmployeeHistoryThunk";
import ImportEmployeesErrorPagination from "../../../components/ImportEmployeesErrorPagination";

const ImportEmployeesHistoryContainer = () => {
  
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const initialId = location.state?.id || searchParams.get("id") || "";
  const [importEmployeeHistoryId, setImportEmployeeHistoryId] = useState(initialId);
  const [activeTab, setActiveTab] = useState("imported-employees-history");
  const [showEmployeePopUpForm, setShowEmployeePopUpForm] = useState(false);
  const { id } = useParams<{ id: string }>(); 

  const TABS = { 
    IMPORTED_EMPLOYEES_HISTORY: "imported-employees-history",
    EXISTING_EMPLOYEES_HISTORY: "existing-employees-history",   
    FAILED_EMPLOYEES_HISTORY: "failed-employees-history" 
  } as const

  const {
    importedEmployeesHistory,
    importedEmployeesExistingHistory,
    importedEmployeesErrorHistory,
    loading,
    error,
  } = useSelector((state: RootState) => state.importEmployeeHistory);
  
  useEffect(() => {
  if (id) {
    setImportEmployeeHistoryId(id);
    dispatch(setImportEmployeeId(id));
  }
  }, [id, dispatch]);
 
  useEffect(() => { 
    dispatch(clearImportedEmployeesHistory());
  }, [dispatch, location.pathname]);

  useEffect(() => {
    document.getElementById("import-history")?.focus();
    dispatch(getImportedEmployeeHistory()); 
  }, [dispatch]);
 
  const loadImportHistory = useCallback(
    async (id: string) => {
      if (!id) return dispatch(clearImportedEmployeesHistory());

      setImportEmployeeHistoryId(id);
      dispatch(setImportEmployeeId(id));

      await Promise.all([
        dispatch(getImportedEmployeesHistory({ id, page: 1, pageSize: PAGE_SIZE })),
        dispatch(getImportedEmployeesExistingHistory({ id, page: 1, pageSize: PAGE_SIZE })),
        dispatch(getImportedEmployeesErrorHistory({ id, page: 1, pageSize: PAGE_SIZE })),
      ]);

      setActiveTab(TABS.IMPORTED_EMPLOYEES_HISTORY);
    },
    [TABS.IMPORTED_EMPLOYEES_HISTORY, dispatch]
  );

  useEffect(() => {  
    if (importEmployeeHistoryId) loadImportHistory(importEmployeeHistoryId);
  }, [importEmployeeHistoryId, loadImportHistory]);

  const handleOnSelectChange = useCallback(
    async (id: string) => {
      setImportEmployeeHistoryId(id);
      dispatch(setImportEmployeeId(id));
      await loadImportHistory(id);
    },
    [dispatch, loadImportHistory]
  ); 

  const handlePageChange = (fetchFn: Function, setPageFn: Function) => async (page: number) => {
    if (!importEmployeeHistoryId) return;
    setPageFn(page);
    await dispatch(fetchFn({ id: importEmployeeHistoryId, page, pageSize: PAGE_SIZE }));
  };

  return (
    <div>
      <ToastErrors error={error} onClear={() => dispatch(clearValidationError())} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ImportEmployeesHistoryToolBar onSelectChange={handleOnSelectChange} importEmployeeHistoryId={importEmployeeHistoryId} />

          <Tabs className={styles["employee-import-history-tabs"]} value={activeTab} onValueChange={setActiveTab}>
           
            <TabsList>
              <TabsTrigger className={`${styles.tab} ${activeTab === TABS.IMPORTED_EMPLOYEES_HISTORY ? styles.active : ""}`} value={TABS.IMPORTED_EMPLOYEES_HISTORY} >
                Imported Employees ({importedEmployeesHistory.totalEmployees})
              </TabsTrigger>
              <TabsTrigger className={`${styles.tab} ${activeTab === TABS.EXISTING_EMPLOYEES_HISTORY ? styles.active : ""}`} value={TABS.EXISTING_EMPLOYEES_HISTORY} >
                Existing Employees ({importedEmployeesExistingHistory.totalEmployees})
              </TabsTrigger>
              <TabsTrigger className={`${styles.tab} ${activeTab === TABS.FAILED_EMPLOYEES_HISTORY ? styles.active : ""}`} value={TABS.FAILED_EMPLOYEES_HISTORY}>
                Failed Imports ({importedEmployeesErrorHistory.totalEmployees})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={TABS.IMPORTED_EMPLOYEES_HISTORY}>
              <EmployeesTable
                rows={importedEmployeesHistory.employees}
                showEmployeePopUpForm={showEmployeePopUpForm}
                setShowEmployeePopUpForm={setShowEmployeePopUpForm}
              />
              <Pagination
                pagedEmployees={importedEmployeesHistory}
                onPageChange={handlePageChange(getImportedEmployeesHistory, setImportedEmployeesHistoryPage)}
                title="Imported Employees"
              />
            </TabsContent>

            <TabsContent value={TABS.EXISTING_EMPLOYEES_HISTORY}>
              <ImportEmployeesHistoryExistingTable rows={importedEmployeesExistingHistory.employees} />
              <Pagination
                pagedEmployees={importedEmployeesExistingHistory}
                onPageChange={handlePageChange(getImportedEmployeesExistingHistory, setImportedEmployeesExistingHistoryPage)}
                title="Import Existing Employees"
              />
            </TabsContent>

            <TabsContent value={TABS.FAILED_EMPLOYEES_HISTORY}>
              <ImportEmployeesHistoryErrorTable rows={importedEmployeesErrorHistory.employees} />
              <ImportEmployeesErrorPagination
                pagedEmployees={importedEmployeesErrorHistory}
                onPageChange={handlePageChange(getImportedEmployeesErrorHistory, () => {})}
                title="Import Employees that Errored"
              />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default ImportEmployeesHistoryContainer;
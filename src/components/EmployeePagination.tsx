import { PagedEmployees } from "../types/employeeImported";
import styles from "./css/Pagination.module.css"

type Props = {
  pagedEmployees: PagedEmployees; 
  onPageChange: (page: number) => void;
  title: string;
};
  
const EmployeePagination = ({ pagedEmployees, onPageChange, title }: Props) => {
  
  return (
    <>
      <div className={pagedEmployees.totalPages === 0 ? styles["pagination-container-no-records"] : styles["pagination-container-no-records-hide"]}>
        <span>No {title}</span>
      </div>
      <div className={pagedEmployees.totalPages > 0 ? styles["pagination-container"] : styles["pagination-container-hide"]}>
        <div className={styles["left-group"]}>
          <div className={styles["pages-numbers"]}>
            {Array.from({ length: pagedEmployees.totalPages }, (_, i) => (
              <button className={i+1 === pagedEmployees.page ? styles["button-selected"] : ""} key={i} onClick={() => onPageChange(i + 1)}>{i + 1}</button>
            ))}
          </div>
          <div className={styles["number-of-pages"]}>
            <span >
              Page {pagedEmployees.page} of {pagedEmployees.totalPages}
            </span>
          </div>
        </div>
        <div className={styles["number-of-records"]}>
          <span>
            Total {title}: {pagedEmployees.totalEmployees}
          </span>
        </div>
      </div> 
    </>
  );
};
  
export default EmployeePagination;  
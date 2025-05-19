import styles from "./css/Pagination.module.css"

type Props = {
  totalPages: number;
  totalRecords: number
  currentPage: number;
  onPageChange: (page: number) => void;
  title: string;
};
  
const Pagination = ({ totalPages, currentPage, totalRecords, onPageChange, title }: Props) => {
  
  return (
    <>
      <div className={totalPages === 0 ? styles["pagination-container-no-records"] : styles["pagination-container-no-records-hide"]}>
      <span>No {title}</span>
      </div>
      <div className={totalPages > 0 ? styles["pagination-container"] : styles["pagination-container-hide"]}>
        <div className={styles["left-group"]}>
          <div className={styles["pages-numbers"]}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button className={i+1 === currentPage ? styles["button-selected"] : ""} key={i} onClick={() => onPageChange(i + 1)}>{i + 1}</button>
            ))}
          </div>
          <div className={styles["number-of-pages"]}>
            <span >
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </div>
        <div className={styles["number-of-records"]}>
          <span>
            Total {title}: {totalRecords}
          </span>
        </div>
      </div> 
    </>
  );
};
  
export default Pagination;  
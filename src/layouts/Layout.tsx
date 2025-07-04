import styles from "./css/Layout.module.css";
import { useState } from 'react'; 
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from "./Header";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className={styles["layout"]}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        {/* <Sidebar></Sidebar> */}
      <div className={styles["main-content"]}>
        <Header onHamburgerClick={() => setSidebarOpen(true)} />
        <div className={styles["content"]}>
          <div className={styles["card"]}>    
            <div className={styles["card-content"]}>
              <Outlet /> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
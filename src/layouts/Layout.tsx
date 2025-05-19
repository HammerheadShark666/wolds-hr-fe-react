import Header from './Header';  
import styles from "./css/Layout.module.css";
import Sidebar from "./Sidebar"; 
import { useState } from 'react'; 
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className={styles["layout"]}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
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
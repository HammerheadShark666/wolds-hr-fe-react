import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./css/Sidebar.module.css";

// Import Lucide icons
import { Home, Users, ImportIcon, LogOut, History } from "lucide-react";
import { useAppDispatch } from "../app/hooks";
import { logout } from "../features/authentication/authenticationThunk";
import { clearEmployees } from "../features/employee/employeeListSlice";
import { clearSelectedEmployee } from "../features/employee/employeeSlice";

// Define icon components per menu item
const icons = {
  Home: <Home size={18} />,
  Employees: <Users size={18} />, 
  EmployeesImport: <Users size={18} color="#e4fb00" />,
  ImportIcon: <ImportIcon size={16} />,
  History: <History size={16} />,
  LogOut: <LogOut size={18} />,
};

interface SubMenuItem {
  name: string;
  iconname: keyof typeof icons;
  link: string;
}

interface MenuItem {
  name: string;
  iconname: keyof typeof icons;
  link?: string;
  submenu?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  { name: "Home", iconname: "Home", link: "/" },
  { name: "Employees", iconname: "Employees" , link: "/employees" },
  {
    name: "Employees Import",
    iconname: "EmployeesImport",
    submenu: [
      { name: "Import", iconname: "ImportIcon", link: "/employees-import" },
      { name: "History", iconname: "History", link: "/employees-import-history" },
    ],
  },
  { name: "Logout", iconname: "LogOut", link: "/" },
];

interface IProps {
  isOpen: boolean;
  onClose: () => void;
};


const Sidebar: React.FC<IProps> = ({ isOpen, onClose }) => { 
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
     
  const logoutUser = () => {
    dispatch(logout()); 
    dispatch(clearEmployees());
    dispatch(clearSelectedEmployee());
    
    setTimeout(() => navigate('/login'), 100); 
  };

  return (
    <>
      {isOpen && <div className={styles["overlay"]} onClick={onClose} />} 
      
      {/* <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}> */}
    <div className={styles.sidebar}>
      <ul className={styles.menu}>
        {menuItems.map((item) => (
          <li key={item.name}>
            {item.submenu ? (
              <>
                <button
                  className={styles["menu-btn"]}
                  onClick={() => toggleMenu(item.name)}
                >
                  <span className={styles.icon}>{icons[item.iconname]}</span>
                  {item.name}
                </button>
                {openMenus[item.name] && (
                  <ul className={styles.submenu}>
                    {item.submenu.map((sub) => (
                      <li key={sub.name}>
                        <NavLink
                          to={sub.link}
                          className={({ isActive }) =>
                            isActive
                              ? `${styles["submenu-item"]} ${styles.active}`
                              : styles["submenu-item"]
                          }
                        >
                          <span className={styles.icon}>{icons[sub.iconname]}</span>
                          {sub.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : item.name === "Logout" ? ( 
              <button
                onClick={logoutUser}
                className={styles["menu-link"]}
                type="button"
              >
                <span className={styles.icon}>{icons[item.iconname]}</span>
                {item.name}
              </button>
            ) : (
              <NavLink
                to={item.link!}
                className={({ isActive }) =>
                  isActive
                    ? `${styles["menu-link"]} ${styles.active}`
                    : styles["menu-link"]
                }
              >
                <span className={styles.icon}>{icons[item.iconname]}</span>
                {item.name}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </div>
    {/* </aside>  */}
    </>
  );
};

export default Sidebar;





// import { CircleUserRound, House, LogOut } from "lucide-react"; //BriefcaseBusiness, Calendar1, 
// import React from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import styles from "./css/Sidebar.module.css";  
// import { useAppDispatch } from "../app/hooks";
// import { clearEmployees } from "../features/employee/employeeListSlice";
// import { clearSelectedEmployee } from "../features/employee/employeeSlice";
// import { logout } from "../features/authentication/authenticationThunk";

// interface IProps {
//   isOpen: boolean;
//   onClose: () => void;
// };

// const Sidebar: React.FC<IProps> = ({ isOpen, onClose }) => {

//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
     
//   const logoutUser = () => {
//     dispatch(logout()); 
//     dispatch(clearEmployees());
//     dispatch(clearSelectedEmployee());
    
//     setTimeout(() => navigate('/login'), 100); 
//   };

//   return (
//     <> 
//       {isOpen && <div className={styles["overlay"]} onClick={onClose} />} 
      
//       <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
//         <div className={styles["sidebar-header"]}>
//           <h1 className={styles["title-side-bar"]}>WoldsHR</h1>
//           <button className={styles["close-btn"]} onClick={onClose}>
//             ×
//           </button>
//         </div>
//         <ul className={styles["sidebar-menu"]}>          
//           <li><NavLink to="/" className={({ isActive }) => `${styles["sidebarLink"]} ${isActive ? styles["active"] : ""}`}><House /><span>Home</span></NavLink></li> 
//           <li><NavLink to="/employees" className={({ isActive }) => `${styles["sidebarLink"]} ${isActive ? styles["active"] : ""}`}><CircleUserRound /><span>Employees</span></NavLink></li>  
//           <li><NavLink to="/employees-import" className={({ isActive }) => `${styles["sidebarLink"]} ${isActive ? styles["active"] : ""}`}><CircleUserRound /><span>Employees (Import)</span></NavLink></li>    
//           {/* <li><NavLink to="/employment" className={({ isActive }) => `${styles["sidebarLink"]} ${isActive ? styles["active"] : ""}`}> <Calendar1 /><span>Employment</span></NavLink></li>           
//           <li><NavLink to="/jobs" className={({ isActive }) => `${styles["sidebarLink"]} ${isActive ? styles["active"] : ""}`}> <BriefcaseBusiness /><span>Jobs</span></NavLink></li>    */}
//           <li><NavLink to="#" onClick={logoutUser}><LogOut /><span>Logout</span></NavLink></li>
//         </ul>
//       </aside>
//     </>
//   );
// };

// export default Sidebar; 
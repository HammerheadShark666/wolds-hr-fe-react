import React from 'react';
import LastEmployeeImports from '../components/LatestEmployeeImports';
import HomeToolBar from '../components/HomeToolbar';
import styles from '../css/home.module.css';

const Home: React.FC = () => {
    return  ( 
      <>
        <HomeToolBar></HomeToolBar>
        <div className={styles["home-container"]}>
          <LastEmployeeImports></LastEmployeeImports> 
        </div>         
      </>
  )
};

export default Home;
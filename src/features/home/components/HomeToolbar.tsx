import globals from "../../../components/css/Toolbar.module.css"

const HomeToolBar = () => {
 
  return ( 
    <div className={globals["toolbar"]}> 
      <div className={globals["toolbar-title"]}> 
        <span>Home</span>
        </div> 
    </div>  
  );
};

export default HomeToolBar;
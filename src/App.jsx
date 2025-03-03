import { useState } from "react";

import "./App.css";
import Menu from "./container/menu";

function App() {
  const [menuAllDash, setMenuAllDash] = useState(true);
 

  return (
    <>
      <main>
        <section className={(menuAllDash ? 'dashboard_menu_large' : 'dashboard_menu_cort') + ' dashboard_menu '}>
          <div className={(menuAllDash ? 'dashboard_controler_large' : 'dashboard_controler_cort') + ' dashboard_controler'} onClick={() => {setMenuAllDash(!menuAllDash)}}>
          
          </div>
          <Menu 
          menuAllDash={menuAllDash}></Menu> 
        </section >

        <section className={(menuAllDash ? 'panel_cort' : 'panel_all') + ' panel '}>

          <p>En Construcción</p>
        </section>
      </main>
    </>
  );
}

export default App;

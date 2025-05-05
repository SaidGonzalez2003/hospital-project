import { useState } from "react";

import "./App.css";
import Menu from "./container/menu";
import ControlPageOne from "./container/control/ControlPageOne";
import CitasContainer from "./container/citas/CitasContainer";

function Dashboard() {
  const [menuAllDash, setMenuAllDash] = useState(true);
  const [page, setPage] = useState(0);

  // Retorna la pagina

  const renderizarSeccion = () => {
    switch (page) {
      case 0:
        return <ControlPageOne></ControlPageOne>;
      case 1:
        return <div>Esta es la sección Acerca de.</div>;
      case 2:
        return <CitasContainer/>;
      default:
        return <div>Sección no encontrada.</div>;
    }
  };

  return (
    <>
      <main>
        <section className={(menuAllDash ? 'dashboard_menu_large' : 'dashboard_menu_cort') + ' dashboard_menu '}>
          <div className={(menuAllDash ? 'dashboard_controler_large' : 'dashboard_controler_cort') + ' dashboard_controler'} onClick={() => {setMenuAllDash(!menuAllDash)}}>
          
          </div>
          <Menu 
          menuAllDash={menuAllDash}
          page={page}
          setPage={setPage}></Menu> 
        </section >

        <section className={(menuAllDash ? 'panel_cort' : 'panel_all') + ' panel '}>

          <div className="panel_container">
            {renderizarSeccion()}
          </div>
        </section>
      </main>
    </>
  );
}

export default Dashboard;

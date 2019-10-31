//asset level imports
import "../sass/main.scss";
import ComponentMaster from "./components/index";
import CentralEvents from "./events/central";
import CrudEvents from "./events/crud";

class MainApp {
  start() {
    [
      (this.compMaster = new ComponentMaster()),
      (this.centralEvents = new CentralEvents()),
      (this.crudEvents = new CrudEvents())
    ].forEach(instance => {
      instance.init();
    });
  }
}

//intialize application
const appInstance = new MainApp();
appInstance.start();

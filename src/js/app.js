//asset level imports
import "../sass/main.scss";
import ComponentMaster from "./components/index";
import CentralEvents from "./events/index";

class MainApp {
  start() {
    [
      (this.compMaster = new ComponentMaster()),
      (this.centralEvents = new CentralEvents())
    ].forEach(instance => {
      instance.init();
    });
  }
}

//intialize application
const appInstance = new MainApp();
appInstance.start();

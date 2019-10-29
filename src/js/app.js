//asset level imports
import "../sass/main.scss"
import ComponentMaster from './components/index'

class MainApp {
  start() {
    this.compMaster = new ComponentMaster;
    this.compMaster.init();
  }
}

//intialize application
const appInstance = new MainApp;
appInstance.start();



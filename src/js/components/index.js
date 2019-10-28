//import each component

import SiteNavi from './siteNavi'


class ComponentMaster {

  init() {

    //initialize each class of components
    [
      this.SiteNavi = new SiteNavi
    ].forEach((comp) => {
      comp.init()
    })

  }

}

export default ComponentMaster;
//import each component

import SiteNavi from "./siteNavi";
import RecipeList from "./recipeList";

class ComponentMaster {
  init() {
    //initialize each class of components
    [
      (this.SiteNavi = new SiteNavi()),
      (this.RecipeList = new RecipeList())
    ].forEach(comp => {
      comp.init();
    });
  }
}

export default ComponentMaster;

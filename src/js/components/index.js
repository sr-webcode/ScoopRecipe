//import each component

import SiteNavi from "./siteNavi";
import RecipeList from "./recipeList";
import RecipeManage from './recipeManage'


class ComponentMaster {
  init() {
    //initialize each class of components
    [
      this.siteNavi = new SiteNavi,
      this.recipeList = new RecipeList,
      this.RecipeManage = new RecipeManage
    ].forEach((instance) => {
      instance.init()
    })
  }
}

export default ComponentMaster;

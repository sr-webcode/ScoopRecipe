//import each component

import RecipeList from "./recipeList";
import RecipeManage from "./recipeManage";

class ComponentMaster {
  init() {
    //initialize each class of components
    [
      (this.recipeList = new RecipeList()),
      (this.RecipeManage = new RecipeManage())
    ].forEach(instance => {
      instance.init();
    });
  }
}

export default ComponentMaster;

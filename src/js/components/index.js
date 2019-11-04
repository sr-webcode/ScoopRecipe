import RecipeList from "./recipeList";
import RecipeManage from "./recipeManage";
import RecipeModal from "./recipeModal";
import RecordTemplate from "./recordTempate";

class ComponentMaster {
  init() {
    [
      (this.recipeList = new RecipeList()),
      (this.recipeManage = new RecipeManage()),
      (this.recipeModal = new RecipeModal()),
      (this.recordTempalte = new RecordTemplate())
    ].forEach(instance => {
      instance.init();
    });
  }
}

export default ComponentMaster;

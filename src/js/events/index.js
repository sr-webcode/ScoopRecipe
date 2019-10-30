import RecipeList from "../components/recipeList";
import RecipeManage from "../components/recipeManage";
import RecipeProfile from "../components/recipeProfile";

class CentralEvents {
  constructor() {
    //bind nested events
    this.toggleViews = this.toggleViews.bind(this);
    this.viewRecipeProfile = this.viewRecipeProfile.bind(this);
  }

  init() {
    this.domCache();
    this.setComponentInstances();
    this.setEvents();
  }

  domCache() {
    this.siteNav = document.querySelectorAll("[data-nav-role]");
    this.recipeListing = document.querySelector(".recipe-listing > .container");
    this.recipeProfile = document.querySelector(".recipe-profile > .container");
    this.recipeManage = document.querySelector(".recipe-manage");
  }

  setComponentInstances() {
    this.recipeList = new RecipeList();
    this.recipeManage = new RecipeManage();
    this.recipeProfile = new RecipeProfile();
  }

  setEvents() {
    //header navigation
    this.siteNav.forEach(nav => {
      nav.addEventListener("click", this.toggleViews);
    });

    //recipe profile selection
    this.recipeListing.addEventListener("click", this.viewRecipeProfile);
  }

  //specific events
  toggleViews(e) {
    e.preventDefault();
    const target = e.target.getAttribute("data-nav-role");
    this.resetViews();
    switch (target) {
      case "recipe":
        this.recipeList.show();
        break;
      case "manage":
        this.recipeManage.show();
        break;
      default:
        console.log(`someting went wrong`);
    }
  }
  resetViews() {
    this.recipeList.hide();
    this.recipeManage.hide();
    this.recipeProfile.hide();
  }

  viewRecipeProfile(e) {
    this.resetViews();
    const target = e.target.closest(".recipe-card");
    const id = target.getAttribute("data-id");
    this.recipeProfile.show(id);
  }
}

export default CentralEvents;

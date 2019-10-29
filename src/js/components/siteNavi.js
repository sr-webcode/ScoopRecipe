import RecipeList from './recipeList'

class SiteNaviActions {
  constructor() {
    this.recipeList = new RecipeList;
    this.evtComponentDisplay = this.evtComponentDisplay.bind(this)
  }

  init() {
    this.domCache();
    this.assignEvents();
  }

  domCache() {
    this.naviButtons = document.querySelectorAll(".site-nav-act");
    this.naviBurger = document.querySelector('.burger')
  }

  assignEvents() {
    this.naviButtons.forEach(btn => {
      btn.addEventListener("click", this.evtComponentDisplay);
    });
  }

  evtComponentDisplay(e) {
    const target = e.target.getAttribute('data-nav-role');
    switch (target) {
      case "recipe":
        this.recipeList.show();
        break;
      case "specials":
        this.recipeList.hide();
        break;
    }
  }
}

export default SiteNaviActions;

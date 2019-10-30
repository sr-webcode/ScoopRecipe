import RecipeList from "../components/recipeList";
import RecipeManage from "../components/recipeManage";
import RecipeProfile from "../components/recipeProfile";

class CentralEvents {
  constructor() {
    //bind nested events
    this.toggleViews = this.toggleViews.bind(this);
    this.viewRecipeProfile = this.viewRecipeProfile.bind(this);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this)
    this.searchRecipe = this.searchRecipe.bind(this)
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
    this.burger = document.querySelector('.burger');
    this.mobileMenu = document.querySelector('.mobile-menu');
    this.closeMobilebutton = document.querySelector('.close-btn');
    this.btnSearch = document.querySelector('#btnSearch');
    this.txtSearch = document.querySelector('#txtSearch');
    this.recipeSearch = document.querySelector('.recipe-search');
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

    //burger menu
    this.burger.addEventListener('click', this.toggleMobileMenu)

    //mobile close btn
    this.closeMobilebutton.addEventListener('click', this.toggleMobileMenu)

    //search event 
    this.btnSearch.addEventListener('click', this.searchRecipe)

  }

  //specific events
  toggleViews(e) {
    this.mobileMenu.classList.remove('slide-mobile');

    e.preventDefault();
    const target = e.target.getAttribute("data-nav-role");
    this.resetViews();
    this.txtSearch.value = "";


    switch (target) {
      case "recipe":
        //enable search
        this.recipeSearch.style.setProperty('display', 'block')
        this.recipeList.show();
        break;
      case "manage":
        //hide general search
        this.recipeSearch.style.setProperty('display', 'none')
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
    const target = e.target.closest('.recipe-card')
    if (target) {
      this.resetViews();
      const id = target.getAttribute("data-id");
      this.recipeProfile.show(id);
    }
  }
  toggleMobileMenu() {
    this.mobileMenu.classList.toggle('slide-mobile');
  }

  searchRecipe() {
    const value = this.txtSearch.value;
    if (!value.trim()) return;

    //search specific
    this.recipeProfile.hide();
    this.recipeList.show(value)

  }
}

export default CentralEvents;

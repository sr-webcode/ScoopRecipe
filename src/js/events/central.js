import RecipeList from "../components/recipeList";
import RecipeManage from "../components/recipeManage";
import RecipeProfile from "../components/recipeProfile";
import RecipeModal from "../components/recipeModal";
import RecordTemplate from "../components/recordTempate";
import CrudEvent from "./crud";

class CentralEvents {
  constructor() {
    //declare initial constructor || data
    this.modalStatus = false;

    //bind nested events
    this.toggleViews = this.toggleViews.bind(this);
    this.viewRecipeProfile = this.viewRecipeProfile.bind(this);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.searchRecipe = this.searchRecipe.bind(this);
    this.menuControls = this.menuControls.bind(this);
    this.toggleTempViews = this.toggleTempViews.bind(this);

    this.modalResponse = this.modalResponse.bind(this);
    this.modalCurrentAction = null;
    this.modalCurrentRecord = null;
    this.modalCategory = null;
    this.resetTempViews = this.resetTempViews.bind(this);
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
    this.burger = document.querySelector(".burger");
    this.mobileMenu = document.querySelector(".mobile-menu");
    this.closeMobilebutton = document.querySelector(".close-btn");
    this.btnSearch = document.querySelector("#btnSearch");
    this.txtSearch = document.querySelector("#txtSearch");
    this.recipeSearch = document.querySelector(".recipe-search");
    this.recipeManageMenu = document.querySelector(
      ".recipe-manage > .container"
    );
    this.modalActions = document.querySelectorAll(".recipe-modal-act");
    this.recordTemplateControl = document.querySelector(".template-controls");
    this.tempViews = document.querySelectorAll("div[data-temp-role]");
    this.tempBackBtn = document.querySelector('span[data-out-role="back"]');
    this.tempCrudBtn = document.querySelector("span[data-crud-role]");
    this.tempViewName = document.querySelector(".record-template-name");
    this.crudAddOrUpdate = this.crudAddOrUpdate.bind(this);
  }

  setComponentInstances() {
    this.recipeList = new RecipeList();
    this.recipeManage = new RecipeManage();
    this.recipeProfile = new RecipeProfile();
    this.recipeModal = new RecipeModal();
    this.recordTemplate = new RecordTemplate();
    this.crudEvent = new CrudEvent();
  }

  setEvents() {
    //header navigation
    this.siteNav.forEach(nav => {
      nav.addEventListener("click", this.toggleViews);
    });

    //recipe profile selection
    this.recipeListing.addEventListener("click", this.viewRecipeProfile);

    //burger menu
    this.burger.addEventListener("click", this.toggleMobileMenu);

    //mobile close btn
    this.closeMobilebutton.addEventListener("click", this.toggleMobileMenu);

    //search event
    this.btnSearch.addEventListener("click", this.searchRecipe);

    //managing recipes
    this.recipeManageMenu.addEventListener("click", this.menuControls);

    //modal responses
    this.modalActions.forEach(modal => {
      modal.addEventListener("click", this.modalResponse);
    });

    //template controls for add and edit for temp views
    this.recordTemplateControl.addEventListener("click", this.toggleTempViews);

    //back btn
    this.tempBackBtn.addEventListener("click", () => {
      this.resetTempViews();
      this.resetViews();
      this.recipeManage.show();
    });

    //crud button on update and add
    this.tempCrudBtn.addEventListener("click", this.crudAddOrUpdate);
  }

  //specific events
  toggleViews(e) {
    this.mobileMenu.classList.remove("slide-mobile");

    e.preventDefault();
    const target = e.target.getAttribute("data-nav-role");
    this.resetViews();
    this.txtSearch.value = "";

    switch (target) {
      case "recipe":
        //enable search
        this.recipeSearch.style.setProperty("display", "block");
        this.recipeList.show();
        break;
      case "manage":
        //hide general search
        this.recipeSearch.style.setProperty("display", "none");
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
    this.recordTemplate.hide();
  }

  viewRecipeProfile(e) {
    const target = e.target.closest(".recipe-card");
    if (target) {
      this.resetViews();
      const id = target.getAttribute("data-id");
      this.recipeProfile.show(id);
    }
  }

  toggleMobileMenu() {
    this.mobileMenu.classList.toggle("slide-mobile");
  }

  searchRecipe() {
    const value = this.txtSearch.value;
    if (!value.trim()) return;

    //search specific
    this.recipeProfile.hide();
    this.recipeList.show(value);
  }

  modalResponse(e) {
    // console.log(this.modalCurrentRecord, this.modalCurrentAction);
    const response = e.currentTarget.textContent.toLowerCase();

    switch (response) {
      case "yes":
        //get instance of crud events
 

        this.crudEvent.init(
          this.modalCurrentAction,
          this.modalCurrentRecord,
          this.modalCategory
        );
        this.recipeModal.hide();

        break;
      case "no":
        this.recipeModal.hide();
        break;
      default:
        console.log(`something went wrong`);
    }
  }

  menuControls(e) {
    const targetElem = e.target,
      baseParent = targetElem.parentElement.parentElement,
      id = baseParent.getAttribute("data-id"),
      title = baseParent.getAttribute("data-title"),
      category = baseParent.getAttribute("data-category"),
      target = targetElem.getAttribute("data-role");

    switch (target) {
      case "patch":
        this.resetViews();

        this.modalCurrentAction = target;
        this.modalCurrentRecord = id;
        this.modalCategory = category;

        this.recordTemplate.show(
          this.modalCurrentRecord,
          this.modalCurrentAction
        );

        this.tempViewName.textContent = title;
        this.tempCrudBtn.setAttribute("data-crud-role", "patch");
        this.tempCrudBtn.textContent = "Update";

        break;

      case "delete":
        this.recipeModal.show(target, title);
        this.modalCurrentAction = target;
        this.modalCurrentRecord = id;
        this.modalCategory = category;

        break;
      default:
        return;
    }
  }

  resetTempViews() {
    this.tempViews.forEach(view => {
      view.style.setProperty("display", "none");
    });
  }

  toggleTempViews(e) {
    const role = e.target.getAttribute("data-temp-role");
    if (role) {
      this.resetTempViews();

      const currentTempView = document.querySelector(
        `div[data-temp-role='${role}']`
      );
      currentTempView.style.setProperty("display", "block");
    }
  }

  crudAddOrUpdate(e) {


    this.crudEvent.init(
      this.modalCurrentAction,
      this.modalCurrentRecord,
      this.modalCategory
    );
  }
}

export default CentralEvents;

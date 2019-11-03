import RecipeList from "../components/recipeList";
import RecipeManage from "../components/recipeManage";
import RecipeProfile from "../components/recipeProfile";
import RecipeModal from "../components/recipeModal";
import RecordTemplate from "../components/recordTempate";
import CrudEvent from "./crud";

class CentralEvents {
  constructor() {
    this.modalStatus = false;
    this.toggleViews = this.toggleViews.bind(this);
    this.viewRecipeProfile = this.viewRecipeProfile.bind(this);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.searchRecipe = this.searchRecipe.bind(this);
    this.menuControls = this.menuControls.bind(this);
    this.toggleTempViews = this.toggleTempViews.bind(this);
    this.ingRowsAdd = this.ingRowsAdd.bind(this);
    this.stepRowsAdd = this.stepRowsAdd.bind(this)
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
    this.recipeManageMenu = document.querySelector(".recipe-manage > .container");
    this.modalActions = document.querySelectorAll(".recipe-modal-act");
    this.recordTemplateControl = document.querySelector(".template-controls");
    this.tempViews = document.querySelectorAll("div[data-temp-role]");
    this.tempBackBtn = document.querySelector('span[data-out-role="back"]');
    this.tempCrudBtn = document.querySelector("span[data-crud-role]");
    this.tempViewName = document.querySelector(".record-template-name");
    this.crudAddOrUpdate = this.crudAddOrUpdate.bind(this);
    this.addIngredientRow = document.querySelector('div[data-temp-role="ing"]');
    this.addStepsRow = document.querySelector('div[data-temp-role="steps"]');

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

    //rows add
    this.addIngredientRow.addEventListener('click', this.ingRowsAdd);
    this.addStepsRow.addEventListener('click', this.stepRowsAdd);
  }

  // --------------------------------------------------specific events
  toggleViews(e) {
    this.mobileMenu.classList.remove("slide-mobile");
    e.preventDefault();
    const target = e.target.getAttribute("data-nav-role");
    this.resetViews();
    this.txtSearch.value = "";

    switch (target) {
      case "recipe":
        this.recipeSearch.style.setProperty("display", "block");
        this.resetViews();
        this.resetTempViews();
        this.recipeList.show();
        break;
      case "manage":

        this.recipeSearch.style.setProperty("display", "none");
        this.resetViews();
        this.resetTempViews();
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
    this.recipeProfile.hide();
    this.recipeList.show(value);
  }

  modalResponse(e) {
    const response = e.currentTarget.textContent.toLowerCase();
    switch (response) {
      case "yes":
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

      case "post":
        this.resetViews();
        this.modalCurrentAction = target;
        this.tempViewName.textContent = "New Record";
        this.tempCrudBtn.setAttribute("data-crud-role", "post");
        this.tempCrudBtn.textContent = "Add";

        this.recordTemplate.show(
          "0",
          this.modalCurrentAction
        );
        break;

      case "patch":
        this.resetViews();
        this.modalCurrentAction = target;
        this.modalCurrentRecord = id;
        this.modalCategory = category;
        this.tempViewName.textContent = title;
        this.tempCrudBtn.setAttribute("data-crud-role", "patch");
        this.tempCrudBtn.textContent = "Update";

        this.recordTemplate.show(
          this.modalCurrentRecord,
          this.modalCurrentAction
        );
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
    //we can validate fields here , before showing modal
    this.recipeModal.show(this.modalCurrentAction, false);
  }

  ingRowsAdd(e) {
    const spanTarget = e.target.getAttribute('data-role');
    if (spanTarget) {
      const listMaster = e.target.parentElement.querySelector('.record-temp-master'),
        inputList = document.createElement("li"),
        inputText = document.createElement("input"),
        inputAmt = document.createElement("input"),
        inputMeasure = document.createElement("input");

      switch (spanTarget) {
        case "newrow":
          inputText.setAttribute("type", "text");
          inputAmt.setAttribute("type", "number");
          inputMeasure.setAttribute("type", "text");
          inputText.setAttribute("name", "name");
          inputAmt.setAttribute("name", "amount");
          inputMeasure.setAttribute("name", "measurement");
          inputText.placeholder = "ingredient name...";
          inputAmt.value = 0;
          inputMeasure.placeholder = "ingredient measure...";
          [inputText, inputAmt, inputMeasure].forEach(child => {
            child.classList.add("record-temp-field");
            inputList.appendChild(child);
          });
          listMaster.appendChild(inputList);
          break;
        case "delrow":
          const listItems = listMaster.querySelectorAll('li');
          const lastItem = listMaster.querySelector('li:last-child');
          if (listItems.length < 2) {
            //return modal for not removing last record
            return;
          }
          listMaster.removeChild(lastItem);
          break;
        default:
          return
      }
    }
  }

  stepRowsAdd(e) {

    const spanTarget = e.target.getAttribute('data-role');

    const listMaster = e.target.parentElement.querySelector('.record-temp-master'),
      insList = document.createElement("li"),
      insText = document.createElement("input"),
      insOptional = document.createElement("select"),
      isTrue = document.createElement("option"),
      isFalse = document.createElement("option");

    if (spanTarget) {

      switch (spanTarget) {
        case "newrow":
          insText.classList.add("record-temp-field");
          insOptional.classList.add("record-temp-field");
          insText.setAttribute("type", "text");
          insText.setAttribute("name", "instructions");
          insOptional.setAttribute("name", "optional");
          isTrue.textContent = "true";
          isFalse.textContent = "false";
          [isTrue, isFalse].forEach(elem => {
            insOptional.appendChild(elem);
          });
          insText.placeholder = "type specific instructions...."
          insOptional.selectedIndex = 1;
          [insText, insOptional].forEach(elem => {
            insList.appendChild(elem);
          });
          listMaster.appendChild(insList);
          break;
        case "delrow":
          const listItems = listMaster.querySelectorAll('li');
          const lastItem = listMaster.querySelector('li:last-child');
          if (listItems.length < 2) {
            //return modal for not removing last record
            return;
          }
          listMaster.removeChild(lastItem)
          break;
        default:
          return
      }


    }
  }
}

export default CentralEvents;

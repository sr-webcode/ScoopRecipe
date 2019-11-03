class RecipeModal {

  constructor() {
    this.domCache();
  }

  domCache() {
    this.modalContainer = document.querySelector(".recipe-overlay");
    this.modalText = document.querySelector(".recipe-modal-text");
    this.fontAwesome = document.querySelector('#custom-faw');
  }

  init() {
    this.hide();
  }

  hide() {
    this.modalContainer.style.setProperty("display", "none");
  }

  show(target, title) {
    switch (target) {
      case "post":
        this.modalText.textContent = `Appending new record to the database, are you satisfied with the current inputs?`;
        this.fontAwesome.className = 'fas fa-clipboard-check';
        break;
      case "patch":
        this.modalText.textContent = `Updating record to the database, are you satisfied with your current inputs?`;
        this.fontAwesome.className = 'fas fa-edit';
        break;
      case "delete":
        this.modalText.textContent = `Are you sure you want to delete ${title}?`;
        this.fontAwesome.className = 'fas fa-trash-alt';
        break;
      default:
        console.log(`something went wrong`);
        return;
    }
    this.modalContainer.style.setProperty("display", "flex");
  }


}

export default RecipeModal;

class RecipeModal {
    
  constructor() {
    this.domCache();
  }

  domCache() {
    this.modalContainer = document.querySelector(".recipe-overlay");
    this.modalText = document.querySelector(".recipe-modal-text");
  }

  init() {
    this.hide();
  }

  hide() {
    this.modalContainer.style.setProperty("display", "none");
  }

  show(target, title) {
    switch (target) {
      case "edit":
        break;
      case "delete":
        this.modalText.textContent = `Delete record of ${title}?`;
        break;

      default:
        console.log(`something went wrong`);
        return;
    }

    this.modalContainer.style.setProperty("display", "flex");
  }
}

export default RecipeModal;

import RecipeCard from "./recipeCard";

class RecipeList {
  init() {
    this.domCache();
    this.getRecipeList();
  }

  domCache() {
    this.recipeListing = document.querySelector(".recipe-listing");
    this.recipeListingContainer = document.querySelector(
      ".recipe-listing > .container"
    );
  }

  getRecipeList() {
    ///show the component then call the listing api
    this.show();
    this.recipeListingContainer.innerHTML = "<span class='loader'></span>";
    const listRequest = new Request("http://localhost:3001/recipes", {
      method: "GET",
      mode: "cors"
    });

    fetch(listRequest)
      .then(result => {
        this.recipeListingContainer.innerHTML = "";
        return result.json();
      })
      .then(data => {
        this.extractList(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  extractList(data) {
    const docuFrag = document.createDocumentFragment();

    data
      .map(record => {
        return {
          image: record.images.medium,
          title: record.title,
          description: record.description,
         id: record.uuid
        };
      })
      .forEach(data => {
        this.card = new RecipeCard(
          data.image,
          data.title,
          data.description,       
          data.id
        );
        return docuFrag.appendChild(this.card.createCard());
      });
    this.recipeListingContainer.appendChild(docuFrag);
  }

  //reserve for general events
  hide() {
    this.recipeListing.style.setProperty("display", "none");
  }
  show() {
    this.recipeListing.style.setProperty("display", "block");
  }
}

export default RecipeList;

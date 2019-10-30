import RecipeCard from "./recipeCard";

class RecipeList {
  constructor() {
    this.domCache();
  }
  init() {
    this.show()
  }

  domCache() {
    this.recipeListing = document.querySelector(".recipe-listing");
    this.recipeListingContainer = document.querySelector(
      ".recipe-listing > .container"
    );
  }

  getRecipeList(title) {

    ///show the component then call the listing api
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

        //no search params
        if (!title) return this.extractList(data);

        //search by title
        const filterData = data.filter((recipe) => {
          return recipe.title.toLowerCase().indexOf(title) != -1;
        })

        if (filterData.length > 0) return this.extractList(filterData)

        //literally no match
        this.recipeListingContainer.textContent = "the search yielded no results..."

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
  show(val = false) {
    this.recipeListing.style.setProperty("display", "block");
    this.getRecipeList(val);
  }
}

export default RecipeList;

import RecipeSpecials from "./recipeSpecials";

class RecipeProfile {
  constructor() {
    this.domCache();
    this.renderProfile = this.renderProfile.bind(this);
    this.recipeSpecials = new RecipeSpecials();
    this.specialsList = null;
  }

  domCache() {
    this.recipeProfile = document.querySelector(".recipe-profile");
    this.recipeProfileWrapper = document.querySelector(
      ".recipe-profile-wrapper"
    );
  }

  requestProfile(id) {
    const uri = "http://localhost:3001/recipes";
    const detailsRequest = new Request(uri, {
      method: "GET",
      mode: "cors"
    });

    fetch(detailsRequest)
      .then(res => {
        return res.json();
      })
      .then(data => {
        const match = data.filter(record => {
          return record.uuid === id;
        });
        this.renderProfile(match);
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderProfile(record) {
    const { images } = record[0];
    const docuFrag = document.createDocumentFragment(),
      profileImage = document.createElement("div");

    //separate extraction for caption data
    const profileCaption = this.extractInsRecipe(record);

    //set specific class names
    profileImage.classList.add("recipe-profile-image");

    //set data
    profileImage.style.setProperty("background-image", `url(${images.full})`);

    //append all to document fragment
    [profileImage, profileCaption].forEach(child => {
      docuFrag.appendChild(child);
    });

    this.recipeProfileWrapper.appendChild(docuFrag);
  }

  extractInsRecipe(data) {
    const { title, description, ingredients } = data[0];
    const docuFrag = document.createDocumentFragment(),
      caption = document.createElement("div"),
      recipeTitle = document.createElement("h1"),
      recipeIngridTitle = document.createElement("h4"),
      recipeIngredientMaster = document.createElement("ul"),
      recipeDesc = document.createElement("p");

    //set class names
    caption.classList.add("recipe-profile-caption");
    recipeIngredientMaster.classList.add("recipe-profile-ingredients");

    //set data
    recipeTitle.textContent = title;
    recipeDesc.textContent = description;
    recipeIngridTitle.textContent = "Ingredients:";

    //to be used later for adding specials tag

    ///continue working here to get specials match

    ingredients.forEach(ingredient => {
      const item = document.createElement("li");
      const { uuid, amount, measurement, name } = ingredient;
      item.textContent = `${amount ? amount : ""} ${
        measurement ? measurement : "-"
      } ${name}`;
      recipeIngredientMaster.appendChild(item);
    });

    //append each child to parent
    [
      recipeTitle,
      recipeDesc,
      recipeIngridTitle,
      recipeIngredientMaster
    ].forEach(child => {
      docuFrag.appendChild(child);
    });

    caption.appendChild(docuFrag);
    return caption;
  }

  show(id) {
    //load recipe specials first
    this.recipeSpecials
      .checkSpecials()
      .then(list => {
        this.specialsList = list;
        //proceed rendering
        this.resetProfile();
        this.recipeProfile.style.setProperty("display", "block");
        this.requestProfile(id);
      })
      .catch(err => console.log(err));
  }

  hide() {
    this.recipeProfile.style.setProperty("display", "none");
  }

  resetProfile() {
    this.recipeProfileWrapper.innerHTML = "";
  }
}

export default RecipeProfile;

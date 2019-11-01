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

    const { title, description, ingredients, directions, cookTime, prepTime, servings } = data[0];

    const docuFrag = document.createDocumentFragment(),
      caption = document.createElement("div"),
      recipeTitle = document.createElement("h1"),
      recipeIngridTitle = document.createElement("h4"),
      recipeIngredientMaster = document.createElement("ul"),
      recipeDesc = document.createElement("p"),
      recipeStepsTitle = document.createElement('h4'),
      recipeSteps = document.createElement('ul'),
      cookTimeInfo = document.createElement('p'),
      prepTimeInfo = document.createElement('p'),
      serveInfo = document.createElement('p'),
      tatBox = document.createElement('div');



    //set class names
    caption.classList.add("recipe-profile-caption");
    recipeIngredientMaster.classList.add("recipe-profile-ingredients");
    recipeSteps.classList.add('recipe-profile-steps');
    recipeIngridTitle.classList.add('recipe-marker');
    recipeStepsTitle.classList.add('recipe-marker');
    cookTimeInfo.textContent = `Cook time: ${cookTime} minutes`;
    prepTimeInfo.textContent = `Preparation time: ${prepTime} minutes`;
    serveInfo.textContent = `Servings: ${servings}`;
    tatBox.classList.add('recipe-tat-box');


    //set data for elems
    recipeTitle.textContent = title;
    recipeDesc.textContent = description;
    recipeIngridTitle.textContent = "Ingredients:";
    recipeStepsTitle.textContent = "Instructions:"


    //iterate through igredients
    ingredients.forEach(ingredient => {
      const item = document.createElement("li");
      const { uuid, amount, measurement, name } = ingredient;
      const matchList = this.specialsList.filter((item) => {
        return item.ingredientId === uuid;
      })

      if (matchList.length > 0) {
        const specialsTag = document.createElement('ul');
        specialsTag.classList.add('recipe-promo-code');

        const { type, title, text } = matchList[0];
        [title, type, text].forEach((promo) => {
          const promoLi = document.createElement('li');
          promoLi.innerHTML = promo;
          specialsTag.appendChild(promoLi);
        })

        item.textContent = `${amount ? amount : ""} ${
          measurement ? measurement : "-"} ${name}`;

        item.appendChild(specialsTag);

      } else {
        item.textContent = `${amount ? amount : ""} ${
          measurement ? measurement : "-"
          } ${name}`;
      }

      recipeIngredientMaster.appendChild(item);
    });

    //iterate through steps
    directions.forEach((step) => {
      const { instructions, optional } = step;
      const li = document.createElement('li');
      if (optional) {
        li.textContent = instructions + '(optional)';
        recipeSteps.appendChild(li)
        return;
      }
      li.textContent = instructions;
      recipeSteps.appendChild(li)
    });


    //append tat box items
    [prepTimeInfo, cookTimeInfo, serveInfo].forEach((child) => {
      tatBox.appendChild(child);
    });

    //append each child to parent
    [
      recipeTitle,
      recipeDesc,
      tatBox,
      recipeIngridTitle,
      recipeIngredientMaster,
      recipeStepsTitle,
      recipeSteps
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

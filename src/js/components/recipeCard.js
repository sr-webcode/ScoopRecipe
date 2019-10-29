class RecipeCard {
  constructor(image, title, description, prepTime, cookTime, servings, id) {
    this.title = title;
    this.description = description;
    this.prepTime = prepTime;
    this.cookTime = cookTime;
    this.servings = servings;
    this.image = image;
    this.id = id;
  }

  createCard() {
    //create element

    const card = document.createElement("div"),
      caption = document.createElement("div"),
      cardImage = document.createElement("div"),
      title = document.createElement("h3"),
      description = document.createElement("p");

    //set styles
    card.classList.add("recipe-card");
    cardImage.classList.add("recipe-card-image");
    caption.classList.add("recipe-card-caption");

    //set data
    cardImage.style.setProperty("background-image", `url(${this.image})`);
    title.textContent = this.title;
    description.textContent = this.description;

    [title, description].forEach(child => {
      caption.appendChild(child);
    });

    [cardImage, caption].forEach(child => {
      card.appendChild(child);
    });

    return card;
  }
}

export default RecipeCard;

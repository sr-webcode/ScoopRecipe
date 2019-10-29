import RecipeProfile from './recipeProfile'

class RecipeCard {

  constructor(image, title, description, id) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.id = id;
  }

  showProfile(card, id) {
    card.addEventListener('click', () => {
      this.recipeProfile = new RecipeProfile(id)
      this.recipeProfile.show();
    })
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

    //set data , property
    cardImage.style.setProperty("background-image", `url(${this.image})`);
    title.textContent = this.title;
    description.textContent = this.description;

    //append each element through its respective parent
    [title, description].forEach(child => {
      caption.appendChild(child);
    });

    [cardImage, caption].forEach(child => {
      card.appendChild(child);
    });

    //attach an event to the card to show profile later
    this.showProfile(card, this.id)

    return card;
  }

}

export default RecipeCard;

import currentData from '../../../server/data.json'

class RecipeManage {

  constructor() {
    this.domCache()

  }

  domCache() {
    this.recipeManage = document.querySelector('.recipe-manage')
    this.recipeManageContainer = document.querySelector('.recipe-manage > .container');
  }


  init() {

    const listRequest = new Request("http://localhost:3001/recipes", {
      method: "GET",
      mode: "cors"
    });

    fetch(listRequest)
      .then(result => {
        this.recipeManageContainer.innerHTML = "";
        return result.json();
      })
      .then(data => {
        this.render(data)
      })
      .catch(err => {
        console.log(err);
      });
  }


  render() {
    const recipeListing = document.createElement('div'),
      recipeListingHeader = document.createElement('h3'),
      docuFrag = document.createDocumentFragment();

    //add styles
    recipeListing.classList.add('recipe-manage-listing');

    //add data
    recipeListingHeader.textContent = "Current Listing"


    //append elements
    recipeListing.appendChild(recipeListingHeader)

    this.recipeManageContainer.appendChild(recipeListing);

  }


  hide() {
    this.recipeManage.style.setProperty('display', 'none')
  }

  show() {
    this.recipeManage.style.setProperty('display', 'block')
    this.init();
  }

}

export default RecipeManage;
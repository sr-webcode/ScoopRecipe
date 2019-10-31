class RecipeManage {
  constructor() {
    this.domCache();
    this.collateListItems = this.collateListItems.bind(this);
  }

  domCache() {
    this.recipeManage = document.querySelector(".recipe-manage");
    this.recipeManageContainer = document.querySelector(
      ".recipe-manage > .container"
    );
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
        this.render(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render(data) {
    const recipeListing = document.createElement("div"),
      docuFrag = document.createDocumentFragment(),
      recipeListingHeader = document.createElement("h3");

    //add styles
    recipeListing.classList.add("recipe-manage-listing");

    //add data
    recipeListingHeader.textContent = "Current Recipes";

    //each list item
    const listItems = this.collateListItems(data);

    //append child elems
    [recipeListingHeader, listItems].forEach(child => {
      recipeListing.appendChild(child);
    });

    this.recipeManageContainer.appendChild(recipeListing);
  }

  collateListItems(data) {
    const listParent = document.createElement("ul"),
      docuFrag = document.createDocumentFragment();

    data.forEach(item => {
      const listItem = document.createElement("li"),
        title = document.createElement("h4"),
        edit = document.createElement("span"),
        del = document.createElement("span"),
        btnGroup = document.createElement("div"),
        currentImage = document.createElement("img");

      //set class names
      listParent.classList.add("recipe-manage-menu");
      btnGroup.classList.add("btn-group");

      title.textContent = item.title;
      edit.textContent = "edit";
      edit.setAttribute("data-role", "patch");
      del.textContent = "delete";
      del.setAttribute("data-role", "delete");
      currentImage.setAttribute("src", `${item.images.small}`);
      listItem.setAttribute("data-title", item.title);
      listItem.setAttribute("data-id", item.uuid),
        listItem.setAttribute("data-category", "recipes");

      [edit, del].forEach(child => {
        btnGroup.appendChild(child);
      });

      [currentImage, title, btnGroup].forEach(child => {
        listItem.appendChild(child);
      });

      docuFrag.appendChild(listItem);
    });

    listParent.appendChild(docuFrag);

    return listParent;
  }

  hide() {
    this.recipeManage.style.setProperty("display", "none");
  }

  show() {
    this.recipeManage.style.setProperty("display", "block");
    this.init();
  }
}

export default RecipeManage;

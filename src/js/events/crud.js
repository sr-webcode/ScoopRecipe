import RecipeManage from "../components/recipeManage";

class DatabaseEvents {
  constructor(event, id, category) {
    this.event = event;
    this.id = id;
    this.category = category;
    this.recipeManage = new RecipeManage();
    this.serverRequest = this.serverRequest.bind(this);
    this.specifyRequest = this.specifyRequest.bind(this);
    this.defineRequestBody = this.defineRequestBody.bind(this);
  }
  init() {
    if (!this.event || !this.id) return;
    this.serverRequest();
  }

  serverRequest() {
    const request = this.specifyRequest();

    fetch(request)
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.recipeManage.show();
      })
      .catch(err => {
        console.log(err);
      });
  }

  specifyRequest() {
    let uri;

    //attach id if delete or patch request
    const isDelPatch = ["delete", "patch"].indexOf(this.event) > -1;
    const isAddPatch = ["post", "patch"].indexOf(this.event) > -1;

    switch (this.category) {
      case "recipes":
        uri = `http://localhost:3001/recipes/${isDelPatch && this.id}`;
        break;
      case "specials":
        uri = `http://localhost:3001/specials/${isDelPatch && this.id}`;
        break;
      default:
        return false;
    }

    const dbRequest = new Request(uri, {
      method: this.event,
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: isAddPatch ? this.defineRequestBody() : ""
    });
    return dbRequest;
    
  }

  defineRequestBody() {

  }
}

export default DatabaseEvents;

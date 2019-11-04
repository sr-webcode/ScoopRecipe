class RecipeSpecials {
  constructor() {

  }

  checkSpecials() {
    return new Promise((resolve, reject) => {
      const uri = "http://localhost:3001/specials";
      const specialsRequest = new Request(uri, {
        method: "GET",
        mode: "cors"
      });

      fetch(specialsRequest)
        .then(res => {
          return res.json();
        })
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

}

export default RecipeSpecials;

const generateUniqueID = () => {
  const hash = [8, 4, 4, 4, 12]
    .map(salt => {
      return genSalt(salt);
    })
    .join("-");

  function genSalt(count) {
    const randomNum = () => {
        return Math.floor(Math.random() * 10);
      },
      randomChar = () => {
        return String.fromCharCode(
          Math.floor(Math.random() * (90 - 65) + 65)
        ).toLowerCase();
      },
      saltChoice = () => {
        return Math.floor(Math.random() * 2);
      },
      saltAgents = [randomNum, randomChar];

    let saltResult = [];

    for (let x = 0; x < count; x++) {
      const randomKey = saltAgents[saltChoice()]();
      saltResult.push(randomKey);
    }
    return saltResult.join("").toString();
  }
  return hash;
};

export default generateUniqueID;

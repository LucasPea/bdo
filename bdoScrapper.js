const { Item, Recipe, MaterialGroup, Enums } = require("bdo-scraper");

// Using ES7 async/await syntax.
const getData = async (itemId) => {
  const itemData = await Item(itemId);
  const itemDataStringify = await JSON.stringify(itemData);
  const itemDataParse = await JSON.parse(itemDataStringify);
  console.log(itemDataParse.recipes[0].materials);
  // const returnData = {
  //   Recipe: itemData1.recipes,
  // };

  // console.log(returnData);
};

getData(9637);

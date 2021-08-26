declare var require: any;
var Guru_Cooking_Box = require("./guruCookingList.json");
// import Guru_Cooking_Box = require("./guruCookingList.json");

const calEXP = (name: string) => {
  const arrCalEXP = Guru_Cooking_Box.reduce(
    (acc, cur) => {
      if (cur.name === name) {
        const materialEXP = cur.recipe.reduce(
          (acc1, cur1) => {
            acc1.totalMaterialEXP =
              acc1.totalMaterialEXP + cur1.exp * cur1.quantity;

            if (cur1.exp === 0) {
              acc.missingSomeExp = true;
            }

            return acc1;
          },
          { totalMaterialEXP: 0 }
        );

        acc.totalEXP = cur.exp + materialEXP.totalMaterialEXP;
      }

      return acc;
    },
    { totalEXP: 0, missingSomeExp: false }
  );

  return arrCalEXP;
};

const foodList = (name: string = "") => {
  const arrFoodName = Guru_Cooking_Box.reduce((acc, cur) => {
    const sumEXP = calEXP(cur.name);

    const insertData = {
      name: cur.name,
      totalExp: sumEXP.totalEXP,
      ...(sumEXP.missingSomeExp && { missingSomeExp: true }),
    };

    acc.push(insertData);
    return acc;
  }, []);

  arrFoodName.sort((a, b) => b.totalExp - a.totalExp);

  return arrFoodName;
};

console.log(foodList());

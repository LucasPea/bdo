declare var require: any;
var Guru_Cooking_Box = require("./guruCookingList.json");

const calEXP = (name: string) => {
  const arrCalEXP = Guru_Cooking_Box.reduce(
    (acc, cur) => {
      let ingredientEXP = { totalIngredientEXP_D1: 0 };
      let ingredientEXPD2 = 0;

      if (cur.name === name) {
        const materialEXP = cur.recipe.reduce(
          (acc1, cur1) => {
            if (cur1.exp === 0) {
              acc.missingSomeExp = true;
            }

            if (cur1.recipe.length !== 0) {
              const ingredientEXP_D1_reduce = cur1.recipe.reduce(
                (accD1, curD1) => {
                  if (curD1.recipe.length !== 0) {
                    const ingredientEXP_D2_reduce = curD1.recipe.reduce(
                      (accD2, curD2) => {
                        accD2.totalIngredientEXP_D2 =
                          curD2.exp * curD2.quantity;

                        return accD2;
                      },
                      { totalIngredientEXP_D2: 0 }
                    );

                    ingredientEXPD2 =
                      ingredientEXP_D2_reduce.totalIngredientEXP_D2;
                  }

                  accD1.totalIngredientEXP_D1 =
                    accD1.totalIngredientEXP_D1 + curD1.exp * curD1.quantity;

                  return accD1;
                },
                { totalIngredientEXP_D1: 0 }
              );

              ingredientEXP = ingredientEXP_D1_reduce;
            }

            acc1.totalMaterialEXP =
              acc1.totalMaterialEXP + cur1.exp * cur1.quantity;

            return acc1;
          },
          { totalMaterialEXP: 0 }
        );

        acc.totalEXP =
          cur.exp +
          materialEXP.totalMaterialEXP +
          ingredientEXP.totalIngredientEXP_D1 +
          ingredientEXPD2;
      }

      return acc;
    },
    { totalEXP: 0, missingSomeExp: false }
  );

  return arrCalEXP;
};

const foodList = (name: string = "") => {
  const arrFoodName = Guru_Cooking_Box.reduce((acc, cur) => {
    if (name === "") {
      const sumEXP = calEXP(cur.name);

      const insertData = {
        name: cur.name,
        totalExp: sumEXP.totalEXP,
        ...(sumEXP.missingSomeExp && { missingSomeExp: true }),
      };

      acc.push(insertData);
    }

    if (name !== "") {
      if (name === cur.name) {
        const sumEXP = calEXP(name);

        const insertData = {
          name: name,
          totalExp: sumEXP.totalEXP,
          ...(sumEXP.missingSomeExp && { missingSomeExp: true }),
        };

        acc.push(insertData);
      }
    }

    return acc;
  }, []);

  arrFoodName.sort((a, b) => b.totalExp - a.totalExp);

  return arrFoodName;
};

console.log(foodList("Knight_Combat_Rations"));

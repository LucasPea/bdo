declare var require: any;
var Guru_Cooking_Box = require("./guruCookingList.json");

const calEXP = (name: string) => {
  const arrCalEXP = Guru_Cooking_Box.reduce(
    (acc: any, cur: any) => {
      let totalIngredientEXP_D1: number = 0;
      let totalIngredientEXP_D2: number = 0;

      if (cur.name === name) {
        // // this level is calculate "MAIN FOOD" exp

        const materialEXP = cur.recipe.reduce(
          (acc1: any, cur1: any) => {
            // // this level is calculate "MAIN MATERIAL" of MAIN FOOD exp
            // console.log(cur1);

            if (typeof cur1 === "object" && cur1.recipe.length !== 0) {
              const totalIngredientEXP_D1_reduce = cur1.recipe.reduce(
                (accD1: any, curD1: any) => {
                  // // this level is calculate "INGREDIENT MATERIAL" of MAIN MATERIAL exp - D1
                  // console.log(curD1);

                  if (typeof curD1 === "object" && curD1.recipe.length !== 0) {
                    const totalIngredientEXP_D2_reduce = curD1.recipe.reduce(
                      (accD2: any, curD2: any) => {
                        // // this level is calculate "INGREDIENT MATERIAL" of INGREDIENT MATERIAL exp - D2
                        // console.log(curD2);

                        if (
                          curD2.exp * curD2.quantity === 0 ||
                          !curD2.exp ||
                          !curD2.quantity
                        ) {
                          acc.missingSomeExp = true;
                        }

                        accD2.sumIngredientEXP_D2 =
                          accD2.sumIngredientEXP_D2 +
                          curD2.exp * curD2.quantity;

                        return accD2;
                      },
                      { sumIngredientEXP_D2: 0 }
                    );

                    totalIngredientEXP_D2 =
                      totalIngredientEXP_D2 +
                      totalIngredientEXP_D2_reduce.sumIngredientEXP_D2;
                  }

                  if (
                    curD1.exp * curD1.quantity === 0 ||
                    !curD1.exp ||
                    !curD1.quantity
                  ) {
                    acc.missingSomeExp = true;
                  }

                  accD1.sumIngredientEXP_D1 =
                    accD1.sumIngredientEXP_D1 +
                    (curD1.exp ? curD1.exp : 0) *
                      (curD1.quantity ? curD1.quantity : 0);

                  return accD1;
                },
                { sumIngredientEXP_D1: 0 }
              );

              totalIngredientEXP_D1 =
                totalIngredientEXP_D1 +
                totalIngredientEXP_D1_reduce.sumIngredientEXP_D1;
            }
            if (cur1.exp * cur1.quantity === 0 || !cur1.exp || !cur1.quantity) {
              acc.missingSomeExp = true;
            }

            acc1.totalMaterialEXP =
              acc1.totalMaterialEXP +
              (cur1.exp ? cur1.exp : 0) * (cur1.quantity ? cur1.quantity : 0);

            return acc1;
          },
          { totalMaterialEXP: 0 }
        );

        acc.totalEXP =
          cur.exp +
          materialEXP.totalMaterialEXP +
          totalIngredientEXP_D1 +
          totalIngredientEXP_D2;
      }

      return acc;
    },
    { totalEXP: 0, missingSomeExp: false }
  );

  return arrCalEXP;
};

const foodList = (name: string = "") => {
  const arrFoodName = Guru_Cooking_Box.reduce((acc: any, cur: any) => {
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

  arrFoodName.sort((a: any, b: any) => b.totalExp - a.totalExp);

  return arrFoodName;
};

console.log(foodList());

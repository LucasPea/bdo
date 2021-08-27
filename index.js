var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Guru_Cooking_Box = require("./guruCookingList.json");
var calEXP = function (name) {
    var arrCalEXP = Guru_Cooking_Box.reduce(function (acc, cur) {
        var totalIngredientEXP_D1 = 0;
        var totalIngredientEXP_D2 = 0;
        if (cur.name === name) {
            // // this level is calculate "MAIN FOOD" exp
            var materialEXP = cur.recipe.reduce(function (acc1, cur1) {
                // // this level is calculate "MAIN MATERIAL" of MAIN FOOD exp
                // console.log(cur1);
                if (typeof cur1 === "object" && cur1.recipe.length !== 0) {
                    var totalIngredientEXP_D1_reduce = cur1.recipe.reduce(function (accD1, curD1) {
                        // // this level is calculate "INGREDIENT MATERIAL" of MAIN MATERIAL exp - D1
                        // console.log(curD1);
                        if (typeof curD1 === "object" && curD1.recipe.length !== 0) {
                            var totalIngredientEXP_D2_reduce = curD1.recipe.reduce(function (accD2, curD2) {
                                // // this level is calculate "INGREDIENT MATERIAL" of INGREDIENT MATERIAL exp - D2
                                // console.log(curD2);
                                if (curD2.exp * curD2.quantity === 0 ||
                                    !curD2.exp ||
                                    !curD2.quantity) {
                                    acc.missingSomeExp = true;
                                }
                                accD2.sumIngredientEXP_D2 =
                                    accD2.sumIngredientEXP_D2 +
                                        curD2.exp * curD2.quantity;
                                return accD2;
                            }, { sumIngredientEXP_D2: 0 });
                            totalIngredientEXP_D2 =
                                totalIngredientEXP_D2 +
                                    totalIngredientEXP_D2_reduce.sumIngredientEXP_D2;
                        }
                        if (curD1.exp * curD1.quantity === 0 ||
                            !curD1.exp ||
                            !curD1.quantity) {
                            acc.missingSomeExp = true;
                        }
                        accD1.sumIngredientEXP_D1 =
                            accD1.sumIngredientEXP_D1 +
                                (curD1.exp ? curD1.exp : 0) *
                                    (curD1.quantity ? curD1.quantity : 0);
                        return accD1;
                    }, { sumIngredientEXP_D1: 0 });
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
            }, { totalMaterialEXP: 0 });
            acc.totalEXP =
                cur.exp +
                    materialEXP.totalMaterialEXP +
                    totalIngredientEXP_D1 +
                    totalIngredientEXP_D2;
        }
        return acc;
    }, { totalEXP: 0, missingSomeExp: false });
    return arrCalEXP;
};
var foodList = function (name) {
    if (name === void 0) { name = ""; }
    var arrFoodName = Guru_Cooking_Box.reduce(function (acc, cur) {
        if (name === "") {
            var sumEXP = calEXP(cur.name);
            var insertData = __assign({ name: cur.name, totalExp: sumEXP.totalEXP }, (sumEXP.missingSomeExp && { missingSomeExp: true }));
            acc.push(insertData);
        }
        if (name !== "") {
            if (name === cur.name) {
                var sumEXP = calEXP(name);
                var insertData = __assign({ name: name, totalExp: sumEXP.totalEXP }, (sumEXP.missingSomeExp && { missingSomeExp: true }));
                acc.push(insertData);
            }
        }
        return acc;
    }, []);
    arrFoodName.sort(function (a, b) { return b.totalExp - a.totalExp; });
    return arrFoodName;
};
console.log(foodList("Knight_Combat_Rations"));

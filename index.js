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
// import Guru_Cooking_Box = require("./guruCookingList.json");
var calEXP = function (name) {
    var arrCalEXP = Guru_Cooking_Box.reduce(function (acc, cur) {
        if (cur.name === name) {
            var materialEXP = cur.recipe.reduce(function (acc1, cur1) {
                acc1.totalMaterialEXP =
                    acc1.totalMaterialEXP + cur1.exp * cur1.quantity;
                if (cur1.exp === 0) {
                    acc.missingSomeExp = true;
                }
                return acc1;
            }, { totalMaterialEXP: 0 });
            acc.totalEXP = cur.exp + materialEXP.totalMaterialEXP;
        }
        return acc;
    }, { totalEXP: 0, missingSomeExp: false });
    return arrCalEXP;
};
var foodList = function (name) {
    if (name === void 0) { name = ""; }
    var arrFoodName = Guru_Cooking_Box.reduce(function (acc, cur) {
        var sumEXP = calEXP(cur.name);
        var insertData = __assign({ name: cur.name, totalExp: sumEXP.totalEXP }, (sumEXP.missingSomeExp && { missingSomeExp: true }));
        acc.push(insertData);
        return acc;
    }, []);
    arrFoodName.sort(function (a, b) { return b.totalExp - a.totalExp; });
    return arrFoodName;
};
console.log(foodList());

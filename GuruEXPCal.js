const Guru_Cooking_Box = 
[
  {
    name: "Knight_Combat_Rations",
    exp: 2400,
    recipe: [
      {
        name: "Dark_Pudding",
        exp: 1000,
        quantity: 1,
        recipe: {} 
          
      }, 
      {
        name: "Ham_Sandwich",
        exp: 1000,
        quantity: 1,
        recipe: {} 
      }, 
      {        
        name: "Meat_Croquette",
        exp: 1000,
        quantity: 1,
        recipe: {} 
      }, 
      {        
        name: "Fruit_Wine",
        exp: 1000,
        quantity: 1,
        recipe: {} 
      }, 
    ]
  },
  {
    name: "Valencia_Meal",
    exp: 2400,
    recipe: [
      {
        name: "Teff_Sandwich",
        exp: 1600,
        quantity: 1,
        recipe: {} 
      }, 
      {
        name: "King_of_Jungle_Hamburg",
        exp: 1600,    
        quantity: 1,
        recipe: {} 
      }, 
      {        
        name: "Couscous",
        exp: 1200,    
        quantity: 1,
        recipe: {} 
      }, 
      {        
        name: "Fig_Pie",
        exp: 700,    
        quantity: 2,
        recipe: {} 
      }, 
      {        
        name: "Date_Palm_Wine",
        exp: 1000,    
        quantity: 2,
        recipe: {} 
      }, 
    ]
  },
]

const calEXP = (name) => {
  const arrCalEXP = Guru_Cooking_Box.reduce((acc, item) => {
    const materialEXP = item.recipe.reduce((acc,item) => {
      acc.totalMaterialEXP = acc.totalMaterialEXP + (item.exp * item.quantity)
      return acc
    }, { totalMaterialEXP : 0 })

    if (item.name === name) {
      acc.totalEXP = item.exp + materialEXP.totalMaterialEXP
    }
    return acc
  }, { totalEXP : 0 });

  return (arrCalEXP);
}

const foodName = (name = "") => {
  const arrFoodName = Guru_Cooking_Box.reduce((acc, item) => {
    acc[item.name] = {
      exp: calEXP(item.name).totalEXP
    }
    return acc
  }, {});
  
  return arrFoodName;
}

console.log(foodName());
// console.log(calEXP("Knight_Combat_Rations"));

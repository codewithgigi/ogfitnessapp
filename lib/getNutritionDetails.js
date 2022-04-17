import axios from "axios";

export const getNutritionDetails = async (ingredients) => {
  const apiEndpoint = `/api/nutritiondetails`;

  var data = {
    ingr: ingredients,
  };

  var config = {
    method: "post",
    url: apiEndpoint,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  let results = await axios(config);
  if (results?.data?.error) return { error: results.data.error };
  else
    return {
      calories: Math.round(results?.data?.totalNutrients?.ENERC_KCAL?.quantity),
      protein: Math.round(results?.data?.totalNutrients?.PROCNT?.quantity),
      fat: Math.round(results?.data?.totalNutrients?.FAT?.quantity),
      carbs: Math.round(results?.data?.totalNutrients?.CHOCDF?.quantity),
      apiResponse: JSON.stringify(results),
    };
};

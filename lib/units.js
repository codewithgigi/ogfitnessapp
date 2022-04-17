export const units = {
  CUPS: ["c", "c.", "C", "Cups", "cu", "cup"],
  GALLONS: ["gal", "gallon", "gallons"],
  OUNCES: [
    "oz",
    "oz.",
    "ounce",
    "ounces",
    "fluid-ounce",
    "fl oz",
    "fl-oz",
    "fl oz.",
  ],
  PINTS: ["pt", "pts", "pt.", "pint", "pints"],
  POUNDS: ["lb", "lb.", "lbs", "lbs.", "pound", "pounds"],
  quart: ["qt", "qt.", "qts", "qts."],
  TBSP: ["tbs", "tbsp", "tbspn", "tablespoons", "tablespoon"],
  TSP: ["tsp", "tspn", "t", "t.", "teaspoon", "teaspoons"],
  GRAMS: ["g", "g.", "gram", "grams"],
  KILOGRAMS: ["kg", "kg.", "Kg", "Kg.", "kilogram", "kilograms"],
  LITERS: ["l", "l."],
  milligram: ["mg", "mg."],
  milliliter: ["ml", "ml.", "mL", "mL."],
  package: ["pkg", "pkgs"],
  stick: ["sticks"],
  piece: ["pcs", "pcs."],
  pinch: ["pinch"],
  small: ["Small"],
  medium: ["Medium"],
  large: ["large", "Large"],
};

/*
Amazon fresh
The unit type. This is an enumerated field that accepts the following values (case insensitive): 
“count”, “cups”, “fl_oz”, “gallons”, “grams”, “kilograms”, “liters”, “milliliters”, “ounces”, 
“pints”, “pounds”, 
“quarts”, “tbsp”, “tsp”. If an unrecognized unit is provided, we will default to count = 1.
*/

export const pluralUnits = {
  cup: "cups",
  gallon: "gallons",
  ounce: "ounces",
  pint: "pints",
  pound: "pounds",
  quart: "quarts",
  tbsp: "tablespoons",
  tsp: "teaspoons",
  gram: "grams",
  kilogram: "kilograms",
  liter: "liters",
  milligram: "milligrams",
  milliliter: "milliliters",
  clove: "cloves",
  bag: "bags",
  box: "boxes",
  pinch: "pinches",
  can: "cans",
  slice: "slices",
  piece: "pieces",
};

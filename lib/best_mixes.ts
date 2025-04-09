import { BestMix, Effect } from "./types";

// Primeiro, definimos os dados originais
const bestMixesData = [
  // OG Kush
  {
    seed: "OG Kush",
    ingredients: [
      "Paracetamol",
      "Cuke",
      "Paracetamol",
      "Gasoline",
      "Cuke",
      "Mega Bean",
      "Battery",
    ],
    sellPrice: 164,
    effects: [
      "Anti-Gravity",
      "Glowing",
      "Balding",
      "Tropic Thunder",
      "Zombifying",
      "Cyclopean",
      "Foggy",
      "Bright-Eyed",
    ],
    category: "og-kush",
  },
  {
    seed: "OG Kush",
    ingredients: ["Paracetamol", "Viagra", "Chili", "Horse Semen"],
    sellPrice: 109,
    effects: [
      "Slippery",
      "Bright-Eyed",
      "Tropic Thunder",
      "Spicy",
      "Long Faced",
    ],
    category: "og-kush",
  },
  {
    seed: "OG Kush",
    ingredients: [
      "Horse Semen",
      "Paracetamol",
      "Gasoline",
      "Cuke",
      "Mega Bean",
      "Paracetamol",
      "Mega Bean",
      "Battery",
    ],
    sellPrice: 172,
    effects: [
      "Anti-Gravity",
      "Long Faced",
      "Tropic Thunder",
      "Zombifying",
      "Cyclopean",
      "Glowing",
      "Foggy",
      "Bright-Eyed",
    ],
    category: "og-kush",
  },
  {
    seed: "OG Kush",
    ingredients: [
      "Paracetamol",
      "Viagra",
      "Donut",
      "Banana",
      "Cuke",
      "Paracetamol",
      "Banana",
    ],
    sellPrice: 136,
    effects: [
      "Anti-Gravity",
      "Jennerising",
      "Tropic Thunder",
      "Calorie-Dense",
      "Thought-Provoking",
      "Balding",
      "Sneaky",
      "Gingeritis",
    ],
    category: "og-kush",
  },
  {
    seed: "OG Kush",
    ingredients: [
      "Donut",
      "Mouth Wash",
      "Cuke",
      "Banana",
      "Viagra",
      "Flu Medicine",
    ],
    sellPrice: 127,
    effects: [
      "Anti-Gravity",
      "Jennerising",
      "Balding",
      "Thought-Provoking",
      "Gingeritis",
      "Tropic Thunder",
      "Sedating",
    ],
    category: "og-kush",
  },
  {
    seed: "OG Kush",
    ingredients: ["Banana", "Cuke", "Banana"],
    sellPrice: 80,
    effects: ["Jennerising", "Thought-Provoking", "Energizing", "Gingeritis"],
    category: "profitable",
  },

  // Sour Diesel
  {
    seed: "Sour Diesel",
    ingredients: [
      "Paracetamol",
      "Energy Drink",
      "Cuke",
      "Motor Oil",
      "Cuke",
      "Battery",
      "Energy Drink",
    ],
    sellPrice: 112,
    effects: [
      "Refreshing",
      "Anti-Gravity",
      "Athletic",
      "Sneaky",
      "Slippery",
      "Energizing",
      "Bright-Eyed",
    ],
    category: "sour-diesel",
  },
  {
    seed: "Sour Diesel",
    ingredients: [
      "Iodine",
      "Paracetamol",
      "Chili",
      "Viagra",
      "Paracetamol",
      "Cuke",
      "Motor Oil",
    ],
    sellPrice: 144,
    effects: [
      "Thought-Provoking",
      "Jennerising",
      "Bright-Eyed",
      "Spicy",
      "Tropic Thunder",
      "Anti-Gravity",
      "Munchies",
      "Slippery",
    ],
    category: "sour-diesel",
  },
  {
    seed: "Sour Diesel",
    ingredients: ["Cuke", "Flu Medicine", "Donut", "Mega Bean", "Battery"],
    sellPrice: 102,
    effects: [
      "Refreshing",
      "Glowing",
      "Sedating",
      "Calorie-Dense",
      "Foggy",
      "Bright-Eyed",
    ],
    category: "sour-diesel",
  },
  {
    seed: "Sour Diesel",
    ingredients: ["Iodine", "Horse Semen"],
    sellPrice: 85,
    effects: ["Electrifying", "Jennerising", "Long Faced"],
    category: "sour-diesel",
  },
  {
    seed: "Sour Diesel",
    ingredients: ["Cuke", "Flu Medicine", "Banana"],
    sellPrice: 71,
    effects: ["Refreshing", "Thought-Provoking", "Sedating", "Gingeritis"],
    category: "sour-diesel",
  },
  {
    seed: "Sour Diesel",
    ingredients: [
      "Mouth Wash",
      "Donut",
      "Cuke",
      "Flu Medicine",
      "Energy Drink",
      "Banana",
      "Paracetamol",
    ],
    sellPrice: 125,
    effects: [
      "Refreshing",
      "Jennerising",
      "Calorie-Dense",
      "Thought-Provoking",
      "Anti-Gravity",
      "Athletic",
      "Gingeritis",
      "Sneaky",
    ],
    category: "profitable",
  },
  {
    seed: "Sour Diesel",
    ingredients: ["Viagra", "Flu Medicine", "Donut"],
    sellPrice: 75,
    effects: ["Refreshing", "Tropic Thunder", "Sedating", "Calorie-Dense"],
    category: "profitable",
  },

  // Green Crack
  {
    seed: "Green Crack",
    ingredients: [
      "Gasoline",
      "Paracetamol",
      "Cuke",
      "Banana",
      "Gasoline",
      "Cuke",
      "Viagra",
      "Banana",
    ],
    sellPrice: 148,
    effects: [
      "Cyclopean",
      "Tropic Thunder",
      "Jennerising",
      "Thought-Provoking",
      "Anti-Gravity",
      "Bright-Eyed",
      "Energizing",
      "Gingeritis",
    ],
    category: "green-crack",
  },
  {
    seed: "Green Crack",
    ingredients: ["Paracetamol", "Cuke", "Banana", "Viagra", "Donut"],
    sellPrice: 106,
    effects: [
      "Jennerising",
      "Sneaky",
      "Thought-Provoking",
      "Gingeritis",
      "Tropic Thunder",
      "Calorie-Dense",
    ],
    category: "green-crack",
  },
  {
    seed: "Green Crack",
    ingredients: ["Addy", "Battery", "Chili", "Iodine", "Viagra"],
    sellPrice: 116,
    effects: [
      "Energizing",
      "Thought-Provoking",
      "Bright-Eyed",
      "Spicy",
      "Jennerising",
      "Tropic Thunder",
    ],
    category: "green-crack",
  },
  {
    seed: "Green Crack",
    ingredients: [
      "Donut",
      "Flu Medicine",
      "Viagra",
      "Battery",
      "Addy",
      "Iodine",
    ],
    sellPrice: 120,
    effects: [
      "Energizing",
      "Calorie-Dense",
      "Gingeritis",
      "Tropic Thunder",
      "Bright-Eyed",
      "Thought-Provoking",
      "Jennerising",
    ],
    category: "green-crack",
  },
  {
    seed: "Green Crack",
    ingredients: ["Viagra", "Horse Semen"],
    sellPrice: 77,
    effects: ["Energizing", "Tropic Thunder", "Long Faced"],
    category: "green-crack",
  },
  {
    seed: "Green Crack",
    ingredients: ["Viagra", "Mega Bean"],
    sellPrice: 83,
    effects: ["Cyclopean", "Tropic Thunder", "Foggy"],
    category: "profitable",
  },
  {
    seed: "Green Crack",
    ingredients: [
      "Energy Drink",
      "Paracetamol",
      "Gasoline",
      "Cuke",
      "Battery",
      "Mega Bean",
      "Chili",
    ],
    sellPrice: 166,
    effects: [
      "Glowing",
      "Long Faced",
      "Tropic Thunder",
      "Zombifying",
      "Cyclopean",
      "Bright-Eyed",
      "Foggy",
      "Spicy",
    ],
    category: "profitable",
  },

  // Granddaddy Purple
  {
    seed: "Granddaddy Purple",
    ingredients: [
      "Viagra",
      "Paracetamol",
      "Energy Drink",
      "Cuke",
      "Banana",
      "Paracetamol",
      "Motor Oil",
    ],
    sellPrice: 139,
    effects: [
      "Anti-Gravity",
      "Tropic Thunder",
      "Jennerising",
      "Athletic",
      "Thought-Provoking",
      "Gingeritis",
      "Sneaky",
      "Slippery",
    ],
    category: "granddaddy-purple",
  },
  {
    seed: "Granddaddy Purple",
    ingredients: ["Addy", "Battery", "Mega Bean", "Flu Medicine", "Cuke"],
    sellPrice: 101,
    effects: [
      "Thought-Provoking",
      "Energizing",
      "Bright-Eyed",
      "Cyclopean",
      "Sedating",
    ],
    category: "granddaddy-purple",
  },
  {
    seed: "Granddaddy Purple",
    ingredients: ["Energy Drink", "Paracetamol"],
    sellPrice: 74,
    effects: ["Anti-Gravity", "Athletic", "Sneaky"],
    category: "granddaddy-purple",
  },
  {
    seed: "Granddaddy Purple",
    ingredients: [
      "Banana",
      "Cuke",
      "Paracetamol",
      "Gasoline",
      "Cuke",
      "Battery",
      "Horse Semen",
      "Mega Bean",
    ],
    sellPrice: 167,
    effects: [
      "Sedating",
      "Electrifying",
      "Glowing",
      "Tropic Thunder",
      "Zombifying",
      "Cyclopean",
      "Bright-Eyed",
      "Long Faced",
    ],
    category: "granddaddy-purple",
  },
  {
    seed: "Granddaddy Purple",
    ingredients: [
      "Paracetamol",
      "Cuke",
      "Paracetamol",
      "Gasoline",
      "Cuke",
      "Mega Bean",
      "Battery",
    ],
    sellPrice: 154,
    effects: [
      "Sedating",
      "Glowing",
      "Balding",
      "Tropic Thunder",
      "Zombifying",
      "Cyclopean",
      "Foggy",
      "Bright-Eyed",
    ],
    category: "profitable",
  },
  {
    seed: "Granddaddy Purple",
    ingredients: ["Viagra", "Cuke", "Mega Bean"],
    sellPrice: 92,
    effects: ["Sedating", "Tropic Thunder", "Cyclopean", "Foggy"],
    category: "profitable",
  },

  // Meth
  {
    seed: "Meth",
    ingredients: ["Gasoline", "Cuke", "Battery", "Mega Bean"],
    sellPrice: 203,
    effects: ["Zombifying", "Cyclopean", "Bright-Eyed", "Foggy"],
    category: "meth",
  },
  {
    seed: "Meth",
    ingredients: ["Cuke", "Viagra", "Mega Bean"],
    sellPrice: 167,
    effects: ["Cyclopean", "Tropic Thunder", "Foggy"],
    category: "meth",
  },
  {
    seed: "Meth",
    ingredients: ["Energy Drink", "Mouth Wash", "Battery", "Horse Semen"],
    sellPrice: 178,
    effects: ["Athletic", "Balding", "Bright-Eyed", "Long Faced"],
    category: "meth",
  },
  {
    seed: "Meth",
    ingredients: [
      "Addy",
      "Battery",
      "Horse Semen",
      "Chili",
      "Mouth Wash",
      "Viagra",
      "Paracetamol",
      "Motor Oil",
    ],
    sellPrice: 277,
    effects: [
      "Athletic",
      "Bright-Eyed",
      "Long Faced",
      "Spicy",
      "Balding",
      "Tropic Thunder",
      "Sneaky",
      "Slippery",
    ],
    category: "meth",
  },
  {
    seed: "Meth",
    ingredients: ["Paracetamol", "Cuke", "Banana"],
    sellPrice: 144,
    effects: ["Jennerising", "Thought-Provoking", "Gingeritis"],
    category: "profitable",
  },
  {
    seed: "Meth",
    ingredients: [
      "Banana",
      "Cuke",
      "Paracetamol",
      "Gasoline",
      "Cuke",
      "Battery",
      "Horse Semen",
      "Mega Bean",
    ],
    sellPrice: 340,
    effects: [
      "Electrifying",
      "Glowing",
      "Tropic Thunder",
      "Zombifying",
      "Cyclopean",
      "Bright-Eyed",
      "Long Faced",
      "Foggy",
    ],
    category: "profitable",
  },

  // Cocaine
  {
    seed: "Cocaine",
    ingredients: [
      "Banana",
      "Cuke",
      "Paracetamol",
      "Gasoline",
      "Cuke",
      "Battery",
      "Horse Semen",
    ],
    sellPrice: 729,
    effects: [
      "Electrifying",
      "Glowing",
      "Tropic Thunder",
      "Zombifying",
      "Cyclopean",
      "Bright-Eyed",
      "Long Faced",
      "Foggy",
    ],
    category: "cocaine",
  },
  {
    seed: "Cocaine",
    ingredients: ["Horse Semen", "Viagra", "Mega Bean", "Cuke"],
    sellPrice: 414,
    effects: ["Long Faced", "Tropic Thunder", "Cyclopean", "Energizing"],
    category: "cocaine",
  },
  {
    seed: "Cocaine",
    ingredients: [
      "Battery",
      "Addy",
      "Paracetamol",
      "Chili",
      "Cuke",
      "Energy Drink",
      "Motor Oil",
    ],
    sellPrice: 513,
    effects: [
      "Bright-Eyed",
      "Thought-Provoking",
      "Anti-Gravity",
      "Sedating",
      "Munchies",
      "Athletic",
      "Slippery",
    ],
    category: "cocaine",
  },
  {
    seed: "Cocaine",
    ingredients: ["Iodine", "Horse Semen", "Battery", "Viagra"],
    sellPrice: 420,
    effects: ["Jennerising", "Long Faced", "Bright-Eyed", "Tropic Thunder"],
    category: "cocaine",
  },
  {
    seed: "Cocaine",
    ingredients: [
      "Motor Oil",
      "Cuke",
      "Paracetamol",
      "Gasoline",
      "Cuke",
      "Battery",
      "Horse Semen",
      "Mega Bean",
    ],
    sellPrice: 735,
    effects: [
      "Anti-Gravity",
      "Glowing",
      "Tropic Thunder",
      "Zombifying",
      "Cyclopean",
      "Bright-Eyed",
      "Long Faced",
      "Foggy",
    ],
    category: "profitable",
  },
  {
    seed: "Cocaine",
    ingredients: [
      "Banana",
      "Cuke",
      "Paracetamol",
      "Gasoline",
      "Cuke",
      "Battery",
      "Horse Semen",
      "Mega Bean",
    ],
    sellPrice: 729,
    effects: [
      "Electrifying",
      "Glowing",
      "Tropic Thunder",
      "Zombifying",
      "Cyclopean",
      "Bright-Eyed",
      "Long Faced",
      "Foggy",
    ],
    category: "profitable",
  },
];

// Depois convertemos para enums
const convertedMixes: BestMix[] = bestMixesData.map((mix) => ({
  ...mix,
  effects: mix.effects.map((effect) => {
    // Converter os efeitos de string para Effect enum
    switch (effect) {
      case "Anti-Gravity":
        return Effect.ANTI_GRAVITY;
      case "Athletic":
        return Effect.ATHLETIC;
      case "Balding":
        return Effect.BALDING;
      case "Bright-Eyed":
        return Effect.BRIGHT_EYED;
      case "Calming":
        return Effect.CALMING;
      case "Calorie-Dense":
        return Effect.CALORIE_DENSE;
      case "Cyclopean":
        return Effect.CYCLOPEAN;
      case "Disorienting":
        return Effect.DISORIENTING;
      case "Electrifying":
        return Effect.ELECTRIFYING;
      case "Energizing":
        return Effect.ENERGIZING;
      case "Euphoric":
        return Effect.EUPHORIC;
      case "Explosive":
        return Effect.EXPLOSIVE;
      case "Focused":
        return Effect.FOCUSED;
      case "Foggy":
        return Effect.FOGGY;
      case "Gingeritis":
        return Effect.GINGERITIS;
      case "Glowing":
        return Effect.GLOWING;
      case "Jennerising":
        return Effect.JENNERISING;
      case "Laxative":
        return Effect.LAXATIVE;
      case "Long Faced":
        return Effect.LONG_FACED;
      case "Munchies":
        return Effect.MUNCHIES;
      case "Paranoia":
        return Effect.PARANOIA;
      case "Refreshing":
        return Effect.REFRESHING;
      case "Schizophrenia":
        return Effect.SCHIZOPHRENIA;
      case "Sedating":
        return Effect.SEDATING;
      case "Seizure-Inducing":
        return Effect.SEIZURE_INDUCING;
      case "Shrinking":
        return Effect.SHRINKING;
      case "Slippery":
        return Effect.SLIPPERY;
      case "Smelly":
        return Effect.SMELLY;
      case "Sneaky":
        return Effect.SNEAKY;
      case "Spicy":
        return Effect.SPICY;
      case "Thought-Provoking":
        return Effect.THOUGHT_PROVOKING;
      case "Toxic":
        return Effect.TOXIC;
      case "Tropic Thunder":
        return Effect.TROPIC_THUNDER;
      case "Zombifying":
        return Effect.ZOMBIFYING;
      default:
        return effect as unknown as Effect;
    }
  }),
}));

// Finalmente exportamos
export const bestMixes = convertedMixes;

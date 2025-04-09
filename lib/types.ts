export interface Ingredient {
  name: string;
  price: number;
  image?: string;
}

export interface Seed {
  name: string;
  basePrice: number;
  image?: string;
}

export enum Effect {
  ANTI_GRAVITY = "Anti-Gravity",
  ATHLETIC = "Athletic",
  BALDING = "Balding",
  BRIGHT_EYED = "Bright-Eyed",
  CALMING = "Calming",
  CALORIE_DENSE = "Calorie-Dense",
  CYCLOPEAN = "Cyclopean",
  DISORIENTING = "Disorienting",
  ELECTRIFYING = "Electrifying",
  ENERGIZING = "Energizing",
  EUPHORIC = "Euphoric",
  EXPLOSIVE = "Explosive",
  FOCUSED = "Focused",
  FOGGY = "Foggy",
  GINGERITIS = "Gingeritis",
  GLOWING = "Glowing",
  JENNERISING = "Jennerising",
  LAXATIVE = "Laxative",
  LONG_FACED = "Long Faced",
  MUNCHIES = "Munchies",
  PARANOIA = "Paranoia",
  REFRESHING = "Refreshing",
  SCHIZOPHRENIA = "Schizophrenia",
  SEDATING = "Sedating",
  SEIZURE_INDUCING = "Seizure-Inducing",
  SHRINKING = "Shrinking",
  SLIPPERY = "Slippery",
  SMELLY = "Smelly",
  SNEAKY = "Sneaky",
  SPICY = "Spicy",
  THOUGHT_PROVOKING = "Thought-Provoking",
  TOXIC = "Toxic",
  TROPIC_THUNDER = "Tropic Thunder",
  ZOMBIFYING = "Zombifying",
}

export interface BestMix {
  seed: string;
  ingredients: string[];
  sellPrice: number;
  effects: Effect[];
  category?: string;
}

export interface EffectStyle {
  text: string;
  bg: string;
  border?: string;
}

export const effectColors: Record<Effect, EffectStyle> = {
  [Effect.ANTI_GRAVITY]: { text: "text-blue-100", bg: "bg-blue-600" },
  [Effect.ATHLETIC]: { text: "text-cyan-100", bg: "bg-cyan-700" },
  [Effect.BALDING]: { text: "text-amber-100", bg: "bg-amber-600" },
  [Effect.BRIGHT_EYED]: { text: "text-white", bg: "bg-blue-800" },
  [Effect.CALMING]: { text: "text-amber-200", bg: "bg-[#2a3033]" },
  [Effect.CALORIE_DENSE]: { text: "text-pink-100", bg: "bg-pink-800" },
  [Effect.CYCLOPEAN]: { text: "text-yellow-100", bg: "bg-[#1c2530]" },
  [Effect.DISORIENTING]: { text: "text-red-100", bg: "bg-red-800" },
  [Effect.ELECTRIFYING]: { text: "text-cyan-100", bg: "bg-cyan-700" },
  [Effect.ENERGIZING]: { text: "text-green-100", bg: "bg-green-700" },
  [Effect.EUPHORIC]: { text: "text-yellow-100", bg: "bg-yellow-700" },
  [Effect.EXPLOSIVE]: { text: "text-red-100", bg: "bg-red-700" },
  [Effect.FOCUSED]: { text: "text-teal-100", bg: "bg-teal-700" },
  [Effect.FOGGY]: { text: "text-gray-100", bg: "bg-gray-700" },
  [Effect.GINGERITIS]: { text: "text-orange-100", bg: "bg-orange-700" },
  [Effect.GLOWING]: { text: "text-green-100", bg: "bg-green-600" },
  [Effect.JENNERISING]: { text: "text-purple-100", bg: "bg-purple-700" },
  [Effect.LAXATIVE]: { text: "text-red-100", bg: "bg-red-700" },
  [Effect.LONG_FACED]: { text: "text-yellow-100", bg: "bg-yellow-700" },
  [Effect.MUNCHIES]: { text: "text-orange-100", bg: "bg-orange-700" },
  [Effect.PARANOIA]: { text: "text-red-100", bg: "bg-red-700" },
  [Effect.REFRESHING]: { text: "text-green-100", bg: "bg-green-700" },
  [Effect.SCHIZOPHRENIA]: { text: "text-purple-100", bg: "bg-purple-700" },
  [Effect.SEDATING]: { text: "text-purple-100", bg: "bg-purple-700" },
  [Effect.SEIZURE_INDUCING]: { text: "text-yellow-100", bg: "bg-yellow-700" },
  [Effect.SHRINKING]: { text: "text-gray-100", bg: "bg-gray-700" },
  [Effect.SLIPPERY]: { text: "text-cyan-100", bg: "bg-cyan-700" },
  [Effect.SMELLY]: { text: "text-yellow-100", bg: "bg-yellow-700" },
  [Effect.SNEAKY]: { text: "text-gray-100", bg: "bg-gray-700" },
  [Effect.SPICY]: { text: "text-red-100", bg: "bg-red-700" },
  [Effect.THOUGHT_PROVOKING]: { text: "text-purple-100", bg: "bg-purple-800" },
  [Effect.TOXIC]: { text: "text-green-100", bg: "bg-green-700" },
  [Effect.TROPIC_THUNDER]: { text: "text-amber-100", bg: "bg-amber-700" },
  [Effect.ZOMBIFYING]: { text: "text-green-100", bg: "bg-green-700" },
};

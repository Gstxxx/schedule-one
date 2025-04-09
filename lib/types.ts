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

export interface BestMix {
  seed: string;
  ingredients: string[];
  sellPrice: number;
  effects: string[];
  category?: string;
}

export const effectColors: Record<string, string> = {
  "Anti-Gravity": "text-blue-400",
  Athletic: "text-cyan-400",
  Balding: "text-amber-400",
  "Bright-Eyed": "text-blue-100",
  Calming: "text-amber-300",
  "Calorie-Dense": "text-pink-400",
  Cyclopean: "text-yellow-500",
  Disorienting: "text-red-400",
  Electrifying: "text-cyan-400",
  Energizing: "text-green-400",
  Euphoric: "text-yellow-400",
  Explosive: "text-red-500",
  Focused: "text-teal-400",
  Foggy: "text-gray-400",
  Gingeritis: "text-orange-500",
  Glowing: "text-green-400",
  Jennerising: "text-purple-400",
  Laxative: "text-red-400",
  "Long Faced": "text-yellow-500",
  Munchies: "text-orange-400",
  Paranoia: "text-red-400",
  Refreshing: "text-green-500",
  Schizophrenia: "text-purple-400",
  Sedating: "text-purple-500",
  "Seizure-Inducing": "text-yellow-400",
  Shrinking: "text-gray-300",
  Slippery: "text-cyan-400",
  Smelly: "text-yellow-400",
  Sneaky: "text-gray-400",
  Spicy: "text-red-500",
  "Thought-Provoking": "text-purple-600",
  Toxic: "text-green-600",
  "Tropic Thunder": "text-amber-500",
  Zombifying: "text-green-600",
};

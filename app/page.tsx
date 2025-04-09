"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BeakerIcon, Calculator, Stars } from "lucide-react";
import { useState } from "react";

interface Ingredient {
  name: string;
  price: number;
  image?: string;
}

interface Seed {
  name: string;
  basePrice: number;
  image?: string;
}

interface BestMix {
  seed: string;
  ingredients: string[];
  sellPrice: number;
  effects: string[];
  category?: string;
}

const effectColors: Record<string, string> = {
  "Anti-Gravity": "text-blue-400",
  "Athletic": "text-cyan-400",
  "Balding": "text-amber-400",
  "Bright-Eyed": "text-blue-100",
  "Calming": "text-amber-300",
  "Calorie-Dense": "text-pink-400",
  "Cyclopean": "text-yellow-500",
  "Disorienting": "text-red-400",
  "Electrifying": "text-cyan-400",
  "Energizing": "text-green-400",
  "Euphoric": "text-yellow-400",
  "Explosive": "text-red-500",
  "Focused": "text-teal-400",
  "Foggy": "text-gray-400",
  "Gingeritis": "text-orange-500",
  "Glowing": "text-green-400",
  "Jennerising": "text-purple-400",
  "Laxative": "text-red-400",
  "Long Faced": "text-yellow-500",
  "Munchies": "text-orange-400",
  "Paranoia": "text-red-400",
  "Refreshing": "text-green-500",
  "Schizophrenia": "text-purple-400",
  "Sedating": "text-purple-500",
  "Seizure-Inducing": "text-yellow-400",
  "Shrinking": "text-gray-300",
  "Slippery": "text-cyan-400",
  "Smelly": "text-yellow-400",
  "Sneaky": "text-gray-400",
  "Spicy": "text-red-500",
  "Thought-Provoking": "text-purple-600",
  "Toxic": "text-green-600",
  "Tropic Thunder": "text-amber-500",
  "Zombifying": "text-green-600"
};

const ingredients: Ingredient[] = [
  { name: "Cuke", price: 2, image: "/Cuke_Icon.png" },
  { name: "Banana", price: 2, image: "/Banana_Icon.png" },
  { name: "Paracetamol", price: 3, image: "/Paracetamol_Icon.png" },
  { name: "Donut", price: 3, image: "/Donut_Icon.png" },
  { name: "Viagra", price: 4, image: "/Viagra_Icon.png" },
  { name: "Mouth Wash", price: 4, image: "/Mouth_Wash_Icon.png" },
  { name: "Flu Medicine", price: 5, image: "/Meth_Icon.png" },
  { name: "Gasoline", price: 5, image: "/Gasoline_Icon.png" },
  { name: "Energy Drink", price: 6, image: "/Energy_Drink_Icon.png" },
  { name: "Motor Oil", price: 6, image: "/Motor_Oil_Icon.png" },
  { name: "Mega Bean", price: 7, image: "/Mega_Bean_Icon.png" },
  { name: "Chili", price: 7, image: "/Chili_Icon.png" },
  { name: "Battery", price: 8, image: "/Battery_Icon.png" },
  { name: "Iodine", price: 9, image: "/Iodine_Icon.png" },
  { name: "Addy", price: 9, image: "/Addy_Icon.png" },
  { name: "Horse Semen", price: 9, image: "/Horse_Semen_Icon.png" },
];

const seeds: Seed[] = [
  { name: "OG Kush", basePrice: 38, image: "/OGKushSeed_Icon.png" },
  { name: "Sour Diesel", basePrice: 40, image: "/SourDieselSeed_Icon.png" },
  { name: "Green Crack", basePrice: 43, image: "/GreenCrackSeed_Icon.png" },
  { name: "Granddaddy Purple", basePrice: 44, image: "/GranddaddyPurpleSeed_Icon.png" },
];

const bestMixes: BestMix[] = [
  // OG Kush
  {
    seed: "OG Kush",
    ingredients: ["Paracetamol", "Cuke", "Paracetamol", "Gasoline", "Cuke", "Mega Bean", "Battery"],
    sellPrice: 164,
    effects: ["Anti-Gravity", "Glowing", "Balding", "Tropic Thunder", "Zombifying", "Cyclopean", "Foggy", "Bright-Eyed"],
    category: "og-kush"
  },
  {
    seed: "OG Kush",
    ingredients: ["Paracetamol", "Viagra", "Chili", "Horse Semen"],
    sellPrice: 109,
    effects: ["Slippery", "Bright-Eyed", "Tropic Thunder", "Spicy", "Long Faced"],
    category: "og-kush"
  },
  {
    seed: "OG Kush",
    ingredients: ["Horse Semen", "Paracetamol", "Gasoline", "Cuke", "Mega Bean", "Paracetamol", "Mega Bean", "Battery"],
    sellPrice: 172,
    effects: ["Anti-Gravity", "Long Faced", "Tropic Thunder", "Zombifying", "Cyclopean", "Glowing", "Foggy", "Bright-Eyed"],
    category: "og-kush"
  },
  {
    seed: "OG Kush",
    ingredients: ["Paracetamol", "Viagra", "Donut", "Banana", "Cuke", "Paracetamol", "Banana"],
    sellPrice: 136,
    effects: ["Anti-Gravity", "Jennerising", "Tropic Thunder", "Calorie-Dense", "Thought-Provoking", "Balding", "Sneaky", "Gingeritis"],
    category: "og-kush"
  },
  {
    seed: "OG Kush",
    ingredients: ["Donut", "Mouth Wash", "Cuke", "Banana", "Viagra", "Flu Medicine"],
    sellPrice: 127,
    effects: ["Anti-Gravity", "Jennerising", "Balding", "Thought-Provoking", "Gingeritis", "Tropic Thunder", "Sedating"],
    category: "og-kush"
  },
  {
    seed: "OG Kush",
    ingredients: ["Banana", "Cuke", "Banana"],
    sellPrice: 80,
    effects: ["Jennerising", "Thought-Provoking", "Energizing", "Gingeritis"],
    category: "profitable"
  },

  // Sour Diesel
  {
    seed: "Sour Diesel",
    ingredients: ["Paracetamol", "Energy Drink", "Cuke", "Motor Oil", "Cuke", "Battery", "Energy Drink"],
    sellPrice: 112,
    effects: ["Refreshing", "Anti-Gravity", "Athletic", "Sneaky", "Slippery", "Energizing", "Bright-Eyed"],
    category: "sour-diesel"
  },
  {
    seed: "Sour Diesel",
    ingredients: ["Iodine", "Paracetamol", "Chili", "Viagra", "Paracetamol", "Cuke", "Motor Oil"],
    sellPrice: 144,
    effects: ["Thought-Provoking", "Jennerising", "Bright-Eyed", "Spicy", "Tropic Thunder", "Anti-Gravity", "Munchies", "Slippery"],
    category: "sour-diesel"
  },
  {
    seed: "Sour Diesel",
    ingredients: ["Cuke", "Flu Medicine", "Donut", "Mega Bean", "Battery"],
    sellPrice: 102,
    effects: ["Refreshing", "Glowing", "Sedating", "Calorie-Dense", "Foggy", "Bright-Eyed"],
    category: "sour-diesel"
  },
  {
    seed: "Sour Diesel",
    ingredients: ["Iodine", "Horse Semen"],
    sellPrice: 85,
    effects: ["Electrifying", "Jennerising", "Long Faced"],
    category: "sour-diesel"
  },
  {
    seed: "Sour Diesel",
    ingredients: ["Cuke", "Flu Medicine", "Banana"],
    sellPrice: 71,
    effects: ["Refreshing", "Thought-Provoking", "Sedating", "Gingeritis"],
    category: "sour-diesel"
  },
  {
    seed: "Sour Diesel",
    ingredients: ["Mouth Wash", "Donut", "Cuke", "Flu Medicine", "Energy Drink", "Banana", "Paracetamol"],
    sellPrice: 125,
    effects: ["Refreshing", "Jennerising", "Calorie-Dense", "Thought-Provoking", "Anti-Gravity", "Athletic", "Gingeritis", "Sneaky"],
    category: "profitable"
  },
  {
    seed: "Sour Diesel",
    ingredients: ["Viagra", "Flu Medicine", "Donut"],
    sellPrice: 75,
    effects: ["Refreshing", "Tropic Thunder", "Sedating", "Calorie-Dense"],
    category: "profitable"
  },

  // Green Crack
  {
    seed: "Green Crack",
    ingredients: ["Gasoline", "Paracetamol", "Cuke", "Banana", "Gasoline", "Cuke", "Viagra", "Banana"],
    sellPrice: 148,
    effects: ["Cyclopean", "Tropic Thunder", "Jennerising", "Thought-Provoking", "Anti-Gravity", "Bright-Eyed", "Energizing", "Gingeritis"],
    category: "green-crack"
  },
  {
    seed: "Green Crack",
    ingredients: ["Paracetamol", "Cuke", "Banana", "Viagra", "Donut"],
    sellPrice: 106,
    effects: ["Jennerising", "Sneaky", "Thought-Provoking", "Gingeritis", "Tropic Thunder", "Calorie-Dense"],
    category: "green-crack"
  },
  {
    seed: "Green Crack",
    ingredients: ["Addy", "Battery", "Chili", "Iodine", "Viagra"],
    sellPrice: 116,
    effects: ["Energizing", "Thought-Provoking", "Bright-Eyed", "Spicy", "Jennerising", "Tropic Thunder"],
    category: "green-crack"
  },
  {
    seed: "Green Crack",
    ingredients: ["Donut", "Flu Medicine", "Viagra", "Battery", "Addy", "Iodine"],
    sellPrice: 120,
    effects: ["Energizing", "Calorie-Dense", "Gingeritis", "Tropic Thunder", "Bright-Eyed", "Thought-Provoking", "Jennerising"],
    category: "green-crack"
  },
  {
    seed: "Green Crack",
    ingredients: ["Viagra", "Horse Semen"],
    sellPrice: 77,
    effects: ["Energizing", "Tropic Thunder", "Long Faced"],
    category: "green-crack"
  },
  {
    seed: "Green Crack",
    ingredients: ["Viagra", "Mega Bean"],
    sellPrice: 83,
    effects: ["Cyclopean", "Tropic Thunder", "Foggy"],
    category: "profitable"
  },
  {
    seed: "Green Crack",
    ingredients: ["Energy Drink", "Paracetamol", "Gasoline", "Cuke", "Battery", "Mega Bean", "Chili"],
    sellPrice: 166,
    effects: ["Glowing", "Long Faced", "Tropic Thunder", "Zombifying", "Cyclopean", "Bright-Eyed", "Foggy", "Spicy"],
    category: "profitable"
  },

  // Granddaddy Purple
  {
    seed: "Granddaddy Purple",
    ingredients: ["Viagra", "Paracetamol", "Energy Drink", "Cuke", "Banana", "Paracetamol", "Motor Oil"],
    sellPrice: 139,
    effects: ["Anti-Gravity", "Tropic Thunder", "Jennerising", "Athletic", "Thought-Provoking", "Gingeritis", "Sneaky", "Slippery"],
    category: "granddaddy-purple"
  },
  {
    seed: "Granddaddy Purple",
    ingredients: ["Addy", "Battery", "Mega Bean", "Flu Medicine", "Cuke"],
    sellPrice: 101,
    effects: ["Thought-Provoking", "Energizing", "Bright-Eyed", "Cyclopean", "Sedating"],
    category: "granddaddy-purple"
  },
  {
    seed: "Granddaddy Purple",
    ingredients: ["Energy Drink", "Paracetamol"],
    sellPrice: 74,
    effects: ["Anti-Gravity", "Athletic", "Sneaky"],
    category: "granddaddy-purple"
  },
  {
    seed: "Granddaddy Purple",
    ingredients: ["Banana", "Cuke", "Paracetamol", "Gasoline", "Cuke", "Battery", "Horse Semen", "Mega Bean"],
    sellPrice: 167,
    effects: ["Sedating", "Electrifying", "Glowing", "Tropic Thunder", "Zombifying", "Cyclopean", "Bright-Eyed", "Long Faced"],
    category: "granddaddy-purple"
  },
  {
    seed: "Granddaddy Purple",
    ingredients: ["Paracetamol", "Cuke", "Paracetamol", "Gasoline", "Cuke", "Mega Bean", "Battery"],
    sellPrice: 154,
    effects: ["Sedating", "Glowing", "Balding", "Tropic Thunder", "Zombifying", "Cyclopean", "Foggy", "Bright-Eyed"],
    category: "profitable"
  },
  {
    seed: "Granddaddy Purple",
    ingredients: ["Viagra", "Cuke", "Mega Bean"],
    sellPrice: 92,
    effects: ["Sedating", "Tropic Thunder", "Cyclopean", "Foggy"],
    category: "profitable"
  },

  // Meth
  {
    seed: "Meth",
    ingredients: ["Gasoline", "Cuke", "Battery", "Mega Bean"],
    sellPrice: 203,
    effects: ["Zombifying", "Cyclopean", "Bright-Eyed", "Foggy"],
    category: "meth"
  },
  {
    seed: "Meth",
    ingredients: ["Cuke", "Viagra", "Mega Bean"],
    sellPrice: 167,
    effects: ["Cyclopean", "Tropic Thunder", "Foggy"],
    category: "meth"
  },
  {
    seed: "Meth",
    ingredients: ["Energy Drink", "Mouth Wash", "Battery", "Horse Semen"],
    sellPrice: 178,
    effects: ["Athletic", "Balding", "Bright-Eyed", "Long Faced"],
    category: "meth"
  },
  {
    seed: "Meth",
    ingredients: ["Addy", "Battery", "Horse Semen", "Chili", "Mouth Wash", "Viagra", "Paracetamol", "Motor Oil"],
    sellPrice: 277,
    effects: ["Athletic", "Bright-Eyed", "Long Faced", "Spicy", "Balding", "Tropic Thunder", "Sneaky", "Slippery"],
    category: "meth"
  },
  {
    seed: "Meth",
    ingredients: ["Paracetamol", "Cuke", "Banana"],
    sellPrice: 144,
    effects: ["Jennerising", "Thought-Provoking", "Gingeritis"],
    category: "profitable"
  },
  {
    seed: "Meth",
    ingredients: ["Banana", "Cuke", "Paracetamol", "Gasoline", "Cuke", "Battery", "Horse Semen", "Mega Bean"],
    sellPrice: 340,
    effects: ["Electrifying", "Glowing", "Tropic Thunder", "Zombifying", "Cyclopean", "Bright-Eyed", "Long Faced", "Foggy"],
    category: "profitable"
  },

  // Cocaine
  {
    seed: "Cocaine",
    ingredients: ["Banana", "Cuke", "Paracetamol", "Gasoline", "Cuke", "Battery", "Horse Semen"],
    sellPrice: 729,
    effects: ["Electrifying", "Glowing", "Tropic Thunder", "Zombifying", "Cyclopean", "Bright-Eyed", "Long Faced", "Foggy"],
    category: "cocaine"
  },
  {
    seed: "Cocaine",
    ingredients: ["Horse Semen", "Viagra", "Mega Bean", "Cuke"],
    sellPrice: 414,
    effects: ["Long Faced", "Tropic Thunder", "Cyclopean", "Energizing"],
    category: "cocaine"
  },
  {
    seed: "Cocaine",
    ingredients: ["Battery", "Addy", "Paracetamol", "Chili", "Cuke", "Energy Drink", "Motor Oil"],
    sellPrice: 513,
    effects: ["Bright-Eyed", "Thought-Provoking", "Anti-Gravity", "Sedating", "Munchies", "Athletic", "Slippery"],
    category: "cocaine"
  },
  {
    seed: "Cocaine",
    ingredients: ["Iodine", "Horse Semen", "Battery", "Viagra"],
    sellPrice: 420,
    effects: ["Jennerising", "Long Faced", "Bright-Eyed", "Tropic Thunder"],
    category: "cocaine"
  },
  {
    seed: "Cocaine",
    ingredients: ["Motor Oil", "Cuke", "Paracetamol", "Gasoline", "Cuke", "Battery", "Horse Semen", "Mega Bean"],
    sellPrice: 735,
    effects: ["Anti-Gravity", "Glowing", "Tropic Thunder", "Zombifying", "Cyclopean", "Bright-Eyed", "Long Faced", "Foggy"],
    category: "profitable"
  },
  {
    seed: "Cocaine",
    ingredients: ["Banana", "Cuke", "Paracetamol", "Gasoline", "Cuke", "Battery", "Horse Semen", "Mega Bean"],
    sellPrice: 729,
    effects: ["Electrifying", "Glowing", "Tropic Thunder", "Zombifying", "Cyclopean", "Bright-Eyed", "Long Faced", "Foggy"],
    category: "profitable"
  },
];

export default function Home() {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [selectedSeed, setSelectedSeed] = useState<string>("OG Kush");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const handleQuantityChange = (ingredient: string, value: string) => {
    const quantity = value === "" ? 0 : parseInt(value);
    setQuantities({ ...quantities, [ingredient]: quantity });
  };

  const calculateTotal = () => {
    return Object.entries(quantities).reduce((total, [ingredient, quantity]) => {
      const ingredientPrice = ingredients.find((i) => i.name === ingredient)?.price || 0;
      return total + ingredientPrice * (quantity || 0);
    }, 0);
  };

  const getSelectedSeedPrice = () => {
    return seeds.find((seed) => seed.name === selectedSeed)?.basePrice || 0;
  };

  const getFilteredMixes = () => {
    if (activeCategory === "all") {
      return bestMixes;
    } else if (activeCategory === "og-kush" || activeCategory === "sour-diesel" ||
      activeCategory === "green-crack" || activeCategory === "granddaddy-purple" ||
      activeCategory === "meth" || activeCategory === "cocaine") {
      return bestMixes.filter(mix => mix.category === activeCategory);
    } else if (activeCategory === "profitable") {
      return bestMixes.filter(mix => mix.category === "profitable");
    }
    return bestMixes;
  };

  const total = calculateTotal();
  const seedPrice = getSelectedSeedPrice();
  const finalPrice = total + seedPrice;
  const filteredMixes = getFilteredMixes();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <BeakerIcon className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold">Drug Calculator</h1>
        </div>

        <Tabs defaultValue="calculator" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Calculator
            </TabsTrigger>
            <TabsTrigger value="best-mixes" className="flex items-center gap-2">
              <Stars className="w-4 h-4" />
              Best Mixes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Select Base Seed</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {seeds.map((seed) => (
                  <Card
                    key={seed.name}
                    className={`p-4 cursor-pointer transition-colors ${selectedSeed === seed.name
                      ? "border-primary bg-primary/5"
                      : "hover:border-primary/50"
                      }`}
                    onClick={() => setSelectedSeed(seed.name)}
                  >
                    {seed.image && (
                      <div className="flex justify-center mb-2">
                        <img src={seed.image} alt={seed.name} className="h-16 w-16 object-contain" />
                      </div>
                    )}
                    <h3 className="font-semibold text-center">{seed.name}</h3>
                    <p className="text-sm text-muted-foreground text-center">Base Price: ${seed.basePrice}</p>
                  </Card>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {ingredients.map((ingredient) => (
                <Card key={ingredient.name} className="p-4">
                  {ingredient.image && (
                    <div className="flex justify-center mb-2">
                      <img src={ingredient.image} alt={ingredient.name} className="h-12 w-12 object-contain" />
                    </div>
                  )}
                  <Label htmlFor={ingredient.name} className="block text-center">{ingredient.name}</Label>
                  <p className="text-sm text-muted-foreground mb-2 text-center">${ingredient.price} each</p>
                  <Input
                    id={ingredient.name}
                    type="number"
                    min="0"
                    value={quantities[ingredient.name] || ""}
                    onChange={(e) => handleQuantityChange(ingredient.name, e.target.value)}
                    placeholder="0"
                  />
                </Card>
              ))}
            </div>

            <Card className="p-6">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-lg">
                  <span>Ingredients Cost:</span>
                  <span>${total}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Base Seed Cost ({selectedSeed}):</span>
                  <span>${seedPrice}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-2xl font-bold">
                  <span>Total Cost:</span>
                  <span>${finalPrice}</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="best-mixes">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Filtrar por categoria</h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium ${activeCategory === "all"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setActiveCategory("og-kush")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium ${activeCategory === "og-kush"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                >
                  OG Kush
                </button>
                <button
                  onClick={() => setActiveCategory("sour-diesel")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium ${activeCategory === "sour-diesel"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                >
                  Sour Diesel
                </button>
                <button
                  onClick={() => setActiveCategory("green-crack")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium ${activeCategory === "green-crack"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                >
                  Green Crack
                </button>
                <button
                  onClick={() => setActiveCategory("granddaddy-purple")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium ${activeCategory === "granddaddy-purple"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                >
                  Granddaddy Purple
                </button>
                <button
                  onClick={() => setActiveCategory("meth")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium ${activeCategory === "meth"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                >
                  Meth
                </button>
                <button
                  onClick={() => setActiveCategory("cocaine")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium ${activeCategory === "cocaine"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                >
                  Cocaine
                </button>
                <button
                  onClick={() => setActiveCategory("profitable")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium ${activeCategory === "profitable"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                >
                  Mais Lucrativos
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMixes.map((mix, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{mix.seed}</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-1">Ingredients:</h4>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {mix.ingredients.map((ingredientName, idx) => {
                          const ingredient = ingredients.find(i => i.name === ingredientName);
                          return ingredient?.image ? (
                            <div key={idx} className="relative group">
                              <img
                                src={ingredient.image}
                                alt={ingredientName}
                                className="h-8 w-8 object-contain"
                              />
                              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-background text-foreground px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {ingredientName}
                              </span>
                            </div>
                          ) : (
                            <span key={idx} className="px-2 py-1 bg-muted rounded-md text-xs">
                              {ingredientName}
                            </span>
                          );
                        })}
                      </div>
                      <p className="text-muted-foreground text-sm">{mix.ingredients.join(", ")}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Sell Price:</h4>
                      <p className="text-lg font-semibold text-primary">${mix.sellPrice}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Effects:</h4>
                      <div className="flex flex-wrap gap-2">
                        {mix.effects.map((effect, i) => (
                          <span
                            key={i}
                            className={`px-2 py-1 bg-gray-800 rounded-md text-sm ${effectColors[effect] || "text-gray-200"}`}
                          >
                            {effect}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
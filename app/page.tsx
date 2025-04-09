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
}

interface Seed {
  name: string;
  basePrice: number;
}

interface BestMix {
  seed: string;
  ingredients: string[];
  sellPrice: number;
  effects: string[];
}

const ingredients: Ingredient[] = [
  { name: "Cuke", price: 2 },
  { name: "Banana", price: 2 },
  { name: "Paracetamol", price: 3 },
  { name: "Donut", price: 3 },
  { name: "Viagra", price: 4 },
  { name: "Mouth Wash", price: 4 },
  { name: "Flu Medicine", price: 5 },
  { name: "Gasoline", price: 5 },
  { name: "Energy Drink", price: 6 },
  { name: "Motor Oil", price: 6 },
  { name: "Mega Bean", price: 7 },
  { name: "Chili", price: 7 },
  { name: "Battery", price: 8 },
  { name: "Iodine", price: 9 },
  { name: "Addy", price: 9 },
  { name: "Horse Semen", price: 9 },
];

const seeds: Seed[] = [
  { name: "OG Kush", basePrice: 38 },
  { name: "Sour Diesel", basePrice: 40 },
  { name: "Green Crack", basePrice: 43 },
  { name: "Granddaddy Purple", basePrice: 44 },
];

const bestMixes: BestMix[] = [
  {
    seed: "OG Kush",
    ingredients: ["Donut", "Mouth Wash", "Cuke", "Banana", "Viagra", "Flu Medicine"],
    sellPrice: 127,
    effects: ["Anti-Gravity", "Jennerising", "Balding", "Thought-Provoking", "Gingeritis", "Tropic Thunder", "Sedating"],
  },
  {
    seed: "Green Crack",
    ingredients: ["Viagra", "Horse Semen"],
    sellPrice: 77,
    effects: ["Energizing", "Tropic Thunder", "Long Faced"],
  },
  {
    seed: "Sour Diesel",
    ingredients: ["Cuke", "Flu Medicine", "Banana"],
    sellPrice: 71,
    effects: ["Refreshing", "Thought-Provoking", "Sedating", "Gingeritis"],
  },
  {
    seed: "Granddaddy Purple",
    ingredients: ["Viagra", "Paracetamol", "Energy Drink", "Cuke", "Banana", "Paracetamol", "Motor Oil"],
    sellPrice: 139,
    effects: ["Anti-Gravity", "Tropic Thunder", "Jennerising", "Athletic", "Thought-Provoking", "Gingeritis", "Sneaky", "Slippery"],
  },
];

export default function Home() {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [selectedSeed, setSelectedSeed] = useState<string>("OG Kush");

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

  const total = calculateTotal();
  const seedPrice = getSelectedSeedPrice();
  const finalPrice = total + seedPrice;

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
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedSeed === seed.name
                        ? "border-primary bg-primary/5"
                        : "hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedSeed(seed.name)}
                  >
                    <h3 className="font-semibold">{seed.name}</h3>
                    <p className="text-sm text-muted-foreground">Base Price: ${seed.basePrice}</p>
                  </Card>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {ingredients.map((ingredient) => (
                <Card key={ingredient.name} className="p-4">
                  <Label htmlFor={ingredient.name}>{ingredient.name}</Label>
                  <p className="text-sm text-muted-foreground mb-2">${ingredient.price} each</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bestMixes.map((mix, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{mix.seed}</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-1">Ingredients:</h4>
                      <p className="text-muted-foreground">{mix.ingredients.join(", ")}</p>
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
                            className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
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
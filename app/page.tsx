"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { bestMixes } from "@/lib/best_mixes";
import { effectColors, BestMix } from "@/lib/types";
import { ingredients } from "@/lib/ingredients";
import { seeds } from "@/lib/seeds";
import { BeakerIcon, Calculator, Stars } from "lucide-react";
import { useState } from "react";

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

  const getFilteredMixes = (): BestMix[] => {
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
  const filteredMixes: BestMix[] = getFilteredMixes();

  return (
    <div className="min-h-screen bg-[#0f172a] p-8 text-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <BeakerIcon className="w-10 h-10 text-blue-400" />
          <h1 className="text-4xl font-bold text-blue-100 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Drug Calculator</h1>
        </div>

        <Tabs defaultValue="calculator" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-[#1e293b]">
            <TabsTrigger
              value="calculator"
              className="flex items-center gap-2 data-[state=active]:bg-blue-900/40 data-[state=active]:text-blue-100"
            >
              <Calculator className="w-4 h-4" />
              Calculator
            </TabsTrigger>
            <TabsTrigger
              value="best-mixes"
              className="flex items-center gap-2 data-[state=active]:bg-blue-900/40 data-[state=active]:text-blue-100"
            >
              <Stars className="w-4 h-4" />
              Best Mixes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6 text-blue-200">Select Base Seed</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {seeds.map((seed) => (
                  <Card
                    key={seed.name}
                    className={`p-5 cursor-pointer transition-colors bg-[#1e293b] border-[#2d3c50] ${selectedSeed === seed.name
                      ? "border-blue-500 shadow-lg shadow-blue-500/20 bg-[#1e3a8a]/20"
                      : "hover:border-blue-400/50 hover:bg-[#1e3a8a]/10"
                      }`}
                    onClick={() => setSelectedSeed(seed.name)}
                  >
                    {seed.image && (
                      <div className="flex justify-center mb-3">
                        <div className="bg-[#0f172a] p-3 rounded-full">
                          <img src={seed.image} alt={seed.name} className="h-16 w-16 object-contain" />
                        </div>
                      </div>
                    )}
                    <h3 className="font-semibold text-center text-blue-100">{seed.name}</h3>
                    <p className="text-sm text-blue-300 text-center mt-1">Base Price: <span className="text-blue-400">${seed.basePrice}</span></p>
                  </Card>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {ingredients.map((ingredient) => (
                <Card key={ingredient.name} className="p-4 bg-[#1e293b] border-[#2d3c50]">
                  {ingredient.image && (
                    <div className="flex justify-center mb-3">
                      <div className="bg-[#0f172a] p-2 rounded-full">
                        <img src={ingredient.image} alt={ingredient.name} className="h-12 w-12 object-contain" />
                      </div>
                    </div>
                  )}
                  <Label htmlFor={ingredient.name} className="block text-center text-blue-100">{ingredient.name}</Label>
                  <p className="text-sm text-blue-300 mb-3 text-center">${ingredient.price} each</p>
                  <Input
                    id={ingredient.name}
                    type="number"
                    min="0"
                    value={quantities[ingredient.name] || ""}
                    onChange={(e) => handleQuantityChange(ingredient.name, e.target.value)}
                    placeholder="0"
                    className="bg-[#0f172a] border-[#2d3c50] focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </Card>
              ))}
            </div>

            <Card className="p-6 bg-[#1e293b] border-[#2d3c50]">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-lg">
                  <span className="text-blue-200">Ingredients Cost:</span>
                  <span className="text-blue-300">${total}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-blue-200">Base Seed Cost ({selectedSeed}):</span>
                  <span className="text-blue-300">${seedPrice}</span>
                </div>
                <Separator className="my-2 bg-blue-900/50" />
                <div className="flex justify-between text-2xl font-bold">
                  <span className="text-blue-100">Total Cost:</span>
                  <span className="text-blue-400">${finalPrice}</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="best-mixes">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6 text-blue-200">Filtrar por categoria</h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeCategory === "all"
                    ? "bg-blue-700 text-blue-50"
                    : "bg-[#1e293b] text-blue-200 hover:bg-blue-800/50"
                    }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setActiveCategory("og-kush")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeCategory === "og-kush"
                    ? "bg-blue-700 text-blue-50"
                    : "bg-[#1e293b] text-blue-200 hover:bg-blue-800/50"
                    }`}
                >
                  OG Kush
                </button>
                <button
                  onClick={() => setActiveCategory("sour-diesel")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeCategory === "sour-diesel"
                    ? "bg-blue-700 text-blue-50"
                    : "bg-[#1e293b] text-blue-200 hover:bg-blue-800/50"
                    }`}
                >
                  Sour Diesel
                </button>
                <button
                  onClick={() => setActiveCategory("green-crack")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeCategory === "green-crack"
                    ? "bg-blue-700 text-blue-50"
                    : "bg-[#1e293b] text-blue-200 hover:bg-blue-800/50"
                    }`}
                >
                  Green Crack
                </button>
                <button
                  onClick={() => setActiveCategory("granddaddy-purple")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeCategory === "granddaddy-purple"
                    ? "bg-blue-700 text-blue-50"
                    : "bg-[#1e293b] text-blue-200 hover:bg-blue-800/50"
                    }`}
                >
                  Granddaddy Purple
                </button>
                <button
                  onClick={() => setActiveCategory("meth")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeCategory === "meth"
                    ? "bg-blue-700 text-blue-50"
                    : "bg-[#1e293b] text-blue-200 hover:bg-blue-800/50"
                    }`}
                >
                  Meth
                </button>
                <button
                  onClick={() => setActiveCategory("cocaine")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeCategory === "cocaine"
                    ? "bg-blue-700 text-blue-50"
                    : "bg-[#1e293b] text-blue-200 hover:bg-blue-800/50"
                    }`}
                >
                  Cocaine
                </button>
                <button
                  onClick={() => setActiveCategory("profitable")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeCategory === "profitable"
                    ? "bg-blue-700 text-blue-50"
                    : "bg-[#1e293b] text-blue-200 hover:bg-blue-800/50"
                    }`}
                >
                  Mais Lucrativos
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMixes.map((mix, index) => (
                <Card key={index} className="p-6 bg-[#1e293b] border-[#2d3c50] hover:shadow-md hover:shadow-blue-500/10 transition-shadow">
                  <h3 className="text-xl font-semibold mb-3 text-blue-100">{mix.seed}</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 text-blue-200">Ingredients:</h4>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {mix.ingredients.map((ingredientName, idx) => {
                          const ingredient = ingredients.find(i => i.name === ingredientName);
                          return ingredient?.image ? (
                            <div key={idx} className="relative group">
                              <div className="bg-[#0f172a] p-1 rounded-full">
                                <img
                                  src={ingredient.image}
                                  alt={ingredientName}
                                  className="h-8 w-8 object-contain"
                                />
                              </div>
                              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-blue-900 text-blue-50 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {ingredientName}
                              </span>
                            </div>
                          ) : (
                            <span key={idx} className="px-2 py-1 bg-[#0f172a] rounded-md text-xs text-blue-200">
                              {ingredientName}
                            </span>
                          );
                        })}
                      </div>
                      <p className="text-blue-400 text-sm">{mix.ingredients.join(", ")}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-blue-200">Sell Price:</h4>
                      <p className="text-lg font-semibold text-blue-400">${mix.sellPrice}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-blue-200">Effects:</h4>
                      <div className="flex flex-wrap gap-2">
                        {mix.effects.map((effect, i) => (
                          <span
                            key={i}
                            className={`px-2 py-1 bg-[#0f172a] rounded-md text-sm ${effectColors[effect] || "text-blue-200"}`}
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
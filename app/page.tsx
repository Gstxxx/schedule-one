"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Cookies from 'js-cookie';
import {
  BeakerIcon,
  TrendingUp,
  CreditCard,
  Zap,
  AlertCircle,
  Flame,
  BookOpen,
  Save,
  PlusCircle,
  Trash,
  LightbulbIcon
} from "lucide-react";
import { bestMixes } from "@/lib/best_mixes";
import { effectColors, BestMix, Effect } from "@/lib/types";
import { ingredients } from "@/lib/ingredients";
import { seeds } from "@/lib/seeds";

// Tipo para misturas personalizadas
type CustomMix = {
  id: string;
  name: string;
  seed: string;
  ingredients: string[];
  effects: Effect[];
  sellPrice: number;
  createdAt: string;
};

export default function Home() {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [selectedSeed, setSelectedSeed] = useState<string>("OG Kush");
  const [showRecipeResult, setShowRecipeResult] = useState(false);
  const [mixCreated, setMixCreated] = useState<BestMix | null>(null);

  // Estados para misturas personalizadas
  const [isCreatingCustomMix, setIsCreatingCustomMix] = useState(false);
  const [customMixName, setCustomMixName] = useState("");
  const [customMixPrice, setCustomMixPrice] = useState("");
  const [customMixes, setCustomMixes] = useState<CustomMix[]>([]);
  const [customEffects, setCustomEffects] = useState<Effect[]>([]);

  useEffect(() => {
    // Carregar misturas personalizadas salvas dos cookies
    const savedMixes = Cookies.get('customMixes');
    if (savedMixes) {
      try {
        setCustomMixes(JSON.parse(savedMixes));
      } catch (e) {
        console.error("Error loading saved recipes", e);
      }
    }
  }, [mixCreated]);

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

  const saveCustomMix = () => {
    if (!customMixName.trim() || customEffects.length === 0 || isNaN(parseFloat(customMixPrice)) || parseFloat(customMixPrice) <= 0) {
      return;
    }

    const selectedIngredients = Object.entries(quantities)
      .filter(([_, quantity]) => quantity > 0)
      .map(([ingredient]) => ingredient);

    const newCustomMix: CustomMix = {
      id: Date.now().toString(),
      name: customMixName.trim(),
      seed: selectedSeed,
      ingredients: selectedIngredients,
      effects: customEffects,
      sellPrice: parseFloat(customMixPrice),
      createdAt: new Date().toISOString()
    };

    const updatedMixes = [...customMixes, newCustomMix];
    setCustomMixes(updatedMixes);
    Cookies.set('customMixes', JSON.stringify(updatedMixes), { expires: 365 });
    setIsCreatingCustomMix(false);
    setCustomMixName("");
    setCustomMixPrice("");
    setCustomEffects([]);
    setShowRecipeResult(false);
  };

  const deleteCustomMix = (id: string) => {
    const updatedMixes = customMixes.filter(mix => mix.id !== id);
    setCustomMixes(updatedMixes);
    Cookies.set('customMixes', JSON.stringify(updatedMixes), { expires: 365 });
  };

  const createMix = () => {
    const selectedIngredients = Object.entries(quantities)
      .filter(([_, quantity]) => quantity > 0)
      .map(([ingredient]) => ingredient);

    const matchedMix = bestMixes.find(mix =>
      mix.seed === selectedSeed &&
      JSON.stringify([...mix.ingredients].sort()) === JSON.stringify([...selectedIngredients].sort())
    );

    setMixCreated(matchedMix || null);
    setShowRecipeResult(true);
  };

  const resetMix = () => {
    setQuantities({});
    setShowRecipeResult(false);
    setMixCreated(null);
    setIsCreatingCustomMix(false);
    setCustomMixName("");
    setCustomMixPrice("");
    setCustomEffects([]);
  };

  const total = calculateTotal();
  const seedPrice = getSelectedSeedPrice();
  const finalPrice = total + seedPrice;

  const discoveredRecipes = bestMixes.filter(mix =>
    mix.seed === selectedSeed &&
    quantities[mix.ingredients[0]] &&
    quantities[mix.ingredients[1]]
  ).length;

  const toggleEffect = (effect: Effect) => {
    if (customEffects.includes(effect)) {
      setCustomEffects(customEffects.filter((e) => e !== effect));
    } else {
      setCustomEffects([...customEffects, effect]);
    }
  };

  return (
    <div className="min-h-screen bg-[#01111b] p-4 md:p-8 text-slate-200">
      <div className="max-w-7xl mx-auto">
        <header className="relative mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <motion.div
              whileHover={{ rotate: 15 }}
              className="bg-gradient-to-r from-[#01628e] to-[#09a1c7] p-3 rounded-xl shadow-lg"
            >
              <BeakerIcon className="w-10 h-10 text-white" />
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#09a1c7] to-[#2feaa8]">
                Schedule 1 Calculator
              </h1>
              <p className="text-[#6ab3c8]">Mix ingredients, create recipes, make money</p>
            </div>
          </motion.div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-6 bg-[#052d41] border-[#0a4158]">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#2feaa8]" />
                <h2 className="text-2xl font-semibold text-[#09a1c7]">Recipes</h2>
              </div>
              <Link href="/recipes">
                <Button className="bg-gradient-to-r from-[#01628e] to-[#09a1c7] hover:from-[#015578] hover:to-[#0891b4] text-white">
                  View All Recipes
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-lg font-medium mb-3 text-[#6ab3c8]">Discovered Recipes</h3>
                <p className="text-[#6ab3c8] mb-4">
                  Discover the best combinations to create potent and profitable drugs.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3 text-[#6ab3c8]">Your Custom Recipes</h3>
                {customMixes.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3 max-h-[180px] overflow-y-auto pr-1">
                    {customMixes.map((mix) => (
                      <Card key={mix.id} className="p-3 bg-[#01111b] border-[#0a4158] hover:border-[#09a1c7]/30 transition-all">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <div className="bg-[#052d41] p-1.5 rounded-full">
                              {seeds.find(seed => seed.name === mix.seed)?.image && (
                                <img
                                  src={seeds.find(seed => seed.name === mix.seed)?.image}
                                  alt={mix.seed}
                                  className="h-6 w-6 object-contain"
                                />
                              )}
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-slate-100">{mix.name}</h4>
                              <p className="text-xs text-[#2feaa8]">${mix.sellPrice}</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {mix.effects && mix.effects.slice(0, 3).map((effect, i) => {
                                  const effectStyle = effectColors[effect] || { text: "text-slate-200", bg: "bg-[#01111b]" };
                                  return (
                                    <span key={i} className={`px-1.5 py-0.5 rounded-full text-[10px] ${effectStyle.text} ${effectStyle.bg}`}>
                                      {effect}
                                    </span>
                                  );
                                })}
                                {mix.effects && mix.effects.length > 3 && (
                                  <span className="text-[10px] text-[#6ab3c8]">+{mix.effects.length - 3}</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-red-400 hover:text-red-300 hover:bg-transparent"
                            onClick={() => deleteCustomMix(mix.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded bg-[#01111b] border border-[#0a4158] text-center">
                    <p className="text-[#6ab3c8] text-sm">
                      You haven't created any custom recipes yet. Try new combinations!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
        {showRecipeResult ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <Card className="p-6 bg-[#052d41] border border-[#0a4158] backdrop-blur-sm">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  {mixCreated ? "Existing Recipe" : "New Recipe"}
                </h2>
                {mixCreated ? (
                  <Badge className="bg-[#2feaa8] text-[#01111b] px-3 py-1">Known Recipe</Badge>
                ) : (
                  <Badge className="bg-yellow-500/70 px-3 py-1">Unknown Recipe</Badge>
                )}
              </div>

              {mixCreated ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <motion.div
                        animate={{
                          scale: [1, 1.05, 1],
                          rotate: [0, 2, -2, 0]
                        }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="w-32 h-32 bg-gradient-to-r from-[#01628e] to-[#09a1c7] rounded-full flex items-center justify-center shadow-lg shadow-[#09a1c7]/20"
                      >
                        <BeakerIcon className="w-16 h-16 text-white" />
                      </motion.div>
                    </div>
                    <h3 className="text-xl font-semibold text-center text-white">
                      {mixCreated.seed}
                    </h3>
                    <div className="flex justify-between text-lg">
                      <span className="text-[#6ab3c8]">Sell Price:</span>
                      <span className="text-[#2feaa8] font-bold">${mixCreated.sellPrice}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="text-[#6ab3c8]">Total Cost:</span>
                      <span className="text-[#09a1c7]">${finalPrice}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="text-[#6ab3c8]">Profit:</span>
                      <span className="text-[#2feaa8] font-bold">${mixCreated.sellPrice - finalPrice}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-[#6ab3c8] flex items-center gap-2">
                      <Flame className="w-5 h-5 text-[#2feaa8]" />
                      Effects:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {mixCreated.effects.map((effect, i) => {
                        const effectStyle = effectColors[effect] || { text: "text-slate-200", bg: "bg-[#01111b]" };
                        return (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium ${effectStyle.text} ${effectStyle.bg} shadow-sm`}
                          >
                            {effect}
                          </motion.span>
                        );
                      })}
                    </div>

                    <h4 className="font-medium text-[#6ab3c8] flex items-center gap-2 mt-6">
                      <Zap className="w-5 h-5 text-[#2feaa8]" />
                      Used Ingredients:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {mixCreated.ingredients.map((ingredientName, idx) => {
                        const ingredient = ingredients.find(i => i.name === ingredientName);
                        return (
                          <div key={idx} className="flex items-center gap-1 bg-[#01111b] px-2 py-1 rounded-md border border-[#0a4158]">
                            {ingredient?.image && (
                              <div className="w-6 h-6 rounded-full bg-[#01111b] p-1 flex items-center justify-center">
                                <img
                                  src={ingredient.image}
                                  alt={ingredientName}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            )}
                            <span className="text-sm text-slate-200">{ingredientName}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  {isCreatingCustomMix ? (
                    <div className="max-w-md mx-auto">
                      <h3 className="font-medium text-[#09a1c7] mb-4">Save New Recipe</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="custom-mix-name" className="text-slate-200 mb-1 block text-left">
                            Recipe Name
                          </Label>
                          <Input
                            id="custom-mix-name"
                            value={customMixName}
                            onChange={(e) => setCustomMixName(e.target.value)}
                            placeholder="Ex: Super Energy Mix"
                            className="bg-[#01111b] border-[#0a4158] text-slate-200"
                          />
                        </div>
                        <div>
                          <Label htmlFor="custom-mix-effects" className="text-slate-200 mb-1 block text-left">
                            Effects
                          </Label>
                          <div className="bg-[#01111b] border border-[#0a4158] rounded-md p-3">
                            <div className="mb-2 text-xs text-[#6ab3c8]">Select the effects for this recipe:</div>
                            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1">
                              {Object.values(Effect).map((effect) => {
                                const isSelected = customEffects.includes(effect);
                                const effectStyle = effectColors[effect];
                                return (
                                  <button
                                    key={effect}
                                    type="button"
                                    onClick={() => toggleEffect(effect)}
                                    className={`px-2 py-1 rounded-full text-xs ${effectStyle.text} ${effectStyle.bg} ${isSelected ? 'ring-2 ring-[#2feaa8]' : ''
                                      }`}
                                  >
                                    {effect}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="custom-mix-price" className="text-slate-200 mb-1 block text-left">
                            Sell Price ($)
                          </Label>
                          <Input
                            id="custom-mix-price"
                            type="number"
                            value={customMixPrice}
                            onChange={(e) => setCustomMixPrice(e.target.value)}
                            placeholder="Ex: 250"
                            className="bg-[#01111b] border-[#0a4158] text-slate-200"
                          />
                        </div>
                        <div className="pt-2">
                          <Button
                            className="bg-gradient-to-r from-[#01628e] to-[#09a1c7] text-white border-none w-full"
                            onClick={saveCustomMix}
                            disabled={!customMixName.trim() || customEffects.length === 0 || isNaN(parseFloat(customMixPrice)) || parseFloat(customMixPrice) <= 0}
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Save Recipe
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-center mb-4">
                        <LightbulbIcon className="w-16 h-16 text-yellow-400 animate-pulse" />
                      </div>
                      <p className="text-slate-200 mb-6">
                        Your mix didn't result in any known drug. Save this recipe!
                      </p>
                      <Button
                        variant="outline"
                        className="border-[#2feaa8] text-[#2feaa8] hover:bg-[#2feaa8]/10"
                        onClick={() => setIsCreatingCustomMix(true)}
                      >
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Create New Recipe
                      </Button>
                    </>
                  )}
                </div>
              )}

              <div className="mt-8 flex justify-center gap-4">
                <Button
                  variant="outline"
                  className="border-[#09a1c7] text-[#6ab3c8] hover:bg-[#09a1c7]/20"
                  onClick={resetMix}
                >
                  Create New Mix
                </Button>
                <Button
                  className="bg-gradient-to-r from-[#01628e] to-[#09a1c7] text-white border-none"
                  onClick={() => setShowRecipeResult(false)}
                >
                  Adjust Ingredients
                </Button>
              </div>
            </Card>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <Card className="p-5 bg-[#052d41] border-[#0a4158] h-full">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-[#09a1c7] flex items-center gap-2">
                    <BeakerIcon className="w-5 h-5" />
                    Laboratory
                  </h2>
                  <div className="text-sm text-[#6ab3c8] flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>{discoveredRecipes} recipes discovered</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4 text-[#6ab3c8]">Select Base Seed</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {seeds.map((seed) => (
                      <motion.div
                        key={seed.name}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className={`p-3 cursor-pointer transition-all bg-[#01111b] border-[#0a4158] ${selectedSeed === seed.name
                            ? "border-[#09a1c7] shadow-lg shadow-[#09a1c7]/20 bg-[#01628e]/20"
                            : "hover:border-[#09a1c7]/50 hover:bg-[#01628e]/10"
                            }`}
                          onClick={() => setSelectedSeed(seed.name)}
                        >
                          {seed.image && (
                            <div className="flex justify-center mb-2">
                              <div className="bg-[#01111b] p-2 rounded-full">
                                <img src={seed.image} alt={seed.name} className="h-12 w-12 object-contain" />
                              </div>
                            </div>
                          )}
                          <h3 className="font-semibold text-center text-slate-100 text-sm">{seed.name}</h3>
                          <p className="text-xs text-[#6ab3c8] text-center mt-1">
                            ${seed.basePrice}
                          </p>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium text-[#6ab3c8]">Add Ingredients</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {ingredients.map((ingredient) => (
                      <motion.div
                        key={ingredient.name}
                        whileHover={{ y: -2 }}
                      >
                        <Card className="p-3 bg-[#01111b] border-[#0a4158] hover:border-[#09a1c7]/30 transition-colors">
                          <div className="flex flex-col items-center">
                            {ingredient.image && (
                              <div className="flex justify-center mb-2">
                                <div className="bg-[#052d41] p-1.5 rounded-full">
                                  <img
                                    src={ingredient.image}
                                    alt={ingredient.name}
                                    className="h-10 w-10 object-contain"
                                  />
                                </div>
                              </div>
                            )}
                            <Label
                              htmlFor={ingredient.name}
                              className="block text-center text-slate-100 text-sm mb-1"
                            >
                              {ingredient.name}
                            </Label>
                            <p className="text-xs text-[#6ab3c8] mb-2">${ingredient.price}</p>

                            <div className="flex items-center">
                              <button
                                type="button"
                                onClick={() => handleQuantityChange(
                                  ingredient.name,
                                  String(Math.max(0, (quantities[ingredient.name] || 0) - 1))
                                )}
                                className="w-8 h-8 rounded-l-md bg-[#052d41] hover:bg-[#01628e] text-slate-100 flex items-center justify-center border border-[#0a4158] border-r-0 transition-colors"
                              >
                                -
                              </button>
                              <div className="w-10 h-8 bg-[#052d41] border-y border-[#0a4158] flex items-center justify-center">
                                <span className="text-slate-100 font-medium">
                                  {quantities[ingredient.name] || 0}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleQuantityChange(
                                  ingredient.name,
                                  String((quantities[ingredient.name] || 0) + 1)
                                )}
                                className="w-8 h-8 rounded-r-md bg-[#052d41] hover:bg-[#01628e] text-slate-100 flex items-center justify-center border border-[#0a4158] border-l-0 transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="p-5 bg-[#052d41] border-[#0a4158] h-full flex flex-col">
                <h2 className="text-2xl font-semibold mb-6 text-[#09a1c7] flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Mix Summary
                </h2>

                <div className="flex-grow space-y-4 mb-8">
                  <div className="p-4 rounded-lg bg-[#01111b] border border-[#0a4158]">
                    <h3 className="text-lg font-medium mb-3 text-[#09a1c7]">
                      {selectedSeed}
                    </h3>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-[#6ab3c8]">Seed Cost:</span>
                        <span className="text-slate-200">${seedPrice}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-[#6ab3c8]">Ingredients Cost:</span>
                        <span className="text-slate-200">${total}</span>
                      </div>

                      <div className="h-px bg-[#0a4158] my-2" />

                      <div className="flex justify-between font-medium">
                        <span className="text-slate-100">Total Cost:</span>
                        <span className="text-slate-100">${finalPrice}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-[#01111b] border border-[#0a4158]">
                    <h3 className="text-lg font-medium mb-3 text-[#09a1c7]">Selected Ingredients</h3>

                    <div className="space-y-2">
                      {Object.entries(quantities)
                        .filter(([_, quantity]) => quantity > 0)
                        .map(([ingredientName, quantity]) => {
                          const ingredient = ingredients.find(i => i.name === ingredientName);
                          const pricePerUnit = ingredient?.price || 0;
                          const totalPrice = pricePerUnit * quantity;

                          return (
                            <div key={ingredientName} className="flex justify-between items-center p-2 rounded-md bg-[#052d41]/50 border border-[#0a4158]/50">
                              <div className="flex items-center gap-2">
                                {ingredient?.image && (
                                  <div className="bg-[#052d41] p-1 rounded-full">
                                    <img
                                      src={ingredient.image}
                                      alt={ingredientName}
                                      className="h-5 w-5 object-contain"
                                    />
                                  </div>
                                )}
                                <span className="text-slate-200">{ingredientName}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="flex flex-col items-end">
                                  <span className="text-xs text-[#6ab3c8]">Unit price: ${pricePerUnit}</span>
                                  <div className="flex items-center gap-1">
                                    <span className="text-sm text-[#6ab3c8]">Quantity:</span>
                                    <span className="text-sm text-slate-200">x{quantity}</span>
                                  </div>
                                </div>
                                <div className="w-16 text-right">
                                  <span className="text-[#2feaa8] font-medium">${totalPrice}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                      {Object.entries(quantities).filter(([_, quantity]) => quantity > 0).length === 0 && (
                        <p className="text-[#6ab3c8] text-sm italic">No ingredients selected yet</p>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  className="bg-gradient-to-r from-[#01628e] to-[#09a1c7] hover:from-[#015578] hover:to-[#0891b4] text-white h-12"
                  onClick={createMix}
                  disabled={Object.entries(quantities).filter(([_, quantity]) => quantity > 0).length === 0}
                >
                  <BeakerIcon className="mr-2 h-5 w-5" />
                  Create Mix
                </Button>
              </Card>
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BeakerIcon, ArrowLeft, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { bestMixes } from "@/lib/best_mixes";
import { effectColors, Effect } from "@/lib/types";
import { ingredients } from "@/lib/ingredients";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
    Collapsible,
    CollapsibleContent,
} from "@/components/ui/collapsible";

export default function RecipesPage() {
    const [activeCategory, setActiveCategory] = useState<string>("all");
    const [selectedIngredient, setSelectedIngredient] = useState<string>("all");
    const [selectedEffect, setSelectedEffect] = useState<Effect | "all">("all");
    const [sortBy, setSortBy] = useState<string>("none");
    const [showFilters, setShowFilters] = useState(false);

    // Calculate min/max prices and set initial price range
    const maxPrice = Math.max(...bestMixes.map(mix => mix.sellPrice));
    const minPrice = Math.min(...bestMixes.map(mix => mix.sellPrice));
    const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
    const [ingredientCount, setIngredientCount] = useState<[number, number]>([0, 8]);

    // Get unique effects and categories from the data
    const allEffects = Array.from(new Set(bestMixes.flatMap(mix => mix.effects)));
    const allCategories = Array.from(
        new Set(bestMixes.map(mix => mix.category || "unknown"))
    ).filter((category): category is string =>
        category !== "unknown" && category !== "profitable"
    );

    // Calculate profitable threshold (top 25% of mixes by price)
    const profitableThreshold = bestMixes
        .map(mix => mix.sellPrice)
        .sort((a, b) => b - a)[Math.floor(bestMixes.length * 0.25)];

    const getCategoryDisplayName = (category: string) => {
        switch (category) {
            case "og-kush": return "OG Kush";
            case "sour-diesel": return "Sour Diesel";
            case "green-crack": return "Green Crack";
            case "granddaddy-purple": return "Granddaddy Purple";
            case "meth": return "Meth";
            case "cocaine": return "Cocaine";
            default: return category;
        }
    };

    const filteredMixes = bestMixes
        .filter(mix => {
            // Category filter
            if (activeCategory !== "all") {
                if (activeCategory === "profitable") {
                    if (mix.sellPrice < profitableThreshold) return false;
                } else {
                    if (mix.category !== activeCategory) return false;
                }
            }

            // Ingredient filter
            if (selectedIngredient !== "all" && !mix.ingredients.includes(selectedIngredient)) {
                return false;
            }

            // Price range filter
            if (mix.sellPrice < priceRange[0] || mix.sellPrice > priceRange[1]) {
                return false;
            }

            // Effect filter
            if (selectedEffect !== "all" && !mix.effects.includes(selectedEffect)) {
                return false;
            }

            // Ingredient count filter
            const count = mix.ingredients.length;
            if (count < ingredientCount[0] || count > ingredientCount[1]) {
                return false;
            }

            return true;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "price-asc":
                    return a.sellPrice - b.sellPrice;
                case "price-desc":
                    return b.sellPrice - a.sellPrice;
                case "effects":
                    return b.effects.length - a.effects.length;
                case "ingredients":
                    return b.ingredients.length - a.ingredients.length;
                case "name":
                    return a.seed.localeCompare(b.seed);
                default:
                    return 0;
            }
        });

    return (
        <div className="min-h-screen bg-[#01111b] p-8 text-slate-200">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-[#01628e] to-[#09a1c7] p-3 rounded-xl shadow-lg">
                            <BeakerIcon className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#09a1c7] to-[#2feaa8]">Best Mixes</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            className="flex items-center gap-2 border-[#09a1c7] text-[#6ab3c8] hover:bg-[#09a1c7]/20"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            Filters
                        </Button>
                        <Link href="/">
                            <Button variant="outline" className="flex items-center gap-2 border-[#09a1c7] text-[#6ab3c8] hover:bg-[#09a1c7]/20">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Lab
                            </Button>
                        </Link>
                    </div>
                </div>

                <Collapsible open={showFilters} className="mb-8">
                    <CollapsibleContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-[#052d41] rounded-lg">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-[#09a1c7]">Price Filters</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm text-[#6ab3c8]">
                                        <span>${priceRange[0]}</span>
                                        <span>${priceRange[1]}</span>
                                    </div>
                                    <Slider
                                        defaultValue={[minPrice, maxPrice]}
                                        max={maxPrice}
                                        min={minPrice}
                                        step={10}
                                        value={priceRange}
                                        onValueChange={(value) => setPriceRange(value as [number, number])}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-[#09a1c7]">Ingredients</h3>
                                <Select value={selectedIngredient} onValueChange={setSelectedIngredient}>
                                    <SelectTrigger className="bg-[#01111b] border-[#0a4158]">
                                        <SelectValue placeholder="Select ingredient" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        {ingredients.map((ingredient) => (
                                            <SelectItem key={ingredient.name} value={ingredient.name}>
                                                {ingredient.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-[#09a1c7]">Effects</h3>
                                <Select value={selectedEffect} onValueChange={(value) => setSelectedEffect(value as Effect | "all")}>
                                    <SelectTrigger className="bg-[#01111b] border-[#0a4158]">
                                        <SelectValue placeholder="Select effect" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        {allEffects.map((effect) => (
                                            <SelectItem key={effect} value={effect}>
                                                {effect}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-[#09a1c7]">Number of Ingredients</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm text-[#6ab3c8]">
                                        <span>{ingredientCount[0]}</span>
                                        <span>{ingredientCount[1]}</span>
                                    </div>
                                    <Slider
                                        defaultValue={[0, 8]}
                                        max={8}
                                        min={0}
                                        step={1}
                                        value={ingredientCount}
                                        onValueChange={(value) => setIngredientCount(value as [number, number])}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-[#09a1c7]">Sort by</h3>
                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="bg-[#01111b] border-[#0a4158]">
                                        <SelectValue placeholder="Select sorting" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">Default</SelectItem>
                                        <SelectItem value="price-asc">Price (Lowest)</SelectItem>
                                        <SelectItem value="price-desc">Price (Highest)</SelectItem>
                                        <SelectItem value="effects">Most Effects</SelectItem>
                                        <SelectItem value="ingredients">Most Ingredients</SelectItem>
                                        <SelectItem value="name">Name</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>

                <div className="mb-8">
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setActiveCategory("all")}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeCategory === "all"
                                ? "bg-[#01628e] text-slate-100"
                                : "bg-[#052d41] text-[#6ab3c8] hover:bg-[#01628e]/50"
                                }`}
                        >
                            All Recipes
                        </button>
                        {allCategories.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeCategory === category
                                    ? "bg-[#01628e] text-slate-100"
                                    : "bg-[#052d41] text-[#6ab3c8] hover:bg-[#01628e]/50"
                                    }`}
                            >
                                {getCategoryDisplayName(category)}
                            </button>
                        ))}
                        <button
                            onClick={() => setActiveCategory("profitable")}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeCategory === "profitable"
                                ? "bg-[#01628e] text-slate-100"
                                : "bg-[#052d41] text-[#6ab3c8] hover:bg-[#01628e]/50"
                                }`}
                        >
                            Most Profitable (Top 25%)
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMixes.map((mix, index) => (
                        <Card key={index} className="p-6 bg-[#052d41] border-[#0a4158] hover:shadow-md hover:shadow-[#09a1c7]/10 transition-shadow">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-[#09a1c7] mb-2">{mix.seed}</h3>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {mix.ingredients.map((ingredientName, idx) => {
                                            const ingredient = ingredients.find(i => i.name === ingredientName);
                                            return ingredient?.image ? (
                                                <div key={idx} className="relative group">
                                                    <div className="bg-[#01111b] p-1 rounded-full">
                                                        <img
                                                            src={ingredient.image}
                                                            alt={ingredientName}
                                                            className="h-8 w-8 object-contain"
                                                        />
                                                    </div>
                                                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-[#01628e] text-slate-100 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                        {ingredientName}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span key={idx} className="px-2 py-1 bg-[#01111b] rounded-md text-xs text-[#6ab3c8]">
                                                    {ingredientName}
                                                </span>
                                            );
                                        })}
                                    </div>
                                    <p className="text-[#6ab3c8] text-sm">{mix.ingredients.join(", ")}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-1 text-[#09a1c7]">Sell Price:</h4>
                                    <p className="text-lg font-semibold text-[#2feaa8]">${mix.sellPrice}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2 text-[#09a1c7]">Effects:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {mix.effects.map((effect, i) => {
                                            const effectStyle = effectColors[effect] || { text: "text-slate-200", bg: "bg-[#01111b]" };
                                            return (
                                                <span
                                                    key={i}
                                                    className={`px-3 py-1.5 rounded-full text-sm font-medium ${effectStyle.text} ${effectStyle.bg} shadow-sm`}
                                                >
                                                    {effect}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
} 
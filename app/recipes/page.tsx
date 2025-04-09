"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BeakerIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { bestMixes } from "@/lib/best_mixes";
import { effectColors } from "@/lib/types";
import { ingredients } from "@/lib/ingredients";

export default function RecipesPage() {
    const [activeCategory, setActiveCategory] = useState<string>("all");

    const filteredMixes = bestMixes.filter(mix => {
        if (activeCategory === "all") return true;
        if (activeCategory === "profitable") {
            const profitableThreshold = 1000;
            return mix.sellPrice >= profitableThreshold;
        }
        return mix.seed.toLowerCase().includes(activeCategory.toLowerCase());
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
                    <Link href="/">
                        <Button variant="outline" className="flex items-center gap-2 border-[#09a1c7] text-[#6ab3c8] hover:bg-[#09a1c7]/20">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Lab
                        </Button>
                    </Link>
                </div>

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
                        <button
                            onClick={() => setActiveCategory("og-kush")}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeCategory === "og-kush"
                                ? "bg-[#01628e] text-slate-100"
                                : "bg-[#052d41] text-[#6ab3c8] hover:bg-[#01628e]/50"
                                }`}
                        >
                            OG Kush
                        </button>
                        <button
                            onClick={() => setActiveCategory("green-crack")}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeCategory === "green-crack"
                                ? "bg-[#01628e] text-slate-100"
                                : "bg-[#052d41] text-[#6ab3c8] hover:bg-[#01628e]/50"
                                }`}
                        >
                            Green Crack
                        </button>
                        <button
                            onClick={() => setActiveCategory("granddaddy-purple")}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeCategory === "granddaddy-purple"
                                ? "bg-[#01628e] text-slate-100"
                                : "bg-[#052d41] text-[#6ab3c8] hover:bg-[#01628e]/50"
                                }`}
                        >
                            Granddaddy Purple
                        </button>
                        <button
                            onClick={() => setActiveCategory("meth")}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeCategory === "meth"
                                ? "bg-[#01628e] text-slate-100"
                                : "bg-[#052d41] text-[#6ab3c8] hover:bg-[#01628e]/50"
                                }`}
                        >
                            Meth
                        </button>
                        <button
                            onClick={() => setActiveCategory("cocaine")}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeCategory === "cocaine"
                                ? "bg-[#01628e] text-slate-100"
                                : "bg-[#052d41] text-[#6ab3c8] hover:bg-[#01628e]/50"
                                }`}
                        >
                            Cocaine
                        </button>
                        <button
                            onClick={() => setActiveCategory("profitable")}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeCategory === "profitable"
                                ? "bg-[#01628e] text-slate-100"
                                : "bg-[#052d41] text-[#6ab3c8] hover:bg-[#01628e]/50"
                                }`}
                        >
                            Most Profitable
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
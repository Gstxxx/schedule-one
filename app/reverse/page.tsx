"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BeakerIcon, ArrowLeft, InfoIcon } from "lucide-react";
import Link from "next/link";

import {
    ALL_EFFECTS,
    BASE_PRICES,
    EFFECT_MULTIPLIERS,
    INGREDIENT_PRICES,
    ITEMS_DATA,
    type Effect,
    type BaseProduct,
    type Ingredient
} from "./constants";
import { findItemSequence, calculateFinalPrice } from "./utils";

const ReverseEngineeringPage = () => {
    const [selectedEffects, setSelectedEffects] = useState<Effect[]>([]);
    const [optimizeFor, setOptimizeFor] = useState<"cost" | "profit">("cost");
    const [baseProduct, setBaseProduct] = useState<BaseProduct>("OG Kush");
    const [maxDepth, setMaxDepth] = useState<number>(5);
    const [isSearching, setIsSearching] = useState(false);
    const [progress, setProgress] = useState<{
        depth: number;
        states: number;
        maxDepth: number;
        elapsedTime: number;
    }>({
        depth: 0,
        states: 0,
        maxDepth: 5,
        elapsedTime: 0,
    });
    const [result, setResult] = useState<{
        sequence: Ingredient[];
        finalEffects: Set<Effect>;
        cost: number;
        profit: number;
    } | null>(null);

    const handleSearch = async () => {
        try {
            console.log("Starting search with:", {
                selectedEffects,
                optimizeFor,
                baseProduct,
                maxDepth
            });

            setIsSearching(true);
            setResult(null);

            const timeout = selectedEffects.length >= 8 ? 300 :
                selectedEffects.length >= 6 ? 180 :
                    selectedEffects.length >= 4 ? 60 : 30;

            console.log("Timeout set to:", timeout);

            const solution = findItemSequence(
                selectedEffects,
                ITEMS_DATA,
                optimizeFor,
                (depth, states, maxDepth, elapsedTime) => {
                    setProgress({ depth, states, maxDepth, elapsedTime });
                    console.log("Progress:", { depth, states, maxDepth, elapsedTime });
                },
                timeout,
                maxDepth
            );

            console.log("Solution found:", solution);
            setResult(solution);
        } catch (error) {
            console.error("Error during search:", error);
        } finally {
            setIsSearching(false);
        }
    };

    const availableEffects = ALL_EFFECTS.filter(effect => !selectedEffects.includes(effect));

    return (
        <div className="min-h-screen bg-[#01111b] p-8 text-slate-200">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-[#01628e] to-[#09a1c7] p-3 rounded-xl shadow-lg">
                            <BeakerIcon className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#09a1c7] to-[#2feaa8]">
                            Reverse Engineering
                        </h1>
                    </div>
                    <Link href="/">
                        <Button variant="outline" className="flex items-center gap-2 border-[#09a1c7] text-[#6ab3c8] hover:bg-[#09a1c7]/20">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Lab
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Sidebar */}
                    <Card className="md:col-span-4 p-6 bg-[#052d41] border-[#0a4158]">
                        <h2 className="text-2xl font-semibold text-[#09a1c7] mb-6">Settings</h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium mb-2 text-[#6ab3c8]">Desired Effects</h3>
                                <Select
                                    onValueChange={(value) => {
                                        console.log("Selected effect:", value);
                                        if (!selectedEffects.includes(value as Effect)) {
                                            setSelectedEffects(prev => [...prev, value as Effect]);
                                        }
                                    }}
                                >
                                    <SelectTrigger className="bg-[#01111b] border-[#0a4158] text-[#6ab3c8]">
                                        <SelectValue placeholder="Select effects" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#052d41] border-[#0a4158]">
                                        {availableEffects.map((effect) => (
                                            <SelectItem key={effect} value={effect} className="text-[#6ab3c8] hover:bg-[#01628e]/50">
                                                {effect} ({(EFFECT_MULTIPLIERS[effect] * 100).toFixed(0)}% multiplier)
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <div className="mt-2 flex flex-wrap gap-2">
                                    {selectedEffects.map((effect) => (
                                        <Badge
                                            key={effect}
                                            variant="secondary"
                                            className="bg-[#01628e] text-slate-100 hover:bg-[#01628e]/80 cursor-pointer"
                                            onClick={() => {
                                                setSelectedEffects(selectedEffects.filter(e => e !== effect));
                                            }}
                                        >
                                            {effect} ×
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium mb-2 text-[#6ab3c8]">Optimization</h3>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => setOptimizeFor("cost")}
                                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${optimizeFor === "cost"
                                            ? "bg-[#01628e] text-slate-100"
                                            : "bg-[#052d41] text-[#6ab3c8] hover:bg-[#01628e]/50"
                                            }`}
                                    >
                                        Cost (Cheapest Recipe)
                                    </button>
                                    <button
                                        onClick={() => setOptimizeFor("profit")}
                                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${optimizeFor === "profit"
                                            ? "bg-[#01628e] text-slate-100"
                                            : "bg-[#052d41] text-[#6ab3c8] hover:bg-[#01628e]/50"
                                            }`}
                                    >
                                        Profit (Most Profitable)
                                    </button>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium mb-2 text-[#6ab3c8]">Base Product</h3>
                                <div className="flex flex-wrap gap-2">
                                    {Object.entries(BASE_PRICES).map(([product, price]) => (
                                        <button
                                            key={product}
                                            onClick={() => setBaseProduct(product as BaseProduct)}
                                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${baseProduct === product
                                                ? "bg-[#01628e] text-slate-100"
                                                : "bg-[#052d41] text-[#6ab3c8] hover:bg-[#01628e]/50"
                                                }`}
                                        >
                                            {product} (${price})
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium mb-2 text-[#6ab3c8]">Maximum Depth</h3>
                                <Input
                                    type="number"
                                    min={1}
                                    max={15}
                                    value={maxDepth}
                                    onChange={(e) => setMaxDepth(Number(e.target.value))}
                                    className="bg-[#01111b] border-[#0a4158] text-[#6ab3c8]"
                                />
                                <p className="text-sm text-[#6ab3c8]/70 mt-1">
                                    The higher the value, the more combinations will be tested (1-15)
                                </p>
                            </div>

                            <Button
                                className="w-full bg-gradient-to-r from-[#01628e] to-[#09a1c7] text-white hover:from-[#01628e]/90 hover:to-[#09a1c7]/90"
                                onClick={handleSearch}
                                disabled={selectedEffects.length === 0 || isSearching}
                            >
                                {isSearching ? "Searching..." : "Find Recipe"}
                            </Button>

                            {selectedEffects.length === 0 && (
                                <p className="text-sm text-red-400">
                                    Please select at least one effect to start
                                </p>
                            )}
                        </div>
                    </Card>

                    {/* Main Content */}
                    <div className="md:col-span-8">
                        {isSearching && (
                            <Card className="p-6 mb-6 bg-[#052d41] border-[#0a4158]">
                                <h3 className="text-xl font-semibold mb-4 text-[#09a1c7]">Search Progress</h3>
                                <Progress
                                    value={(progress.depth / progress.maxDepth) * 100}
                                    className="bg-[#01111b] [&>div]:bg-[#09a1c7]"
                                />
                                <div className="mt-4 grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-[#6ab3c8]/70">Current Steps</p>
                                        <p className="text-lg font-medium text-[#6ab3c8]">{progress.depth}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#6ab3c8]/70">Recipes Explored</p>
                                        <p className="text-lg font-medium text-[#6ab3c8]">{progress.states.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#6ab3c8]/70">Maximum Steps</p>
                                        <p className="text-lg font-medium text-[#6ab3c8]">{progress.maxDepth}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#6ab3c8]/70">Elapsed Time</p>
                                        <p className="text-lg font-medium text-[#6ab3c8]">{progress.elapsedTime.toFixed(1)}s</p>
                                    </div>
                                </div>
                            </Card>
                        )}

                        {result && (
                            <Card className="p-6 bg-[#052d41] border-[#0a4158]">
                                <h3 className="text-2xl font-semibold mb-6 text-[#09a1c7]">Result Found</h3>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-lg font-medium mb-4 text-[#6ab3c8]">Ingredient Sequence</h4>
                                        <div className="space-y-2">
                                            {result.sequence.map((item, index) => (
                                                <div key={index} className="flex justify-between items-center bg-[#01111b] p-3 rounded-lg">
                                                    <span className="text-[#6ab3c8]">{index + 1}. {item}</span>
                                                    <span className="text-[#2feaa8]">${INGREDIENT_PRICES[item]}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-medium mb-4 text-[#6ab3c8]">Cost Analysis</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-[#01111b] p-4 rounded-lg">
                                                <p className="text-sm text-[#6ab3c8]/70">Total Cost</p>
                                                <p className="text-2xl font-semibold text-[#09a1c7]">${result.cost}</p>
                                            </div>
                                            <div className="bg-[#01111b] p-4 rounded-lg">
                                                <p className="text-sm text-[#6ab3c8]/70">Potential Profit</p>
                                                <p className="text-2xl font-semibold text-[#2feaa8]">${result.profit}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-medium mb-4 text-[#6ab3c8]">Final Effects</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {Array.from(result.finalEffects).map((effect) => (
                                                <Badge
                                                    key={effect}
                                                    variant="outline"
                                                    className="bg-[#01111b] text-[#6ab3c8] border-[#0a4158]"
                                                >
                                                    {effect} ({(EFFECT_MULTIPLIERS[effect] * 100).toFixed(0)}%)
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-medium mb-4 text-[#6ab3c8]">Base Product Prices</h4>
                                        <div className="space-y-2">
                                            {Object.keys(BASE_PRICES).map((product) => {
                                                const finalPrice = calculateFinalPrice(product as BaseProduct, result.finalEffects);
                                                const profit = finalPrice - result.cost;
                                                return (
                                                    <div key={product} className="flex justify-between items-center bg-[#01111b] p-3 rounded-lg">
                                                        <span className="text-[#6ab3c8]">{product}</span>
                                                        <div className="text-right">
                                                            <span className="text-[#09a1c7] mr-4">${finalPrice.toFixed(2)}</span>
                                                            <span className={profit > 0 ? "text-[#2feaa8]" : "text-red-400"}>
                                                                {profit > 0 ? "+" : ""}{profit.toFixed(2)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        )}

                        {!isSearching && !result && selectedEffects.length > 0 && (
                            <Alert className="bg-[#052d41] border-[#0a4158] text-[#6ab3c8]">
                                <InfoIcon className="h-4 w-4" />
                                <AlertTitle>Tip</AlertTitle>
                                <AlertDescription>
                                    Select the desired effects and click "Find Recipe" to start the search.
                                    {selectedEffects.length >= 4 && (
                                        <> The search may take longer with {selectedEffects.length} selected effects.</>
                                    )}
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReverseEngineeringPage; 
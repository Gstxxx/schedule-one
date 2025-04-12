import {
  Effect,
  BaseProduct,
  Ingredient,
  ItemData,
  EFFECT_MULTIPLIERS,
  BASE_PRICES,
  INGREDIENT_PRICES,
} from "./constants";

export interface SearchState {
  bestSolution: {
    sequence: Ingredient[];
    finalEffects: Set<Effect>;
    cost: number;
    profit: number;
  } | null;
  bestValue: number;
  visited: Set<string>;
  startTime: number;
}

export interface ProgressCallback {
  (depth: number, states: number, maxDepth: number, elapsedTime: number): void;
}

export function applyItem(
  currentEffects: Set<Effect>,
  itemName: Ingredient,
  itemsData: ItemData
): Set<Effect> {
  const newEffects = new Set(currentEffects);

  // 1) Add the item's base effect
  newEffects.add(itemsData[itemName].baseEffect as Effect);

  // 2) Apply the replacements
  for (const [oldEffect, newEffect] of itemsData[itemName].replacements) {
    if (newEffects.has(oldEffect as Effect)) {
      newEffects.delete(oldEffect as Effect);
      newEffects.add(newEffect as Effect);
    }
  }

  return newEffects;
}

export function calculateRecipeCost(sequence: Ingredient[]): number {
  return sequence.reduce((total, item) => total + INGREDIENT_PRICES[item], 0);
}

export function calculateFinalPrice(
  baseProduct: BaseProduct,
  effects: Set<Effect>
): number {
  const totalMultiplier = Array.from(effects).reduce(
    (sum, effect) => sum + (EFFECT_MULTIPLIERS[effect] || 0),
    0
  );
  return BASE_PRICES[baseProduct] * (1 + totalMultiplier);
}

export function findItemSequence(
  requiredEffects: Effect[],
  itemsData: ItemData,
  optimizeFor: "cost" | "profit" = "cost",
  progressCallback?: ProgressCallback,
  timeout: number = 30,
  maxDepth?: number
): {
  sequence: Ingredient[];
  finalEffects: Set<Effect>;
  cost: number;
  profit: number;
} | null {
  const searchState: SearchState = {
    bestSolution: null,
    bestValue: optimizeFor === "cost" ? Infinity : -Infinity,
    visited: new Set(),
    startTime: Date.now(),
  };

  const requiredSet = new Set(requiredEffects);
  const queue: Array<{
    effects: Set<Effect>;
    path: Ingredient[];
    cost: number;
  }> = [{ effects: new Set(), path: [], cost: 0 }];

  let statesExplored = 0;
  let currentDepth = 0;

  while (queue.length > 0) {
    // Check timeout
    if ((Date.now() - searchState.startTime) / 1000 > timeout) {
      break;
    }

    const { effects, path, cost } = queue.shift()!;

    // Update progress
    if (path.length > currentDepth) {
      currentDepth = path.length;
      progressCallback?.(
        currentDepth,
        statesExplored,
        maxDepth || requiredEffects.length * 2,
        (Date.now() - searchState.startTime) / 1000
      );
    }

    statesExplored++;
    if (statesExplored % 1000 === 0) {
      progressCallback?.(
        currentDepth,
        statesExplored,
        maxDepth || requiredEffects.length * 2,
        (Date.now() - searchState.startTime) / 1000
      );
    }

    // Check if we have all required effects
    if (Array.from(requiredSet).every((effect) => effects.has(effect))) {
      // Calculate profits for each base product
      const bestProduct = Object.keys(BASE_PRICES).reduce(
        (best, product) => {
          const price = calculateFinalPrice(product as BaseProduct, effects);
          const profit = price - cost;
          return profit > best.profit ? { product, profit } : best;
        },
        { product: "", profit: -Infinity }
      );

      // Update best solution based on optimization criteria
      if (
        (optimizeFor === "cost" && cost < searchState.bestValue) ||
        (optimizeFor === "profit" && bestProduct.profit > searchState.bestValue)
      ) {
        searchState.bestSolution = {
          sequence: path,
          finalEffects: effects,
          cost,
          profit: bestProduct.profit,
        };
        searchState.bestValue =
          optimizeFor === "cost" ? cost : bestProduct.profit;
      }
      continue;
    }

    // Skip if we've exceeded max depth
    if (maxDepth && path.length >= maxDepth) {
      continue;
    }

    // Expand by applying each item
    for (const itemName of Object.keys(itemsData) as Ingredient[]) {
      const nextEffects = applyItem(effects, itemName, itemsData);
      const nextKey = Array.from(nextEffects).sort().join(",");

      if (!searchState.visited.has(nextKey)) {
        searchState.visited.add(nextKey);
        const nextCost = cost + INGREDIENT_PRICES[itemName];
        queue.push({
          effects: nextEffects,
          path: [...path, itemName],
          cost: nextCost,
        });
      }
    }
  }

  return searchState.bestSolution;
}

import { CATEGORIES, type CategoryKey } from "@totem/types";

/**
 * Fast category matching using aliases and brands.
 * Returns null if no match found (needs LLM fallback).
 */
export function matchCategory(input: string): CategoryKey | null {
  const normalized = input.toLowerCase().trim();

  // Try each category
  for (const [key, config] of Object.entries(CATEGORIES)) {
    // Exact key match
    if (normalized === key) {
      return key as CategoryKey;
    }

    // Check if any alias is present in the message
    for (const alias of config.aliases) {
      if (normalized.includes(alias)) {
        return key as CategoryKey;
      }
    }

    // Check if any brand is mentioned
    for (const brand of config.brands) {
      if (normalized.includes(brand)) {
        return key as CategoryKey;
      }
    }
  }

  return null; // No match - need LLM
}

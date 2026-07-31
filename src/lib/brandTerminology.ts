const PAIRS: [string, string][] = [
  ["Житловий комплекс «Надрічний»", "Житловий масив «Надрічний»"],
  ["житловий комплекс «Надрічний»", "житловий масив «Надрічний»"],
  ["Житловий комплекс", "Житловий масив"],
  ["житловий комплекс", "житловий масив"],
  ["ЖК «Надрічний»", "житловий масив «Надрічний»"],
  ['ЖК "Надрічний"', "житловий масив «Надрічний»"],
  ["ЖК “Надрічний”", "житловий масив «Надрічний»"],
  ["ЖК Надрічний", "Житловий масив Надрічний"],
  ["у ЖК «Надрічний»", "у житловому масиві «Надрічний»"],
  ["в ЖК «Надрічний»", "в житловому масиві «Надрічний»"],
  ["у ЖК", "у житловому масиві"],
  ["в ЖК", "в житловому масиві"],
  ["Переваги комплексу", "Переваги житлового масиву"],
  ["переваг комплексу", "переваг житлового масиву"],
  ["Комплекс ", "Житловий масив "],
  ["комплекс ", "житловий масив "],
  [" комплексу", " житлового масиву"],
];

export function applyBrandTerminology(text?: string | null): string | undefined {
  if (!text) return text ?? undefined;
  let result = text;
  for (const [from, to] of PAIRS) {
    result = result.split(from).join(to);
  }
  return result;
}

export function applyBrandTerminologyDeep<T>(value: T): T {
  if (typeof value === "string") {
    return (applyBrandTerminology(value) ?? value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => applyBrandTerminologyDeep(item)) as T;
  }

  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) {
      out[key] = applyBrandTerminologyDeep(item);
    }
    return out as T;
  }

  return value;
}

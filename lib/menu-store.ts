import { categories, dishes, type Dish, type DishCategory } from "@/lib/data";

export const MENU_KEY = "altra-menu-dishes";
export const MENU_UPDATED_EVENT = "altra-menu-dishes-updated";

const dishCategories = new Set<string>(categories.filter((category) => category !== "All"));

function isDish(value: unknown): value is Dish {
  if (!value || typeof value !== "object") return false;
  const dish = value as Partial<Dish>;
  return typeof dish.id === "string" &&
    typeof dish.name === "string" &&
    typeof dish.description === "string" &&
    Number.isFinite(dish.price) && Number(dish.price) >= 0 &&
    typeof dish.image === "string" &&
    dishCategories.has(String(dish.category));
}

/** Read menu overrides in the browser; static site data remains the SSR fallback. */
export function readMenuDishes(): Dish[] {
  if (typeof window === "undefined") return dishes;
  try {
    const raw = localStorage.getItem(MENU_KEY);
    if (!raw) return dishes;
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.every(isDish)
      ? parsed.map((dish) => ({ ...dish, available: dish.available !== false }))
      : dishes;
  } catch {
    return dishes;
  }
}

export function saveMenuDishes(next: Dish[]) {
  if (typeof window === "undefined") return;
  const cleaned = next.map((dish) => ({ ...dish, available: dish.available !== false }));
  localStorage.setItem(MENU_KEY, JSON.stringify(cleaned));
  window.dispatchEvent(new CustomEvent(MENU_UPDATED_EVENT, { detail: cleaned }));
}

export function getAvailableMenuDishes(items: Dish[] = readMenuDishes()): Dish[] {
  return items.filter((dish) => dish.available !== false);
}

export function isDishCategory(value: string): value is DishCategory {
  return dishCategories.has(value);
}

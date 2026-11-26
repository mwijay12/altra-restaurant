import { categories, dishes, type Dish, type DishCategory } from "@/lib/data";

export const MENU_KEY = "altra-menu-dishes";
export const MENU_UPDATED_EVENT = "altra-menu-dishes-updated";

const dishCategories = new Set<string>(categories.filter((category) => category !== "All"));

function isDish(value: unknown): value is Dish {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const dish = value as Partial<Dish>;

  return typeof dish.id === "string" && dish.id.trim().length > 0 && dish.id.length <= 120 &&
    typeof dish.name === "string" && dish.name.trim().length > 0 && dish.name.length <= 100 &&
    typeof dish.description === "string" && dish.description.length <= 500 &&
    typeof dish.price === "number" && Number.isFinite(dish.price) && dish.price >= 0 &&
    typeof dish.image === "string" && dish.image.trim().length > 0 && dish.image.length <= 2048 &&
    dishCategories.has(String(dish.category)) &&
    (dish.tag === undefined || typeof dish.tag === "string") &&
    (dish.featured === undefined || typeof dish.featured === "boolean") &&
    (dish.available === undefined || typeof dish.available === "boolean");
}

function isUsableMenu(value: unknown): value is Dish[] {
  if (!Array.isArray(value) || value.length === 0 || value.length > 100 || !value.every(isDish)) {
    return false;
  }
  return new Set(value.map((dish) => dish.id)).size === value.length;
}

/** Read menu overrides in the browser; static site data remains the SSR fallback. */
export function readMenuDishes(): Dish[] {
  if (typeof window === "undefined") return dishes;
  try {
    const raw = localStorage.getItem(MENU_KEY);
    if (!raw) return dishes;
    const parsed: unknown = JSON.parse(raw);
    return isUsableMenu(parsed)
      ? parsed.map((dish) => ({ ...dish, available: dish.available !== false }))
      : dishes;
  } catch {
    // Storage may be disabled or contain stale/corrupt demo data. Keep the
    // public menu usable with its bundled content instead of crashing render.
    return dishes;
  }
}

export function saveMenuDishes(next: Dish[]) {
  if (typeof window === "undefined") return;
  const cleaned = next.map((dish) => ({ ...dish, available: dish.available !== false }));
  try {
    localStorage.setItem(MENU_KEY, JSON.stringify(cleaned));
  } catch {
    // The menu remains usable for this session even if browser storage is full
    // or unavailable; the custom event still updates mounted views.
  }
  window.dispatchEvent(new CustomEvent(MENU_UPDATED_EVENT, { detail: cleaned }));
}

export function getAvailableMenuDishes(items: Dish[] = readMenuDishes()): Dish[] {
  return items.filter((dish) => dish.available !== false);
}

export function isDishCategory(value: string): value is DishCategory {
  return dishCategories.has(value);
}

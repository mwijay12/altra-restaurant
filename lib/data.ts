/* ─────────────────────────────────────────────────────────────
   Altra · shared content layer
   Prices are in Tanzanian Shillings (TZS), Dar es Salaam.
   ───────────────────────────────────────────────────────────── */

export type DishCategory =
  | "Burgers"
  | "Pizza"
  | "Sushi"
  | "Tacos"
  | "Ramen"
  | "Desserts";

export interface Dish {
  id: string;
  name: string;
  description: string;
  /** price in TZS */
  price: number;
  category: DishCategory;
  image: string;
  tag?: string;
  featured?: boolean;
}

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export const categories: Array<"All" | DishCategory> = [
  "All",
  "Burgers",
  "Pizza",
  "Sushi",
  "Tacos",
  "Ramen",
  "Desserts",
];

export const dishes: Dish[] = [
  {
    id: "smash-classic",
    name: "Altra Smash Classic",
    description:
      "Double smashed patties, burnt-butter mayo, dill pickles, soft potato bun.",
    price: 8500,
    category: "Burgers",
    image: img("photo-1550547660-d9450f859349"),
    tag: "Bestseller",
    featured: true,
  },
  {
    id: "swati-grill",
    name: "Swati Grill Burger",
    description:
      "Coconut-clove glaze, charred mango slaw, nyawa-spiced mayo — a Dar twist.",
    price: 9800,
    category: "Burgers",
    image: img("photo-1568901346375-23c9450c58cd"),
    tag: "Local twist",
    featured: true,
  },
  {
    id: "smokehouse-stack",
    name: "Smokehouse Stack",
    description:
      "BBQ glaze, crispy onion tangle, smoked cheddar, bacon jam.",
    price: 9500,
    category: "Burgers",
    image: img("photo-1571091718767-18b5b1457add"),
  },
  {
    id: "margherita-verace",
    name: "Margherita Verace",
    description:
      "San Marzano tomato, fior di latte, torn basil, 48-hour dough.",
    price: 12000,
    category: "Pizza",
    image: img("photo-1513104890138-7c749659a591"),
    featured: true,
  },
  {
    id: "pepperoni-fest",
    name: "PepperoniFest",
    description:
      "Double cup-and-char pepperoni, hot honey drizzle, mozzarella blanket.",
    price: 13500,
    category: "Pizza",
    image: img("photo-1565299624946-b28f40a0ae38"),
    tag: "Spicy",
  },
  {
    id: "salmon-aburi",
    name: "Salmon Aburi Roll",
    description:
      "Torched salmon belly, avocado, yuzu soy, crisped rice.",
    price: 18000,
    category: "Sushi",
    image: img("photo-1579871494447-9811cf80d66c"),
    tag: "Chef's pick",
    featured: true,
  },
  {
    id: "rainbow-maki",
    name: "Rainbow Maki",
    description:
      "Eight-piece maki draped in tuna, salmon and avocado ribbons.",
    price: 16500,
    category: "Sushi",
    image: img("photo-1579584425555-c3ce17fd4351"),
  },
  {
    id: "baja-fish-tacos",
    name: "Baja Fish Tacos",
    description:
      "Beer-battered kingfish, lime crema, pickled onion, cabbage shred.",
    price: 7500,
    category: "Tacos",
    image: img("photo-1599974579688-8dbdd335c77f"),
    featured: true,
  },
  {
    id: "street-tacos",
    name: "Mshek Street Tacos",
    description:
      "Mshek-grilled beef, salsa verde, coriander, double tortilla.",
    price: 6500,
    category: "Tacos",
    image: img("photo-1565299507177-b0ac66763828"),
    tag: "New",
  },
  {
    id: "tonkotsu-classic",
    name: "Tonkotsu Classic",
    description:
      "18-hour pork broth, chashu belly, ajitama egg, black garlic oil.",
    price: 11000,
    category: "Ramen",
    image: img("photo-1569718212165-3a8278d5f624"),
    featured: true,
  },
  {
    id: "spicy-miso",
    name: "Spicy Miso Ramen",
    description:
      "Red miso tare, chilli oil, sweetcorn, butter-smoked corn silk.",
    price: 11500,
    category: "Ramen",
    image: img("photo-1585032226651-759b368d7246"),
    tag: "Spicy",
  },
  {
    id: "choco-lava",
    name: "Molten Choco Lava",
    description:
      "70% dark core, salted vanilla ice cream, cocoa nib crunch.",
    price: 6000,
    category: "Desserts",
    image: img("photo-1551024506-0bccd828d307"),
    featured: true,
  },
  {
    id: "berry-pancakes",
    name: "Berry Cloud Pancakes",
    description:
      "Soufflé stack, warm berry compote, whipped mascarpone cloud.",
    price: 7000,
    category: "Desserts",
    image: img("photo-1567620905732-2d1ec7ab7445"),
  },
  {
    id: "strawberry-waffle",
    name: "Strawberry Waffle Cloud",
    description:
      "Liege waffle, roasted strawberries, white chocolate snow.",
    price: 5500,
    category: "Desserts",
    image: img("photo-1565958011703-44f9829ba01a"),
  },
];

export const featuredDishes = dishes.filter((d) => d.featured);

export interface Testimonial {
  quote: string;
  name: string;
  area: string;
  avatar: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Ordered at 1pm, eating by 1:28. The burger was still steaming — I don't understand the physics, but I'm not complaining.",
    name: "Amina M.",
    area: "Mikocheni",
    avatar: img("photo-1494790108377-be9c29b29330", 160),
    rating: 5,
  },
  {
    quote:
      "Altra is the only app our whole building agrees on. Sushi Fridays have become sacred.",
    name: "Juma K.",
    area: "Masaki",
    avatar: img("photo-1507003211169-0a1dd7228f2d", 160),
    rating: 5,
  },
  {
    quote:
      "The ramen tastes like the restaurant moved into my house. Thirty minutes, hot broth, zero drama.",
    name: "Zawadi N.",
    area: "Sinza",
    avatar: img("photo-1534528741775-53994a69daeb", 160),
    rating: 5,
  },
  {
    quote:
      "Free delivery on my first order got me. The 30-minute guarantee keeps me. Ten orders in, zero cold fries.",
    name: "Frank O.",
    area: "Kariakoo",
    avatar: img("photo-1506794778202-cad84cf45f1d", 160),
    rating: 5,
  },
];

export function formatTZS(amount: number) {
  return new Intl.NumberFormat("en-TZ", {
    style: "currency",
    currency: "TZS",
    maximumFractionDigits: 0,
  }).format(amount);
}

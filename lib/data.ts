/* ─────────────────────────────────────────────────────────────
   Altra · shared content layer
   Prices are in Tanzanian Shillings (TZS), Dar es Salaam.
   Menu photos are self-hosted WebP in /public/images/food/.
   ───────────────────────────────────────────────────────────── */

export type DishCategory =
  | "Choma & Grill"
  | "Rice & Pilau"
  | "Sides & Snacks"
  | "Seafood"
  | "Soups & Stews"
  | "Drinks & Desserts";

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

const food = (slug: string) => `/images/food/${slug}.webp`;

export const categories: Array<"All" | DishCategory> = [
  "All",
  "Choma & Grill",
  "Rice & Pilau",
  "Sides & Snacks",
  "Seafood",
  "Soups & Stews",
  "Drinks & Desserts",
];

export const dishes: Dish[] = [
  {
    id: "chipsi-mayai",
    name: "Chipsi Mayai",
    description:
      "Golden fries folded through a soft egg omelette, kachumbari on the side — the Dar classic.",
    price: 8000,
    category: "Sides & Snacks",
    image: food("chipsi-mayai"),
    tag: "Bestseller",
    featured: true,
  },
  {
    id: "pilau-beef",
    name: "Pilau Beef",
    description:
      "Basmati simmered in beef broth with cinnamon, cardamom and cloves, served with kachumbari.",
    price: 12000,
    category: "Rice & Pilau",
    image: food("pilau-beef"),
    featured: true,
  },
  {
    id: "wali-mahindi",
    name: "Wali Mahindi",
    description:
      "Fluffy white rice steamed with sweet corn kernels, coconut milk and a whisper of cardamom.",
    price: 7000,
    category: "Rice & Pilau",
    image: food("wali-mahindi"),
  },
  {
    id: "mishkaki",
    name: "Mishkaki",
    description:
      "Charcoal-grilled beef skewers in a tangy tamarind glaze, lemon wedges and chilli on the side.",
    price: 10000,
    category: "Choma & Grill",
    image: food("mishkaki"),
    tag: "Chef's pick",
    featured: true,
  },
  {
    id: "nyama-choma",
    name: "Nyama Choma",
    description:
      "Slow-grilled beef over charcoal, rubbed with nyawa and garlic, served sizzling with ugali.",
    price: 15000,
    category: "Choma & Grill",
    image: food("nyama-choma"),
    featured: true,
  },
  {
    id: "ugali-sukuma",
    name: "Ugali & Sukuma Wiki",
    description:
      "Firm maize ugali with sautéed collard greens, tomato and onion — the Tanzanian staple.",
    price: 9000,
    category: "Choma & Grill",
    image: food("ugali-sukuma"),
    featured: true,
  },
  {
    id: "kachumbari",
    name: "Kachumbari",
    description:
      "Fresh tomato, red onion and avocado tossed with lime and a pinch of chilli.",
    price: 3000,
    category: "Sides & Snacks",
    image: food("kachumbari"),
  },
  {
    id: "samosa",
    name: "Samosa",
    description:
      "Crisp golden triangles, spiced beef and potato filling, served with tamarind chutney.",
    price: 4000,
    category: "Sides & Snacks",
    image: food("samosa"),
    tag: "New",
  },
  {
    id: "mahamri",
    name: "Mahamri",
    description:
      "Coconut doughnuts, pillowy and golden, dusted with sugar — best with chai.",
    price: 2500,
    category: "Drinks & Desserts",
    image: food("mahamri"),
  },
  {
    id: "vitumbua",
    name: "Vitumbua",
    description:
      "Rice pancakes, crisp-edged and soft in the middle, served with coconut syrup.",
    price: 3000,
    category: "Drinks & Desserts",
    image: food("vitumbua"),
  },
  {
    id: "samaki",
    name: "Samaki wa Kukaanga",
    description:
      "Whole lake fish, fried crisp in a light batter, with lemon and kachumbari.",
    price: 14000,
    category: "Seafood",
    image: food("samaki"),
    featured: true,
  },
  {
    id: "mtori",
    name: "Mtori",
    description:
      "Slow-cooked green banana soup with beef, coconut milk and a squeeze of lime.",
    price: 8000,
    category: "Soups & Stews",
    image: food("mtori"),
    featured: true,
  },
  {
    id: "kuku",
    name: "Kuku wa Kukaanga",
    description:
      "Chicken marinated in garlic and lime, fried golden and served with chips.",
    price: 11000,
    category: "Choma & Grill",
    image: food("kuku"),
  },
  {
    id: "maharage",
    name: "Maharage",
    description:
      "Beans simmered in tomato and coconut milk with a gentle chilli warmth.",
    price: 6000,
    category: "Soups & Stews",
    image: food("maharage"),
  },
  {
    id: "ndizi",
    name: "Ndizi za Kuchemka",
    description:
      "Green bananas boiled until tender, served with a knob of butter and salt.",
    price: 4500,
    category: "Sides & Snacks",
    image: food("ndizi"),
  },
  {
    id: "madafu",
    name: "Madafu",
    description:
      "Fresh coconut, cracked open and served chilled with a straw.",
    price: 3500,
    category: "Drinks & Desserts",
    image: food("madafu"),
  },
  {
    id: "chai",
    name: "Chai ya Tangawizi",
    description:
      "Spiced ginger tea, brewed strong with milk and a touch of honey.",
    price: 2000,
    category: "Drinks & Desserts",
    image: food("chai"),
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
      "Ordered at 1pm, eating by 1:28. The pilau was still steaming — I don't understand the physics, but I'm not complaining.",
    name: "Amina M.",
    area: "Mikocheni",
    avatar: img("photo-1494790108377-be9c29b29330", 160),
    rating: 5,
  },
  {
    quote:
      "Altra is the only app our whole building agrees on. Mishkaki Fridays have become sacred.",
    name: "Juma K.",
    area: "Masaki",
    avatar: img("photo-1507003211169-0a1dd7228f2d", 160),
    rating: 5,
  },
  {
    quote:
      "The mtori tastes like my grandmother's kitchen moved into my house. Thirty minutes, hot soup, zero drama.",
    name: "Zawadi N.",
    area: "Sinza",
    avatar: img("photo-1534528741775-53994a69daeb", 160),
    rating: 5,
  },
  {
    quote:
      "Free delivery on my first order got me. The 30-minute guarantee keeps me. Ten orders in, zero cold chipsi.",
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

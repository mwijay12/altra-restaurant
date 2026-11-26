"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Check, Eye, EyeOff, Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { categories, type Dish, type DishCategory } from "@/lib/data";
import { formatTZS } from "@/lib/data";

interface DraftDish {
  id: string;
  name: string;
  description: string;
  price: string;
  category: DishCategory;
  image: string;
  tag: string;
  featured: boolean;
  available: boolean;
}

const blankDish: DraftDish = {
  id: "",
  name: "",
  description: "",
  price: "",
  category: "Choma & Grill",
  image: "/images/food/mishkaki.webp",
  tag: "",
  featured: false,
  available: true,
};

function toDraft(dish: Dish): DraftDish {
  return {
    id: dish.id,
    name: dish.name,
    description: dish.description,
    price: String(dish.price),
    category: dish.category,
    image: dish.image,
    tag: dish.tag ?? "",
    featured: Boolean(dish.featured),
    available: dish.available !== false,
  };
}

function makeId(name: string) {
  return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `dish-${Date.now()}`;
}

export function AdminMenuManager({ items, onChange }: { items: Dish[]; onChange: (items: Dish[]) => void }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [draft, setDraft] = useState<DraftDish>(blankDish);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return items.filter((item) => !term || `${item.name} ${item.category} ${item.description}`.toLowerCase().includes(term));
  }, [items, query]);

  const beginCreate = () => {
    setEditingId(null);
    setIsCreating(true);
    setDraft(blankDish);
    setError("");
  };

  const beginEdit = (dish: Dish) => {
    setEditingId(dish.id);
    setIsCreating(false);
    setDraft(toDraft(dish));
    setError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsCreating(false);
    setDraft(blankDish);
    setError("");
  };

  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const price = Number(draft.price);
    if (!draft.name.trim() || !draft.description.trim() || !draft.image.trim() || !Number.isFinite(price) || price <= 0) {
      setError("Add a name, description, image path, and a price greater than zero.");
      return;
    }
    const id = editingId ?? makeId(draft.name);
    if (!editingId && items.some((item) => item.id === id)) {
      setError("A dish with this name already exists. Edit the existing dish instead.");
      return;
    }
    const nextDish: Dish = {
      id,
      name: draft.name.trim(),
      description: draft.description.trim(),
      price: Math.round(price),
      category: draft.category,
      image: draft.image.trim(),
      tag: draft.tag.trim() || undefined,
      featured: draft.featured,
      available: draft.available,
    };
    onChange(editingId ? items.map((item) => item.id === editingId ? nextDish : item) : [nextDish, ...items]);
    cancelEdit();
  };

  const remove = (dish: Dish) => {
    if (items.length < 2) return;
    if (!window.confirm(`Remove ${dish.name} from the Altra menu?`)) return;
    onChange(items.filter((item) => item.id !== dish.id));
    if (editingId === dish.id) cancelEdit();
  };

  return (
    <div className="gd-analytics">
      <div className="gd-metric-grid">
        <div className="gd-metric"><span className="gd-metric-label">Menu items</span><strong className="gd-metric-value">{items.length}</strong><small>saved in this browser</small></div>
        <div className="gd-metric"><span className="gd-metric-label">Live dishes</span><strong className="gd-metric-value">{items.filter((item) => item.available !== false).length}</strong><small>visible to visitors</small></div>
        <div className="gd-metric"><span className="gd-metric-label">Featured</span><strong className="gd-metric-value">{items.filter((item) => item.featured && item.available !== false).length}</strong><small>shown on homepage</small></div>
        <div className="gd-metric"><span className="gd-metric-label">Categories</span><strong className="gd-metric-value">{new Set(items.map((item) => item.category)).size}</strong><small>Tanzanian menu</small></div>
      </div>

      <section className="gd-panel gd-menu-panel">
        <header className="gd-panel-head">
          <div><h2>Altra dishes</h2><p>Changes appear on the public menu and homepage right away.</p></div>
          {!editingId && !isCreating && <button className="gd-primary" type="button" onClick={beginCreate}><Plus aria-hidden="true" />Add dish</button>}
        </header>

        {editingId !== null || isCreating ? (
          <form className="gd-menu-form" onSubmit={save}>
            <h3 className="gd-menu-form-title gd-menu-full">{editingId ? "Edit dish" : "Add a dish"}</h3>
            <label>Dish name<input autoFocus required maxLength={60} value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} placeholder="e.g. Mishkaki ya Kuku" /></label>
            <label>Price · TZS<input required type="number" min="1" step="500" value={draft.price} onChange={(event) => setDraft({ ...draft, price: event.target.value })} placeholder="10000" /></label>
            <label>Category<select value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value as DishCategory })}>{categories.filter((category) => category !== "All").map((category) => <option key={category}>{category}</option>)}</select></label>
            <label>Tag (optional)<input maxLength={24} value={draft.tag} onChange={(event) => setDraft({ ...draft, tag: event.target.value })} placeholder="Bestseller" /></label>
            <label className="gd-menu-full">Description<textarea required maxLength={180} value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} placeholder="Describe the dish for customers" /></label>
            <label className="gd-menu-full">Image path<input required value={draft.image} onChange={(event) => setDraft({ ...draft, image: event.target.value })} placeholder="/images/food/mishkaki.webp" /><small>Use a public image path such as /images/food/chai.webp.</small></label>
            <div className="gd-menu-toggles">
              <label><input type="checkbox" checked={draft.featured} onChange={(event) => setDraft({ ...draft, featured: event.target.checked })} /> Feature on homepage</label>
              <label><input type="checkbox" checked={draft.available} onChange={(event) => setDraft({ ...draft, available: event.target.checked })} /> Available on menu</label>
            </div>
            {error && <p className="gd-menu-error" role="alert">{error}</p>}
            <div className="gd-menu-form-actions">
              <button className="gd-secondary" type="button" onClick={cancelEdit}><X aria-hidden="true" />Cancel</button>
              <button className="gd-primary" type="submit"><Save aria-hidden="true" />Save dish</button>
            </div>
          </form>
        ) : null}

        <div className="gd-menu-toolbar">
          <p>{filtered.length} {filtered.length === 1 ? "dish" : "dishes"} · prices in TZS</p>
          <label className="gd-search"><input aria-label="Search menu dishes" placeholder="Search dishes" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
        </div>
        <div className="gd-menu-list">
          {filtered.map((dish) => (
            <article className="gd-menu-row" key={dish.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="gd-menu-image" src={dish.image} alt="" />
              <div className="gd-menu-info"><strong>{dish.name}</strong><small>{dish.category} · {dish.description}</small></div>
              <strong className="gd-menu-price">{formatTZS(dish.price)}</strong>
              <div className="gd-menu-state">
                {dish.available === false ? <span><EyeOff aria-hidden="true" />Hidden</span> : <span><Eye aria-hidden="true" />Live</span>}
                {dish.featured && <span><Check aria-hidden="true" />Featured</span>}
              </div>
              <div className="gd-menu-row-actions">
                <button className="gd-icon-button" type="button" aria-label={`Edit ${dish.name}`} title={`Edit ${dish.name}`} onClick={() => beginEdit(dish)}><Pencil aria-hidden="true" /></button>
                <button className="gd-icon-button gd-menu-delete" type="button" aria-label={`Remove ${dish.name}`} title={`Remove ${dish.name}`} onClick={() => remove(dish)} disabled={items.length < 2}><Trash2 aria-hidden="true" /></button>
              </div>
            </article>
          ))}
          {filtered.length === 0 && <p className="gd-menu-empty">No dishes match that search.</p>}
        </div>
      </section>
    </div>
  );
}

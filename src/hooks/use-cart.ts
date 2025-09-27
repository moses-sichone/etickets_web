import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  type: "venue" | "ticket" | "addon";
  name: string;
  price: number;
  quantity: number;
  venueId?: string;
  eventId?: string;
  ticketTypeId?: string;
  date?: string;
  time?: string;
  image?: string;
  description?: string;
}

export interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
  getItemsByType: (type: CartItem["type"]) => CartItem[];
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const newItem = {
          ...item,
          id: `${item.type}-${item.venueId || item.eventId}-${Date.now()}`,
        };
        
        set((state) => ({
          items: [...state.items, newItem],
        }));
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalPrice: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getItemCount: () => {
        const state = get();
        return state.items.reduce((count, item) => count + item.quantity, 0);
      },

      getItemsByType: (type) => {
        const state = get();
        return state.items.filter((item) => item.type === type);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
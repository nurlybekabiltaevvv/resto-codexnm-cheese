import { create } from 'zustand';
import type { MenuItem, Order, OrderItem, OrderStatus, WaiterCall } from "./types"

const initialMenu: MenuItem[] = [
  {
    id: 's1',
    name: 'Hokkaido Scallop Tartare',
    description: ' avec caviar Osciètre, émulsion de yuzu et fleur de sel de Guérande.',
    price: 120,
    category: 'Starters',
    isStopListed: false,
  },
  {
    id: 's2',
    name: 'Foie Gras de Canard',
    description: ' mi-cuit, chutney de figues et brioche toastée au beurre noisette.',
    price: 95,
    category: 'Starters',
    isStopListed: false,
  },
  {
    id: 'm1',
    name: 'Wagyu A5 Ribeye',
    description: ' grillé sur charbon de bois, jus de truffe noire et pommes Darphin.',
    price: 250,
    category: 'Mains',
    isStopListed: false,
  },
  {
    id: 'm2',
    name: 'Bar de Ligne Rôti',
    description: ' peau croustillante, risotto au parmesan 36 mois et huile d\'olive verte.',
    price: 145,
    category: 'Mains',
    isStopListed: false,
  },
  {
    id: 'd1',
    name: 'Soufflé au Grand Marnier',
    description: ' classique, glace vanille de Madagascar et tuile caramélisée.',
    price: 80,
    category: 'Desserts',
    isStopListed: false,
  },
  {
    id: 'd2',
    name: 'Tarte au Chocolat Noir',
    description: ' Guanaja 70%, crème anglaise à la bergamote et éclats de fève.',
    price: 85,
    category: 'Desserts',
    isStopListed: false,
  },
];

interface RestaurantState {
  menuItems: MenuItem[];
  orders: Order[];
  calls: WaiterCall[];
  
  addOrder: (tableId: number, item: MenuItem) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  toggleStopList: (itemId: string) => void;
  callWaiter: (tableId: number, type: 'waiter' | 'bill') => void;
  resolveCall: (callId: string) => void;
  sendToKitchen: (tableId: number) => void;
}

export const useRestaurantStore = create<RestaurantState>((set, get) => ({
  menuItems: initialMenu,
  orders: [],
  calls: [],

  addOrder: (tableId, item) => {
    const existing = get().orders.find(
      (o) => o.tableId === tableId && o.status === 'pending'
    );

    if (existing) {
      set({
        orders: get().orders.map((o) =>
          o.id === existing.id
            ? { ...o, items: [...o.items, { menuItem: item, qty: 1 }] }
            : o
        ),
      });
    } else {
      const newOrder: Order = {
        id: crypto.randomUUID(),
        tableId,
        items: [{ menuItem: item, qty: 1 }],
        status: 'pending',
        timestamp: Date.now(),
      };
      set({ orders: [...get().orders, newOrder] });
    }
  },

  sendToKitchen: (tableId) => {
    set({
      orders: get().orders.map((o) =>
        o.tableId === tableId && o.status === 'pending'
          ? { ...o, status: 'cooking' as OrderStatus, timestamp: Date.now() }
          : o
      ),
    });
  },

  updateOrderStatus: (orderId, status) => {
    set({
      orders: get().orders.map((o) =>
        o.id === orderId ? { ...o, status } : o
      ),
    });
  },

  toggleStopList: (itemId) => {
    set({
      menuItems: get().menuItems.map((item) =>
        item.id === itemId ? { ...item, isStopListed: !item.isStopListed } : item
      ),
    });
  },

  callWaiter: (tableId, type) => {
    const newCall: WaiterCall = {
      id: crypto.randomUUID(),
      tableId,
      type,
      timestamp: Date.now(),
    };
    set({ calls: [...get().calls, newCall] });
  },

  resolveCall: (callId) => {
    set({ calls: get().calls.filter((c) => c.id !== callId) });
  },
}));
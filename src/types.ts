export type Category = 'Starters' | 'Mains' | 'Desserts';
export type OrderStatus = 'pending' | 'cooking' | 'ready';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  isStopListed: boolean;
}

export interface OrderItem {
  menuItem: MenuItem;
  qty: number;
}

export interface Order {
  id: string;
  tableId: number;
  items: OrderItem[];
  status: OrderStatus;
  timestamp: number;
}

export interface WaiterCall {
  id: string;
  tableId: number;
  type: 'waiter' | 'bill';
  timestamp: number;
}
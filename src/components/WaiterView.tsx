import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Send, Check, AlertCircle } from 'lucide-react';
import { useRestaurantStore } from '../store';
import type { MenuItem } from "../types"

export default function WaiterView() {
  const { orders, menuItems, calls, addOrder, sendToKitchen, resolveCall } = useRestaurantStore();
  const [selectedTable, setSelectedTable] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tableOrders = orders.filter((o) => o.tableId === selectedTable);
  const pendingOrder = tableOrders.find((o) => o.status === 'pending');
  const activeCalls = calls.filter((c) => c.tableId === selectedTable);

  const handleAddItem = (item: MenuItem) => {
    addOrder(selectedTable, item);
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'pending':
        return 'border-dim text-text-secondary';
      case 'cooking':
        return 'border-accent text-accent';
      case 'ready':
        return 'bg-accent border-accent text-white';
      default:
        return '';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'На кухне (черновик)';
      case 'cooking': return 'Готовится';
      case 'ready': return 'Готово к подаче';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-bg-secondary text-text-secondary font-inter">
      {/* Входящие вызовы */}
      <AnimatePresence>
        {activeCalls.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-red-600 text-white overflow-hidden"
          >
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle size={18} />
                <span className="text-sm font-medium uppercase tracking-wider">
                  Стол {selectedTable}: {activeCalls[0].type === 'waiter' ? 'Вызов' : 'Счет'}
                </span>
              </div>
              <button onClick={() => resolveCall(activeCalls[0].id)} className="bg-white/20 p-1 rounded-sm">
                <Check size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="p-6 border-b border-dim">
        <div className="flex items-center justify-between">
          <h1 className="font-playfair text-3xl font-bold">Панель официанта</h1>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTable(t)}
                className={`w-10 h-10 text-sm font-medium transition-colors ${
                  selectedTable === t
                    ? 'bg-accent text-white'
                    : 'bg-black/5 text-text-secondary hover:bg-black/10'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="p-6 max-w-4xl mx-auto">
        {/* Добавление блюда */}
        <div className="mb-8">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-full flex items-center justify-between p-4 border border-dim text-left"
          >
            <span className="font-medium">Добавить блюдо в заказ (Стол {selectedTable})</span>
            <ChevronDown size={20} className={`transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-x border-b border-dim"
              >
                <div className="p-4 space-y-2 bg-white">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleAddItem(item)}
                      disabled={item.isStopListed}
                      className="w-full text-left p-3 flex justify-between items-center hover:bg-black/5 disabled:opacity-30 disabled:line-through transition-colors"
                    >
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.category}</p>
                      </div>
                      <span className="text-sm font-medium">{item.price} €</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Текущие заказы */}
        <div className="space-y-4">
          {tableOrders.length === 0 ? (
            <p className="text-center text-gray-400 py-12">Нет активных заказов для этого стола</p>
          ) : (
            tableOrders.map((order) => (
              <div
                key={order.id}
                className={`border-2 p-6 rounded-sm transition-all ${getStatusStyles(order.status)}`}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs uppercase tracking-widest font-medium opacity-70">
                    Заказ #{order.id.slice(0, 4)}
                  </span>
                  <span className="text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                    {order.status === 'cooking' && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                      </span>
                    )}
                    {getStatusText(order.status)}
                  </span>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {order.items.map((i, idx) => (
                    <li key={idx} className="flex justify-between text-sm">
                      <span>{i.menuItem.name} x{i.qty}</span>
                      <span>{i.menuItem.price * i.qty} €</span>
                    </li>
                  ))}
                </ul>

                {order.status === 'pending' && (
                  <button
                    onClick={() => sendToKitchen(selectedTable)}
                    className="w-full bg-accent text-white py-3 font-medium text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <Send size={16} />
                    Отправить на кухню
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
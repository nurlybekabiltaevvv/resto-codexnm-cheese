import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Receipt, X } from 'lucide-react';
import { useRestaurantStore } from '../store';
import type { MenuItem, Category } from "../types"

const categories: Category[] = ['Starters', 'Mains', 'Desserts'];

export default function MenuGuest() {
  const { tableId } = useParams<{ tableId: string }>();
  const { menuItems, callWaiter } = useRestaurantStore();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const availableItems = menuItems.filter((item) => !item.isStopListed);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pb-24">
      <header className="pt-8 pb-6 px-6">
        <p className="text-xs tracking-[0.3em] uppercase text-dim mb-2 font-inter">
          Table {tableId}
        </p>
        <h1 className="font-playfair text-4xl font-bold tracking-tight">
          Le Menu
        </h1>
      </header>

      <div className="px-6 space-y-12">
        {categories.map((category) => {
          const items = availableItems.filter((i) => i.category === category);
          if (items.length === 0) return null;

          return (
            <section key={category}>
              <h2 className="font-playfair text-2xl italic mb-6 border-b border-dim pb-4">
                {category}
              </h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="w-full text-left bg-bg-secondary text-text-secondary p-6 rounded-sm transition-transform active:scale-[0.98]"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-playfair text-lg font-semibold">
                        {item.name}
                      </h3>
                      <span className="font-inter text-sm font-medium ml-4 whitespace-nowrap">
                        {item.price} €
                      </span>
                    </div>
                    <p className="font-inter text-sm text-gray-500 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Модальное окно блюда */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-40"
              onClick={() => setSelectedItem(null)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-bg-secondary text-text-secondary z-50 rounded-t-2xl p-8 pb-12 max-h-[70vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 text-black"
              >
                <X size={24} />
              </button>
              <h2 className="font-playfair text-3xl font-bold mb-4 pr-8">
                {selectedItem.name}
              </h2>
              <p className="font-inter text-gray-600 leading-relaxed mb-6">
                {selectedItem.description}
              </p>
              <div className="flex justify-between items-center border-t border-dim pt-6">
                <span className="font-playfair text-4xl font-bold">
                  {selectedItem.price} €
                </span>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="bg-accent text-white font-inter font-medium px-8 py-3 text-sm tracking-wider uppercase"
                >
                  Закрыть
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Фиксированные кнопки внизу */}
      <div className="fixed bottom-0 left-0 right-0 bg-bg-primary border-t border-dim p-4 flex gap-4 z-30">
        <button
          onClick={() => callWaiter(Number(tableId), 'waiter')}
          className="flex-1 flex items-center justify-center gap-2 border border-dim text-text-primary py-4 font-inter text-sm tracking-wider uppercase transition-colors hover:border-white"
        >
          <Bell size={16} />
          Позвать официанта
        </button>
        <button
          onClick={() => callWaiter(Number(tableId), 'bill')}
          className="flex-1 flex items-center justify-center gap-2 bg-accent text-white py-4 font-inter text-sm tracking-wider uppercase transition-opacity hover:opacity-90"
        >
          <Receipt size={16} />
          Попросить счет
        </button>
      </div>
    </div>
  );
}
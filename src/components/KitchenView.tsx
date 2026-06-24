import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRestaurantStore } from '../store';

function Timer({ timestamp }: { timestamp: number }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Math.floor((Date.now() - timestamp) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [timestamp]);

  const mins = Math.floor(time / 60);
  const secs = time % 60;

  return (
    <span className="font-mono text-4xl font-bold text-accent">
      {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
    </span>
  );
}

export default function KitchenView() {
  const { orders, updateOrderStatus } = useRestaurantStore();
  
  // На кухне показываем только те, что уже отправлены официантом (cooking)
  const activeOrders = orders.filter((o) => o.status === 'cooking');

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary p-8">
      <header className="mb-10 border-b border-dim pb-6">
        <h1 className="font-playfair text-5xl font-bold tracking-tight">KDS</h1>
        <p className="font-inter text-dim mt-2 text-sm uppercase tracking-widest">
          Kitchen Display System — Активные заказы: {activeOrders.length}
        </p>
      </header>

      {activeOrders.length === 0 ? (
        <div className="flex items-center justify-center h-[70vh]">
          <p className="text-3xl font-playfair text-dim">Нет активных заказов</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {activeOrders.map((order) => (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
                className="border border-dim p-8 flex flex-col justify-between min-h-[300px]"
              >
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-dim mb-2">Стол</p>
                      <p className="font-playfair text-7xl font-bold leading-none">
                        {order.tableId}
                      </p>
                    </div>
                    <Timer timestamp={order.timestamp} />
                  </div>

                  <div className="space-y-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="border-l-2 border-accent pl-4">
                        <p className="font-playfair text-2xl font-semibold">
                          {item.menuItem.name}
                        </p>
                        <p className="text-sm text-dim mt-1">
                          x{item.qty}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => updateOrderStatus(order.id, 'ready')}
                  className="w-full bg-accent text-white py-6 font-inter font-bold text-2xl tracking-widest uppercase mt-8 hover:opacity-90 transition-opacity active:scale-95"
                >
                  Готово
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
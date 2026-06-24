import { useRestaurantStore } from '../store';
import { TrendingUp, ToggleLeft, ToggleRight } from 'lucide-react';

export default function AdminView() {
  const { menuItems, toggleStopList, orders } = useRestaurantStore();

  // Мок-данные выручки
  const mockRevenue = 12450.0;
  const completedOrders = orders.filter(o => o.status === 'ready').length;

  return (
    <div className="min-h-screen bg-bg-secondary text-text-secondary font-inter">
      <header className="p-6 border-b border-dim">
        <h1 className="font-playfair text-3xl font-bold text-text-secondary">Администрирование</h1>
      </header>

      <div className="p-6 max-w-5xl mx-auto">
        {/* Блок статистики */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="border border-dim p-6">
            <div className="flex items-center gap-3 text-dim mb-4">
              <TrendingUp size={20} />
              <span className="text-xs uppercase tracking-widest">Выручка за вечер</span>
            </div>
            <p className="font-playfair text-5xl font-bold text-text-secondary">
              {mockRevenue.toLocaleString('ru-RU', { style: 'currency', currency: 'EUR' })}
            </p>
          </div>
          
          <div className="border border-dim p-6">
            <div className="flex items-center gap-3 text-dim mb-4">
              <span className="text-xs uppercase tracking-widest">Активные заказы</span>
            </div>
            <p className="font-playfair text-5xl font-bold text-text-secondary">
              {orders.filter(o => o.status !== 'ready').length}
            </p>
          </div>

          <div className="border border-dim p-6">
            <div className="flex items-center gap-3 text-dim mb-4">
              <span className="text-xs uppercase tracking-widest">Выполнено</span>
            </div>
            <p className="font-playfair text-5xl font-bold text-accent">
              {completedOrders}
            </p>
          </div>
        </div>

        {/* Стоп-лист */}
        <div>
          <h2 className="font-playfair text-2xl font-bold mb-6 text-text-secondary">
            Управление стоп-листом
          </h2>
          <div className="border border-dim divide-y divide-dim">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-5 bg-white hover:bg-black/[0.02] transition-colors"
              >
                <div>
                  <p className="font-medium text-text-secondary">{item.name}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.category} — {item.price} €
                  </p>
                </div>
                
                <button
                  onClick={() => toggleStopList(item.id)}
                  className="flex items-center gap-2"
                  aria-label={`Toggle stop list for ${item.name}`}
                >
                  <span className={`text-sm font-medium uppercase tracking-wider ${item.isStopListed ? 'text-red-600' : 'text-dim'}`}>
                    {item.isStopListed ? 'Стоп' : 'В наличии'}
                  </span>
                  {item.isStopListed ? (
                    <ToggleRight size={32} className="text-red-600" />
                  ) : (
                    <ToggleLeft size={32} className="text-dim" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
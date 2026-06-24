import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { UtensilsCrossed, UserCheck, ChefHat, Settings } from 'lucide-react';
import MenuGuest from './components/MenuGuest';
import WaiterView from './components/WaiterView';
import KitchenView from './components/KitchenView';
import AdminView from './components/AdminView';

function App() {
  return (
    <Router>
      {/* Навигация для удобства тестирования, в проде на данных экранах её не будет */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary border-b border-dim p-2 flex justify-around">
        <NavLink to="/menu/1" className="text-text-primary text-xs flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity">
          <UtensilsCrossed size={16} /> Гость
        </NavLink>
        <NavLink to="/waiter" className="text-text-primary text-xs flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity">
          <UserCheck size={16} /> Официант
        </NavLink>
        <NavLink to="/kitchen" className="text-text-primary text-xs flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity">
          <ChefHat size={16} /> Кухня
        </NavLink>
        <NavLink to="/admin" className="text-text-primary text-xs flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity">
          <Settings size={16} /> Админ
        </NavLink>
      </nav>

      <main className="pt-10">
        <Routes>
          <Route path="/menu/:tableId" element={<MenuGuest />} />
          <Route path="/waiter" element={<WaiterView />} />
          <Route path="/kitchen" element={<KitchenView />} />
          <Route path="/admin" element={<AdminView />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
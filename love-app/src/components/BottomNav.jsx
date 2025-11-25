import { Home, Music, List, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNav = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'inicio', icon: Home, label: 'Início' },
    { id: 'playlist', icon: Music, label: 'Playlist' },
    { id: 'lista', icon: List, label: 'Nossa Lista' },
    { id: 'mimos', icon: Heart, label: 'Mimos' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-pink-100 z-50">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center justify-center flex-1 h-full relative"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-pink-50"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <div className="relative z-10 flex flex-col items-center">
                <Icon
                  size={24}
                  className={`transition-colors ${
                    isActive ? 'text-primary' : 'text-gray-400'
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span
                  className={`text-xs mt-1 transition-colors ${
                    isActive ? 'text-primary font-semibold' : 'text-gray-400'
                  }`}
                >
                  {tab.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Sparkles, Target, GripVertical } from 'lucide-react';

const NossaLista = () => {
  const [lists, setLists] = useState({
    zeramos: [
      { id: 1, text: 'Primeiro Beijo', emoji: '💋' },
      { id: 2, text: 'Primeiro Cinema', emoji: '🎬' },
      { id: 3, text: 'Conhecer a Família', emoji: '👨‍👩‍👧' },
    ],
    dlcs: [
      { id: 4, text: 'Viagem pra Praia', emoji: '🏖️' },
      { id: 5, text: 'Aniversário Surpresa', emoji: '🎂' },
      { id: 6, text: 'Jantar Romântico', emoji: '🍽️' },
    ],
    boss: [
      { id: 7, text: 'Casamento', emoji: '💍' },
      { id: 8, text: 'Casa Própria', emoji: '🏡' },
      { id: 9, text: 'Viajar pelo Mundo', emoji: '✈️' },
    ],
  });

  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedFrom, setDraggedFrom] = useState(null);

  const columns = [
    {
      id: 'zeramos',
      title: 'Zeramos o Game',
      icon: Trophy,
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-300',
    },
    {
      id: 'dlcs',
      title: 'DLCs em Breve',
      icon: Sparkles,
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-300',
    },
    {
      id: 'boss',
      title: 'Boss Final',
      icon: Target,
      color: 'from-purple-400 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-300',
    },
  ];

  const handleDragStart = (item, fromColumn) => {
    setDraggedItem(item);
    setDraggedFrom(fromColumn);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (toColumn) => {
    if (!draggedItem || !draggedFrom) return;

    if (draggedFrom === toColumn) {
      setDraggedItem(null);
      setDraggedFrom(null);
      return;
    }

    setLists((prev) => {
      const newLists = { ...prev };
      newLists[draggedFrom] = newLists[draggedFrom].filter((item) => item.id !== draggedItem.id);
      newLists[toColumn] = [...newLists[toColumn], draggedItem];
      return newLists;
    });

    setDraggedItem(null);
    setDraggedFrom(null);
  };

  const handleTouchStart = (item, fromColumn) => {
    setDraggedItem(item);
    setDraggedFrom(fromColumn);
  };

  const handleTouchEnd = (toColumn) => {
    if (draggedItem && draggedFrom && draggedFrom !== toColumn) {
      handleDrop(toColumn);
    } else {
      setDraggedItem(null);
      setDraggedFrom(null);
    }
  };

  return (
    <div className="h-full overflow-y-auto pb-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 space-y-6"
      >
        <div className="text-center space-y-2">
          <h1 className="font-dancing text-4xl text-white drop-shadow-lg">
            Nossa Lista Gamificada
          </h1>
          <p className="text-white/90 text-sm">Arraste os cards entre as colunas</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {columns.map((column) => {
            const Icon = column.icon;
            return (
              <motion.div
                key={column.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white/95 backdrop-blur rounded-2xl p-4 shadow-xl border-2 ${column.borderColor}`}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(column.id)}
                onTouchEnd={() => handleTouchEnd(column.id)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${column.color} text-white shadow-lg`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{column.title}</h3>
                    <p className="text-xs text-gray-500">{lists[column.id].length} items</p>
                  </div>
                </div>

                <div className="space-y-2 min-h-[100px]">
                  {lists[column.id].map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ delay: index * 0.05 }}
                      draggable
                      onDragStart={() => handleDragStart(item, column.id)}
                      onTouchStart={() => handleTouchStart(item, column.id)}
                      className={`${column.bgColor} p-4 rounded-xl shadow-md cursor-move hover:shadow-lg transition flex items-center gap-3 ${
                        draggedItem?.id === item.id ? 'opacity-50' : 'opacity-100'
                      }`}
                    >
                      <GripVertical size={20} className="text-gray-400" />
                      <span className="text-2xl">{item.emoji}</span>
                      <span className="flex-1 font-medium text-gray-700">{item.text}</span>
                    </motion.div>
                  ))}
                  {lists[column.id].length === 0 && (
                    <div className="text-center py-8 text-gray-400 text-sm">
                      Arraste items para cá
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl"
        >
          <h3 className="font-dancing text-2xl text-primary text-center mb-3">
            Dica de Uso
          </h3>
          <p className="text-gray-600 text-sm text-center">
            Segure e arraste os cards entre as colunas para organizar nossas conquistas,
            planos futuros e sonhos grandes. Cada movimento representa nossa jornada juntos!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NossaLista;

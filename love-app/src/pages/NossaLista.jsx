import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Trophy, Sparkles, Target } from 'lucide-react';

const NossaLista = () => {
    // Adicionei a propriedade 'completed' para controlar o checkbox
    const [lists, setLists] = useState({
        zeramos: [
            { id: 1, text: 'Primeiro Beijo', emoji: '💋', completed: true },
            { id: 2, text: 'Primeiro Cinema', emoji: '🎬', completed: true },
            { id: 3, text: 'Conhecer a Família', emoji: '👨‍👩‍👧', completed: true },
        ],
        dlcs: [
            { id: 4, text: 'Viagem pra Praia', emoji: '🏖️', completed: false },
            { id: 5, text: 'Aniversário Surpresa', emoji: '🎂', completed: false },
            { id: 6, text: 'Jantar Romântico', emoji: '🍽️', completed: false },
        ],
        boss: [
            { id: 7, text: 'Casamento', emoji: '💍', completed: false },
            { id: 8, text: 'Casa Própria', emoji: '🏡', completed: false },
            { id: 9, text: 'Viajar pelo Mundo', emoji: '✈️', completed: false },
        ],
    });

    const sections = [
        {
            id: 'zeramos',
            title: 'Zeramos (Já Fizemos)',
            icon: Trophy,
            color: 'text-green-500',
            bg: 'bg-green-50',
            border: 'border-green-200'
        },
        {
            id: 'dlcs',
            title: 'DLCs (Em Breve)',
            icon: Sparkles,
            color: 'text-blue-500',
            bg: 'bg-blue-50',
            border: 'border-blue-200'
        },
        {
            id: 'boss',
            title: 'Boss Final (Sonhos)',
            icon: Target,
            color: 'text-purple-500',
            bg: 'bg-purple-50',
            border: 'border-purple-200'
        },
    ];

    // Função para alternar entre feito/não feito
    const toggleItem = (category, id) => {
        setLists(prev => ({
            ...prev,
            [category]: prev[category].map(item =>
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        }));
    };

    // Cálculo do progresso total
    const allItems = [...lists.zeramos, ...lists.dlcs, ...lists.boss];
    const completedCount = allItems.filter(i => i.completed).length;
    const totalCount = allItems.length;
    const progressPercentage = (completedCount / totalCount) * 100;

    return (
        <div className="page-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                {/* Cabeçalho e Progresso */}
                <div className="text-center space-y-3">
                    <h1 className="title-responsive">Nossa Checklist</h1>
                    <p className="text-white/90 text-xs sm:text-sm">Marcando cada passo da nossa história</p>

                    {/* Barra de Progresso */}
                    <div className="glass-card p-4 flex items-center gap-3">
                        <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-primary to-secondary"
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercentage}%` }}
                                transition={{ duration: 1 }}
                            />
                        </div>
                        <span className="text-xs font-bold text-primary whitespace-nowrap">
              {completedCount} / {totalCount} Conquistas
            </span>
                    </div>
                </div>

                {/* Listas por Categoria */}
                <div className="space-y-4 pb-20">
                    {sections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <div key={section.id} className={`glass-card p-4 border-l-4 ${section.border}`}>
                                <div className="flex items-center gap-2 mb-3 border-b border-gray-100 pb-2">
                                    <Icon size={20} className={section.color} />
                                    <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wide">
                                        {section.title}
                                    </h3>
                                </div>

                                <div className="space-y-2">
                                    {lists[section.id].map((item) => (
                                        <motion.div
                                            key={item.id}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => toggleItem(section.id, item.id)}
                                            className={`
                        relative p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-all duration-200
                        ${item.completed ? 'bg-gray-50 opacity-80' : 'bg-white shadow-sm hover:shadow-md'}
                      `}
                                        >
                                            {/* Checkbox Icon */}
                                            <div className={`
                        min-w-[24px] h-6 rounded-full flex items-center justify-center transition-colors
                        ${item.completed ? 'text-green-500' : 'text-gray-300'}
                      `}>
                                                {item.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                                            </div>

                                            {/* Texto e Emoji */}
                                            <div className="flex-1">
                        <span className={`text-lg mr-2 ${item.completed ? 'grayscale' : ''}`}>
                          {item.emoji}
                        </span>
                                                <span className={`
                          text-sm font-medium transition-all
                          ${item.completed ? 'text-gray-400 line-through' : 'text-gray-700'}
                        `}>
                          {item.text}
                        </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
};

export default NossaLista;
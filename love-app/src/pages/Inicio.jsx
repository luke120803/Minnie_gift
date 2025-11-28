import { useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTimer } from '../hooks/useTimer';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Itens do carrossel movidos para fora para evitar recriação a cada render
const CAROUSEL_ITEMS = [
    { type: 'image', src: '/assets/images/TianaNavin.jpg', caption: '😎👑' },
    { type: 'image', src: '/assets/images/Mickey.jpg', caption: '🍿🍦' },
    { type: 'image', src: '/assets/images/mybaby.jpg', caption: '📸😝' },
    { type: 'image', src: '/assets/images/myhoney.jpg', caption: '🍿🎥' },
    { type: 'image', src: '/assets/images/mylove.jpg', caption: '🐸👑' },
    { type: 'image', src: '/assets/images/mysunflower.jpg', caption: '🌻💜' },
    { type: 'video', src: '/assets/videos/lukeandminnie.mp4', caption: '🥰😁' },
    { type: 'video', src: '/assets/videos/minnieandluke.mp4', caption: '😝👻' },
];

const Inicio = () => {
    // Data fixa: 25 de Maio de 2025
    const [anniversaryDate] = useState(() => {
        return new Date('2025-05-25T00:00:00').toISOString();
    });

    const timeUnits = useTimer(anniversaryDate);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Funções de navegação com useCallback para evitar loops no useEffect
    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length);
    }, []);

    // Auto-play do carrossel
    useEffect(() => {
        if (CAROUSEL_ITEMS[currentSlide].type === 'video') return;

        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [currentSlide, nextSlide]);

    const timerCards = [
        { label: 'Anos', value: timeUnits.years, color: 'from-pink-500 to-rose-500' },
        { label: 'Meses', value: timeUnits.months, color: 'from-rose-500 to-red-400' },
        { label: 'Dias', value: timeUnits.days, color: 'from-red-400 to-pink-500' },
        { label: 'Horas', value: timeUnits.hours, color: 'from-pink-400 to-rose-400' },
        { label: 'Minutos', value: timeUnits.minutes, color: 'from-rose-400 to-pink-600' },
        { label: 'Segundos', value: timeUnits.seconds, color: 'from-pink-600 to-rose-600' },
    ];

    return (
        <div className="page-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
            >
                <div className="text-center mt-2">
                    <h1 className="title-responsive">Feliz dia 25 💘</h1>
                    <p className="text-white text-sm sm:text-base drop-shadow opacity-90">minha sunflower 🌻💜</p>
                </div>

                {/* Timer Card */}
                <div className="glass-card p-4">
                    <h2 className="font-dancing text-xl text-primary text-center mb-3">Nosso tempo juntos</h2>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        {timerCards.map((card, index) => (
                            <motion.div
                                key={card.label}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className={`bg-gradient-to-br ${card.color} rounded-xl p-2 py-3 text-center shadow-md text-white`}
                            >
                                <div className="text-lg sm:text-2xl font-bold shadow-black/10 drop-shadow-sm leading-tight">
                                    {card.value}
                                </div>
                                <div className="text-[10px] sm:text-xs uppercase tracking-wider font-medium opacity-90">
                                    {card.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Carrossel */}
                <div className="glass-card overflow-hidden p-0 border-0">
                    <div className="relative aspect-[3/4] bg-black">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                {CAROUSEL_ITEMS[currentSlide].type === 'image' ? (
                                    <img
                                        src={CAROUSEL_ITEMS[currentSlide].src}
                                        alt={CAROUSEL_ITEMS[currentSlide].caption}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <video
                                        src={CAROUSEL_ITEMS[currentSlide].src}
                                        controls
                                        className="w-full h-full object-contain bg-black"
                                    />
                                )}
                                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-10 text-center">
                                    <p className="text-white text-lg font-medium">{CAROUSEL_ITEMS[currentSlide].caption}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <button
                            aria-label="Anterior"
                            onClick={prevSlide}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white"
                        >
                            <ChevronLeft size={30}/>
                        </button>

                        <button
                            aria-label="Próximo"
                            onClick={nextSlide}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white"
                        >
                            <ChevronRight size={30}/>
                        </button>
                    </div>
                </div>

                {/* Carta */}
                <div className="glass-card p-6 text-center">
                    <h3 className="font-dancing text-2xl text-primary mb-4">Para minha Tiana 👑</h3>
                    <div className="text-gray-700 text-sm leading-relaxed text-justify space-y-4 font-poppins">
                        <p>
                            Querida, que essa pequena homenagem lhe faça lembrar o quanto você é especial para mim e o
                            quanto sou feliz por viver bons momentos ao seu lado. Obrigado por me dar a oportunidade de
                            lhe fazer sorrir com as minhas bobagens e poder ver seus olhinhos e seu sorriso incrível e
                            maravilhoso, que apenas você tem. É um brilho que nem consigo explicar.
                        </p>
                        <p>
                            Estar ao seu lado me faz sentir leve e revigorado após uma semana tão intensa e, às vezes,
                            chata. Mas, quando lembro que irei ver você, ou até mesmo quando conversamos, eu lembro de
                            um dos motivos que faz a minha semana cansativa valer a pena.
                        </p>
                        <p>
                            Obrigado por esses 6 meses. Cada momento com você só me faz pensar quais serão os próximos.
                            Eu na verdade não sei como vai ser, porém tenho certeza que vai ser um momento marcante pelo
                            simples fato de você estar comigo.
                        </p>
                        <p className="font-bold text-primary text-center mt-4">
                            Te amo, minha princesa, minha estrelinha, minha sunflower querida, minha Minnie 💜. Beijos.
                        </p>
                    </div>
                    <div className="font-dancing text-2xl text-primary text-center mt-6">
                        Forever Yours
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Inicio;
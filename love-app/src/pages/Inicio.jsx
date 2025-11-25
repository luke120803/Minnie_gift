import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimer } from '../hooks/useTimer';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Inicio = () => {
  const [anniversaryDate] = useState(() => {
    const saved = localStorage.getItem('anniversaryDate');
    return saved || new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString();
  });

  const timeUnits = useTimer(anniversaryDate);

  const carouselItems = [
    {
      type: 'image',
      src: '/assets/images/TianaNavin.jpeg',
      caption: '😎👑',
    },
    {
      type: 'image',
      src: '/assets/images/Mickey.jpeg',
      caption: '🍿🍦',
    },
    {
      type: 'video',
      src: '/assets/videos/lukeandminnie.mp4',
      caption: '🥰😁',
    },
    {
      type: 'video',
      src: '/assets/videos/minnieandluke.mp4',
      caption: '😝👻',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const timerCards = [
    { label: 'Anos', value: timeUnits.years, color: 'from-pink-500 to-rose-500' },
    { label: 'Meses', value: timeUnits.months, color: 'from-rose-500 to-red-400' },
    { label: 'Dias', value: timeUnits.days, color: 'from-red-400 to-pink-500' },
    { label: 'Horas', value: timeUnits.hours, color: 'from-pink-400 to-rose-400' },
    { label: 'Minutos', value: timeUnits.minutes, color: 'from-rose-400 to-pink-600' },
    { label: 'Segundos', value: timeUnits.seconds, color: 'from-pink-600 to-rose-600' },
  ];

  return (
    <div className="h-full overflow-y-auto pb-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 space-y-6"
      >
        <div className="text-center space-y-2">
          <h1 className="font-dancing text-4xl md:text-5xl text-white drop-shadow-lg">
            Feliz dia dos namorados
          </h1>
          <p className="text-white text-lg drop-shadow">minha sunflower 🌻💜</p>
        </div>

        <div className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl">
          <h2 className="font-dancing text-2xl text-primary text-center mb-4">
            Nosso tempo juntos
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {timerCards.map((card, index) => (
              <motion.div
                key={card.label}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br ${card.color} rounded-xl p-4 text-center shadow-lg`}
              >
                <div className="text-3xl font-bold text-white">{card.value}</div>
                <div className="text-xs text-white/90 mt-1">{card.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur rounded-2xl overflow-hidden shadow-xl">
          <h2 className="font-dancing text-2xl text-primary text-center py-4">
            Nossas Memórias
          </h2>
          <div className="relative aspect-[4/3] bg-gray-900">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                {carouselItems[currentSlide].type === 'image' ? (
                  <img
                    src={carouselItems[currentSlide].src}
                    alt={carouselItems[currentSlide].caption}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={carouselItems[currentSlide].src}
                    controls
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 text-center">
                  {carouselItems[currentSlide].caption}
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition z-10"
            >
              <ChevronLeft className="text-primary" size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition z-10"
            >
              <ChevronRight className="text-primary" size={24} />
            </button>

            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-white/70 px-3 py-1 rounded-full text-sm text-primary">
              {currentSlide + 1} / {carouselItems.length}
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl">
          <h3 className="font-dancing text-3xl text-primary text-center mb-4">
            Para minha Tiana 👑
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed text-justify space-y-3">
            <span className="block">
              Querida, que essa pequena homenagem lhe faça lembrar o quanto você é especial para mim e o quanto sou feliz por viver bons momentos ao seu lado. Obrigado por me dar a oportunidade de lhe fazer sorrir com as minhas bobagens e poder ver seus olhinhos e seu sorriso incrível e maravilhoso, que apenas você tem. É um brilho que nem consigo explicar.
            </span>
            <span className="block">
              Estar ao seu lado me faz sentir leve e revigorado após uma semana tão intensa e, às vezes, chata. Mas, quando lembro que irei ver você no final de semana, ou até mesmo quando conversamos, eu lembro de um dos motivos que faz a minha semana cansativa valer a pena.
            </span>
            <span className="block">
              Te amo, minha princesa, minha estrelinha querida. Beijos.
            </span>
          </p>
          <div className="font-dancing text-2xl text-primary text-center mt-6">
            Forever Yours
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Inicio;

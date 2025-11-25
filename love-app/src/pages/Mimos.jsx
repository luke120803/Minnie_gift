import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, RefreshCw } from 'lucide-react';

const Mimos = () => {
  const phrases = [
    {
      text: 'Você ilumina meus dias como ninguém consegue.',
      emoji: '✨',
      color: 'from-pink-400 to-rose-400',
    },
    {
      text: 'Seu sorriso é meu lugar favorito no mundo.',
      emoji: '😊',
      color: 'from-rose-400 to-red-400',
    },
    {
      text: 'Com você, até os dias ruins ficam melhores.',
      emoji: '🌈',
      color: 'from-purple-400 to-pink-400',
    },
    {
      text: 'Você é a razão do meu sorriso bobo durante o dia.',
      emoji: '🥰',
      color: 'from-pink-500 to-rose-500',
    },
    {
      text: 'Obrigado por ser exatamente quem você é.',
      emoji: '💝',
      color: 'from-red-400 to-pink-500',
    },
    {
      text: 'Seus olhinhos brilhantes são minha fraqueza.',
      emoji: '👀',
      color: 'from-pink-400 to-purple-400',
    },
    {
      text: 'Cada momento com você é um presente especial.',
      emoji: '🎁',
      color: 'from-rose-500 to-pink-600',
    },
    {
      text: 'Você transforma minha rotina em aventura.',
      emoji: '🚀',
      color: 'from-blue-400 to-pink-400',
    },
    {
      text: 'Minha princesa, minha estrelinha querida.',
      emoji: '👑',
      color: 'from-yellow-400 to-pink-400',
    },
    {
      text: 'Te amo mais do que palavras podem expressar.',
      emoji: '💕',
      color: 'from-pink-600 to-rose-600',
    },
    {
      text: 'Você é meu girassol que ilumina tudo.',
      emoji: '🌻',
      color: 'from-yellow-400 to-orange-400',
    },
    {
      text: 'Suas bobagens são minhas preferidas.',
      emoji: '😝',
      color: 'from-green-400 to-pink-400',
    },
  ];

  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
  const [previousIndexes, setPreviousIndexes] = useState([0]);

  const generateNewPhrase = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * phrases.length);
    } while (previousIndexes.includes(newIndex) && previousIndexes.length < phrases.length);

    setCurrentPhrase(phrases[newIndex]);
    setPreviousIndexes((prev) => {
      const updated = [...prev, newIndex];
      return updated.length > 3 ? updated.slice(-3) : updated;
    });
  };

  return (
    <div className="h-full overflow-y-auto pb-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 space-y-6 flex flex-col items-center justify-center min-h-full"
      >
        <div className="text-center space-y-2">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Heart size={48} className="text-white mx-auto drop-shadow-lg" fill="white" />
          </motion.div>
          <h1 className="font-dancing text-4xl text-white drop-shadow-lg">
            Gerador de Mimos
          </h1>
          <p className="text-white/90 text-sm">Mensagens especiais para você</p>
        </div>

        <div className="w-full max-w-md space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhrase.text}
              initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              transition={{ duration: 0.5 }}
              className="bg-white/95 backdrop-blur rounded-3xl p-8 shadow-2xl"
            >
              <div className={`bg-gradient-to-br ${currentPhrase.color} rounded-2xl p-6 text-center space-y-4`}>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-6xl"
                >
                  {currentPhrase.emoji}
                </motion.div>
                <p className="text-white text-xl font-medium leading-relaxed">
                  {currentPhrase.text}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateNewPhrase}
            className="w-full bg-white text-primary font-bold py-4 px-6 rounded-2xl shadow-xl flex items-center justify-center gap-3 hover:shadow-2xl transition"
          >
            <RefreshCw size={24} />
            <span>Gerar Novo Mimo</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="text-primary" size={24} />
              <h3 className="font-bold text-gray-800">Sobre este Gerador</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Cada mensagem foi escolhida especialmente para você, minha sunflower.
              Clique no botão sempre que quiser receber um carinho virtual e lembrar
              o quanto você é especial para mim.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  delay: i * 0.2,
                }}
                className="bg-white/80 backdrop-blur rounded-xl p-4 text-center shadow-lg"
              >
                <div className="text-3xl">{['💖', '🌹', '💝', '✨', '🌻', '👑'][i]}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Mimos;

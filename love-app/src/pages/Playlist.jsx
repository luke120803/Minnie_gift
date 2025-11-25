import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';

const Playlist = () => {
  const {
    currentTrack,
    currentTrackIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    playlist,
    togglePlay,
    playNext,
    playPrevious,
    seek,
    changeVolume,
  } = useAudio();

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    seek(percentage * duration);
  };

  return (
    <div className="h-full overflow-y-auto pb-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 space-y-6 max-w-lg mx-auto"
      >
        <div className="text-center">
          <h1 className="font-dancing text-4xl text-white drop-shadow-lg">
            Nossa Playlist
          </h1>
          <p className="text-white/90 text-sm mt-2">Músicas que contam nossa história</p>
        </div>

        <motion.div
          className="bg-white/95 backdrop-blur rounded-3xl p-8 shadow-2xl space-y-6"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="aspect-square bg-gradient-to-br from-pink-400 via-rose-400 to-red-400 rounded-2xl shadow-xl overflow-hidden">
            <img
              src="/assets/images/TianaNavin.jpeg"
              alt="Album Cover"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-gray-800 line-clamp-2">
              {currentTrack.title}
            </h2>
            <p className="text-sm text-gray-500">Nossa trilha sonora</p>
          </div>

          <div className="space-y-2">
            <div
              className="h-2 bg-gray-200 rounded-full cursor-pointer overflow-hidden"
              onClick={handleSeek}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                initial={false}
                animate={{ width: `${(currentTime / duration) * 100 || 0}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={playPrevious}
              className="p-3 rounded-full bg-pink-100 text-primary hover:bg-pink-200 transition"
            >
              <SkipBack size={24} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="p-5 rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-lg"
            >
              {isPlaying ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={playNext}
              className="p-3 rounded-full bg-pink-100 text-primary hover:bg-pink-200 transition"
            >
              <SkipForward size={24} />
            </motion.button>
          </div>

          <div className="flex items-center gap-3 px-2">
            <Volume2 size={20} className="text-gray-500" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => changeVolume(parseFloat(e.target.value))}
              className="flex-1 accent-primary"
            />
          </div>
        </motion.div>

        <div className="bg-white/95 backdrop-blur rounded-2xl p-4 shadow-xl">
          <h3 className="font-semibold text-gray-800 mb-3">Todas as músicas</h3>
          <div className="space-y-2">
            {playlist.map((track, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg transition cursor-pointer ${
                  index === currentTrackIndex
                    ? 'bg-gradient-to-r from-pink-100 to-rose-100 border-l-4 border-primary'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === currentTrackIndex
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      index === currentTrackIndex ? 'text-primary' : 'text-gray-700'
                    }`}>
                      {track.title}
                    </p>
                  </div>
                  {index === currentTrackIndex && isPlaying && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="w-2 h-2 bg-primary rounded-full"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Playlist;

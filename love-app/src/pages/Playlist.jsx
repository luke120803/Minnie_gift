import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';

const Playlist = () => {
    const {
        currentTrack, currentTrackIndex, isPlaying, currentTime, duration,
        volume, playlist, togglePlay, playNext, playPrevious, seek, changeVolume,
    } = useAudio();

    const formatTime = (time) => {
        if (isNaN(time)) return '0:00';
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);
        return `${min}:${sec.toString().padStart(2, '0')}`;
    };

    return (
        <div className="page-container">
            <div className="text-center mt-2">
                <h1 className="title-responsive">Nossa Playlist</h1>
                <p className="text-white text-xs sm:text-sm opacity-90">Músicas que contam nossa história</p>
            </div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="glass-card p-5 space-y-5 flex-1 flex flex-col justify-center"
            >
                {/* Capa do Álbum */}
                <div className="aspect-square w-full max-w-[280px] mx-auto bg-gray-200 rounded-2xl shadow-lg overflow-hidden relative group">
                    <img
                        src="/assets/images/TianaNavin.jpeg"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />
                </div>

                {/* Info e Controles */}
                <div className="space-y-4">
                    <div className="text-center">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate px-4">{currentTrack.title}</h2>
                        <p className="text-xs text-primary font-medium">Tocando agora para você</p>
                    </div>

                    {/* Barra de Progresso */}
                    <div className="space-y-1" onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        seek(((e.clientX - rect.left) / rect.width) * duration);
                    }}>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden cursor-pointer">
                            <div className="h-full bg-primary w-0 transition-all duration-100" style={{ width: `${(currentTime / duration) * 100}%` }} />
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-400 font-medium">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    {/* Botões de Controle */}
                    <div className="flex items-center justify-center gap-6">
                        <button onClick={playPrevious} className="text-gray-400 hover:text-primary transition"><SkipBack size={28} /></button>
                        <button onClick={togglePlay} className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-pink-200 hover:scale-105 transition active:scale-95">
                            {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                        </button>
                        <button onClick={playNext} className="text-gray-400 hover:text-primary transition"><SkipForward size={28} /></button>
                    </div>
                </div>
            </motion.div>

            {/* Lista Curta (Opcional, se couber na tela) */}
            <div className="glass-card p-3">
                <div className="space-y-1 max-h-32 overflow-y-auto">
                    {playlist.map((track, i) => (
                        <div key={i} onClick={() => i !== currentTrackIndex && playNext()}
                             className={`p-2 rounded-lg flex items-center gap-3 text-xs cursor-pointer ${i === currentTrackIndex ? 'bg-pink-50 text-primary font-bold' : 'text-gray-600 hover:bg-gray-50'}`}>
                            <span className="w-4 text-center">{i + 1}</span>
                            <span className="truncate flex-1">{track.title}</span>
                            {i === currentTrackIndex && <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"/>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Playlist;
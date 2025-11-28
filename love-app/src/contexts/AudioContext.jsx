import {createContext, useContext, useState, useRef, useEffect, useCallback} from 'react';

const AudioContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within AudioProvider');
    }
    return context;
};

const playlist = [
    {
        title: "Princesa e o Sapo - Evangeline",
        src: "/assets/music/evangeline.mp3",
        cover: "/assets/images/princesa_sapo.jpg"
    },
    {
        title: "Noiva Cadáver - Dueto",
        src: "/assets/music/dueto.mp3",
        cover: "/assets/images/noiva_cadaver.jpg"
    },
    {
        title: "Aladdin - Mundo Ideal",
        src: "/assets/music/mundo_ideal.mp3",
        cover: "/assets/images/aladdin.jpg"
    },
    {
        title: "Enrolados - Vejo enfim a luz brilhar",
        src: "/assets/music/vejo_enfim.mp3",
        cover: "/assets/images/enrolados.jpg"
    },
    {
        title: "Lilo Stich - Burning love",
        src: "/assets/music/lilo_stich.mp3",
        cover: "/assets/images/lilo_stich.jpg"
    },
    {
        title: "Homem Aranha - Sunflower",
        src: "/assets/music/sunflower.mp3",
        cover:"/assets/images/miranha.jpg"
    },
    {
        title: "Yung kai - blue",
        src: "/assets/music/yungkai-blue.mp3",
        cover:"/assets/images/blue.jpg"
    },
];

export const AudioProvider = ({children}) => {
    const audioRef = useRef(new Audio());
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);

    // FUNÇÕES DE CONTROLE (Movidas para cima e com useCallback)

    const play = useCallback(() => {
        audioRef.current.play()
            .then(() => setIsPlaying(true))
            .catch(console.error);
    }, []);

    const pause = useCallback(() => {
        audioRef.current.pause();
        setIsPlaying(false);
    }, []);

    const togglePlay = useCallback(() => {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    }, [isPlaying, pause, play]);

    const playNext = useCallback(() => {
        setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    }, []);

    const playPrevious = useCallback(() => {
        setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    }, []);

    const seek = useCallback((time) => {
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    }, []);

    const changeVolume = useCallback((newVolume) => {
        audioRef.current.volume = newVolume;
        setVolume(newVolume);
    }, []);

    // EFEITOS

    // 1. Configurar listeners de evento (depende de playNext)
    useEffect(() => {
        const audio = audioRef.current;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const handleEnded = () => playNext(); // Agora playNext já existe!

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleEnded);

        // Atualiza volume inicial
        audio.volume = volume;

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [playNext]); // playNext é dependência

    // 2. Atualizar volume quando mudar
    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume]);

    // 3. Tocar nova música quando o índice mudar
    useEffect(() => {
        const audio = audioRef.current;
        audio.src = playlist[currentTrackIndex].src;

        if (isPlaying) {
            audio.play().catch(console.error);
        }
    }, [currentTrackIndex]); // Removi isPlaying das dependências para evitar loops

    const currentTrack = playlist[currentTrackIndex];

    return (
        <AudioContext.Provider
            value={{
                currentTrack,
                currentTrackIndex,
                isPlaying,
                currentTime,
                duration,
                volume,
                playlist,
                play,
                pause,
                togglePlay,
                playNext,
                playPrevious,
                seek,
                changeVolume,
            }}
        >
            {children}
        </AudioContext.Provider>
    );
};
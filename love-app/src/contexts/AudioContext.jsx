import {createContext, useContext, useState, useRef, useEffect} from 'react';

const AudioContext = createContext();

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

    useEffect(() => {
        const audio = audioRef.current;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const handleEnded = () => playNext();

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleEnded);

        audio.volume = volume;

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        audio.src = playlist[currentTrackIndex].src;

        if (isPlaying) {
            audio.play().catch(console.error);
        }
    }, [currentTrackIndex]);

    const play = () => {
        audioRef.current.play()
            .then(() => setIsPlaying(true))
            .catch(console.error);
    };

    const pause = () => {
        audioRef.current.pause();
        setIsPlaying(false);
    };

    const togglePlay = () => {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    };

    const playNext = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    };

    const playPrevious = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    };

    const seek = (time) => {
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };

    const changeVolume = (newVolume) => {
        audioRef.current.volume = newVolume;
        setVolume(newVolume);
    };

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

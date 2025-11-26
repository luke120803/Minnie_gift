import { useState } from 'react';
import { AudioProvider } from './contexts/AudioContext';
import BottomNav from './components/BottomNav';
import Inicio from './pages/Inicio';
import Playlist from './pages/Playlist';
import NossaLista from './pages/NossaLista';
import Mimos from './pages/Mimos';

function App() {
    const [activeTab, setActiveTab] = useState('inicio');

    const renderContent = () => {
        switch (activeTab) {
            case 'inicio':
                return <Inicio />;
            case 'playlist':
                return <Playlist />;
            case 'lista':
                return <NossaLista />;
            case 'mimos':
                return <Mimos />;
            default:
                return <Inicio />;
        }
    };

    return (
        <AudioProvider>
            {/* 1. Fundo Escuro (Mesa) para Desktop */}
            <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center md:p-4">

                {/* 2. O Container do "Celular" */}
                <div className="
          w-full h-[100dvh]
          md:h-[850px] md:max-w-[400px] md:rounded-[40px]
          md:border-8 md:border-gray-800 md:shadow-2xl
          bg-gradient-to-b from-primary to-secondary heart-bg
          flex flex-col relative overflow-hidden
        ">

                    {/* Conteúdo Principal (com scroll) */}
                    <main className="flex-1 overflow-y-auto scrollbar-hide pb-20">
                        {renderContent()}
                    </main>

                    {/* Barra de Navegação Fixa na parte inferior do container */}
                    <div className="absolute bottom-0 w-full z-50">
                        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>

                </div>
            </div>
        </AudioProvider>
    );
}

export default App;
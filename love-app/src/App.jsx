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
            {/* Fundo escuro para simular uma "mesa" no desktop */}
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-0 md:p-4">

                {/* Container do "Celular" */}
                <div className="w-full h-full md:h-[850px] md:max-w-[400px] bg-gradient-to-b from-primary to-secondary heart-bg relative flex flex-col md:rounded-[40px] md:border-8 md:border-gray-800 shadow-2xl overflow-hidden">

                    {/* Área de Conteúdo (com scroll) */}
                    <main className="flex-1 overflow-y-auto overflow-x-hidden pb-20 scrollbar-hide">
                        {renderContent()}
                    </main>

                    {/* Barra de Navegação */}
                    <div className="absolute bottom-0 w-full">
                        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>

                </div>
            </div>
        </AudioProvider>
    );
}

export default App;
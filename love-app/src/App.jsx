import { useState, Suspense, lazy } from 'react'; // Importamos Suspense e lazy
import { AudioProvider } from './contexts/AudioContext';
import BottomNav from './components/BottomNav';

const Inicio = lazy(() => import('./pages/Inicio'));
const Playlist = lazy(() => import('./pages/Playlist'));
const NossaLista = lazy(() => import('./pages/NossaLista'));
const Mimos = lazy(() => import('./pages/Mimos'));

const Loading = () => (
    <div className="h-full flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
    </div>
);

function App() {
    const [activeTab, setActiveTab] = useState('inicio');

    const renderContent = () => {
        // Envolvemos as páginas com <Suspense>.
        // Se a página ainda não baixou, ele mostra o <Loading />
        return (
            <Suspense fallback={<Loading />}>
                {activeTab === 'inicio' && <Inicio />}
                {activeTab === 'playlist' && <Playlist />}
                {activeTab === 'lista' && <NossaLista />}
                {activeTab === 'mimos' && <Mimos />}
            </Suspense>
        );
    };

    return (
        <AudioProvider>
            {/* Container Principal (Layout Celular) */}
            <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center md:p-4">
                <div className="
          w-full h-[100dvh]
          md:h-[850px] md:max-w-[400px] md:rounded-[40px]
          md:border-8 md:border-gray-800 md:shadow-2xl
          bg-gradient-to-b from-primary to-secondary heart-bg
          flex flex-col relative overflow-hidden
        ">

                    <main className="flex-1 overflow-y-auto scrollbar-hide pb-20">
                        {renderContent()}
                    </main>

                    <div className="absolute bottom-0 w-full z-50">
                        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>

                </div>
            </div>
        </AudioProvider>
    );
}

export default App;
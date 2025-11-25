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
      <div className="h-screen flex flex-col bg-gradient-to-b from-primary to-secondary heart-bg">
        <main className="flex-1 overflow-hidden pb-16">
          {renderContent()}
        </main>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </AudioProvider>
  );
}

export default App;

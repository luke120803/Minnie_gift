# Love Story - Nossa História 💕

Uma Progressive Web Application (PWA) moderna desenvolvida em React + Vite para celebrar histórias de amor de forma interativa e tecnicamente sofisticada.

## Características Principais

### Arquitetura Mobile-First
- Interface otimizada para dispositivos móveis
- Bottom Navigation Bar fixa estilo app nativo
- Transições suaves entre abas
- Experiência fluida sem scroll na página principal

### 4 Abas Principais

#### 🏠 Início (Dashboard)
- Timer em tempo real mostrando o tempo de relacionamento
- Cards animados com gradientes para Anos, Meses, Dias, Horas, Minutos e Segundos
- Carrossel automático de fotos e vídeos
- Carta romântica personalizada

#### 🎵 Playlist (Player Musical)
- Player de áudio customizado com persistência entre abas
- Controles Play/Pause/Next/Previous
- Barra de progresso interativa
- Controle de volume
- Lista de reprodução com 4 músicas românticas
- Design inspirado no Spotify

#### 📋 Nossa Lista (Gamificação)
- Sistema Kanban/Tier List interativo
- 3 colunas: "Zeramos o Game", "DLCs em Breve" e "Boss Final"
- Drag-and-drop funcional para mover items
- Animações fluidas com Framer Motion
- Persistência visual de conquistas e sonhos

#### 💌 Mimos (Gerador de Frases)
- Gerador aleatório de mensagens românticas
- 12 frases personalizadas com emojis
- Animações 3D ao trocar frases
- Botão interativo pulsante
- Grid decorativo animado

## Stack Tecnológico

- **React** - Biblioteca UI moderna
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Framework CSS utility-first
- **Framer Motion** - Biblioteca de animações
- **Lucide React** - Ícones modernos
- **PWA** - Service Worker e Manifest configurados

## Instalação e Uso

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
cd love-app
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse http://localhost:5173

### Build para Produção

```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`

### Preview da Build

```bash
npm run preview
```

## Estrutura de Pastas

```
love-app/
├── public/
│   ├── assets/
│   │   ├── images/      # Fotos do casal
│   │   ├── music/       # Músicas da playlist
│   │   └── videos/      # Vídeos de memórias
│   ├── manifest.json    # PWA manifest
│   └── sw.js           # Service Worker
├── src/
│   ├── components/     # Componentes reutilizáveis
│   │   └── BottomNav.jsx
│   ├── contexts/       # Context API
│   │   └── AudioContext.jsx
│   ├── hooks/          # Custom Hooks
│   │   └── useTimer.js
│   ├── pages/          # Páginas das abas
│   │   ├── Inicio.jsx
│   │   ├── Playlist.jsx
│   │   ├── NossaLista.jsx
│   │   └── Mimos.jsx
│   ├── App.jsx         # Componente principal
│   ├── index.css       # Estilos globais
│   └── main.jsx        # Entry point
├── tailwind.config.js  # Configuração Tailwind
└── vite.config.js      # Configuração Vite
```

## Funcionalidades Técnicas

### Context API
- **AudioContext**: Gerencia estado global do player de música
- Persistência de áudio entre mudanças de aba
- Controles centralizados de playback

### Custom Hooks
- **useTimer**: Calcula tempo decorrido desde a data de aniversário
- Atualização em tempo real a cada segundo
- Suporte a localStorage para persistir data

### PWA Features
- Service Worker para cache de assets
- Manifest configurado para instalação
- Funciona offline após primeira visita
- Ícones e splash screens configurados

### Animações
- Framer Motion para transições entre abas
- AnimatePresence para enter/exit animations
- Micro-interações em botões e cards
- Scroll suave e gestos naturais

### Responsividade
- Mobile-first design
- Breakpoints otimizados para tablets
- Layout adaptativo para diferentes tamanhos
- Touch-friendly com áreas de toque generosas

## Paleta de Cores

```css
--primary: #ff6b81    /* Rosa principal */
--secondary: #ff4757  /* Rosa secundário */
--dark: #2f3542       /* Cinza escuro */
--light: #f1f2f6      /* Cinza claro */
```

## Tipografia

- **Fonte Display**: Dancing Script (títulos)
- **Fonte Corpo**: Poppins (texto geral)

## Assets Incluídos

### Imagens
- TianaNavin.jpeg
- Mickey.jpeg

### Músicas
- Evangeline (Princesa e o Sapo)
- Dueto (Noiva Cadáver)
- Mundo Ideal (Aladdin)
- Vejo enfim a luz brilhar (Enrolados)

### Vídeos
- lukeandminnie.mp4
- minnieandluke.mp4

## Customização

### Mudar Data de Aniversário
A data é armazenada no localStorage. Para alterar programaticamente:

```javascript
localStorage.setItem('anniversaryDate', new Date('2024-02-14').toISOString());
```

### Adicionar Músicas
Edite o array em `src/contexts/AudioContext.jsx`:

```javascript
const playlist = [
  {
    title: "Nome da Música",
    src: "/assets/music/arquivo.mp3"
  }
];
```

### Personalizar Frases
Edite o array em `src/pages/Mimos.jsx`:

```javascript
const phrases = [
  {
    text: 'Sua frase aqui',
    emoji: '❤️',
    color: 'from-pink-400 to-rose-400',
  }
];
```

## Performance

- Bundle size otimizado: ~334KB (107KB gzipped)
- CSS minificado: ~4KB
- Lazy loading de componentes
- Code splitting automático
- Assets em cache via Service Worker

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Licença

Projeto pessoal - Uso privado

## Autor

Desenvolvido com amor e tecnologia moderna para celebrar relacionamentos especiais.

---

Feito com ❤️ usando React, Tailwind CSS e Framer Motion

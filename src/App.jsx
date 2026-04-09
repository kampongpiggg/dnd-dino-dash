import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { HostView } from './pages/HostView';
import { PlayerView } from './pages/PlayerView';
import { AdminView } from './pages/AdminView';

const HomePage = () => (
  <div
    className="min-h-screen flex flex-col items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: 'url(https://i.imgur.com/QEdKp1G.png)' }}
  >
    <div className="rounded-2xl p-8 border-4" style={{ backgroundColor: 'rgba(26, 46, 26, 0.9)', borderColor: 'var(--chult-gold)' }}>
      <h1 className="text-4xl font-bold mb-2 text-center" style={{ color: 'var(--chult-gold)' }}>DINO-DASH</h1>
      <p className="mb-8 text-center" style={{ color: 'var(--chult-sand)' }}>Dinosaur Race Tracker</p>

      <div className="space-y-4 w-full max-w-xs">
      <Link
        to="/host"
        className="block w-full py-4 text-center text-xl font-bold rounded-lg text-white transition-all hover:brightness-110 border-2"
        style={{ backgroundColor: 'var(--chult-teal)', borderColor: 'var(--chult-gold)' }}
      >
        Jumbotron
      </Link>
      <Link
        to="/play"
        className="block w-full py-4 text-center text-xl font-bold rounded-lg text-white transition-all hover:brightness-110 border-2"
        style={{ backgroundColor: 'var(--chult-jungle)', borderColor: 'var(--chult-gold)' }}
      >
        Riders
      </Link>
      <Link
        to="/admin"
        className="block w-full py-4 text-center text-xl font-bold rounded-lg text-white transition-all hover:brightness-110 border-2"
        style={{ backgroundColor: 'var(--chult-terracotta)', borderColor: 'var(--chult-gold)' }}
      >
        Admin Panel
      </Link>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/host" element={<HostView />} />
        <Route path="/play" element={<PlayerView />} />
        <Route path="/admin" element={<AdminView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

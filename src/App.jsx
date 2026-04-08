import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { HostView } from './pages/HostView';
import { PlayerView } from './pages/PlayerView';
import { AdminView } from './pages/AdminView';

const HomePage = () => (
  <div
    className="min-h-screen flex flex-col items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: 'url(https://i.imgur.com/QEdKp1G.png)' }}
  >
    <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8">
      <h1 className="text-4xl font-bold text-white mb-2 text-center">DINO-DASH</h1>
      <p className="text-gray-300 mb-8 text-center">Dinosaur Race Tracker</p>

      <div className="space-y-4 w-full max-w-xs">
      <Link
        to="/host"
        className="block w-full py-4 text-center text-xl font-bold bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors"
      >
        Jumbotron
      </Link>
      <Link
        to="/play"
        className="block w-full py-4 text-center text-xl font-bold bg-green-600 hover:bg-green-500 rounded-lg text-white transition-colors"
      >
        Player View (Phone)
      </Link>
      <Link
        to="/admin"
        className="block w-full py-4 text-center text-xl font-bold bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
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

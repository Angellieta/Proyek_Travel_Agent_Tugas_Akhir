import { Routes, Route } from 'react-router-dom';

import NavbarComponent from './components/Navbar';

import HomePage from './pages/HomePage';
import KategoriTiket from './pages/KategoriTiket';
import TiketPesawat from './pages/TiketPesawat';
import TiketHotel from './pages/TiketHotel';
import TiketAtraksi from './pages/TiketAtraksi';
import TiketKeretaApi from './pages/TiketKeretaApi';

function App() {
  return (
    <div>
      <NavbarComponent />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/kategoritiket' element={<KategoriTiket />} />
        <Route path='/tiketpesawat' element={<TiketPesawat />} />
        <Route path='/tikethotel' element={<TiketHotel />} />
        <Route path='/tiketatraksi' element={<TiketAtraksi />} />
        <Route path='/tiketkeretaapi' element={<TiketKeretaApi />} />
      </Routes>
    </div>
  );
}

export default App;

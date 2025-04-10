import { Routes, Route, useLocation } from 'react-router-dom';

import NavbarComponent from './components/Navbar';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import KategoriTiket from './pages/KategoriTiket';
import TiketPesawat from './pages/TiketPesawat';
import TiketHotel from './pages/TiketHotel';
import TiketAtraksi from './pages/TiketAtraksi';
import TiketKeretaApi from './pages/TiketKeretaApi';
import RegisterPage from './pages/RegisterPage';
import DataCustomerPage from './pages/DataCustomerPage';

function App() {
  const location = useLocation();

  const hideNavbarPaths = ['/', '/register'];

  return (
    <div>
      {!hideNavbarPaths.includes(location.pathname) && <NavbarComponent />}
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/homepage' element={<HomePage />} />
        <Route path='/datacustomer' element={<DataCustomerPage />} />
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

import { useState, useEffect } from 'react';
import LogoImage from '../logo/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMemo } from 'react';

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const backPages = useMemo(
    () => [
      '/kategoritiket',
      '/tiketpesawat',
      '/tikethotel',
      '/tiketatraksi',
      '/tiketkeretaapi',
    ],
    []
  );

  useEffect(() => {
    if (!backPages.includes(location.pathname)) {
      sessionStorage.setItem('lastPage', location.pathname);
    }
  }, [location, backPages]); // Tambahkan `backPages` di sini

  const handleBack = () => {
    const lastPage = sessionStorage.getItem('lastPage');
    if (lastPage) {
      navigate(lastPage);
    } else {
      navigate('/');
    }
  };

  // Menggunakan useEffect untuk mendeteksi scroll
  useEffect(() => {
    const handleScroll = () => {
      // Jika pengguna scroll lebih dari 50px, setScrolling menjadi true
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    // Menambahkan event listener untuk mendeteksi scroll
    window.addEventListener('scroll', handleScroll);

    // Membersihkan event listener saat komponen di-unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`navbar fixed w-full transition-all py-1 z-50 ${
        scrolling ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className='container mx-auto px-4 '>
        <div className='navbar-box flex items-center justify-between z-999 mx-10'>
          <div className='logo'>
            <img
              src={LogoImage}
              alt='Logo'
              className='w-28'
              onClick={() => navigate('/')}
            />
          </div>
          <div className='relative flex flex-col items-center'>
            {backPages.includes(location.pathname) ? (
              <button
                onClick={handleBack}
                className='flex items-center px-7 py-3 rounded-lg font-medium text-sm hover:shadow-2xl text-white transform hover:translate-y-1 hover:bg-lime-900 hover:scale-105 transition-all duration-500 bg-lime-900  shadow-lg shadow-lime-900'
              >
                Kembali
              </button>
            ) : (
              <button
                onClick={() => navigate('/datacustomer')}
                className='flex items-center px-7 py-3 rounded-lg font-medium text-sm hover:shadow-2xl text-white transform hover:translate-y-1 hover:bg-lime-900 hover:scale-105 transition-all duration-500 bg-lime-900  shadow-lg shadow-lime-900'
              >
                Buat Tiket
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

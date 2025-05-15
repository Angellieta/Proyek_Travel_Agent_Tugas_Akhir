import Image from '../logo/bg_kategori.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaPlane, FaHotel, FaTicketAlt, FaTrain } from 'react-icons/fa'; // Import React Icons

const KategoriTiket = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const customerData = location.state || {};
  const username = location.state || {};

  return (
    <div className='container px-6 py-12 mx-auto'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 mx-10 my-28'>
        {/* Kolom Kiri: Gambar */}
        <div className='flex justify-center items-center mr-16 -mt-6'>
          <img
            src={Image}
            alt='Gambar Tiket'
            className='w-full max-w-md rounded-2xl  transform hover:scale-110  transition-transform duration-700 ease-in-out'
          />
        </div>

        {/* Kolom Kanan: Kategori Tiket */}
        <div className='flex flex-col space-y-6'>
          <h2 className='text-4xl font-extrabold text-lime-900 text-center lg:text-left tracking-tight'>
            Pilih Kategori Tiket
          </h2>

          {/* Tombol Tiket Pesawat */}
          <div className='grid grid-cols-2 gap-6'>
            {/* Tiket Pesawat */}
            <button
              className='bg-white font-semibold text-lime-900 p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:translate-y-1 hover:scale-105 transition-all duration-500 w-full h-40 flex flex-col items-center justify-center'
              onClick={() =>
                navigate('/tiketpesawat', { state: customerData, username })
              }
            >
              <FaPlane className='w-12 h-12 mb-2' /> {/* Icon Pesawat */}
              <span className='text-center'>Tiket Pesawat</span>
            </button>

            {/* Voucher Hotel */}
            <button
              className='bg-white font-semibold text-lime-900 p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:translate-y-1 hover:scale-105 transition-all duration-500 w-full h-40 flex flex-col items-center justify-center'
              onClick={() =>
                navigate('/voucherhotel', { state: customerData, username })
              }
            >
              <FaHotel className='w-12 h-12 mb-2' /> {/* Icon Hotel */}
              <span className='text-center'>Voucher Hotel</span>
            </button>

            {/* Tiket Atraksi */}
            <button
              className='bg-white font-semibold text-lime-900 p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:translate-y-1 hover:scale-105 transition-all duration-500 w-full h-40 flex flex-col items-center justify-center'
              onClick={() =>
                navigate('/tiketatraksi', { state: customerData, username })
              }
            >
              <FaTicketAlt className='w-12 h-12 mb-2' /> {/* Icon Atraksi */}
              <span className='text-center'>Tiket Atraksi</span>
            </button>

            {/* Tiket Kereta Api */}
            <button
              className='bg-white font-semibold text-lime-900 p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:translate-y-1 hover:scale-105 transition-all duration-500 w-full h-40 flex flex-col items-center justify-center'
              onClick={() =>
                navigate('/tiketkeretaapi', { state: customerData, username })
              }
            >
              <FaTrain className='w-12 h-12 mb-2' /> {/* Icon Kereta Api */}
              <span className='text-center'>Tiket Kereta Api</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KategoriTiket;

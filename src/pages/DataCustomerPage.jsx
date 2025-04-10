import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DataCustomerPage = () => {
  const navigate = useNavigate();

  const [namaCustomer, setNamaCustomer] = useState('');
  const [noTelpCustomer, setNoTelpCustomer] = useState('');
  const [emailCustomer, setEmailCustomer] = useState('');
  const [tglInput, setTglInput] = useState('');

  const [namaError, setNamaError] = useState('');
  const [telpError, setTelpError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [tglError, setTglError] = useState('');

  const handleSubmit = () => {
    let valid = true;

    if (namaCustomer.trim() === '') {
      setNamaError('Nama customer wajib diisi.');
      valid = false;
    } else {
      setNamaError('');
    }

    if (!/^\d{10,15}$/.test(noTelpCustomer)) {
      setTelpError('Nomor telepon harus 10-15 digit angka.');
      valid = false;
    } else {
      setTelpError('');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailCustomer)) {
      setEmailError('Format email tidak valid.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!tglInput) {
      setTglError('Tanggal input wajib diisi.');
      valid = false;
    } else {
      setTglError('');
    }

    if (valid) {
      navigate('/kategoritiket');
    }
  };

  return (
    <div className='w-full min-h-screen flex items-center justify-center bg-gray-100 p-4'>
      <div className='bg-white rounded-2xl shadow-lg flex flex-col md:flex-row w-full max-w-2xl overflow-hidden'>
        <div className='w-full p-8 space-y-10'>
          <h2 className='text-2xl font-bold text-gray-800'>
            Input Data Customer
          </h2>

          <div className='flex flex-col md:flex-row w-full gap-4  '>
            <div className='w-1/2 relative'>
              <label className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'>
                Nama Customer
              </label>
              <input
                type='text'
                value={namaCustomer}
                onChange={(e) => setNamaCustomer(e.target.value)}
                className='block px-2.5 pb-2.5 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
              />
              {namaError && (
                <p className='text-red-500 text-xs ml-2'>{namaError}</p>
              )}
            </div>

            <div className='w-1/2 relative'>
              <label className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'>
                No Telepon Customer
              </label>
              <input
                type='text'
                value={noTelpCustomer}
                onChange={(e) => setNoTelpCustomer(e.target.value)}
                className='block px-2.5 pb-2.5 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
              />
              {telpError && (
                <p className='text-red-500 text-xs ml-2'>{telpError}</p>
              )}
            </div>
          </div>
          <div className='flex flex-col md:flex-row gap-4 text-sm text-slate-700'>
            <div className='w-1/2 relative'>
              <label className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'>
                Email Customer
              </label>
              <input
                type='email'
                value={emailCustomer}
                onChange={(e) => setEmailCustomer(e.target.value)}
                className='block px-2.5 pb-2.5 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
              />
              {emailError && (
                <p className='text-red-500 text-xs ml-2'>{emailError}</p>
              )}
            </div>

            <div className='w-1/2 relative'>
              <label className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'>
                Tanggal Input
              </label>
              <input
                type='date'
                value={tglInput}
                onChange={(e) => setTglInput(e.target.value)}
                className='block px-2.5 pb-2.5 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
              />
              {tglError && (
                <p className='text-red-500 text-xs ml-2'>{tglError}</p>
              )}
            </div>
          </div>

          <div className='flex justify-between gap-4 '>
            <button
              className=' text-sm bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600'
              onClick={() => navigate('/')}
            >
              Kembali
            </button>
            <button
              className=' text-sm bg-lime-800 text-white px-4 py-2 rounded-lg hover:bg-lime-950'
              onClick={handleSubmit}
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCustomerPage;

import ImageRegister from '/assets/img/bg_register.gif';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [namaLengkap, setNamaLengkap] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [noTelp, setNoTelp] = useState('');

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

    if (!namaLengkap.trim()) {
      newErrors.namaLengkap = 'Nama lengkap wajib diisi.';
    }

    if (!username.trim()) {
      newErrors.username = 'Username wajib diisi.';
    }

    if (!passwordRegex.test(password)) {
      newErrors.password =
        'Password harus mengandung huruf besar, kecil, dan angka.';
    }

    if (!emailRegex.test(email)) {
      newErrors.email = 'Format email tidak valid.';
    }

    if (!/^\d{10,}$/.test(noTelp)) {
      newErrors.noTelp = 'No. Telp minimal 10 digit angka.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validate()) {
      navigate('/');
    }
  };

  return (
    <div className='w-full min-h-screen flex justify-center items-center bg-gray-100 px-4 py-10'>
      <div className='bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-5xl flex flex-col md:flex-row'>
        <div className='md:w-1/2  flex justify-center items-center p-6'>
          <img
            src={ImageRegister}
            alt='register'
            className='w-full object-cover'
          />
        </div>
        <div className='md:w-1/2 p-6 md:p-10'>
          <h2 className='text-2xl font-semibold mb-10 text-gray-700'>
            Buat Akun Admin
          </h2>
          <div className='space-y-4'>
            <div className='relative'>
              <label
                htmlFor='floating_outlined'
                className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
              >
                Nama Lengkap
              </label>
              <input
                id='floating_outlined'
                type='text'
                value={namaLengkap}
                onChange={(e) => setNamaLengkap(e.target.value)}
                className='block px-2.5 pb-2.5 pt-3 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
              />
              {errors.namaLengkap && (
                <p className='text-red-500 text-xs mt-1 ml-2'>
                  {errors.namaLengkap}
                </p>
              )}
            </div>
            <div className='relative'>
              <label
                htmlFor='floating_outlined'
                className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
              >
                Username
              </label>
              <input
                id='floating_outlined'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='block px-2.5 pb-2.5 pt-3 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
              />
              {errors.username && (
                <p className='text-red-500 text-xs mt-1 ml-2'>
                  {errors.username}
                </p>
              )}
            </div>
            <div className='relative'>
              <label
                htmlFor='floating_outlined'
                className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
              >
                Password
              </label>
              <input
                id='floating_outlined'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='block px-2.5 pb-2.5 pt-3 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
              />
              {errors.password && (
                <p className='text-red-500 text-xs mt-1 ml-2'>
                  {errors.password}
                </p>
              )}
            </div>
            <div className='relative'>
              <label
                htmlFor='floating_outlined'
                className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
              >
                Email
              </label>
              <input
                id='floating_outlined'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='block px-2.5 pb-2.5 pt-3 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
              />
              {errors.email && (
                <p className='text-red-500 text-xs mt-1 ml-2'>{errors.email}</p>
              )}
            </div>
            <div className='relative'>
              <label
                htmlFor='floating_outlined'
                className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
              >
                No. Telp
              </label>
              <input
                id='floating_outlined'
                type='tel'
                value={noTelp}
                onChange={(e) => setNoTelp(e.target.value)}
                className='block px-2.5 pb-2.5 pt-3 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
              />
              {errors.noTelp && (
                <p className='text-red-500 text-xs mt-1 ml-2'>
                  {errors.noTelp}
                </p>
              )}
            </div>
          </div>

          <p className='text-xs mt-10 text-gray-600 ml-1'>
            Sudah punya akun?{' '}
            <span
              className='text-blue-600 hover:underline cursor-pointer'
              onClick={() => navigate('/')}
            >
              Login di sini
            </span>
          </p>

          <div className='flex justify-between mt-2'>
            <button
              className='bg-gray-700 w-full text-white px-4 py-2 rounded-lg hover:bg-gray-800'
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

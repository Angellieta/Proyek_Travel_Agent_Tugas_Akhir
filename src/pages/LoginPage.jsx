import ImageLogin from '/assets/img/bg_login.gif';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LoginPage = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
    const usernameRegex = /^[a-zA-Z0-9]{5,15}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

    let valid = true;

    if (!usernameRegex.test(username)) {
      setUsernameError(
        'Nama pengguna harus terdiri dari 5-15 karakter alfanumerik.'
      );
      valid = false;
    } else {
      setUsernameError('');
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Kata sandi harus mengandung huruf besar, huruf kecil, dan angka.'
      );
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      navigate('/homepage', {
        state: {
          username,
        },
      });
    }
  };

  return (
    <div className='w-full min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='w-full max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row'>
        {/* Image Section */}
        <div className='md:w-1/2 w-full bg-gray-200'>
          <img
            src={ImageLogin}
            alt='login-img'
            className='w-full h-full object-cover'
          />
        </div>

        {/* Form Section */}
        <div className='md:w-1/2 w-full p-8'>
          <h2 className='text-3xl font-semibold mb-2'>Halo!</h2>
          <p className='text-gray-600 mb-6 '>Login untuk membuat Tiket</p>

          <div className='space-y-4'>
            <div className='relative'>
              <input
                id='username'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder=''
                className='block px-2.5 pb-2.5 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
              />
              {usernameError && (
                <p className='text-red-500 text-xs mt-1 ml-2'>
                  {usernameError}
                </p>
              )}
              <label
                htmlFor='username'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
              >
                Username
              </label>
            </div>

            <div className='relative'>
              <input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=''
                className='block px-2.5 pb-2.5 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-600 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
              />
              {passwordError && (
                <p className='text-red-500 text-xs mt-1 ml-2'>
                  {passwordError}
                </p>
              )}
              <label
                htmlFor='password'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
              >
                Password
              </label>
            </div>
          </div>

          <div className='mt-6'>
            <p className='text-gray-600 text-xs mb-2 ml-1'>
              Pengguna baru?{' '}
              <span
                className='text-blue-600 hover:underline cursor-pointer'
                onClick={() => navigate('/register')}
              >
                Register Di Sini
              </span>
            </p>
            <div className='flex justify-between space-x-4'>
              <button
                className='bg-lime-800 w-full text-white px-8 py-2 rounded-lg hover:bg-lime-700 transition'
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

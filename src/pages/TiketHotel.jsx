import { useState, useEffect } from 'react';
import { TbManFilled } from 'react-icons/tb';
import { ImManWoman } from 'react-icons/im';
import { Textarea } from 'flowbite-react';
import { format } from 'date-fns';

import data from '../data/tiket.json';
import html2canvas from 'html2canvas';

// Room and Bed Type

import { BsPersonFillCheck } from 'react-icons/bs';

// Fasilitas Umum
import { PiWifiHighBold } from 'react-icons/pi';
import { FaPersonSwimming } from 'react-icons/fa6';
import { PiChefHatBold } from 'react-icons/pi';

//Fasilitas Kamar
import { TbAirConditioning } from 'react-icons/tb';
import { PiBathtubBold } from 'react-icons/pi';
import { FaTv } from 'react-icons/fa6';

//Fasilitas Keamanan
import { GiKeyCard } from 'react-icons/gi';

//Fasilitas Layanan
import { TbHotelService } from 'react-icons/tb';
import { MdOutlineLocalLaundryService } from 'react-icons/md';

const TiketHotel = () => {
  const [codeBooking, setCodeBooking] = useState('');
  const [hotelName, setHotelName] = useState('');

  const [hotelAddress, setHotelAddress] = useState('');

  const [hotelDateDepature, setHotelDateDepature] = useState('');
  const [hotelTimeDepature, setHotelTimeDepature] = useState('');
  const [hotelDateArrival, setHotelDateArrival] = useState('');
  const [hotelTimeArrival, setHotelTimeArrival] = useState('');

  const [descHotel, setDescHotel] = useState('');

  // Radio Button Room Type
  const [roomType, setRoomType] = useState('');
  const [bedType, setBedType] = useState('');

  const [roomOptions, setRoomOptions] = useState([]);
  const [bedOptions, setBedOptions] = useState([]);

  useEffect(() => {
    setRoomOptions(data.roomType);
    setBedOptions(data.bedType);
  }, []);

  // Select Guest
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [isOpenn, setIsOpenn] = useState(false);
  const QuestToggleDropdown = () => {
    setIsOpenn(!isOpenn);
  };

  // Price
  const [formattedPrice, setFormattedPrice] = useState('Rp 0');
  const [ticketPrice, setTicketPrice] = useState(0);
  const handlePriceChange = (e) => {
    const value = e.target.value;

    const numericValue = value.replace(/[^0-9]/g, '');

    setTicketPrice(numericValue);
    setFormattedPrice(formatCurrency(numericValue));
  };

  const formatCurrency = (value) => {
    const numberValue = Number(value);
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(numberValue);
  };

  //Toogle
  const [wifi, setWifi] = useState(false);
  const [pool, setPool] = useState(false);
  const [resto, setResto] = useState(false);

  const [ac, setAc] = useState(false);
  const [bathtub, setBathtub] = useState(false);
  const [tv, setTv] = useState(false);
  const [rfid, setRfid] = useState(false);

  const [housekeep, setHousekeep] = useState(false);
  const [laundry, setLaundry] = useState(false);

  const toggleSwitch = (setter, currentValue) => {
    setter(!currentValue);
  };

  const captureScreenshot = async (sectionId, filename) => {
    const element = document.getElementById(sectionId); // Ambil elemen berdasarkan ID
    if (element) {
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = filename; // Nama file screenshot
      link.click();
    }
  };

  const calculateStayDuration = (hotelDateDepature, hotelDateArrival) => {
    const start = new Date(hotelDateDepature);
    const end = new Date(hotelDateArrival);

    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return `${diffDays - 1} Hari ${diffDays} Malam`;
  };

  const stayDuration = calculateStayDuration(
    hotelDateDepature,
    hotelDateArrival
  );
  return (
    <div className='p-8 mx-auto max-w-6xl'>
      <div className='my-28 p-24 bg-white shadow-lg rounded-2xl'>
        <h2 className='text-2xl font-semibold mb-12 text-center'>
          Voucher Hotel
        </h2>
        <hr className='mb-12' />

        <div className='flex flex-col gap-8'>
          <h3 className='text-lg font-semibold text-lime-600 ml-4'>
            Detail Hotel:
          </h3>

          <div className='flex ml-4'>
            <div className='justify-center items-center w-1/3 mr-4'>
              <div className='relative'>
                <input
                  type='text'
                  id='floating_outlined'
                  value={codeBooking}
                  onChange={(e) => setCodeBooking(e.target.value)}
                  className='block px-2.5 pb-2.5 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  placeholder=' '
                />
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Kode Booking
                </label>
              </div>
            </div>

            <div className='justify-center items-center w-2/3'>
              <div className='relative'>
                <input
                  type='text'
                  id='floating_outlined'
                  value={hotelName}
                  onChange={(e) => setHotelName(e.target.value)}
                  className='block px-2.5 pb-2.5 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  placeholder=' '
                />
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Nama Hotel
                </label>
              </div>
            </div>
          </div>

          <div className='flex ml-4'>
            <div className='justify-center items-center w-full'>
              <div className='relative'>
                <input
                  type='text'
                  id='floating_outlined'
                  value={hotelAddress}
                  onChange={(e) => setHotelAddress(e.target.value)}
                  className='block px-2.5 pb-2.5 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  placeholder=' '
                />
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Alamat Lengkap
                </label>
              </div>
            </div>
          </div>

          <div className='flex ml-4'>
            <div className='justify-center items-center w-1/4 mr-4'>
              <div className='relative'>
                <input
                  type='date'
                  id='floating_outlined'
                  value={hotelDateDepature}
                  onChange={(e) => setHotelDateDepature(e.target.value)}
                  className='block px-2.5 pb-2.5 pt-4 pl-4  w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  placeholder=' '
                />
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-sm  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Tanggal Masuk
                </label>
              </div>
            </div>

            <div className='justify-center items-center w-1/4 mr-4'>
              <div className='relative'>
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Waktu Masuk
                </label>
                <div className='absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none'>
                  <svg
                    className='w-4 h-4 text-gray-500 dark:text-gray-400'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='#515151'
                    viewBox='0 0 26 26'
                  >
                    <path
                      fillRule='evenodd'
                      d='M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <input
                  type='time'
                  id='floating_outlined'
                  className='block px-2.5 pb-2 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  min='09:00'
                  max='18:00'
                  value={hotelTimeDepature || ''}
                  onChange={(e) => setHotelTimeDepature(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className='justify-center items-center w-1/4 mr-4'>
              <div className='relative'>
                <input
                  type='date'
                  id='floating_outlined'
                  value={hotelDateArrival}
                  onChange={(e) => setHotelDateArrival(e.target.value)}
                  className='block px-2.5 pb-2.5 pt-4 pl-4  w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  placeholder=' '
                />
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-sm  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Tanggal Keluar
                </label>
              </div>
            </div>

            <div className='justify-center items-center w-1/4'>
              <div className='relative'>
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Waktu Keluar
                </label>
                <div className='absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none'>
                  <svg
                    className='w-4 h-4 text-gray-500 dark:text-gray-400'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='#515151'
                    viewBox='0 0 26 26'
                  >
                    <path
                      fillRule='evenodd'
                      d='M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <input
                  type='time'
                  id='floating_outlined'
                  className='block px-2.5 pb-2 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  min='09:00'
                  max='18:00'
                  value={hotelTimeArrival || ''}
                  onChange={(e) => setHotelTimeArrival(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className='flex ml-4'>
            <div className='justify-center items-center w-1/2 mr-4'>
              <div className='relative'>
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Tipe Kamar
                </label>
                <select
                  id='floating_outlined'
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className='block px-2.5 pb-2.5 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                >
                  <option value=''>-</option>
                  {roomOptions.map((room) => (
                    <option key={room.code} value={room.code}>
                      {room.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='justify-center items-center w-1/2'>
              <div className='relative'>
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Tipe Kasur
                </label>
                <select
                  id='floating_outlined'
                  value={bedType}
                  onChange={(e) => setBedType(e.target.value)}
                  className='block px-2.5 pb-2.5 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                >
                  <option value=''>-</option>
                  {bedOptions.map((bed) => (
                    <option key={bed.code} value={bed.code}>
                      {bed.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className='flex ml-4'>
            <div className='justify-center items-center w-1/2 mr-4'>
              <div className='relative'>
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-sm  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Jumlah Tamu
                </label>
                <button
                  onClick={QuestToggleDropdown}
                  id='floating_outlined'
                  className='w-full text-sm text-gray-700 text-left border border-gray-300 rounded-lg px-4 py-3 bg-white flex justify-between items-center shadow-sm focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                >
                  <span className='text-xs text-gray-700 '>{`${adults} Dewasa, ${children} Anak`}</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M19.5 9l-7.5 7.5L4.5 9'
                    />
                  </svg>
                </button>
                {isOpenn && (
                  <div className='absolute top-full mt-2 w-full border border-gray-300 rounded-lg bg-white shadow-lg p-4 z-10'>
                    <div className='flex justify-between items-center mb-4'>
                      <ImManWoman className='ml-1 text-lime-700' />
                      <span className='text-gray-700 text-sm pl-3'>Dewasa</span>
                      <div className='flex items-center space-x-2'>
                        <button
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className='px-3 py-1 border rounded-lg bg-lime-400 hover:bg-lime-500'
                        >
                          -
                        </button>
                        <span>{adults}</span>
                        <button
                          onClick={() => setAdults(adults + 1)}
                          className='px-3 py-1 border rounded-lg bg-lime-400 hover:bg-lime-500'
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className='flex justify-between items-center mb-4'>
                      <TbManFilled className='text-lime-700' />
                      <span className='text-gray-700 text-sm text-left'>
                        Anak-anak
                      </span>
                      <div className='flex items-center space-x-2'>
                        <button
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          className='px-3 py-1 border rounded-lg bg-lime-400 hover:bg-lime-500'
                        >
                          -
                        </button>
                        <span>{children}</span>
                        <button
                          onClick={() => setChildren(children + 1)}
                          className='px-3 py-1 border rounded-lg bg-lime-400 hover:bg-lime-500'
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsOpenn(false)}
                      className='mt-2 w-full bg-lime-700 text-white rounded-lg py-2 hover:bg-gray-800'
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className='justify-center items-center w-1/2'>
              <div className='relative'>
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Harga Tiket
                </label>
                <input
                  type='text'
                  id='floating_outlined'
                  value={formattedPrice}
                  onChange={handlePriceChange}
                  className='block px-2.5 pb-3 py-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                />
              </div>
            </div>
          </div>

          <div className='flex justify-around'>
            <div className='flex flex-col gap-5'>
              <div className='text-sm font-semibold text-lime-600 -ml-2'>
                Fasilitas Umum :
              </div>
              <div className='inline-flex items-center mr-6'>
                <div
                  className={`relative inline-flex items-center cursor-pointer  ${
                    wifi ? 'bg-lime-600' : 'bg-gray-300'
                  } h-6 w-12 rounded-full`}
                  onClick={() => toggleSwitch(setWifi, wifi)}
                >
                  <span
                    className={`${
                      wifi ? 'translate-x-6' : 'translate-x-1'
                    } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                  ></span>
                </div>
                <div className='ml-4 text-xs text-gray-600 '>Wifi</div>
              </div>

              <div className='inline-flex items-center mr-6'>
                <div
                  className={`relative inline-flex items-center cursor-pointer ${
                    pool ? 'bg-lime-600' : 'bg-gray-300'
                  } h-6 w-12 rounded-full`}
                  onClick={() => toggleSwitch(setPool, pool)}
                >
                  <span
                    className={`${
                      pool ? 'translate-x-6' : 'translate-x-1'
                    } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                  ></span>
                </div>
                <div className='ml-4 text-xs text-gray-600 '>Kolam Renang</div>
              </div>
              <div className='inline-flex items-center mr-6'>
                <div
                  className={`relative inline-flex items-center cursor-pointer ${
                    resto ? 'bg-lime-600' : 'bg-gray-300'
                  } h-6 w-12 rounded-full`}
                  onClick={() => toggleSwitch(setResto, resto)}
                >
                  <span
                    className={`${
                      resto ? 'translate-x-6' : 'translate-x-1'
                    } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                  ></span>
                </div>
                <div className='ml-4 text-xs text-gray-600 '>Restoran/Cafe</div>
              </div>
            </div>

            <div className='flex flex-col  gap-5'>
              <div className='text-sm font-semibold text-lime-600 -ml-2'>
                Fasilitas Kamar :
              </div>
              <div className='inline-flex items-center mr-6'>
                <div
                  className={`relative inline-flex items-center cursor-pointer ${
                    ac ? 'bg-lime-600' : 'bg-gray-300'
                  } h-6 w-12 rounded-full`}
                  onClick={() => toggleSwitch(setAc, ac)}
                >
                  <span
                    className={`${
                      ac ? 'translate-x-6' : 'translate-x-1'
                    } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                  ></span>
                </div>
                <div className='ml-4 text-xs text-gray-600 '>AC</div>
              </div>

              <div className='inline-flex items-center mr-6'>
                <div
                  className={`relative inline-flex items-center cursor-pointer ${
                    bathtub ? 'bg-lime-600' : 'bg-gray-300'
                  } h-6 w-12 rounded-full`}
                  onClick={() => toggleSwitch(setBathtub, bathtub)}
                >
                  <span
                    className={`${
                      bathtub ? 'translate-x-6' : 'translate-x-1'
                    } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                  ></span>
                </div>
                <div className='ml-4 text-xs text-gray-600 '>Bathtub</div>
              </div>
              <div className='inline-flex items-center '>
                <div
                  className={`relative inline-flex items-center cursor-pointer ${
                    tv ? 'bg-lime-600' : 'bg-gray-300'
                  } h-6 w-12 rounded-full`}
                  onClick={() => toggleSwitch(setTv, tv)}
                >
                  <span
                    className={`${
                      tv ? 'translate-x-6' : 'translate-x-1'
                    } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                  ></span>
                </div>
                <div className='ml-4 text-xs text-gray-600 '>TV Layar</div>
              </div>
            </div>

            <div className='flex flex-col  gap-5'>
              <div className='text-sm font-semibold text-lime-600 '>
                Fasilitas Layanan :
              </div>

              <div className='inline-flex items-center mr-6'>
                <div
                  className={`relative inline-flex items-center cursor-pointer ${
                    housekeep ? 'bg-lime-600' : 'bg-gray-300'
                  } h-6 w-12 rounded-full`}
                  onClick={() => toggleSwitch(setHousekeep, housekeep)}
                >
                  <span
                    className={`${
                      housekeep ? 'translate-x-6' : 'translate-x-1'
                    } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                  ></span>
                </div>
                <div className='ml-4 text-xs text-gray-600 '>Housekeeping</div>
              </div>
              <div className='inline-flex items-center '>
                <div
                  className={`relative inline-flex items-center cursor-pointer ${
                    laundry ? 'bg-lime-600' : 'bg-gray-300'
                  } h-6 w-12 rounded-full`}
                  onClick={() => toggleSwitch(setLaundry, laundry)}
                >
                  <span
                    className={`${
                      laundry ? 'translate-x-6' : 'translate-x-1'
                    } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                  ></span>
                </div>
                <div className='ml-4 text-xs text-gray-600 '>Laundry</div>
              </div>
              <div className='inline-flex items-center '>
                <div
                  className={`relative inline-flex items-center cursor-pointer ${
                    rfid ? 'bg-lime-600' : 'bg-gray-300'
                  } h-6 w-12 rounded-full`}
                  onClick={() => toggleSwitch(setRfid, rfid)}
                >
                  <span
                    className={`${
                      rfid ? 'translate-x-6' : 'translate-x-1'
                    } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                  ></span>
                </div>
                <div className='ml-4 text-xs text-gray-600 '>
                  Sistem Kartu Akses
                </div>
              </div>
            </div>
          </div>
          <div className='flex'>
            <div className='relative w-full ml-4'>
              <Textarea
                type='text'
                id='floating_outlined'
                value={descHotel}
                onChange={(e) => setDescHotel(e.target.value)}
                className='block px-2.5 pb-2.5 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                placeholder=' '
              />
              <label
                htmlFor='floating_outlined'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
              >
                Keterangan Tambahan
              </label>
            </div>
          </div>
        </div>

        <div className='container mx-auto p-6'>
          <h3 className='text-lg font-semibold text-lime-600 mb-4 '>
            Rincian Voucher Hotel
          </h3>
          <div className='mt-8 mx-4 ' id='sectionTwo'>
            <div id='sectionOne'>
              <div className='bg-white shadow-lg rounded-lg p-8 mb-6 mx-auto '>
                <div className='flex flex-col gap-2 mt-6 ml-5 mb-4'>
                  <div className='text-lg font-semibold text-lime-800'>
                    {hotelName}
                  </div>

                  <div className='flex text-sm'>
                    <span className='w-20 text-gray-500'>Alamat </span>
                    <span className='pr-2'> : </span>
                    <span className='text-gray-500 pl-2'>{hotelAddress}</span>
                  </div>
                </div>

                <hr className='my-6' />

                <div className='flex justify-center gap-10'>
                  <div>
                    <div className='text-slate-600 font-medium'>
                      {' '}
                      {hotelDateDepature &&
                        format(new Date(hotelDateDepature), 'd MMMM yyyy')}
                    </div>
                    <div className='text-sm text-slate-600'>
                      {' '}
                      {hotelTimeDepature}{' '}
                    </div>
                  </div>
                  <div>
                    <div className='flex items-center justify-between w-40 mt-2 mb-2'>
                      <div className='h-1.5 w-1.5 bg-lime-600 rounded-full'></div>
                      <div className='flex-grow border-lime-600 border-t-[0.5px]'></div>
                      <div className='h-1.5 w-1.5 bg-lime-600 rounded-full'></div>
                    </div>
                    <div className='text-center text-sm text-slate-600'>
                      {' '}
                      {stayDuration}{' '}
                    </div>
                  </div>
                  <div className='text-right'>
                    <div className='text-slate-600 font-medium'>
                      {hotelDateArrival &&
                        format(new Date(hotelDateArrival), 'd MMMM yyyy')}{' '}
                      {}{' '}
                    </div>
                    <div className='text-sm text-slate-600 '>
                      {' '}
                      {hotelTimeArrival}{' '}
                    </div>
                  </div>
                </div>

                <div className='text-right mr-6 mb-4 mt-6'>
                  <span className='text-orange-500 font-bold '>
                    {formatCurrency(ticketPrice)}
                  </span>{' '}
                  /pax
                </div>

                <div className='flex justify-end mr-6'>
                  <button
                    onClick={handleToggleDropdown}
                    className='text-xs text-lime-700 hover:underline'
                  >
                    Lihat Detail {isOpen ? '▲' : '▼'}
                  </button>
                </div>
              </div>
              <div>
                {isOpen && (
                  <div className='border-slate-200 border-2 rounded-b-lg -mt-6 px-16 py-8 mb-4'>
                    <div className='flex text-sm text-lime-900 font-bold rounded-md py-3 px-4 items-center mr-6 ml-8'>
                      <div className='-mt-2'>
                        <span className=''>Kode Booking </span>
                        <span className='px-2'>:</span>
                        <span className=''>{codeBooking}</span>
                      </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                      <div className='flex ml-9 mt-2 text-xs font-medium'>
                        <div className='flex items-center gap-2 text-lime-900 py-2 px-3 rounded-md'>
                          <BsPersonFillCheck className=' text-lime-900 text-lg -mb-2' />
                          <span className='-mt-1'>{`${adults} Dewasa ${children} Anak`}</span>
                        </div>
                      </div>
                      <div className='flex gap-2'>
                        <div className='ml-12 text-xs text-lime-900 font-medium'>
                          <span className='font-bold'>Tipe &nbsp;:&nbsp; </span>
                          <span>
                            {roomType
                              ? roomOptions.find(
                                  (room) => room.code === roomType
                                )?.name
                              : 'Belum dipilih'}
                          </span>
                        </div>
                        <span className='-ml-1 text-xs text-lime-900 font-medium'>
                          dengan
                        </span>

                        <div className='-ml-1 text-xs text-lime-900 font-medium'>
                          <span>
                            {bedType
                              ? bedOptions.find((bed) => bed.code === bedType)
                                  ?.name
                              : 'Belum dipilih'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <h3 className='ml-12 mb-5 text-lime-800 font-medium mt-8 text-xs'>
                      Fasilitas yang tersedia :
                    </h3>

                    <div className='grid grid-flow-col grid-rows-2 gap-2 ml-20 font-medium'>
                      {wifi && (
                        <div className='flex items-center text-lime-900 '>
                          <PiWifiHighBold className='mr-2 text-base' />
                          <span className='text-xs -mt-4'>WiFi</span>
                        </div>
                      )}

                      {pool && (
                        <div className='flex items-center text-lime-900'>
                          <FaPersonSwimming className='mr-2 text-base' />
                          <span className='text-xs -mt-4'>Kolam Renang</span>
                        </div>
                      )}
                      {resto && (
                        <div className='flex items-center text-lime-900'>
                          <PiChefHatBold className='mr-2 text-base' />
                          <span className='text-xs -mt-4'>Restoran/Cafe</span>
                        </div>
                      )}

                      {ac && (
                        <div className='flex items-center text-lime-900'>
                          <TbAirConditioning className='mr-2 text-lg' />
                          <span className='text-xs -mt-4'>AC</span>
                        </div>
                      )}

                      {bathtub && (
                        <div className='flex items-center text-lime-900'>
                          <PiBathtubBold className='mr-2 text-lg' />
                          <span className='text-xs -mt-4'>Bathtub</span>
                        </div>
                      )}
                      {tv && (
                        <div className='flex items-center text-lime-900'>
                          <FaTv className='mr-2 text-sm' />
                          <span className='text-xs -mt-4'>Tv Layar</span>
                        </div>
                      )}
                      {rfid && (
                        <div className='flex items-center text-lime-900'>
                          <GiKeyCard className='mr-2 text-xl' />
                          <span className='text-xs -mt-4'>
                            Sistem Kartu Akses
                          </span>
                        </div>
                      )}
                      {housekeep && (
                        <div className='flex items-center text-lime-900'>
                          <TbHotelService className='mr-2 text-xl' />
                          <span className='text-xs -mt-4'>Housekeeping</span>
                        </div>
                      )}
                      {laundry && (
                        <div className='flex items-center text-lime-900'>
                          <MdOutlineLocalLaundryService className='mr-2 text-xl' />
                          <span className='text-xs -mt-4'>Laundry</span>
                        </div>
                      )}
                    </div>

                    <hr className='my-10' />

                    <div className='text-xs text-gray-700 ml-6'>
                      {' '}
                      {descHotel}{' '}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className='mx-auto'>
              <button
                className='bg-lime-700 hover:bg-lime-800 text-white font-medium py-2 px-4 rounded-lg float-right ml-4'
                onClick={() =>
                  captureScreenshot('sectionTwo', 'RincianVoucherHotel.png')
                }
              >
                Unduh Tiket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiketHotel;

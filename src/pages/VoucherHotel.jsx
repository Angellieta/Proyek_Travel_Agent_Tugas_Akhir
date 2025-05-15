import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
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

const VoucherHotel = () => {
  const voucherHotelRef = useRef();

  const popupRef = useRef();

  const handleDownloadPopup = async () => {
    if (popupRef.current) {
      const canvas = await html2canvas(popupRef.current);
      const dataURL = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `Voucher-Hotel-${hotelName}-${hotelDateDepature}.png`;
      link.click();
    }
  };

  const location = useLocation();
  const { namaCustomer, tglInput } = location.state;

  const [showPopup, setShowPopup] = useState(false);

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

  const [formErrors, setFormErrors] = useState({});

  const hotelNameRef = useRef(null);
  const hotelAddressRef = useRef(null);
  const hotelDateDepatureRef = useRef(null);
  const hotelTimeDepatureRef = useRef(null);
  const hotelDateArrivalRef = useRef(null);
  const hotelTimeArrivalRef = useRef(null);
  const roomTypeRef = useRef(null);
  const bedTypeRef = useRef(null);
  const questRef = useRef(null);
  const facilityRef = useRef(null);
  const descHotelRef = useRef(null);
  const priceRef = useRef(null);

  const ValidateVoucherHotel = () => {
    const newErrors = {};
    let firstInvalidRef = null;

    if (!hotelName.trim()) {
      newErrors.hotelName = 'Nama hotel wajib diisi';
      if (!firstInvalidRef) firstInvalidRef = hotelNameRef;
    }

    if (!hotelAddress.trim()) {
      newErrors.hotelAddress = 'Alamat wajib diisi';
      if (!firstInvalidRef) firstInvalidRef = hotelAddressRef;
    } else if (hotelAddress.length < 20) {
      newErrors.hotelAddress = 'Alamat terlalu singkat (min. 20 karakter)';
      if (!firstInvalidRef) firstInvalidRef = hotelAddressRef;
    } else if (hotelAddress.length > 200) {
      newErrors.hotelAddress = 'Alamat tidak boleh lebih dari 200 karakter';
      if (!firstInvalidRef) firstInvalidRef = hotelAddressRef;
    }

    if (!hotelDateDepature.trim()) {
      newErrors.hotelDateDepature = 'Tanggal masuk wajib diisi';
      if (!firstInvalidRef) firstInvalidRef = hotelDateDepatureRef;
    }

    if (!hotelDateArrival.trim()) {
      newErrors.hotelDateArrival = 'Tanggal keluar wajib diisi';
      if (!firstInvalidRef) firstInvalidRef = hotelDateArrivalRef;
    }

    if (
      hotelDateDepature &&
      hotelDateArrival &&
      new Date(hotelDateDepature) >= new Date(hotelDateArrival)
    ) {
      newErrors.hotelDateArrival = 'Tanggal keluar harus setelah tanggal masuk';
      if (!firstInvalidRef) firstInvalidRef = hotelDateArrivalRef;
    }

    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

    if (!hotelTimeDepature.trim() || !timeRegex.test(hotelTimeDepature)) {
      newErrors.hotelTimeDepature = 'Jam masuk wajib diisi';
      if (!firstInvalidRef) firstInvalidRef = hotelTimeDepatureRef;
    }

    if (!hotelTimeArrival.trim() || !timeRegex.test(hotelTimeArrival)) {
      newErrors.hotelTimeArrival = 'Jam keluar wajib diisi ';
      if (!firstInvalidRef) firstInvalidRef = hotelTimeArrivalRef;
    }

    if (!roomType.trim()) {
      newErrors.roomType = 'Tipe kamar wajib dipilih';
      if (!firstInvalidRef) firstInvalidRef = roomTypeRef;
    }

    if (!bedType.trim()) {
      newErrors.bedType = 'Tipe kasur wajib dipilih';
      if (!firstInvalidRef) firstInvalidRef = bedTypeRef;
    }

    if (adults < 1) {
      newErrors.QuestToggleDropdown =
        'Jumlah tamu harus terdiri dari minimal 1 orang dewasa.';
      if (!firstInvalidRef) firstInvalidRef = questRef;
    }

    const parsedPrice = Number(formattedPrice.replace(/[^\d]/g, ''));

    if (!parsedPrice || parsedPrice <= 0) {
      newErrors.formattedPrice = 'Harga wajib diisi dan harus lebih dari 0';
      if (!firstInvalidRef) firstInvalidRef = priceRef;
    }

    const toggleOptions = [
      wifi,
      pool,
      resto,
      ac,
      bathtub,
      tv,
      rfid,
      housekeep,
      laundry,
    ];
    const hasSelectedFacility = toggleOptions.some((value) => value);

    if (!hasSelectedFacility) {
      newErrors.facility = '*Minimal satu fasilitas hotel harus dipilih*';
      if (!firstInvalidRef) firstInvalidRef = facilityRef;
    }

    if (descHotel.trim().split(/\s+/).length > 100) {
      newErrors.descHotel = 'Keterangan tambahan maksimal 100 kata';
      if (!firstInvalidRef) firstInvalidRef = descHotelRef;
    }
    setFormErrors(newErrors);
    return { isValid: Object.keys(newErrors).length === 0, firstInvalidRef };
  };

  const downloadVoucherHotel = async () => {
    if (!voucherHotelRef.current) return;

    const canvas = await html2canvas(voucherHotelRef.current);
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = `Preview-Voucher-Hotel-${hotelName}-${hotelDateDepature}.png`;
    link.click();
  };

  const handleVoucherHotel = () => {
    const { isValid, firstInvalidRef } = ValidateVoucherHotel();

    if (isValid) {
      downloadVoucherHotel();
    } else if (firstInvalidRef && firstInvalidRef.current) {
      firstInvalidRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      firstInvalidRef.current.focus();
    }
  };

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
            <div className='justify-center items-center w-2/5 mr-4'>
              <div className='relative'>
                <input
                  ref={hotelNameRef}
                  type='text'
                  id='floating_outlined'
                  value={hotelName}
                  onChange={(e) => setHotelName(e.target.value)}
                  className='block px-2.5 pb-2.5 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  placeholder=' '
                />
                {formErrors.hotelName && (
                  <p className='absolute text-red-500 text-xs mt-1 ml-2'>
                    {formErrors.hotelName}
                  </p>
                )}
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Nama Hotel
                </label>
              </div>
            </div>

            <div className='justify-center items-center w-3/5'>
              <div className='relative'>
                <input
                  ref={hotelAddressRef}
                  type='text'
                  id='floating_outlined'
                  value={hotelAddress}
                  onChange={(e) => setHotelAddress(e.target.value)}
                  className='block px-2.5 pb-2.5 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  placeholder=' '
                />
                {formErrors.hotelAddress && (
                  <p className='absolute text-red-500 text-xs mt-1 ml-2'>
                    {formErrors.hotelAddress}
                  </p>
                )}
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
                  ref={hotelDateDepatureRef}
                  type='date'
                  id='floating_outlined'
                  value={hotelDateDepature}
                  onChange={(e) => setHotelDateDepature(e.target.value)}
                  className='block px-2.5 pb-2.5 pt-4 pl-4  w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  placeholder=' '
                />
                {formErrors.hotelDateDepature && (
                  <p className='absolute text-red-500 text-xs mt-1 ml-2'>
                    {formErrors.hotelDateDepature}
                  </p>
                )}
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
                  ref={hotelTimeDepatureRef}
                  type='time'
                  id='floating_outlined'
                  className='block px-2.5 pb-2 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  min='09:00'
                  max='18:00'
                  value={hotelTimeDepature || ''}
                  onChange={(e) => setHotelTimeDepature(e.target.value)}
                  required
                />
                {formErrors.hotelTimeDepature && (
                  <p className='absolute text-red-500 text-xs mt-1 ml-2'>
                    {formErrors.hotelTimeDepature}
                  </p>
                )}
              </div>
            </div>

            <div className='justify-center items-center w-1/4 mr-4'>
              <div className='relative'>
                <input
                  ref={hotelDateArrivalRef}
                  type='date'
                  id='floating_outlined'
                  value={hotelDateArrival}
                  min={hotelDateDepature}
                  onChange={(e) => setHotelDateArrival(e.target.value)}
                  className='block px-2.5 pb-2.5 pt-4 pl-4  w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  placeholder=' '
                />
                {formErrors.hotelDateArrival && (
                  <p className='absolute text-red-500 text-xs mt-1 ml-2'>
                    {formErrors.hotelDateArrival}
                  </p>
                )}
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
                  ref={hotelTimeArrivalRef}
                  type='time'
                  id='floating_outlined'
                  className='block px-2.5 pb-2 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  min='09:00'
                  max='18:00'
                  value={hotelTimeArrival || ''}
                  onChange={(e) => setHotelTimeArrival(e.target.value)}
                  required
                />
                {formErrors.hotelTimeArrival && (
                  <p className='absolute text-red-500 text-xs mt-1 ml-2'>
                    {formErrors.hotelTimeArrival}
                  </p>
                )}
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
                  ref={roomTypeRef}
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
                {formErrors.roomType && (
                  <p className='absolute text-red-500 text-xs mt-1 ml-2'>
                    {formErrors.roomType}
                  </p>
                )}
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
                  ref={bedTypeRef}
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
                {formErrors.bedType && (
                  <p className='absolute text-red-500 text-xs mt-1 ml-2'>
                    {formErrors.bedType}
                  </p>
                )}
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
                {formErrors.QuestToggleDropdown && (
                  <p className='absolute text-red-500 text-xs mt-1 ml-2'>
                    {formErrors.QuestToggleDropdown}
                  </p>
                )}
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
                  ref={priceRef}
                  type='text'
                  id='floating_outlined'
                  value={formattedPrice}
                  onChange={handlePriceChange}
                  className='block px-2.5 pb-3 py-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                />
                {formErrors.formattedPrice && (
                  <p className='absolute text-red-500 text-xs mt-1 ml-2'>
                    {formErrors.formattedPrice}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className='flex justify-around' ref={facilityRef}>
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
          {formErrors.facility && (
            <div className='text-red-500 text-sm text-center mt-2'>
              {formErrors.facility}
            </div>
          )}
          <div className='flex'>
            <div className='relative w-full ml-4'>
              <Textarea
                ref={descHotelRef}
                type='text'
                id='floating_outlined'
                value={descHotel}
                onChange={(e) => setDescHotel(e.target.value)}
                className='block px-2.5 pb-2.5 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                placeholder=' '
              />
              {formErrors.descHotel && (
                <p className='absolute text-red-500 text-xs mt-1 ml-2'>
                  {formErrors.descHotel}
                </p>
              )}
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
          <div className='mt-8 mx-4 ' ref={voucherHotelRef}>
            <div>
              <div className='bg-white shadow-lg rounded-lg p-8 mb-6 mx-auto '>
                <div className='flex flex-col gap-2 mt-6 ml-5 mb-4'>
                  <div className='text-lg font-semibold text-lime-800 ml-0.5'>
                    {hotelName}
                  </div>

                  <div className='flex text-xs ml-1'>
                    <span className='w-32 text-gray-500'>Alamat </span>
                    <span className='pr-2'> : </span>
                    <span className='text-gray-500 pl-2'>{hotelAddress}</span>
                  </div>
                </div>

                <hr className='my-6' />
                <div className='flex items-center justify-between px-8 -ml-2'>
                  <div className='flex justify-center gap-10'>
                    <div>
                      <div className='text-slate-600 text-sm font-medium'>
                        {' '}
                        {hotelDateDepature &&
                          format(new Date(hotelDateDepature), 'd MMMM yyyy')}
                      </div>
                      <div className='text-xs text-slate-600'>
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
                      <div className='text-center text-xs text-slate-600'>
                        {' '}
                        {stayDuration}{' '}
                      </div>
                    </div>
                    <div className='text-right'>
                      <div className='text-slate-600 text-sm font-medium'>
                        {hotelDateArrival &&
                          format(
                            new Date(hotelDateArrival),
                            'd MMMM yyyy'
                          )}{' '}
                        {}{' '}
                      </div>
                      <div className='text-xs text-slate-600 '>
                        {' '}
                        {hotelTimeArrival}{' '}
                      </div>
                    </div>
                  </div>

                  <div className='text-right flex flex-col justify-between items-right align-middle gap-3 text-sm '>
                    <div>
                      <span className='text-orange-500 font-bold '>
                        {formatCurrency(ticketPrice)}
                      </span>{' '}
                      /pax
                    </div>

                    <div className='text-right'>
                      <button
                        onClick={handleToggleDropdown}
                        className='text-xs text-lime-700 hover:underline'
                      >
                        Lihat Detail {isOpen ? '▲' : '▼'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {isOpen && (
                  <div className='border-slate-200 border-2 rounded-b-lg -mt-6 px-2 pt-8 pb-4 mb-4 '>
                    <div className='flex text-sm text-gray-700 font-semibold rounded-md py-2 px-4 items-center mr-6 ml-8 mb-4'>
                      <div className='-mt-2'>
                        <span className=''>Nomor Booking </span>
                        <span className='px-2'>:</span>
                        <span className=''></span>
                      </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                      <div className='flex gap-2'>
                        <div className='ml-12 text-xs text-gray-700 font-medium'>
                          <span className='font-semibold'>
                            Tipe &nbsp;:&nbsp;{' '}
                          </span>
                          <span>
                            {roomType
                              ? roomOptions.find(
                                  (room) => room.code === roomType
                                )?.name
                              : 'Belum dipilih'}
                          </span>
                        </div>
                        <span className='-ml-1 text-xs text-gray-700 font-medium'>
                          dengan
                        </span>

                        <div className='-ml-1 text-xs text-gray-700 font-medium'>
                          <span>
                            {bedType
                              ? bedOptions.find((bed) => bed.code === bedType)
                                  ?.name
                              : 'Belum dipilih'}
                          </span>
                        </div>
                      </div>
                      <div className='flex ml-9  text-xs font-medium'>
                        <div className='flex items-center gap-2 text-gray-700 py-2 px-3 rounded-md'>
                          <BsPersonFillCheck className=' text-lime-900 text-xl -mb-2' />
                          <span className='-mt-1'>{`${adults} Dewasa ${children} Anak`}</span>
                        </div>
                      </div>
                    </div>

                    <h3 className='ml-12 mb-5 text-gray-700 font-medium mt-8 text-xs'>
                      Fasilitas yang tersedia :
                    </h3>

                    <div className='grid grid-flow-col grid-rows-2 gap-2 ml-12 font-medium text-gray-700 '>
                      {wifi && (
                        <div className='flex items-center  '>
                          <PiWifiHighBold className='mr-2 text-base text-lime-900' />
                          <span className='text-xs -mt-4'>WiFi</span>
                        </div>
                      )}

                      {pool && (
                        <div className='flex items-center '>
                          <FaPersonSwimming className='mr-2 text-base text-lime-900' />
                          <span className='text-xs -mt-4'>Kolam Renang</span>
                        </div>
                      )}
                      {resto && (
                        <div className='flex items-center '>
                          <PiChefHatBold className='mr-2 text-base text-lime-900' />
                          <span className='text-xs -mt-4'>Restoran/Cafe</span>
                        </div>
                      )}

                      {ac && (
                        <div className='flex items-center '>
                          <TbAirConditioning className='mr-2 text-lg text-lime-900' />
                          <span className='text-xs -mt-4'>AC</span>
                        </div>
                      )}

                      {bathtub && (
                        <div className='flex items-center'>
                          <PiBathtubBold className='mr-2 text-lg text-lime-900' />
                          <span className='text-xs -mt-4'>Bathtub</span>
                        </div>
                      )}
                      {tv && (
                        <div className='flex items-center'>
                          <FaTv className='mr-2 text-sm text-lime-900' />
                          <span className='text-xs -mt-4 ml-1'>Tv Layar</span>
                        </div>
                      )}
                      {rfid && (
                        <div className='flex items-center '>
                          <GiKeyCard className='mr-2 text-xl text-lime-900' />
                          <span className='text-xs -mt-4'>
                            Sistem Kartu Akses
                          </span>
                        </div>
                      )}
                      {housekeep && (
                        <div className='flex items-center '>
                          <TbHotelService className='mr-2 text-xl text-lime-900' />
                          <span className='text-xs -mt-4'>Housekeeping</span>
                        </div>
                      )}
                      {laundry && (
                        <div className='flex items-center'>
                          <MdOutlineLocalLaundryService className='mr-2 text-xl text-lime-900' />
                          <span className='text-xs -mt-4'>Laundry</span>
                        </div>
                      )}
                    </div>

                    <hr className='my-8 mx-8' />

                    <div className='text-xs text-gray-700 ml-6'>
                      {' '}
                      {descHotel}{' '}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            type='button'
            className='bg-white text-gray-700 border-2 px-4 py-2 rounded hover:bg-slate-200 ml-4'
            onClick={handleVoucherHotel}
          >
            Preview Tiket
          </button>
          <button
            onClick={() => setShowPopup(true)}
            className='bg-lime-700 hover:bg-lime-800 text-white font-medium py-2 px-4 rounded-lg float-right mr-4'
          >
            Konfirmasi Tiket
          </button>

          {showPopup && (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50'>
              <div className='w-full max-w-[1020px] mx-auto'>
                <div className='bg-white rounded-lg pt-3 pb-2 max-w-[60vw] max-h-[100vh] overflow-hidden'>
                  <div ref={popupRef} className='px-14 pt-6 pb-2'>
                    <h2 className=' text font-semibold mb-2 -mt-6 text-center text-lime-600'>
                      Konfirmasi Pemesanan Tiket
                    </h2>
                    <div className='border-slate-200 border-2 rounded-lg w-full px-6 py-4 mb-1'>
                      <div className='space-y-2 text-xs text-gray-700'>
                        <p>
                          <span className='font-semibold'>
                            Nama Penumpang
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;{' '}
                          </span>{' '}
                          <span>{namaCustomer}</span>
                        </p>
                      </div>
                      <div className='text-right text-xs text-gray-500 mt-2 '>
                        Tanggal dibuat :{' '}
                        {tglInput && format(new Date(tglInput), 'd MMM yyyy')}
                      </div>
                    </div>

                    <div>
                      <div className='bg-white border-2 border-gray-200 shadow-lg rounded-lg p-8 mb-6 mx-auto '>
                        <div className='flex flex-col gap-2 mt-2 ml-5 mb-4'>
                          <div className='text-lg font-semibold text-lime-800 ml-0.5'>
                            {hotelName}
                          </div>

                          <div className='flex text-xs ml-1'>
                            <span className='w-32 text-gray-500'>Alamat </span>
                            <span className='pr-2'> : </span>
                            <span className='text-gray-500 pl-2'>
                              {hotelAddress}
                            </span>
                          </div>
                        </div>

                        <hr className='my-6' />
                        <div className='flex items-center justify-between px-8 -ml-2'>
                          <div className='flex justify-center gap-10'>
                            <div>
                              <div className='text-slate-600 text-sm font-medium'>
                                {' '}
                                {hotelDateDepature &&
                                  format(
                                    new Date(hotelDateDepature),
                                    'd MMMM yyyy'
                                  )}
                              </div>
                              <div className='text-xs text-slate-600'>
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
                              <div className='text-center text-xs text-slate-600'>
                                {' '}
                                {stayDuration}{' '}
                              </div>
                            </div>
                            <div className='text-right'>
                              <div className='text-slate-600 text-sm font-medium'>
                                {hotelDateArrival &&
                                  format(
                                    new Date(hotelDateArrival),
                                    'd MMMM yyyy'
                                  )}{' '}
                                {}{' '}
                              </div>
                              <div className='text-xs text-slate-600 '>
                                {' '}
                                {hotelTimeArrival}{' '}
                              </div>
                            </div>
                          </div>

                          <div className='text-right flex flex-col justify-between items-right align-middle gap-3 text-sm '>
                            <div>
                              <span className='text-orange-500 font-bold '>
                                {formatCurrency(ticketPrice)}
                              </span>{' '}
                              /pax
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        {isOpen && (
                          <div className='border-slate-200 border-2 rounded-b-lg -mt-6 px-2 pt-8 pb-4 '>
                            <div className='flex text-sm text-gray-700 font-semibold rounded-md py-2 px-4 items-center mr-6 ml-8 mb-4'>
                              <div className='-mt-2'>
                                <span className=''>Nomor Booking </span>
                                <span className='px-2'>:</span>
                                <span className=''></span>
                              </div>
                            </div>

                            <div className='flex flex-col gap-2'>
                              <div className='flex gap-2'>
                                <div className='ml-12 text-xs text-gray-700 font-medium'>
                                  <span className='font-semibold'>
                                    Tipe &nbsp;:&nbsp;{' '}
                                  </span>
                                  <span>
                                    {roomType
                                      ? roomOptions.find(
                                          (room) => room.code === roomType
                                        )?.name
                                      : 'Belum dipilih'}
                                  </span>
                                </div>
                                <span className='-ml-1 text-xs text-gray-700 font-medium'>
                                  dengan
                                </span>

                                <div className='-ml-1 text-xs text-gray-700 font-medium'>
                                  <span>
                                    {bedType
                                      ? bedOptions.find(
                                          (bed) => bed.code === bedType
                                        )?.name
                                      : 'Belum dipilih'}
                                  </span>
                                </div>
                              </div>
                              <div className='flex ml-9  text-xs font-medium'>
                                <div className='flex items-center gap-2 text-gray-700 py-2 px-3 rounded-md'>
                                  <BsPersonFillCheck className=' text-lime-900 text-xl -mb-2' />
                                  <span className='-mt-1'>{`${adults} Dewasa ${children} Anak`}</span>
                                </div>
                              </div>
                            </div>

                            <h3 className='ml-12 mb-5 text-gray-700 font-medium mt-8 text-xs'>
                              Fasilitas yang tersedia :
                            </h3>

                            <div className='grid grid-flow-col grid-rows-2 gap-2 ml-12 font-medium text-gray-700 '>
                              {wifi && (
                                <div className='flex items-center  '>
                                  <PiWifiHighBold className='mr-2 text-base text-lime-900' />
                                  <span className='text-xs -mt-4'>WiFi</span>
                                </div>
                              )}

                              {pool && (
                                <div className='flex items-center '>
                                  <FaPersonSwimming className='mr-2 text-base text-lime-900' />
                                  <span className='text-xs -mt-4'>
                                    Kolam Renang
                                  </span>
                                </div>
                              )}
                              {resto && (
                                <div className='flex items-center '>
                                  <PiChefHatBold className='mr-2 text-base text-lime-900' />
                                  <span className='text-xs -mt-4'>
                                    Restoran/Cafe
                                  </span>
                                </div>
                              )}

                              {ac && (
                                <div className='flex items-center '>
                                  <TbAirConditioning className='mr-2 text-lg text-lime-900' />
                                  <span className='text-xs -mt-4'>AC</span>
                                </div>
                              )}

                              {bathtub && (
                                <div className='flex items-center'>
                                  <PiBathtubBold className='mr-2 text-lg text-lime-900' />
                                  <span className='text-xs -mt-4'>Bathtub</span>
                                </div>
                              )}
                              {tv && (
                                <div className='flex items-center'>
                                  <FaTv className='mr-2 text-sm text-lime-900' />
                                  <span className='text-xs -mt-4 ml-1'>
                                    Tv Layar
                                  </span>
                                </div>
                              )}
                              {rfid && (
                                <div className='flex items-center '>
                                  <GiKeyCard className='mr-2 text-xl text-lime-900' />
                                  <span className='text-xs -mt-4'>
                                    Sistem Kartu Akses
                                  </span>
                                </div>
                              )}
                              {housekeep && (
                                <div className='flex items-center '>
                                  <TbHotelService className='mr-2 text-xl text-lime-900' />
                                  <span className='text-xs -mt-4'>
                                    Housekeeping
                                  </span>
                                </div>
                              )}
                              {laundry && (
                                <div className='flex items-center'>
                                  <MdOutlineLocalLaundryService className='mr-2 text-xl text-lime-900' />
                                  <span className='text-xs -mt-4'>Laundry</span>
                                </div>
                              )}
                            </div>

                            <hr className='my-8 mx-8' />

                            <div className='text-xs text-gray-700 ml-6'>
                              {' '}
                              {descHotel}{' '}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='my-2 mr-14 flex justify-end space-x-2'>
                    <button
                      onClick={() => setShowPopup(false)}
                      className='px-4 py-2 rounded border text-xs text-gray-700 hover:bg-gray-200'
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleDownloadPopup}
                      className='px-4 py-2 text-xs font-medium bg-lime-700 text-white rounded-lg hover:bg-lime-900'
                    >
                      Unduh Tiket
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoucherHotel;

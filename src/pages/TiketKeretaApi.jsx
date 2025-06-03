import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { format } from 'date-fns';

import data from '../data/tiket.json';

import html2canvas from 'html2canvas';

const TiketKeretaApi = () => {
  const tiketRef = useRef();

  const location = useLocation();
  const { namaCustomer, tglInput, noTelpCustomer } = location.state;

  const [showPopup, setShowPopup] = useState(false);

  const popupRef = useRef();

  const handleDownloadPopup = async () => {
    if (!popupRef.current) return;

    const canvas = await html2canvas(popupRef.current);
    const dataURL = canvas.toDataURL('image/png');

    // Unduh file
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `Tiket-Kereta-${trainName}-${trainDateDepature}.png`;
    link.click();

    // Format nomor telepon
    let sanitizedPhone = (noTelpCustomer || '').replace(/\D/g, '');
    if (sanitizedPhone.startsWith('08')) {
      sanitizedPhone = '62' + sanitizedPhone.slice(1);
    }

    if (/^62\d{8,13}$/.test(sanitizedPhone)) {
      setTimeout(() => {
        const message = encodeURIComponent(
          `Halo ${namaCustomer}, berikut tiket pesawat Anda. Mohon untuk diperiksa dan konfirmasi, Terimakasih.`
        );
        window.open(
          `https://wa.me/${sanitizedPhone}?text=${message}`,
          '_blank'
        );
      }, 500);
    } else {
      alert('Nomor WhatsApp tidak valid atau belum tersedia.');
    }
  };

  const [codeTrain, setCodeTrain] = useState('');
  const [trainName, setTrainName] = useState('');

  const [stationSelectedDepature, setStationSelectedDepature] = useState('');
  const [stationSelectedArrival, setStationSelectedArrival] = useState('');
  const [trainDateDepature, setTrainDateDepature] = useState('');
  const [trainDateArrival, setTrainDateArrival] = useState('');

  const [trainTimeDepature, setTrainTimeDepature] = useState('');
  const [trainTimeArrival, setTrainTimeArrival] = useState('');
  const [trainDesc, setTrainDesc] = useState('');
  const [trainHours, setTrainHours] = useState('');
  const [trainMinutes, setTrainMinutes] = useState('');

  const [selectedTrainClass, setSelectedTrainClass] = useState('');

  const [formErrors, setFormErrors] = useState({});

  const codeTrainRef = useRef(null);
  const trainNameRef = useRef(null);
  const stationSelectedDepatureRef = useRef(null);
  const stationSelectedArrivalRef = useRef(null);
  const trainDateDepatureRef = useRef(null);
  const trainDateArrivalRef = useRef(null);
  const trainTimeDepatureRef = useRef(null);
  const trainTimeArrivalRef = useRef(null);
  const priceRef = useRef(null);
  const selectedTrainClassRef = useRef(null);
  const trainDescRef = useRef(null);

  const validateTrainTicket = () => {
    const newErrors = {};
    let firstInvalidRef = null;

    if (!codeTrain || !/^\d{3}$/.test(codeTrain)) {
      newErrors.codeTrain = 'Nomor kereta harus 3 digit angka';
      if (!firstInvalidRef) firstInvalidRef = codeTrainRef;
    }

    if (!trainName.trim()) {
      newErrors.trainName = 'Nama kereta wajib diisi';
      if (!firstInvalidRef) firstInvalidRef = trainNameRef;
    }

    if (!stationSelectedDepature) {
      newErrors.stationSelectedDepature = 'Stasiun asal wajib dipilih';
      if (!firstInvalidRef) firstInvalidRef = stationSelectedDepatureRef;
    }

    if (!stationSelectedArrival) {
      newErrors.stationSelectedArrival = 'Stasiun tujuan wajib dipilih';
      if (!firstInvalidRef) firstInvalidRef = stationSelectedArrivalRef;
    }

    if (!trainDateDepature) {
      newErrors.trainDateDepature = 'Tanggal berangkat wajib diisi';
      if (!firstInvalidRef) firstInvalidRef = trainDateDepatureRef;
    }

    if (!trainDateArrival) {
      newErrors.trainDateArrival = 'Tanggal sampai wajib diisi';
      if (!firstInvalidRef) firstInvalidRef = trainDateArrivalRef;
    }

    if (!trainTimeDepature) {
      newErrors.trainTimeDepature = 'Waktu berangkat wajib diisi';
      if (!firstInvalidRef) firstInvalidRef = trainTimeDepatureRef;
    }

    if (!trainTimeArrival) {
      newErrors.trainTimeArrival = 'Waktu sampai wajib diisi';
      if (!firstInvalidRef) firstInvalidRef = trainTimeArrivalRef;
    }

    const parsedPrice = Number(formattedPrice.replace(/[^\d]/g, ''));
    if (!parsedPrice || parsedPrice <= 0) {
      newErrors.formattedPrice = 'Harga wajib diisi dan harus lebih dari 0';
      if (!firstInvalidRef) firstInvalidRef = priceRef;
    }

    if (!selectedTrainClass) {
      newErrors.selectedTrainClass = 'Kelas wajib dipilih';
      if (!firstInvalidRef) firstInvalidRef = selectedTrainClassRef;
    }

    if (trainDesc.trim().split(/\s+/).length > 100) {
      newErrors.trainDesc = 'Keterangan nomor kursi maksimal 100 kata';
      if (!firstInvalidRef) firstInvalidRef = trainDescRef;
    }

    setFormErrors(newErrors);

    return { isValid: Object.keys(newErrors).length === 0, firstInvalidRef };
  };

  const downloadTiketKereta = async () => {
    if (!tiketRef.current) return;

    const canvas = await html2canvas(tiketRef.current);
    const image = canvas.toDataURL('image/png');

    // Unduh file
    const link = document.createElement('a');
    link.href = image;
    link.download = `Preview-Tiket-Kereta-${trainName}-${trainDateDepature}.png`;
    link.click();

    // Format dan validasi nomor WhatsApp
    let sanitizedPhone = (noTelpCustomer || '').replace(/\D/g, '');
    if (sanitizedPhone.startsWith('08')) {
      sanitizedPhone = '62' + sanitizedPhone.slice(1);
    }

    if (/^62\d{8,13}$/.test(sanitizedPhone)) {
      setTimeout(() => {
        window.open(`https://wa.me/${sanitizedPhone}`, '_blank');
      }, 500);
    } else {
      alert('Nomor WhatsApp tidak valid atau belum tersedia.');
    }
  };

  const handleTiketKereta = () => {
    const { isValid, firstInvalidRef } = validateTrainTicket();

    if (isValid) {
      downloadTiketKereta();
    } else if (firstInvalidRef && firstInvalidRef.current) {
      firstInvalidRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      firstInvalidRef.current.focus();
    }
  };

  const handleTrainClassChange = (event) => {
    setSelectedTrainClass(event.target.value);
  };

  const handleStationDepatureChange = (event) => {
    setStationSelectedDepature(event.target.value);
  };

  const handleStationArrivalChange = (event) => {
    setStationSelectedArrival(event.target.value);
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

  const calculateFlightDuration = useCallback(() => {
    if (trainTimeDepature && trainTimeArrival) {
      const [depHour, depMinute] = trainTimeDepature.split(':').map(Number);
      const [arrHour, arrMinute] = trainTimeArrival.split(':').map(Number);

      const departureInMinutes = depHour * 60 + depMinute;
      const arrivalInMinutes = arrHour * 60 + arrMinute;

      let totalMinutes = arrivalInMinutes - departureInMinutes;
      if (totalMinutes < 0) {
        totalMinutes += 24 * 60;
      }

      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      setTrainHours(hours);
      setTrainMinutes(minutes);
    }
  }, [trainTimeDepature, trainTimeArrival]);

  useEffect(() => {
    calculateFlightDuration();
  }, [calculateFlightDuration]);

  return (
    <div className='p-8 mx-auto max-w-6xl'>
      <div className='my-28 p-24 bg-white shadow-lg rounded-2xl'>
        <h2 className='text-2xl font-semibold mb-12 text-center'>
          Tiket Kereta Api
        </h2>
        <hr className='mb-12' />

        <div className='flex flex-col gap-8'>
          <h3 className='text-lg font-semibold text-lime-600 ml-4'>
            Detail Kereta Api:
          </h3>

          <div className='flex ml-4'>
            <div className='justify-center items-center w-1/3 mr-4'>
              <div className='relative'>
                <input
                  ref={codeTrainRef}
                  type='number'
                  id='floating_outlined_code'
                  value={codeTrain}
                  onChange={(e) => setCodeTrain(e.target.value)}
                  className='block px-2.5 pb-2.5 pt-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-600 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  placeholder=' '
                />
                <label
                  htmlFor='floating_outlined_code'
                  className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Nomor Kereta
                </label>
                {formErrors.codeTrain && (
                  <p className='absolute text-red-500 text-xs mt-1 ml-2'>
                    {formErrors.codeTrain}
                  </p>
                )}
              </div>
            </div>

            <div className='justify-center items-center w-2/3'>
              <div className='relative'>
                <input
                  ref={trainNameRef}
                  type='text'
                  id='floating_outlined_name'
                  value={trainName}
                  onChange={(e) => setTrainName(e.target.value)}
                  className='block px-2.5 pb-2.5 pt-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-600 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  placeholder=' '
                />
                {formErrors.trainName && (
                  <p className='absolute text-red-500 text-xs mt-1 ml-2'>
                    {formErrors.trainName}
                  </p>
                )}
                <label
                  htmlFor='floating_outlined_name'
                  className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Nama Kereta Api
                </label>
              </div>
            </div>
          </div>

          <div className='flex ml-4'>
            <div className='justify-center items-center w-1/4 mr-4'>
              <div className='relative'>
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Stasiun Dari
                </label>
                <select
                  ref={stationSelectedDepatureRef}
                  id='floating_outlined'
                  value={stationSelectedDepature}
                  onChange={handleStationDepatureChange}
                  className='block px-2.5 pb-2.5 pt-6 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer '
                >
                  <option value='' className='hover:bg-lime-600 '>
                    -
                  </option>
                  {data.station.map((station) => (
                    <option key={station.code} value={station.code}>
                      ({station.code}) {station.name}
                    </option>
                  ))}
                </select>
                {formErrors.stationSelectedDepature && (
                  <p className='absolute text-red-500 text-xs mt-1 ml-2'>
                    {formErrors.stationSelectedDepature}
                  </p>
                )}
              </div>
            </div>
            <div className='justify-center items-center w-1/4 mr-4'>
              <div className='relative'>
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Stasiun Ke
                </label>
                <select
                  ref={stationSelectedArrivalRef}
                  id='floating_outlined'
                  value={stationSelectedArrival}
                  onChange={handleStationArrivalChange}
                  className='block px-2.5 pb-2.5 pt-6 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer '
                >
                  <option value='' className='hover:bg-lime-600 '>
                    -
                  </option>
                  {data.station.map((station) => (
                    <option key={station.code} value={station.code}>
                      ({station.code}) {station.name}
                    </option>
                  ))}
                </select>
                {formErrors.stationSelectedArrival && (
                  <p className='absolute text-red-500 text-xs mt-1 ml-2'>
                    {formErrors.stationSelectedArrival}
                  </p>
                )}
              </div>
            </div>
            <div className='justify-center items-center w-1/4 mr-4'>
              <div className='relative'>
                <input
                  ref={trainDateDepatureRef}
                  type='date'
                  id='floating_outlined'
                  value={trainDateDepature}
                  onChange={(e) => setTrainDateDepature(e.target.value)}
                  className='block px-2.5 pb-2.5 pt-6 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  placeholder=' '
                />
                {formErrors.trainDateDepature && (
                  <p className='absolute text-red-500 text-xs mt-1 ml-2'>
                    {formErrors.trainDateDepature}
                  </p>
                )}
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-sm  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Tanggal Berangkat
                </label>
              </div>
            </div>
            <div className='justify-center items-center w-1/4'>
              <div className='relative'>
                <input
                  ref={trainDateArrivalRef}
                  type='date'
                  id='floating_outlined'
                  value={trainDateArrival}
                  min={trainDateDepature}
                  onChange={(e) => setTrainDateArrival(e.target.value)}
                  className='block px-2.5 pb-2.5 pt-6 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  placeholder=' '
                />
                {formErrors.trainDateArrival && (
                  <p className='absolute text-red-500 text-xs mt-1 ml-2'>
                    {formErrors.trainDateArrival}
                  </p>
                )}
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-sm  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Tanggal Sampai
                </label>
              </div>
            </div>
          </div>

          <div className='flex ml-4'>
            <div className='justify-center items-center w-1/4 mr-4'>
              <div className='relative'>
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Waktu Berangkat
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
                  ref={trainTimeDepatureRef}
                  type='time'
                  id='floating_outlined'
                  className='block pr-2.5 pb-3 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  min='09:00'
                  max='18:00'
                  value={trainTimeDepature || ''}
                  onChange={(e) => setTrainTimeDepature(e.target.value)}
                  required
                />
                {formErrors.trainTimeDepature && (
                  <p className='absolute text-red-500 text-xs mt-1 ml-2'>
                    {formErrors.trainTimeDepature}
                  </p>
                )}
              </div>
            </div>
            <div className='justify-center items-center w-1/4 mr-4'>
              <div className='relative'>
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Waktu Sampai
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
                  ref={trainTimeArrivalRef}
                  type='time'
                  id='floating_outlined'
                  className='block px-2.5 pb-3 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  min='09:00'
                  max='18:00'
                  value={trainTimeArrival || ''}
                  onChange={(e) => setTrainTimeArrival(e.target.value)}
                  required
                />
                {formErrors.trainTimeArrival && (
                  <p className='absolute text-red-500 text-xs mt-1 ml-2'>
                    {formErrors.trainTimeArrival}
                  </p>
                )}
              </div>
            </div>
            <div className='justify-center items-center w-1/4 mr-4 '>
              <div className='flex gap-4'>
                <div className='flex relative w-full'>
                  <label
                    htmlFor='floating_outlined'
                    className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-100 rounded-md dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-2'
                  >
                    Waktu Perjalanan
                  </label>
                  <input
                    type='text'
                    id='floating_outlined'
                    value={trainHours}
                    onChange={(e) => setTrainHours(e.target.value)}
                    className='flex-shrink flex-grow flex-auto py-3.5 px-4 text-gray-700 text-xs leading-normal border w-px border-gray-300 bg-gray-100 rounded-lg rounded-r-none relative dark:focus:border-lime-600 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                    placeholder=''
                    disabled
                  />
                  <div className='flex -mr-px'>
                    <span className='flex items-center py-1 px-2 bg-transparent font-medium text-gray-500 border-gray-300 leading-normal rounded-lg rounded-l-none border border-l-0 whitespace-no-wrap text-grey-dark text-xs'>
                      Jam
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='justify-center items-center w-1/4'>
              <div className='flex relative w-full'>
                <label
                  htmlFor='floating_outlined_minutes'
                  className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-100 rounded-md dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-2'
                ></label>
                <input
                  type='text'
                  id='floating_outlined_minutes'
                  value={trainMinutes}
                  onChange={(e) => setTrainMinutes(e.target.value)}
                  className='flex-shrink flex-grow flex-auto py-3.5 px-4 text-gray-700 text-xs leading-normal border w-px border-gray-300 bg-gray-100 rounded-lg rounded-r-none relative dark:focus:border-lime-600 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  placeholder=''
                  disabled
                />
                <div className='flex -mr-px'>
                  <span className='flex items-center py-1 px-2 bg-transparent font-medium text-gray-500 border-gray-300 leading-normal rounded-lg rounded-l-none border border-l-0 whitespace-no-wrap text-grey-dark text-xs'>
                    Menit
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='flex ml-4'>
            <div className='justify-center items-center w-1/2 mr-4'>
              <div className='relative'>
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Kelas
                </label>
                <select
                  ref={selectedTrainClassRef}
                  id='floating_outlined'
                  value={selectedTrainClass}
                  onChange={handleTrainClassChange}
                  className='block px-2.5 pb-3 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                >
                  <option value=''>-</option>
                  <option value='Ekonomi'>Ekonomi</option>
                  <option value='Ekonomi Premium'>Ekonomi Premium</option>
                  <option value='Bisnis'>Bisnis</option>
                  <option value='Eksekutif'>Eksekutif</option>
                  <option value='Luxury'>Luxury</option>
                  <option value='Priority'>Priority</option>
                </select>
                {formErrors.selectedTrainClass && (
                  <p className='absolute text-red-500 text-xs mt-1 ml-2'>
                    {formErrors.selectedTrainClass}
                  </p>
                )}
              </div>
            </div>
            <div className='justify-center items-center w-1/2 '>
              <div className='relative'>
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
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

          <div className='ml-4'>
            <div className='relative'>
              <input
                ref={trainDescRef}
                type='text'
                id='floating_outlined'
                value={trainDesc}
                onChange={(e) => setTrainDesc(e.target.value)}
                className='block px-2.5 pb-3 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                placeholder='Contoh "Eksekutif 2, 3B" '
              />
              {formErrors.trainDesc && (
                <p className='absolute text-red-500 text-xs mt-1 ml-2'>
                  {formErrors.trainDesc}
                </p>
              )}
              <label
                htmlFor='floating_outlined'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
              >
                Keterangan Nomor Kursi
              </label>
            </div>
          </div>

          <div className='container mx-auto p-6'>
            <div className='mt-8'>
              <h3 className='text-lg font-semibold text-lime-600 mb-8 '>
                Rincian Tiket Kereta Api
              </h3>
              <div
                ref={tiketRef}
                className='bg-white shadow-lg border-2 border-gray-200 rounded-lg px-8 pb-8 pt-4 mb-6 mx-auto'
              >
                <div className='flex flex-col gap-2'>
                  <div className='flex items-center font-semibold text-gray-700 ml-1'>
                    <div>
                      {trainName} {'('} {codeTrain} {')'}
                    </div>

                    <div className='ml-6 mt-6 text-sm bg-lime-700 px-4 py-2 rounded-md'>
                      <div className='text-sm text-white -mt-4'>
                        {selectedTrainClass}
                      </div>
                    </div>
                  </div>

                  <div className='flex justify-between items-center mt-2 m-1  py-2'>
                    <div className='text-right text-gray-700 text-xs '>
                      {' '}
                      <span className='font-semibold'>
                        Nomor Booking &nbsp; : &nbsp;
                      </span>{' '}
                    </div>
                  </div>

                  <hr className='border-1 border-gray-300 border-dashed' />

                  <div className='flex justify-between items-center m-1'>
                    <div className='flex flex-col mt-2 gap-1'>
                      <div className='font-medium text-gray-700 text-sm '>
                        {stationSelectedDepature
                          ? data.station.find(
                              (station) =>
                                station.code === stationSelectedDepature
                            )?.name
                          : ''}
                        {' ( '}
                        {stationSelectedDepature
                          ? data.station.find(
                              (station) =>
                                station.code === stationSelectedDepature
                            )?.code
                          : ''}
                        {' )'}
                      </div>
                      <div className='text-xs text-gray-600'>
                        {stationSelectedDepature
                          ? data.station.find(
                              (station) =>
                                station.code === stationSelectedDepature
                            )?.city
                          : ''}
                      </div>
                      <div className='font-medium text-gray-800 text-xs'>
                        {trainDateDepature &&
                          format(new Date(trainDateDepature), 'd MMMM yyyy')}
                        {''}
                        {', '}
                        {trainTimeDepature}
                      </div>
                    </div>
                    <div>
                      <div className='flex items-center justify-between w-60 h-8'>
                        <div className='h-1.5 w-1.5 bg-lime-600 rounded-full'></div>
                        <div className='flex-grow border-lime-600 border-t-[0.5px]'></div>
                        <div className='h-1.5 w-1.5 bg-lime-600 rounded-full'></div>
                      </div>
                      <div></div>
                      <div className='text-center text-xs text-slate-600'>
                        {' '}
                        {trainHours} Jam {trainMinutes} Menit{' '}
                      </div>
                    </div>
                    <div className='flex flex-col mt-2 gap-1 text-right'>
                      <div className='font-medium text-gray-700 text-sm'>
                        {stationSelectedArrival
                          ? data.station.find(
                              (station) =>
                                station.code === stationSelectedArrival
                            )?.name
                          : ''}
                        {' ( '}
                        {stationSelectedArrival
                          ? data.station.find(
                              (station) =>
                                station.code === stationSelectedArrival
                            )?.code
                          : ''}
                        {' )'}
                      </div>
                      <div className='text-xs text-gray-600'>
                        {stationSelectedArrival
                          ? data.station.find(
                              (station) =>
                                station.code === stationSelectedArrival
                            )?.city
                          : ''}
                      </div>
                      <div className='text-right font-medium text-gray-800 text-xs'>
                        {trainDateArrival &&
                          format(new Date(trainDateArrival), 'd MMMM yyyy')}
                        {''}
                        {', '}
                        {trainTimeArrival}
                      </div>
                    </div>
                  </div>

                  <div className='flex justify-between items-center mt-2 m-1'>
                    <div className='text-right text-gray-700 text-xs mt-2 '>
                      {' '}
                      <span className='font-medium '>
                        Nomor Kursi &nbsp; : &nbsp;
                      </span>{' '}
                      {trainDesc}
                    </div>
                  </div>

                  <div className='text-right text-base mr-1 -mt-6'>
                    <span className='text-sm text-lime-600 font-bold '>
                      {formatCurrency(ticketPrice)}
                    </span>{' '}
                    /pax
                  </div>
                </div>
              </div>
              <button
                type='button'
                className='bg-white text-gray-700 border-2 px-4 py-2 rounded hover:bg-slate-200'
                onClick={handleTiketKereta}
              >
                Preview Tiket
              </button>
              <button
                onClick={() => setShowPopup(true)}
                className='bg-lime-700 hover:bg-lime-800 text-white font-medium py-2 px-4 rounded-lg float-right'
              >
                Konfirmasi Tiket
              </button>

              {showPopup && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50'>
                  <div className='w-full max-w-[1020px] mx-auto'>
                    <div className='bg-white rounded-lg py-6 max-w-[60vw] max-h-[100vh] overflow-hidden'>
                      <div ref={popupRef} className='px-14 pt-6 pb-2'>
                        <h2 className=' text font-semibold mb-2 -mt-6 text-center text-lime-600'>
                          Konfirmasi Pemesanan Tiket
                        </h2>
                        <div className='border-slate-200 border-2 rounded-lg w-full px-6 py-4 mb-1'>
                          <div className='space-y-2 text-xs text-gray-700'>
                            <p>
                              <span className='font-semibold'>
                                Nama Penumpang
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;{' '}
                              </span>{' '}
                              <span>{namaCustomer}</span>
                            </p>
                            <p>
                              <span className='font-semibold text-gray-700'>
                                Tanggal Keberangkatan &nbsp;&nbsp;&nbsp;&nbsp;:
                                &nbsp;&nbsp;{' '}
                              </span>
                              <span>
                                {trainDateDepature &&
                                  format(
                                    new Date(trainDateDepature),
                                    'd MMM yyyy'
                                  )}{' '}
                              </span>
                            </p>
                          </div>
                          <div className='text-right text-xs text-gray-500 mt-2 '>
                            Tanggal dibuat :{' '}
                            {tglInput &&
                              format(new Date(tglInput), 'd MMM yyyy')}
                          </div>
                        </div>

                        <div className='bg-white shadow-lg border-2 border-gray-200 rounded-lg px-8 pb-8 pt-4  mx-auto'>
                          <div className='flex flex-col gap-2'>
                            <div className='flex items-center font-semibold text-gray-700 ml-1'>
                              <div>
                                {trainName} {'('} {codeTrain} {')'}
                              </div>

                              <div className='ml-6 mt-6 text-sm bg-lime-700 px-4 py-2 rounded-md'>
                                <div className='text-sm text-white -mt-4'>
                                  {selectedTrainClass}
                                </div>
                              </div>
                            </div>

                            <div className='flex justify-between items-center mt-2 m-1  py-2'>
                              <div className='text-right text-gray-700 text-xs '>
                                {' '}
                                <span className='font-semibold'>
                                  Nomor Booking &nbsp; : &nbsp;
                                </span>{' '}
                              </div>
                            </div>

                            <hr className='border-1 border-gray-300 border-dashed' />

                            <div className='flex justify-between items-center m-1'>
                              <div className='flex flex-col mt-2 gap-1'>
                                <div className='font-medium text-gray-700 text-sm '>
                                  {stationSelectedDepature
                                    ? data.station.find(
                                        (station) =>
                                          station.code ===
                                          stationSelectedDepature
                                      )?.name
                                    : ''}
                                  {' ( '}
                                  {stationSelectedDepature
                                    ? data.station.find(
                                        (station) =>
                                          station.code ===
                                          stationSelectedDepature
                                      )?.code
                                    : ''}
                                  {' )'}
                                </div>
                                <div className='text-xs text-gray-600'>
                                  {stationSelectedDepature
                                    ? data.station.find(
                                        (station) =>
                                          station.code ===
                                          stationSelectedDepature
                                      )?.city
                                    : ''}
                                </div>
                                <div className='font-medium text-gray-800 text-xs'>
                                  {trainDateDepature &&
                                    format(
                                      new Date(trainDateDepature),
                                      'd MMMM yyyy'
                                    )}
                                  {''}
                                  {', '}
                                  {trainTimeDepature}
                                </div>
                              </div>
                              <div>
                                <div className='flex items-center justify-between w-60 h-8'>
                                  <div className='h-1.5 w-1.5 bg-lime-600 rounded-full'></div>
                                  <div className='flex-grow border-lime-600 border-t-[0.5px]'></div>
                                  <div className='h-1.5 w-1.5 bg-lime-600 rounded-full'></div>
                                </div>
                                <div></div>
                                <div className='text-center text-xs text-slate-600'>
                                  {' '}
                                  {trainHours} Jam {trainMinutes} Menit{' '}
                                </div>
                              </div>
                              <div className='flex flex-col mt-2 gap-1 text-right'>
                                <div className='font-medium text-gray-700 text-sm'>
                                  {stationSelectedArrival
                                    ? data.station.find(
                                        (station) =>
                                          station.code ===
                                          stationSelectedArrival
                                      )?.name
                                    : ''}
                                  {' ( '}
                                  {stationSelectedArrival
                                    ? data.station.find(
                                        (station) =>
                                          station.code ===
                                          stationSelectedArrival
                                      )?.code
                                    : ''}
                                  {' )'}
                                </div>
                                <div className='text-xs text-gray-600'>
                                  {stationSelectedArrival
                                    ? data.station.find(
                                        (station) =>
                                          station.code ===
                                          stationSelectedArrival
                                      )?.city
                                    : ''}
                                </div>
                                <div className='text-right font-medium text-gray-800 text-xs'>
                                  {trainDateArrival &&
                                    format(
                                      new Date(trainDateArrival),
                                      'd MMMM yyyy'
                                    )}
                                  {''}
                                  {', '}
                                  {trainTimeArrival}
                                </div>
                              </div>
                            </div>

                            <div className='flex justify-between items-center mt-2 m-1'>
                              <div className='text-right text-gray-700 text-xs mt-2 '>
                                {' '}
                                <span className='font-medium '>
                                  Nomor Kursi &nbsp; : &nbsp;
                                </span>{' '}
                                {trainDesc}
                              </div>
                            </div>

                            <div className='text-right text-base mr-1 -mt-6'>
                              <span className='text-sm text-lime-600 font-bold '>
                                {formatCurrency(ticketPrice)}
                              </span>{' '}
                              /pax
                            </div>
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
      </div>
    </div>
  );
};

export default TiketKeretaApi;

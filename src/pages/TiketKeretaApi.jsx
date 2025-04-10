import { useState, useEffect, useCallback } from 'react';

import { format } from 'date-fns';

import data from '../data/tiket.json';

import html2canvas from 'html2canvas';

const TiketKeretaApi = () => {
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
                  type='text'
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
              </div>
            </div>
            <div className='justify-center items-center w-2/3'>
              <div className='relative'>
                <input
                  type='text'
                  id='floating_outlined_name'
                  value={trainName}
                  onChange={(e) => setTrainName(e.target.value)}
                  className='block px-2.5 pb-2.5 pt-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-600 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  placeholder=' '
                />
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
              </div>
            </div>
            <div className='justify-center items-stretch w-1/4 mr-4'>
              <div className='relative'>
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Stasiun Ke
                </label>
                <select
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
              </div>
            </div>
            <div className='justify-center items-stretch w-1/4 mr-4'>
              <div className='relative'>
                <input
                  type='date'
                  id='floating_outlined'
                  value={trainDateDepature}
                  onChange={(e) => setTrainDateDepature(e.target.value)}
                  className='block px-2.5 pb-2.5 pt-4 pl-4  w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  placeholder=' '
                />
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-sm  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Tanggal Berangkat
                </label>
              </div>
            </div>
            <div className='justify-center items-stretch w-1/4'>
              <div className='relative'>
                <input
                  type='date'
                  id='floating_outlined'
                  value={trainDateArrival}
                  onChange={(e) => setTrainDateArrival(e.target.value)}
                  className='block px-2.5 pb-2.5 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  placeholder=' '
                />
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
            <div className='justify-center items-stretch w-1/4 mr-4'>
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
                  type='time'
                  id='floating_outlined'
                  className='block pr-2.5 pb-3 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  min='09:00'
                  max='18:00'
                  value={trainTimeDepature || ''}
                  onChange={(e) => setTrainTimeDepature(e.target.value)}
                  required
                />
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
                  type='time'
                  id='floating_outlined'
                  className='block px-2.5 pb-3 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  min='09:00'
                  max='18:00'
                  value={trainTimeArrival || ''}
                  onChange={(e) => setTrainTimeArrival(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className='justify-center items-center w-1/4 mr-4 '>
              <div className='flex gap-4'>
                <div className='flex relative w-full'>
                  <label
                    htmlFor='floating_outlined'
                    className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-2'
                  >
                    Waktu Perjalanan
                  </label>
                  <input
                    type='text'
                    id='floating_outlined'
                    value={trainHours}
                    onChange={(e) => setTrainHours(e.target.value)}
                    className='flex-shrink flex-grow flex-auto py-3.5 px-4 text-gray-700 text-xs leading-normal border w-px border-gray-300 rounded-lg rounded-r-none relative dark:focus:border-lime-600 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                    placeholder=''
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
                  className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-2'
                ></label>
                <input
                  type='text'
                  id='floating_outlined_minutes'
                  value={trainMinutes}
                  onChange={(e) => setTrainMinutes(e.target.value)}
                  className='flex-shrink flex-grow flex-auto py-3.5 px-4 text-gray-700 text-xs leading-normal border w-px border-gray-300 rounded-lg rounded-r-none relative dark:focus:border-lime-600 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  placeholder=''
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
                  type='text'
                  id='floating_outlined'
                  value={formattedPrice}
                  onChange={handlePriceChange}
                  className='block px-2.5 pb-3 py-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                />
              </div>
            </div>
          </div>

          <div className='ml-4'>
            <div className='relative'>
              <input
                type='text'
                id='floating_outlined'
                value={trainDesc}
                onChange={(e) => setTrainDesc(e.target.value)}
                className='block px-2.5 pb-3 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                placeholder='Contoh "Eksekutif 2, 3B" '
              />
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
              <h3 className='text-lg font-semibold text-lime-600 mb-4'>
                Rincian Tiket Kereta Api
              </h3>
              <div
                id='sectionTwo'
                className='bg-white shadow-lg rounded-lg p-8 mb-8 mx-auto'
              >
                <div
                  id='sectionOne'
                  className='flex flex-col gap-2 ml-6 mt-10 mr-6 p-6'
                >
                  <div className='flex items-center text-xl font-semibold text-gray-700 m-1'>
                    <div>
                      {trainName} {'('} {codeTrain} {')'}
                    </div>

                    <div className='ml-6 mt-6 text-base bg-lime-700 px-4 py-2 rounded-md'>
                      <div className='text-base text-white -mt-4'>
                        {selectedTrainClass}
                      </div>
                    </div>
                  </div>

                  <div className='flex justify-between items-center gap-5 m-1'>
                    <div className='flex flex-col mt-6'>
                      <div className='font-semibold text-lime-800 '>
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
                      <div className='text-sm text-gray-600'>
                        {stationSelectedDepature
                          ? data.station.find(
                              (station) =>
                                station.code === stationSelectedDepature
                            )?.city
                          : ''}
                      </div>
                      <div className='font-medium text-gray-900 text-sm'>
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
                    <div className='flex flex-col text-right mt-6'>
                      <div className='font-semibold text-lime-800'>
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
                      <div className='text-sm text-gray-600'>
                        {stationSelectedArrival
                          ? data.station.find(
                              (station) =>
                                station.code === stationSelectedArrival
                            )?.city
                          : ''}
                      </div>
                      <div className='text-right font-medium text-gray-900 text-sm'>
                        {trainDateArrival &&
                          format(new Date(trainDateArrival), 'd MMMM yyyy')}
                        {''}
                        {', '}
                        {trainTimeArrival}
                      </div>
                    </div>
                  </div>

                  <div className='flex justify-between items-center mt-2 m-1'>
                    <div className='text-right text-gray-700 text-sm mt-2 '>
                      {' '}
                      <span className='font-semibold'>
                        Nomor Kursi &nbsp; : &nbsp;
                      </span>{' '}
                      {trainDesc}
                    </div>
                  </div>

                  <div className='text-right text-base mr-1 -mt-6'>
                    <span className='text-base text-orange-500 font-bold '>
                      {formatCurrency(ticketPrice)}
                    </span>{' '}
                    /pax
                  </div>
                </div>
              </div>
            </div>
            <div className='mx-auto'>
              <button
                className='bg-lime-700 hover:bg-lime-800 text-white font-medium py-2 px-4 rounded-lg float-right ml-4'
                onClick={() =>
                  captureScreenshot('sectionTwo', 'RincianTiketKeretaApi.png')
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

export default TiketKeretaApi;

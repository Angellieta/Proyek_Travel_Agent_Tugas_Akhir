import { useState, useEffect, useCallback } from 'react';
import data from '../data/tiket.json';
import html2canvas from 'html2canvas';
import { format } from 'date-fns';
import { BsFillSuitcaseLgFill } from 'react-icons/bs';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { FaUtensils } from 'react-icons/fa';
import { PiMonitorPlayFill } from 'react-icons/pi';
import { TiWiFi } from 'react-icons/ti';
import { ImPowerCord } from 'react-icons/im';
import { Textarea } from 'flowbite-react';

const TiketPesawat = () => {
  const [personResponsible] = useState('');
  const [dateCreate, setDateCreate] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestPhoneNumber, setGuestPhoneNumber] = useState('');

  const [selectedCabinClass, setSelectedCabinClass] = useState('');
  const [selectedAirline, setSelectedAirline] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [originTerminal, setOriginTerminal] = useState('');
  const [destinationTerminal, setDestinationTerminal] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedAircraftManufacturer, setSelectedAircraftManufacturer] =
    useState('');
  const [selectedAircraftSeries, setSelectedAircraftSeries] = useState('');
  const [selectedAircraftModel, setSelectedAircraftModel] = useState('');
  const [flightHours, setFlightHours] = useState('');
  const [aircraftNumber, setAircraftNumber] = useState('');
  const [flightMinutes, setFlightMinutes] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [ticketPrice, setTicketPrice] = useState(0);
  const [formattedPrice, setFormattedPrice] = useState('Rp 0');
  const [baggage, setBaggage] = useState(0);
  const [cabinBaggage, setCabinBaggage] = useState(0);
  const [desc, setDesc] = useState('');

  // Transit One
  // const [airlineTransitOne, setAirlineTransitOne] = useState('');

  // const handleAirlineTransitOneChange = (event) => {
  //   setAirlineTransitOne(event.target.value);
  // };

  // const [depatureDateTransitOne, setDepatureDateTransitOne] = useState('');
  // const [arrivalDateTransitOne, setArrivalDateTransitOne] = useState('');

  // const [depatureTimeTransitOne, setDepatureTimeTransitOne] = useState('');
  // const [arrivalTimeTransitOne, setArrivalTimeTransitOne] = useState('');

  // const [flightHoursTransitOne, setFlightHoursTransitOne] = useState('');
  // const [fligtMinutesTransitOne, setFlightMinutesTransitOne] = useState('');

  // const [airportTransitOne, setAirportTransitOne] = useState('');
  // const [terminalTransitOne, setTerminalTransitOne] = useState('');

  // const [aircraftManufactureTransitOne, setAircraftManufactureTransitOne] =
  //   useState('');

  // const [descTransitOne, setDescTransitOne] = useState('');
  // const [baggageTransitOne, setBaggageTransitOne] = useState('');
  // const [cabinBaggageTransitOne, setCabinBaggageTransitOne] = useState('');

  // const handleDepatureDateChange = (e) => {
  //   setDepatureDateTransitOne(e.target.value);
  // };
  // const handleArrivalDateChange = (e) =>
  //   setArrivalDateTransitOne(e.target.value);
  // const handleDepatureTimeChange = (e) =>
  //   setDepatureTimeTransitOne(e.target.value);
  // const handleArrivalTimeChange = (e) =>
  //   setArrivalTimeTransitOne(e.target.value);
  // const handleFlightHoursChange = (e) =>
  //   setFlightHoursTransitOne(e.target.value);
  // const handleFlightMinutesChange = (e) =>
  //   setFlightMinutesTransitOne(e.target.value);
  // const handleAirportChange = (e) => setAirportTransitOne(e.target.value);
  // const handleTerminalChange = (e) => setTerminalTransitOne(e.target.value);
  // const handleAircraftManufactureChange = (e) =>
  //   setAircraftManufactureTransitOne(e.target.value);
  // const handleDescChange = (e) => setDescTransitOne(e.target.value);
  // const handleBaggageChange = (e) => setBaggageTransitOne(e.target.value);
  // const handleCabinBaggageChange = (e) =>
  //   setCabinBaggageTransitOne(e.target.value);

  // Toggles for facilities
  const [inFlightMeal, setInFlightMeal] = useState(false);
  const [inFlightEntertainment, setInFlightEntertainment] = useState(false);
  const [wifi, setWifi] = useState(false);
  const [powerUsb, setPowerUsb] = useState(false);

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

  const calculateFlightDuration = useCallback(() => {
    if (departureTime && arrivalTime) {
      const [depHour, depMinute] = departureTime.split(':').map(Number);
      const [arrHour, arrMinute] = arrivalTime.split(':').map(Number);

      const departureInMinutes = depHour * 60 + depMinute;
      const arrivalInMinutes = arrHour * 60 + arrMinute;

      let totalMinutes = arrivalInMinutes - departureInMinutes;
      if (totalMinutes < 0) {
        totalMinutes += 24 * 60;
      }

      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      setFlightHours(hours);
      setFlightMinutes(minutes);
    }
  }, [departureTime, arrivalTime]);

  useEffect(() => {
    calculateFlightDuration();
  }, [calculateFlightDuration]);

  const handleAirlineChange = (event) => {
    setSelectedAirline(event.target.value);
  };
  const handleOriginChange = (event) => {
    setSelectedOrigin(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setSelectedDestination(event.target.value);
  };

  const handleAircraftManufacturerChange = (event) => {
    setSelectedAircraftManufacturer(event.target.value);
    setSelectedAircraftSeries('');
    setSelectedAircraftModel('');
  };

  const handleAircraftSeriesChange = (event) => {
    setSelectedAircraftSeries(event.target.value);
    setSelectedAircraftModel('');
  };

  const handleAircraftModelChange = (event) => {
    setSelectedAircraftModel(event.target.value);
  };

  const handleCabinClassChange = (event) => {
    setSelectedCabinClass(event.target.value);
  };

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

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [form, setForm] = useState({
    personResponsible: '',
    adminName: '',
    ticketDate: '',
    guestName: '',
    whatsapp: '',
    airline: '',
    departureDate: '',
    arrivalDate: '',
    originAirport: '',
    destinationAirport: '',
    departureTime: '',
    arrivalTime: '',
    planeManufacturer: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const validate = () => {
    const newErrors = {};
    if (!form.personResponsible.trim())
      newErrors.personResponsible = 'Nama Pengurus wajib diisi';
    if (!form.adminName) newErrors.adminName = 'Nama Pengurus wajib diisi';
    if (!form.ticketDate || !/^\d{2}\/\d{2}\/\d{4}$/.test(form.ticketDate))
      newErrors.ticketDate = 'Tanggal harus format dd/mm/yyyy';
    if (!form.guestName) newErrors.guestName = 'Nama Tamu wajib diisi';
    if (!form.whatsapp) newErrors.whatsapp = 'No Whatsapp wajib diisi';
    else if (!/^628\d{8,12}$/.test(form.whatsapp))
      newErrors.whatsapp = 'Format WA salah (628...)';
    if (!form.airline) newErrors.airline = 'Pilih Maskapai';
    if (!form.departureDate)
      newErrors.departureDate = 'Tanggal Keberangkatan wajib';
    if (!form.arrivalDate) newErrors.arrivalDate = 'Tanggal Kedatangan wajib';
    if (!form.originAirport) newErrors.originAirport = 'Pilih Bandara Asal';
    if (!form.destinationAirport)
      newErrors.destinationAirport = 'Pilih Bandara Tujuan';
    if (
      !form.departureTime ||
      !/^([01]\d|2[0-3]):([0-5]\d)$/.test(form.departureTime)
    )
      newErrors.departureTime = 'Format Jam Salah (HH:MM)';
    if (
      !form.arrivalTime ||
      !/^([01]\d|2[0-3]):([0-5]\d)$/.test(form.arrivalTime)
    )
      newErrors.arrivalTime = 'Format Jam Salah (HH:MM)';
    if (!form.planeManufacturer)
      newErrors.planeManufacturer = 'Produsen Pesawat wajib dipilih';

    return newErrors;
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      alert('Form Sukses Dikirim!');
      // lanjut submit ke API di sini
    }
  };

  return (
    <div className='p-8 mx-auto max-w-6xl'>
      <form
        onSubmit={handleSubmit}
        className='my-28 p-24 bg-white shadow-lg rounded-2xl'
      >
        <h2 className='text-2xl font-semibold mb-12 text-center'>
          Tiket Penerbangan
        </h2>
        <hr className='mb-12' />

        <h3 className='text-lg font-semibold text-lime-600 mb-4 ml-4'>
          Detail Pengurus:
        </h3>

        <div className='flex'>
          <div className='mb-8 pl-4 text-sm w-full'>
            <div className='relative'>
              <input
                type='text'
                id='floating_outlined'
                label='Nama Lengkap Anda'
                name='personResponsible'
                value={form.personResponsible}
                onChange={handleChange}
                className={`block px-2.5 pb-2.5 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 ${
                  errors.personResponsible
                    ? 'border-red-500'
                    : 'border-gray-300'
                } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-600 focus:outline-none focus:ring-0 focus:border-lime-600 peer`}
                placeholder=' '
              />
              {errors.adminName && (
                <p className='text-red-500 text-sm'>{errors.adminName}</p>
              )}
              <label
                htmlFor='floating_outlined'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
              >
                Nama Lengkap Anda
              </label>
            </div>
          </div>

          <div className='mb-4 pl-4 text-sm w-full'>
            <div className='relative'>
              <input
                type='date'
                id='floating_outlined'
                value={form.ticketDate}
                onChange={handleChange}
                className='block px-2.5 pb-2.5 pt-4 pl-4  w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                placeholder=' '
              />
              <label
                htmlFor='floating_outlined'
                className='absolute text-sm  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
              >
                Tanggal Input Tiket
              </label>
            </div>
          </div>
        </div>

        <h3 className='text-lg font-semibold text-lime-600 mb-4 ml-4'>
          Detail Tamu:
        </h3>

        <div className='flex '>
          <div className='mb-8 pl-4 text-sm w-full'>
            <div className='relative'>
              <input
                type='text'
                id='floating_outlined'
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className='block px-2.5 pb-2.5 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                placeholder=' '
              />
              <label
                htmlFor='floating_outlined'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
              >
                Nama Lengkap Tamu
              </label>
            </div>
          </div>

          <div className='mb-4 pl-4 text-sm w-full'>
            <div className='relative'>
              <input
                type='number'
                id='floating_outlined'
                value={guestPhoneNumber}
                onChange={(e) => setGuestPhoneNumber(e.target.value)}
                className='block px-2.5 pb-2.5 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                placeholder=' '
              />
              <label
                htmlFor='floating_outlined'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
              >
                No Whatsapp
              </label>
            </div>
          </div>
        </div>

        <h3 className='text-lg font-semibold text-lime-600 mb-4 ml-4'>
          Detail Penerbangan:
        </h3>

        <div className='flex'>
          <div className='w-1/2'>
            {/* Pilihan Maskapai */}
            <div className='mb-6 pl-4 text-sm'>
              <div className='relative'>
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Maskapai
                </label>
                <select
                  id='floating_outlined'
                  value={selectedAirline}
                  onChange={handleAirlineChange}
                  className='block px-2.5 pb-2.5 pt-6 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer '
                >
                  <option value='' className='hover:bg-lime-600 '>
                    -
                  </option>
                  {data.airlines.map((airline) => (
                    <option key={airline.code} value={airline.code}>
                      ({airline.code}) {airline.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Pilihan Bandara Asal */}
            <div className='mb-6 pl-4 text-sm'>
              <div className='relative'>
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Bandara Asal
                </label>
                <select
                  id='floating_outlined'
                  value={selectedOrigin}
                  onChange={handleOriginChange}
                  className='block px-2.5 pb-2.5 pt-6 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                >
                  <option value=''>-</option>
                  {data.airports.map((airport) => (
                    <option key={airport.code} value={airport.code}>
                      ({airport.city}, {airport.country}) {airport.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Pilihan Bandara Tujuan */}
            <div className='mb-6 pl-4 text-sm'>
              <div className='relative'>
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Bandara Tujuan
                </label>
                <select
                  id='floating_outlined'
                  value={selectedDestination}
                  onChange={handleDestinationChange}
                  className='block px-2.5 pb-2.5 pt-6 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                >
                  <option value=''>-</option>
                  {data.airports.map((airport) => (
                    <option key={airport.code} value={airport.code}>
                      ({airport.city}, {airport.country}) {airport.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className='w-1/2'>
            {/* Tanggal Keberangkatan dan Kedatangan */}
            <div className='mb-6 pl-4 text-sm'>
              <div className='relative'>
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Tanggal Keberangkatan
                </label>
                <input
                  type='date'
                  id='floating_outlined'
                  value={departureDate || ''}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  placeholder=''
                  className='block px-2.5 pb-2 pt-6 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                />
              </div>
            </div>

            {/* Waktu Keberangkatan dan Kedatangan */}
            <div className='mb-6 pl-4 text-sm'>
              <div className='relative'>
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Waktu Keberangkatan
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none'>
                    <svg
                      className='w-4 h-4  text-gray-500 dark:text-gray-400'
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
                    className='block px-2.5 pb-2 pt-6 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                    min='09:00'
                    max='18:00'
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            {/* Terminal Asal */}
            <div className='flex flex-wrap items-stretch w-full mb-6 pl-4 text-sm relative'>
              <label
                htmlFor='floating_outlined'
                className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-5'
              >
                Terminal Asal
              </label>
              <input
                type='text'
                id='floating_outlined'
                value={originTerminal}
                onChange={(e) => setOriginTerminal(e.target.value)}
                className='flex-shrink flex-grow flex-auto pb-2.5 pt-6 pl-4 text-gray-700 text-xs leading-normal border w-px border-gray-300 rounded-lg rounded-r-none px-3 relative dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                placeholder=''
              />
            </div>
          </div>
          <div className='w-1/2'>
            <div className='mb-6 pl-4 text-sm'>
              <div className='relative'>
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Tanggal Kedatangan
                </label>
                <input
                  type='date'
                  id='floating_outlined'
                  value={arrivalDate}
                  onChange={(e) => setArrivalDate(e.target.value)}
                  className='block px-2.5 pb-2 pt-6 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                />
              </div>
            </div>

            <div className='mb-6 pl-4 text-sm'>
              <div className='relative'>
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Waktu Kedatangan
                </label>
                <div className='relative'>
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
                    className='block px-2.5 pb-2 pt-6 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                    min='09:00'
                    max='18:00'
                    value={arrivalTime || ''}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            {/* Terminal Tujuan */}
            <div className='flex flex-wrap items-stretch w-full mb-6 pl-4 text-sm relative'>
              <label
                htmlFor='floating_outlined'
                className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-5'
              >
                Terminal Tujuan
              </label>
              <input
                type='text'
                id='floating_outlined'
                value={destinationTerminal}
                onChange={(e) => setDestinationTerminal(e.target.value)}
                className='flex-shrink flex-grow flex-auto pb-2.5 pt-6 pl-4 text-gray-700 text-xs leading-normal border w-px border-gray-300 rounded-lg rounded-r-none px-3 relative dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                placeholder=''
              />
            </div>
          </div>
        </div>

        <div className='mb-6 pl-4 text-sm w-full'>
          <div className='relative'>
            <label
              htmlFor='floating_outlined'
              className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
            >
              Produsen Pesawat
            </label>
            <select
              id='floating_outlined'
              value={selectedAircraftManufacturer}
              onChange={handleAircraftManufacturerChange}
              className='block px-2.5 pb-2 pt-6 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
            >
              <option value=''>-</option>
              {Object.keys(data.aircraftTypes).map((manufacturer) => (
                <option key={manufacturer} value={manufacturer}>
                  {manufacturer}
                </option>
              ))}
            </select>
          </div>
        </div>
        {selectedAircraftManufacturer && (
          <div className='mb-6 pl-4 text-sm'>
            <div className='relative'>
              <label
                htmlFor='floating_outlined'
                className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
              >
                Seri Pesawat
              </label>
              <select
                id='floating_outlined'
                value={selectedAircraftSeries}
                onChange={handleAircraftSeriesChange}
                className='block px-2.5 pb-2.5 pt-6 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
              >
                <option value=''>-</option>
                {Object.keys(
                  data.aircraftTypes[selectedAircraftManufacturer]
                ).map((series) => (
                  <option key={series} value={series}>
                    {series}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {selectedAircraftSeries && (
          <div className='mb-6 pl-4 text-sm'>
            <div className='relative'>
              <label
                htmlFor='floating_outlined'
                className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
              >
                Model Pesawat
              </label>
              <select
                id='floating_outlined'
                value={selectedAircraftModel}
                onChange={handleAircraftModelChange}
                className='block px-2.5 pb-2.5 pt-6 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
              >
                <option value=''>-</option>
                {data.aircraftTypes[selectedAircraftManufacturer][
                  selectedAircraftSeries
                ].map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className='flex'>
          <div className='w-1/2'>
            <div className='flex flex-wrap items-stretch w-full mb-6 pl-4 text-sm relative'>
              <label
                htmlFor='floating_outlined'
                className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-5'
              >
                Nomor Pesawat
              </label>
              <input
                type='number'
                id='floating_outlined'
                value={aircraftNumber}
                onChange={(e) => setAircraftNumber(e.target.value)}
                className='flex-shrink flex-grow flex-auto pb-2.5 pt-6 pl-4 text-gray-700 text-xs leading-normal border w-px border-gray-300 rounded-lg  px-3 relative dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                placeholder='Contohnya " 4157 "'
              />
            </div>
          </div>
          <div className='w-1/2'>
            {/* Pilihan Kelas Kabin */}
            <div className='mb-6 pl-4 text-sm'>
              <div className='relative'>
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Kelas Kabin
                </label>
                <select
                  id='floating_outlined'
                  value={selectedCabinClass}
                  onChange={handleCabinClassChange}
                  className='block px-2.5 pb-2.5 pt-6 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                >
                  <option value=''>-</option>
                  <option value='Economy'>Economy</option>
                  <option value='Premium Economy'>Premium Economy</option>
                  <option value='Business'>Business</option>
                  <option value='First Class'>First Class</option>
                </select>
              </div>
            </div>
          </div>
          <div className='w-1/2'>
            {/* Waktu Tempuh */}
            <div className='flex w-full'>
              <div className='flex flex-wrap items-stretch w-full mb-6 pl-4 text-sm relative'>
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-bases text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-5'
                >
                  Waktu Tempuh
                </label>
                <input
                  type='text'
                  id='floating_outlined'
                  value={flightHours}
                  onChange={(e) => setFlightHours(e.target.value)}
                  className='flex-shrink flex-grow flex-auto pb-2.5 pt-6 pl-4 text-gray-700 text-xs leading-normal border w-px border-gray-300 rounded-lg rounded-r-none px-3 relative dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  placeholder=''
                />
                <div className='flex -mr-px'>
                  <span className='flex items-center pb-2.5 pt-6 bg-transparent font-medium text-gray-500 border-gray-300 leading-normal rounded-lg rounded-l-none border border-l-0 px-3 whitespace-no-wrap text-grey-dark text-xs'>
                    Jam
                  </span>
                </div>
              </div>

              <div className='flex flex-wrap items-stretch w-full mb-6 pl-4 text-sm relative'>
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-5'
                ></label>
                <input
                  type='text'
                  id='floating_outlined'
                  value={flightMinutes}
                  onChange={(e) => setFlightMinutes(e.target.value)}
                  className='flex-shrink flex-grow flex-auto pb-2.5 pt-6 pl-4 text-gray-700 text-xs leading-normal border w-px border-gray-300 rounded-lg rounded-r-none px-3 relative dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  placeholder=''
                />
                <div className='flex -mr-px'>
                  <span className='flex items-center pb-2.5 pt-6 bg-transparent font-medium text-gray-500 border-gray-300 leading-normal rounded-lg rounded-l-none border border-l-0 px-3 whitespace-no-wrap text-grey-dark text-xs'>
                    Menit
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex'>
          <div className='w-1/2'>
            {/* Bagasi */}
            <div className='flex'>
              <div className='flex flex-wrap items-stretch w-full mb-6 pl-4 text-sm relative'>
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-5'
                >
                  Bagasi
                </label>
                <input
                  type='text'
                  id='floating_outlined'
                  value={baggage}
                  onChange={(e) => setBaggage(e.target.value)}
                  className='flex-shrink flex-grow flex-auto pb-2.5 pt-6 pl-4 text-gray-700 text-xs leading-normal border w-px border-gray-300 rounded-lg rounded-r-none px-3 relative dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  placeholder=''
                />
                <div className='flex -mr-px'>
                  <span className='flex items-center pb-2.5 pt-6 bg-transparent font-medium text-gray-500 border-gray-300 leading-normal rounded-lg rounded-l-none border border-l-0 px-3 whitespace-no-wrap text-grey-dark text-xs'>
                    Kg
                  </span>
                </div>
              </div>

              <div className='flex flex-wrap items-stretch w-full mb-6 pl-4 text-sm relative'>
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-5'
                >
                  Kabin Bagasi
                </label>
                <input
                  type='text'
                  id='floating_outlined'
                  value={cabinBaggage}
                  onChange={(e) => setCabinBaggage(e.target.value)}
                  className='flex-shrink flex-grow flex-auto pb-2.5 pt-6 pl-4 text-gray-700 text-xs leading-normal border w-px border-gray-300 rounded-lg rounded-r-none px-3 relative dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  placeholder=''
                />
                <div className='flex -mr-px'>
                  <span className='flex items-center pb-2.5 pt-6 bg-transparent font-medium text-gray-500 border-gray-300 leading-normal rounded-lg rounded-l-none border border-l-0 px-3 whitespace-no-wrap text-grey-dark text-xs'>
                    Kg
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='w-1/2'>
            {/* Harga Tiket */}
            <div className='mb-6 pl-4 text-sm'>
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
                  className='block px-2.5 pb-2.5 pt-6 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                />
              </div>
            </div>
          </div>
        </div>

        <div className='mb-8 pl-4 text-sm w-full'>
          <div className='relative'>
            <Textarea
              type='text'
              id='floating_outlined'
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
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

        {/* Fasilitas */}
        <div>
          <h3 className='text-lg font-semibold text-lime-600 mb-4 mt-4 ml-4'>
            Fasilitas:
          </h3>

          <div className='flex flex-row flex-wrap justify-evenly'>
            {/* Toggle for In-flight Meal */}
            <div className='flex items-center mb-4 pl-4'>
              <div
                className={`relative inline-flex items-center cursor-pointer ${
                  inFlightMeal ? 'bg-lime-600' : 'bg-gray-300'
                } h-6 w-12 rounded-full`}
                onClick={() => toggleSwitch(setInFlightMeal, inFlightMeal)}
              >
                <span
                  className={`${
                    inFlightMeal ? 'translate-x-6' : 'translate-x-1'
                  } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                ></span>
              </div>
              <span className='ml-4 text-sm text-gray-600'>In-flight Meal</span>
            </div>

            {/* Toggle for In-flight Entertainment */}
            <div className='flex items-center mb-4 pl-4'>
              <div
                className={`relative inline-flex items-center cursor-pointer ${
                  inFlightEntertainment ? 'bg-lime-600' : 'bg-gray-300'
                } h-6 w-12 rounded-full`}
                onClick={() =>
                  toggleSwitch(setInFlightEntertainment, inFlightEntertainment)
                }
              >
                <span
                  className={`${
                    inFlightEntertainment ? 'translate-x-6' : 'translate-x-1'
                  } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                ></span>
              </div>
              <span className='ml-4 text-sm text-gray-600'>
                In-flight Entertainment
              </span>
            </div>

            {/* Toggle for Wi-Fi */}
            <div className='flex items-center mb-4 pl-4'>
              <div
                className={`relative inline-flex items-center cursor-pointer ${
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
              <span className='ml-4 text-sm text-gray-600'>Wi-Fi</span>
            </div>

            {/* Toggle for Power/USB */}
            <div className='flex items-center mb-4 pl-4'>
              <div
                className={`relative inline-flex items-center cursor-pointer ${
                  powerUsb ? 'bg-lime-600' : 'bg-gray-300'
                } h-6 w-12 rounded-full`}
                onClick={() => toggleSwitch(setPowerUsb, powerUsb)}
              >
                <span
                  className={`${
                    powerUsb ? 'translate-x-6' : 'translate-x-1'
                  } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                ></span>
              </div>
              <span className='ml-4 text-sm text-gray-600'>Power/USB</span>
            </div>
          </div>
        </div>

        <div className='container mx-auto p-6'>
          <div className='mt-8'>
            <h3 className='text-lg font-semibold text-lime-600 mb-4'>
              Rincian Penerbangan
            </h3>
            <div id='sectionTwo' className='bg-white p-8 mb-8'>
              <div>
                <div className='grid grid-cols-2 gap-10 p-6 text-gray-700 border-dotted border-2 border-lime-500 '>
                  <div className='-mt-2'>
                    <div className='flex'>
                      <span className='w-40 text-lime-800'>Nama Tamu</span>
                      <span className='text-gray-600'>: {guestName}</span>
                    </div>
                    <div className='flex'>
                      <span className='w-40 text-lime-800'>No Whatsapp</span>
                      <span className='text-gray-600'>
                        : {guestPhoneNumber}
                      </span>
                    </div>
                  </div>
                  <div className='-mt-2'>
                    <div className='flex'>
                      <span className='w-40 text-lime-800'>Tanggal Dibuat</span>
                      <span className='text-gray-600'>
                        :{' '}
                        {dateCreate &&
                          format(new Date(dateCreate), 'd MMMM yyyy')}
                      </span>
                    </div>
                    <div className='flex'>
                      <span className='w-40 text-lime-800'>Nama Pengurus</span>
                      <span>: {personResponsible}</span>
                    </div>
                  </div>
                </div>
                <div id='sectionOne'>
                  <div className='flex flex-row items-start w-full justify-center border-slate-200 border-2 shadow-lg rounded-lg p-8 mt-5'>
                    <div className='flex gap-32'>
                      {/* Logo Maskapai + Nama Maskapai */}
                      <div className='flex items-center w-full md:w-1/3 space-x-3 mb-4'>
                        <img
                          src={
                            selectedAirline
                              ? data.airlines.find(
                                  (airline) => airline.code === selectedAirline
                                )?.logo
                              : ''
                          }
                          alt='Logo Maskapai'
                          style={{
                            width: '40px',
                            height: 'auto',
                          }}
                        />
                        <span className='text-sm text-slate-800 whitespace-nowrap mb-2'>
                          {selectedAirline
                            ? data.airlines.find(
                                (airline) => airline.code === selectedAirline
                              )?.name
                            : ''}
                        </span>
                      </div>

                      {/* Waktu Keberangkatan dan Kedatangan */}
                      <div className='flex flex-row items-end  w-full md:w-full gap-5'>
                        <div className=''>
                          <span className='text-slate-800 text-sm'>
                            {departureTime || '-'}
                            <div className='text-xs text-center text-slate-500'>
                              {selectedOrigin
                                ? data.airports.find(
                                    (airport) => airport.code === selectedOrigin
                                  )?.code
                                : ''}
                            </div>
                          </span>
                        </div>

                        <div className='justify-center'>
                          <div className='flex justify-center'>
                            <span className='text-slate-500 text-xs '>
                              {flightHours || '-'}j {flightMinutes || '-'}m
                            </span>
                          </div>
                          <div>
                            <span className='flex items-center justify-between w-16 mt-2 mb-2'>
                              <div className='h-1.5 w-1.5 bg-lime-600 rounded-full'></div>
                              <div className='flex-grow border-lime-600 border-t-[0.5px]'></div>
                              <div className='h-1.5 w-1.5 bg-lime-600 rounded-full'></div>
                            </span>
                          </div>
                          <div className='flex justify-center'>
                            <p className='text-xs text-slate-500'>Direct</p>
                          </div>
                        </div>

                        <span className='text-slate-800 text-sm'>
                          {arrivalTime || '-'}
                          <div className='text-xs text-center text-slate-500'>
                            {selectedDestination
                              ? data.airports.find(
                                  (airport) =>
                                    airport.code === selectedDestination
                                )?.code
                              : ''}
                          </div>
                        </span>
                      </div>

                      <div className='flex flex-col gap-3 w-full md:w-1/3'>
                        <div>
                          <span className='text-orange-500 font-bold'>
                            {formatCurrency(ticketPrice)}
                          </span>
                          <span className='text-slate-500'>/pax</span>
                        </div>
                        <div className='flex justify-end'>
                          <button
                            onClick={toggleDropdown}
                            className='text-xs text-lime-700 hover:underline'
                          >
                            Lihat Detail {isOpen ? '▲' : '▼'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {isOpen && (
                    <div className='border-slate-200 border-2 rounded-b-lg w-full px-16 py-8'>
                      <h4 className='text-md font-semibold text-gray-700 mb-3 '>
                        Detail Penerbangan
                      </h4>
                      <div className=' p-6 space-y-6 w-full'>
                        {/* Timeline & Flight Details */}
                        <div className='relative flex p-6'>
                          {/* Timeline */}
                          <div className='flex flex-col items-center '>
                            <div className='flex'>
                              <div className='flex flex-col justify-between my-auto gap-24 '>
                                {/* Departure Time & Date */}
                                <div className='text-right -mt-5'>
                                  <span className='text-sm font-medium text-gray-800'>
                                    {departureTime}
                                  </span>
                                  <div className=''>
                                    <span className='text-xs text-gray-400'>
                                      {departureDate &&
                                        format(
                                          new Date(departureDate),
                                          'd MMM'
                                        )}
                                    </span>
                                  </div>
                                </div>
                                {/* Flight Duration */}
                                <div className='text-xs text-gray-500 mt-6 mb-6'>
                                  {flightHours}h {flightMinutes}m
                                </div>
                                {/* Arrival Time & Date */}
                                <div className='text-right mt-2'>
                                  <span className='text-sm font-medium text-gray-800'>
                                    {arrivalTime}
                                  </span>
                                  <div className='-mb-4'>
                                    <span className='text-xs text-gray-400 '>
                                      {arrivalDate &&
                                        format(new Date(arrivalDate), 'd MMM')}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className='flex flex-col items-center w-10'>
                                <div className='w-2 h-2 bg-lime-600 rounded-full'></div>
                                <div className='flex-grow  border-lime-600 border-r-[0.5px]'></div>
                                <div className='w-2 h-2 bg-lime-600 rounded-full'></div>
                              </div>
                            </div>
                          </div>

                          {/* Flight Details */}
                          <div className='ml-6 flex-grow'>
                            {/* Departure Details */}
                            <div className='mb-4 -mt-3 w-100'>
                              <h3 className='text-sm font-semibold text-gray-800'>
                                {selectedOrigin
                                  ? data.airports.find(
                                      (airport) =>
                                        airport.code === selectedOrigin
                                    )?.city
                                  : ''}
                                {' ('}
                                {selectedOrigin
                                  ? data.airports.find(
                                      (airport) =>
                                        airport.code === selectedOrigin
                                    )?.code
                                  : ''}
                                {')'}
                              </h3>
                              <p className='text-xs text-gray-500'>
                                {selectedOrigin
                                  ? data.airports.find(
                                      (airport) =>
                                        airport.code === selectedOrigin
                                    )?.name
                                  : ''}
                              </p>
                              <p className='text-xs text-gray-500'>
                                {originTerminal}
                              </p>
                            </div>

                            {/* Airline Info */}
                            <div className='flex items-center space-x-2 mb-4'>
                              <span className='text-gray-800 font-semibold text-sm'>
                                {selectedAirline
                                  ? data.airlines.find(
                                      (airline) =>
                                        airline.code === selectedAirline
                                    )?.name
                                  : ''}
                              </span>
                              <img
                                src={
                                  selectedAirline
                                    ? data.airlines.find(
                                        (airline) =>
                                          airline.code === selectedAirline
                                      )?.logo
                                    : ''
                                }
                                alt=''
                                className='w-6 h-6 object-contain'
                                style={{
                                  width: '40px',
                                  height: 'auto',
                                }}
                              />
                            </div>
                            <div className='text-sm text-gray-800 font-semibold'>
                              {selectedAirline
                                ? data.airlines.find(
                                    (airline) =>
                                      airline.code === selectedAirline
                                  )?.code
                                : ''}
                              {'-'}
                              {aircraftNumber}
                              {' • '}
                              {selectedCabinClass}
                            </div>

                            {/* Baggage & Aircraft */}
                            <div className='mt-4 flex justify-between mb-4'>
                              {/* Baggage */}
                              <div className='flex flex-row items-start space-x-2 '>
                                <BsFillSuitcaseLgFill className='text-gray-500 mt-0.5' />
                                <div>
                                  <div>
                                    <p className='text-sm text-gray-500 pl-2'>
                                      Bagasi {baggage} Kg
                                    </p>
                                  </div>

                                  <div>
                                    <p className='text-sm text-gray-500 pl-2'>
                                      Kabin Bagasi {cabinBaggage} Kg
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='flex flex-wrap gap-2'>
                              {inFlightMeal && (
                                <div className='flex items-center justify-center bg-lime-200 text-lime-600 px-3 py-2 rounded-sm'>
                                  <FaUtensils className='mr-2 text-base' />
                                  <span className='text-sm -mt-4'>
                                    In-flight Meal
                                  </span>
                                </div>
                              )}
                              {inFlightEntertainment && (
                                <div className='flex items-center justify-center bg-lime-200 text-lime-600 px-3 py-2 rounded-sm'>
                                  <PiMonitorPlayFill className='mr-2 text-base' />
                                  <span className='text-sm -mt-4'>
                                    In-flight Entertainment
                                  </span>
                                </div>
                              )}
                              {wifi && (
                                <div className='flex items-center justify-center bg-lime-200 text-lime-600 px-3 py-2 rounded-sm'>
                                  <TiWiFi className='mr-2 text-base' />
                                  <span className='text-sm -mt-4'>WiFi</span>
                                </div>
                              )}
                              {powerUsb && (
                                <div className='flex items-center justify-center bg-lime-200 text-lime-600 px-3 py-2 rounded-sm'>
                                  <ImPowerCord className='mr-2 text-base' />
                                  <span className='text-sm -mt-4'>
                                    Power USB
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Arrival Details */}
                            <div className='mt-16'>
                              <h3 className='text-sm font-semibold text-gray-800'>
                                {selectedDestination
                                  ? data.airports.find(
                                      (airport) =>
                                        airport.code === selectedDestination
                                    )?.city
                                  : ''}
                                {' ('}
                                {selectedDestination
                                  ? data.airports.find(
                                      (airport) =>
                                        airport.code === selectedDestination
                                    )?.code
                                  : ''}
                                {') '}
                              </h3>
                              <p className='text-xs text-gray-500 '>
                                {selectedDestination
                                  ? data.airports.find(
                                      (airport) =>
                                        airport.code === selectedDestination
                                    )?.name
                                  : ''}
                              </p>
                              <p className='text-xs text-gray-500'>
                                {destinationTerminal}
                              </p>
                            </div>
                          </div>
                          {/* Aircraft */}
                          <div className='flex items-center space-x-2 flex-shrink-1'>
                            {/* Ikon dengan lingkaran */}
                            <div className='flex items-center justify-center'>
                              <IoMdInformationCircleOutline className='text-xl' />
                            </div>

                            {/* Deskripsi Teks */}
                            <div>
                              <div>
                                <p className='text-sm font-semibold text-gray-800'>
                                  {selectedAircraftManufacturer}{' '}
                                  {selectedAircraftSeries}
                                </p>
                              </div>
                              <div>
                                <p className='text-xs text-gray-500 whitespace-pre-wrap'>
                                  {desc}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              type='button'
              className='bg-lime-700 hover:bg-lime-800 text-white font-medium py-2 px-4 rounded-lg float-right ml-4'
              onClick={(e) => {
                e.preventDefault();
                if (validate()) {
                  captureScreenshot('sectionTwo', 'RincianTiketPesawat.png');
                } else {
                  alert('Silakan lengkapi data terlebih dahulu!');
                }
              }}
            >
              Unduh Tiket
            </button>

            <button
              type='button'
              className='bg-lime-700 hover:bg-lime-800 text-white font-medium py-2 px-4 rounded-lg float-right'
              onClick={(e) => {
                e.preventDefault();
                if (validate()) {
                  captureScreenshot('sectionOne', 'PreviewTiketPesawat.png');
                } else {
                  alert('Silakan lengkapi data terlebih dahulu!');
                }
              }}
            >
              Unduh Preview
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default TiketPesawat;

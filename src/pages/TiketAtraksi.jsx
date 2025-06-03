import { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { format } from 'date-fns';

import html2canvas from 'html2canvas';

const TiketAtraksi = () => {
  const tiketAtraksiRef = useRef(null);

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
    link.download = `Tiket-Atraksi-${attractionName}-${dateStart}.png`;
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

  const [attractionName, setAttractionName] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [timeOpen, setTimeOpen] = useState('');
  const [timeClose, setTimeClose] = useState('');

  const [attractionAddress, setAttractionAddress] = useState('');

  const [attractionDesc, setAttractionDesc] = useState('');

  const [formErrors, setFormErrors] = useState({});

  const attractionNameRef = useRef(null);
  const dateStartRef = useRef(null);
  const timeOpenRef = useRef(null);
  const timeCloseRef = useRef(null);
  const attractionAddressRef = useRef(null);
  const priceRef = useRef(null);
  const attractionDescRef = useRef(null);
  const imageUploadRef = useRef(null);

  const validateAtraksiTiket = () => {
    const newErrors = {};
    let firstInvalidRef = null;

    if (!attractionName.trim()) {
      newErrors.attractionName = 'Nama atraksi wajib diisi';
      if (!firstInvalidRef) firstInvalidRef = attractionNameRef;
    }

    if (!dateStart) {
      newErrors.dateStart = 'Tanggal wajib diisi';
      if (!firstInvalidRef) firstInvalidRef = dateStartRef;
    }

    if (!timeOpen) {
      newErrors.timeOpen = 'Jam buka wajib diisi';
      if (!firstInvalidRef) firstInvalidRef = timeOpenRef;
    }

    if (!timeClose) {
      newErrors.timeClose = 'Jam tutup wajib diisi';
      if (!firstInvalidRef) firstInvalidRef = timeCloseRef;
    }

    if (!attractionAddress.trim()) {
      newErrors.attractionAddress = 'Alamat wajib diisi';
      if (!firstInvalidRef) firstInvalidRef = attractionAddressRef;
    } else if (attractionAddress.length < 20) {
      newErrors.attractionAddress = 'Alamat terlalu singkat (min. 20 karakter)';
      if (!firstInvalidRef) firstInvalidRef = attractionAddressRef;
    } else if (attractionAddress.length > 200) {
      newErrors.attractionAddress =
        'Alamat tidak boleh lebih dari 200 karakter';
      if (!firstInvalidRef) firstInvalidRef = attractionAddressRef;
    }

    if (!attractionDesc.trim()) {
      newErrors.attractionDesc = 'Deskripsi atraksi wajib diisi';
      if (!firstInvalidRef) firstInvalidRef = attractionDescRef;
    } else if (attractionDesc.trim().split(/\s+/).length > 65) {
      newErrors.attractionDesc = 'Deskripsi atraksi maksimal 65 kata';
      if (!firstInvalidRef) firstInvalidRef = attractionDescRef;
    }
    if (selectedFileNames.length === 0) {
      newErrors.selectedImages = 'Foto tampilan atraksi wajib diunggah';
      if (!firstInvalidRef) firstInvalidRef = imageUploadRef;
    }

    const parsedPrice = Number(formattedPrice.replace(/[^\d]/g, ''));
    if (!parsedPrice || parsedPrice <= 0) {
      newErrors.formattedPrice = 'Harga wajib diisi dan harus lebih dari 0';
      if (!firstInvalidRef) firstInvalidRef = priceRef;
    }

    setFormErrors(newErrors);

    return { isValid: Object.keys(newErrors).length === 0, firstInvalidRef };
  };

  const downloadTiketAtraksi = async () => {
    if (!tiketAtraksiRef.current) return;

    const canvas = await html2canvas(tiketAtraksiRef.current);
    const image = canvas.toDataURL('image/png');

    // Unduh file
    const link = document.createElement('a');
    link.href = image;
    link.download = `Preview-Tiket-Atraksi-${attractionName}-${dateStart}.png`;
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

  const handleTiketAtraksi = () => {
    const { isValid, firstInvalidRef } = validateAtraksiTiket();

    if (isValid) {
      downloadTiketAtraksi();
    } else if (firstInvalidRef && firstInvalidRef.current) {
      firstInvalidRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      firstInvalidRef.current.focus();
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
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

  const [selectedFileNames, setSelectedFileNames] = useState([]);
  const [selectedImageURL, setSelectedImageURL] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    // Simpan nama-nama file
    const fileNames = files.map((file) => file.name);
    setSelectedFileNames(fileNames);

    // Simpan URL untuk setiap file
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setSelectedImageURL(imageUrls);

    // Hapus error jika ada
    setFormErrors((prev) => ({ ...prev, selectedImages: null }));
  };

  return (
    <div className='p-8 mx-auto max-w-6xl'>
      <div className='my-28 p-24 bg-white shadow-lg rounded-2xl'>
        <h2 className='text-2xl font-semibold mb-12 text-center'>
          Tiket Atraksi
        </h2>

        <hr className='mb-10' />
        <div className='flex flex-col gap-8'>
          <h3 className='text-lg font-semibold text-lime-600 ml-4'>
            Detail Atraksi:
          </h3>

          <div className='flex ml-4'>
            <div className='justify-center items-center w-1/2 mr-4'>
              <div className='relative'>
                <input
                  ref={attractionNameRef}
                  type='text'
                  id='floating_outlined'
                  value={attractionName}
                  onChange={(e) => setAttractionName(e.target.value)}
                  className='block px-2.5 pb-2.5 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  placeholder=' '
                />
                {formErrors.attractionName && (
                  <p className='absolute text-red-500 text-xs mt-1 ml-2'>
                    {formErrors.attractionName}
                  </p>
                )}
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Nama Atraksi
                </label>
              </div>
            </div>
            <div className='justify-center items-center w-1/4 mr-4'>
              <div className='relative'>
                <input
                  ref={dateStartRef}
                  type='date'
                  id='floating_outlined'
                  value={dateStart}
                  onChange={(e) => setDateStart(e.target.value)}
                  className='block px-2.5 pb-2.5 pt-4 pl-4  w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  placeholder=' '
                />
                {formErrors.dateStart && (
                  <p className='absolute text-red-500 text-xs mt-1 ml-2'>
                    {formErrors.dateStart}
                  </p>
                )}
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-sm  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Tanggal
                </label>
              </div>
            </div>
            <div className='justify-center items-center w-1/6 mr-4'>
              <div className='relative'>
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Jam Buka
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
                  ref={timeOpenRef}
                  type='time'
                  id='floating_outlined'
                  className='block px-2.5 pb-2 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  min='09:00'
                  max='18:00'
                  value={timeOpen || ''}
                  onChange={(e) => setTimeOpen(e.target.value)}
                  required
                />
                {formErrors.timeOpen && (
                  <p className='absolute text-red-500 text-xs mt-1 ml-2'>
                    {formErrors.timeOpen}
                  </p>
                )}
              </div>
            </div>
            <div className='justify-center items-center w-1/6'>
              <div className='relative'>
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Jam Tutup
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
                  ref={timeCloseRef}
                  type='time'
                  id='floating_outlined'
                  className='block px-2.5 pb-2 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  min='09:00'
                  max='18:00'
                  value={timeClose || ''}
                  onChange={(e) => setTimeClose(e.target.value)}
                  required
                />
                {formErrors.timeClose && (
                  <p className='absolute text-red-500 text-xs mt-1 ml-2'>
                    {formErrors.timeClose}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className='flex ml-4'>
            <div className='justify-center items-center  w-full'>
              <div className='relative'>
                <input
                  ref={attractionAddressRef}
                  type='text'
                  id='floating_outlined'
                  value={attractionAddress}
                  onChange={(e) => setAttractionAddress(e.target.value)}
                  className='block px-2.5 pb-2.5 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  placeholder=' '
                />
                {formErrors.attractionAddress && (
                  <p className='absolute text-red-500 text-xs mt-1 ml-2'>
                    {formErrors.attractionAddress}
                  </p>
                )}
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Alamat
                </label>
              </div>
            </div>
          </div>

          <div className='flex ml-4'>
            <div className='justify-center items-center w-full'>
              <div className='relative'>
                <input
                  ref={attractionDescRef}
                  type='text'
                  id='floating_outlined'
                  value={attractionDesc}
                  onChange={(e) => setAttractionDesc(e.target.value)}
                  className='block px-2.5 pb-2.5 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  placeholder=' '
                />
                {formErrors.attractionDesc && (
                  <p className='absolute text-red-500 text-xs mt-1 ml-2'>
                    {formErrors.attractionDesc}
                  </p>
                )}
                <label
                  htmlFor='floating_outlined'
                  className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                >
                  Deskripsi Atraksi
                </label>
              </div>
            </div>
          </div>

          <div className='flex ml-4'>
            <div className='justify-center items-center w-1/2 mr-4'>
              <div className='relative'>
                <label
                  className='block mb-2 text-xs font-medium text-gray-600 dark:text-white'
                  htmlFor='multiple_files_input'
                >
                  Upload Foto Tampilan Atraksi
                </label>
                <div className='flex items-center'>
                  <label
                    className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-lime-700 border border-lime-700 rounded-l-lg cursor-pointer hover:bg-lime-800 focus:outline-none focus:ring focus:ring-lime-300'
                    htmlFor='multiple_files_input'
                  >
                    Pilih File
                  </label>
                  <div className='flex-1 px-4 py-2 text-sm text-gray-500 border border-gray-300 rounded-r-lg bg-gray-50'>
                    {selectedFileNames.length > 0
                      ? selectedFileNames.join(', ')
                      : 'Tidak ada file yang dipilih'}
                  </div>

                  <input
                    ref={imageUploadRef}
                    id='multiple_files_input'
                    type='file'
                    multiple
                    className='hidden'
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              {formErrors.handleFileChange && (
                <p className='text-red-500 text-xs mt-1 ml-2'>
                  {formErrors.handleFileChange}
                </p>
              )}
            </div>
            <div className='justify-center items-center w-1/2 mt-4'>
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

          <div className='container mx-auto p-6'>
            <div className='mt-8'>
              <h3 className='text-lg font-semibold text-lime-600 mb-4'>
                Rincian Tiket Atraksi
              </h3>
              <div className='bg-white rounded-lg mb-4 mx-auto'>
                <div ref={tiketAtraksiRef}>
                  <div className='bg-white shadow-lg rounded-lg px-8 pt-8 pb-4 mb-8'>
                    <div className='text-xl font-medium text-gray-800 mb-2 ml-4'>
                      {attractionName}
                    </div>
                    <div className='text-xs text-justify font-medium text-gray-700 ml-4 mr-5 mb-4'>
                      <span className='text-xs font-semibold text-gray-800'>
                        {' '}
                        Alamat
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :{' '}
                      </span>
                      {attractionAddress}
                    </div>

                    <hr className='w-2xs' />
                    <div className='flex flex-row justify-between items-center '>
                      <div>
                        <div className='mt-4 text-xs text-justify font-medium text-gray-700 ml-4 mr-5'>
                          <span className='text-xs font-semibold text-gray-800'>
                            Tanggal{' '}
                          </span>{' '}
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{' '}
                          {dateStart &&
                            format(new Date(dateStart), 'd MMMM yyyy')}
                        </div>
                        <div className='text-xs text-justify font-medium text-gray-700 ml-4 mb-6'>
                          <span className='text-xs font-semibold text-gray-800'>
                            Jam Buka{' '}
                          </span>
                          &nbsp;&nbsp;&nbsp;&nbsp;: {timeOpen} - {timeClose}
                        </div>
                      </div>

                      <div className='flex flex-col items-right'>
                        <div className='text-right text-sm mr-6 mb-2'>
                          <span className='text-lime-600 font-bold '>
                            {formatCurrency(ticketPrice)}
                          </span>{' '}
                          /pax
                        </div>
                        <div className='flex justify-end mr-5'>
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
                      <div className='flex flex-row gap-8 p-4 -mt-8 border-slate-200 border-2 rounded-b-lg px-16 py-8 mb-4'>
                        <div className='justify-center items-center w-1/3'>
                          {selectedImageURL.map((image, index) => (
                            <div
                              key={index}
                              className='w-full h-80 border rounded-lg overflow-hidden'
                            >
                              <img
                                src={image}
                                alt={`Preview ${index + 1}`}
                                className='w-full h-full object-cover'
                              />
                            </div>
                          ))}
                        </div>
                        <div className='justify-center items-center w-2/3'>
                          <div className='text-xl font-medium text-gray-700 mb-2'>
                            {attractionName}
                          </div>
                          <table className='text-gray-700 mb-3'>
                            <tr>
                              <td className='text-xs font-semibold'>
                                Nomor Booking{' '}
                              </td>
                              <td className='text-xs text-center'>
                                &nbsp; &nbsp;:&nbsp;&nbsp;
                              </td>
                              <td className='text-xs ml-0.5 mb-3'></td>
                            </tr>
                          </table>
                          <div className='text-xs text-justify font-medium text-gray-700 ml-0.5 mb-4'>
                            {attractionDesc}
                            <div className='mt-4'>
                              {' '}
                              <span className='text-xs font-semibold '>
                                Alamat :{' '}
                              </span>
                              {attractionAddress}
                            </div>
                          </div>

                          <hr className='border-gray-400 border-dotted mb-4' />

                          <table className='ml-0.5 text-left text-gray-700 mb-6 '>
                            <tr>
                              <td className='text-xs font-semibold'>
                                Tanggal{' '}
                              </td>
                              <td className='text-xs text-center'>
                                &nbsp; &nbsp;:&nbsp;&nbsp;
                              </td>
                              <td className='text-xs ml-0.5 mb-3'>
                                {dateStart &&
                                  format(new Date(dateStart), 'd MMMM yyyy')}
                              </td>
                            </tr>
                            <tr>
                              <td className='text-xs font-semibold'>Jam </td>
                              <td className='text-xs text-center'>
                                &nbsp; &nbsp;:&nbsp;&nbsp;
                              </td>
                              <td className='text-xs ml-0.5 mb-3'>
                                {timeOpen} - {timeClose}
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button
                type='button'
                className='bg-white text-gray-700 border-2 px-4 py-2 rounded hover:bg-slate-200'
                onClick={handleTiketAtraksi}
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
                    <div className='bg-white rounded-lg pt-3 pb-2 max-w-[60vw] max-h-[100vh] overflow-hidden'>
                      <div ref={popupRef} className='px-14 pt-6 pb-2'>
                        <h2 className=' text font-semibold mb-2 -mt-6 text-center text-lime-600'>
                          Konfirmasi Pemesanan Tiket
                        </h2>
                        <div className='border-slate-200 border-2 rounded-lg w-full px-6 py-4 mb-1'>
                          <div className='space-y-2 text-xs text-gray-700'>
                            <p>
                              <span className='font-semibold'>
                                Nama Pengunjung
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;{' '}
                              </span>{' '}
                              <span>{namaCustomer}</span>
                            </p>
                          </div>
                          <div className='text-right text-xs text-gray-500 mt-2 '>
                            Tanggal dibuat :{' '}
                            {tglInput &&
                              format(new Date(tglInput), 'd MMM yyyy')}
                          </div>
                        </div>
                        <div>
                          <div className='bg-white shadow-lg border-2 border-gray-200 rounded-lg px-8 pt-8 pb-4 mb-8'>
                            <div className='text-lg font-medium text-gray-800 mb-2 ml-4'>
                              {attractionName}
                            </div>
                            <div className='text-xs text-justify font-medium text-gray-700 ml-4 mr-5 mb-4'>
                              <span className='text-xs font-semibold text-gray-800'>
                                {' '}
                                Alamat
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                :{' '}
                              </span>
                              {attractionAddress}
                            </div>

                            <hr className='w-2xs' />
                            <div className='flex flex-row justify-between items-center '>
                              <div>
                                <div className='mt-4 text-xs text-justify font-medium text-gray-700 ml-4 mr-5'>
                                  <span className='text-xs font-semibold text-gray-800'>
                                    Tanggal{' '}
                                  </span>{' '}
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{' '}
                                  {dateStart &&
                                    format(new Date(dateStart), 'd MMMM yyyy')}
                                </div>
                                <div className='text-xs text-justify font-medium text-gray-700 ml-4 mb-6'>
                                  <span className='text-xs font-semibold text-gray-800'>
                                    Jam Buka{' '}
                                  </span>
                                  &nbsp;&nbsp;&nbsp;&nbsp;: {timeOpen} -{' '}
                                  {timeClose}
                                </div>
                              </div>

                              <div className='flex flex-col items-right'>
                                <div className='text-right text-sm mr-6 mb-2'>
                                  <span className='text-lime-600 font-bold '>
                                    {formatCurrency(ticketPrice)}
                                  </span>{' '}
                                  /pax
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            {isOpen && (
                              <div className='flex flex-row gap-8 -mt-8 border-slate-200 border-2 rounded-b-lg px-12 pt-8 '>
                                <div className='justify-center items-center w-1/3'>
                                  {selectedImageURL.map((image, index) => (
                                    <div
                                      key={index}
                                      className='w-full h-80 border rounded-lg overflow-hidden'
                                    >
                                      <img
                                        src={image}
                                        alt={`Preview ${index + 1}`}
                                        className='w-full h-full object-cover'
                                      />
                                    </div>
                                  ))}
                                </div>
                                <div className='justify-center items-center w-2/3'>
                                  <div className='text-lg font-medium text-gray-700 mb-2'>
                                    {attractionName}
                                  </div>
                                  <table className='text-gray-700 mb-3'>
                                    <tr>
                                      <td className='text-xs font-semibold'>
                                        Nomor Booking{' '}
                                      </td>
                                      <td className='text-xs text-center'>
                                        &nbsp; &nbsp;:&nbsp;&nbsp;
                                      </td>
                                      <td className='text-xs ml-0.5 mb-3'></td>
                                    </tr>
                                  </table>
                                  <div className='text-xs text-justify font-medium text-gray-700 ml-0.5 mb-4'>
                                    {attractionDesc}
                                    <div className='mt-4'>
                                      {' '}
                                      <span className='text-xs font-semibold '>
                                        Alamat :{' '}
                                      </span>
                                      {attractionAddress}
                                    </div>
                                  </div>

                                  <hr className='border-gray-400 border-dotted mb-4' />

                                  <table className='ml-0.5 text-left text-gray-700 mb-6 '>
                                    <tr>
                                      <td className='text-xs font-semibold'>
                                        Tanggal{' '}
                                      </td>
                                      <td className='text-xs text-center'>
                                        &nbsp; &nbsp;:&nbsp;&nbsp;
                                      </td>
                                      <td className='text-xs ml-0.5 mb-3'>
                                        {dateStart &&
                                          format(
                                            new Date(dateStart),
                                            'd MMMM yyyy'
                                          )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className='text-xs font-semibold'>
                                        Jam{' '}
                                      </td>
                                      <td className='text-xs text-center'>
                                        &nbsp; &nbsp;:&nbsp;&nbsp;
                                      </td>
                                      <td className='text-xs ml-0.5 mb-3'>
                                        {timeOpen} - {timeClose}
                                      </td>
                                    </tr>
                                  </table>
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
      </div>
    </div>
  );
};

export default TiketAtraksi;

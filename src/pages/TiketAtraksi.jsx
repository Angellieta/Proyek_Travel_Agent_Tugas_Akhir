import { useState } from 'react';

import { format } from 'date-fns';

import html2canvas from 'html2canvas';

const TiketAtraksi = () => {
  const [attractionName, setAttractionName] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [timeOpen, setTimeOpen] = useState('');
  const [timeClose, setTimeClose] = useState('');

  const [attractionAddress, setAttractionAddress] = useState('');

  const [attractionDesc, setAttractionDesc] = useState('');

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

  const [selectedImages, setSelectedImages] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setSelectedImages(imageUrls);
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
                  type='text'
                  id='floating_outlined'
                  value={attractionName}
                  onChange={(e) => setAttractionName(e.target.value)}
                  className='block px-2.5 pb-2.5 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  placeholder=' '
                />
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
                  type='date'
                  id='floating_outlined'
                  value={dateStart}
                  onChange={(e) => setDateStart(e.target.value)}
                  className='block px-2.5 pb-2.5 pt-4 pl-4  w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  placeholder=' '
                />
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
                  type='time'
                  id='floating_outlined'
                  className='block px-2.5 pb-2 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  min='09:00'
                  max='18:00'
                  value={timeOpen || ''}
                  onChange={(e) => setTimeOpen(e.target.value)}
                  required
                />
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
                  type='time'
                  id='floating_outlined'
                  className='block px-2.5 pb-2 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  min='09:00'
                  max='18:00'
                  value={timeClose || ''}
                  onChange={(e) => setTimeClose(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className='flex ml-4'>
            <div className='justify-center items-center  w-full'>
              <div className='relative'>
                <input
                  type='text'
                  id='floating_outlined'
                  value={attractionAddress}
                  onChange={(e) => setAttractionAddress(e.target.value)}
                  className='block px-2.5 pb-2.5 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  placeholder=' '
                />
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
                  type='text'
                  id='floating_outlined'
                  value={attractionDesc}
                  onChange={(e) => setAttractionDesc(e.target.value)}
                  className='block px-2.5 pb-2.5 pt-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                  placeholder=' '
                />
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
                    Tidak ada file yang dipilih
                  </div>
                  <input
                    id='multiple_files_input'
                    type='file'
                    multiple
                    className='hidden'
                    onChange={handleFileChange}
                  />
                </div>
              </div>
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
                  type='text'
                  id='floating_outlined'
                  value={formattedPrice}
                  onChange={handlePriceChange}
                  className='block px-2.5 pb-3 py-4 pl-4 w-full text-xs text-gray-700 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-69900 focus:outline-none focus:ring-0 focus:border-lime-600 peer'
                />
              </div>
            </div>
          </div>

          <div className='container mx-auto p-6'>
            <div className='mt-8'>
              <h3 className='text-lg font-semibold text-lime-600 mb-4'>
                Rincian Tiket Atraksi
              </h3>
              <div
                id='sectionTwo'
                className='bg-white rounded-lg  mb-4 mx-auto'
              >
                <div id='sectionOne'>
                  <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
                    <div className='text-xl font-medium text-gray-800 mb-2 ml-4'>
                      {attractionName}
                    </div>
                    <div className='text-xs text-justify font-medium text-gray-700 ml-4 mr-5 mb-4'>
                      <span className='text-xs font-bold text-gray-800'>
                        {' '}
                        Alamat :{' '}
                      </span>
                      {attractionAddress}
                    </div>

                    <hr className='w-2xs' />
                    <div className='mt-4 text-xs text-justify font-medium text-gray-700 ml-4 mr-5'>
                      <span className='text-xs font-bold text-gray-800'>
                        Tanggal &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </span>{' '}
                      :{' '}
                      {dateStart && format(new Date(dateStart), 'd MMMM yyyy')}
                    </div>
                    <div className='text-xs text-justify font-medium text-gray-700 ml-4 mb-6'>
                      <span className='text-xs font-bold text-gray-800'>
                        Jam Buka &nbsp;&nbsp;&nbsp;
                      </span>
                      : {timeOpen} - {timeClose}
                    </div>

                    <div className='text-right text-sm mr-6 mb-2 -mt-6'>
                      <span className='text-orange-500 font-bold '>
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

                  <div>
                    {isOpen && (
                      <div className='flex flex-row gap-8 p-4 -mt-8 border-slate-200 border-2 rounded-b-lg px-16 py-8 mb-4'>
                        <div className='justify-center items-center w-1/3'>
                          {selectedImages.map((image, index) => (
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
                          <div className='text-xs text-justify font-medium text-gray-700 ml-0.5 mb-6'>
                            {attractionDesc}
                            <div className='mt-4'>
                              {' '}
                              <span className='text-xs font-bold '>
                                Alamat :{' '}
                              </span>
                              {attractionAddress}
                            </div>
                          </div>

                          <hr className='border-gray-400 border-dotted mb-4' />

                          <table className='ml-0.5 text-left text-gray-700 mb-6 '>
                            <tr>
                              <td className='text-xs font-bold'>Tanggal </td>
                              <td className='text-xs text-center'>
                                &nbsp; &nbsp;:&nbsp;&nbsp;
                              </td>
                              <td className='text-xs ml-0.5 mb-3'>
                                {dateStart &&
                                  format(new Date(dateStart), 'd MMMM yyyy')}
                              </td>
                            </tr>
                            <tr>
                              <td className='text-xs font-bold'>Jam </td>
                              <td className='text-xs text-center'>
                                &nbsp; &nbsp;:&nbsp;&nbsp;
                              </td>
                              <td className='text-xs ml-0.5 mb-3'>
                                {timeOpen} - {timeClose}
                              </td>
                            </tr>
                          </table>

                          <div className='text-right text-sm'>
                            <span className='text-sm text-orange-500 font-bold '>
                              {formatCurrency(ticketPrice)}
                            </span>{' '}
                            /pax
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className='mx-auto'>
                <button
                  className='bg-lime-700 hover:bg-lime-800 text-white font-medium py-2 px-4 rounded-lg float-right'
                  onClick={() =>
                    captureScreenshot('sectionTwo', 'RincianTiketAtraksi.png')
                  }
                >
                  Unduh Tiket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiketAtraksi;

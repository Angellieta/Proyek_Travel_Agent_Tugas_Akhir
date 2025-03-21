import Image from '../logo/bg_homepage.png';

const HomePage = () => {
  return (
    <div className='homepage h-screen flex items-center justify-center bg-gray-100'>
      <div className='guide flex items-center justify-center mt-16'>
        <img
          src={Image}
          alt='bg_image'
          className='w-4/6 rounded-2xl transform hover:scale-110 transition-transform duration-700 ease-in-out'
        />
      </div>
    </div>
  );
};

export default HomePage;

import { assets } from '../assets/frontend_assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';
import Title from '../components/Title';

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img src={assets.contact_img} alt="" className="w-full md:max-w-[480px]" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>54790 Willms Station <br /> Suite 350, Washington</p>
          <p className='text-gray-500'>Tel: +92-312-1615000 <br /> Email: ranadanish.se@gmail.com  </p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Forever</p>
           <p className='text-gray-500'>Learn more about our team and job openings.</p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white cursor-pointer">Explore Jobs</button>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  );
};

export default Contact;

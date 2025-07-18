import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t ">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          className="w-full md:max-w-[450px]"
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-500">
          <p>
            Forever is a modern online clothing store dedicated to bringing the
            latest fashion trends to your doorstep. With a wide selection of
            stylish apparel for men, women, and kids, Forever offers everything
            from everyday basics to statement pieces for every occasion. Whether
            you're refreshing your wardrobe, shopping for seasonal must-haves,
            or looking for affordable luxury, Forever makes fashion accessible
            and convenient.
          </p>
          <p>
            Forever is your go-to destination for effortless, on-trend fashion
            delivered straight to your door. From timeless wardrobe essentials
            to bold, statement-making pieces, the store offers a thoughtfully
            curated collection that caters to every style and occasion. With a
            focus on quality craftsmanship and sustainable materials, Forever
            ensures each garment is both durable and ethically produced.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            At Forever, our mission is to empower individuals to express their
            unique style through affordable, high-quality fashion. We are
            committed to delivering trend-forward clothing that blends comfort,
            confidence, and sustainability—making everyday style accessible for
            everyone, everywhere.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            Every product at Forever goes through a thorough quality check to
            ensure it meets our high standards. From fabric selection to final
            stitching, we prioritize durability, comfort, and a flawless fit in
            every piece.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Shop anytime, anywhere with our user-friendly online store. With
            seamless browsing, secure checkout, multiple payment options, and
            fast delivery, your perfect outfit is just a few clicks away.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Our dedicated support team is here to assist you at every step—from
            sizing questions to order updates. We believe in building trust
            through responsive, personalized, and friendly service.
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default About;

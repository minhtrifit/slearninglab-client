import { Swiper, SwiperSlide } from "swiper/react";
import { v4 } from "uuid";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const imgUrl = ["1", "2", "3"];

const HomeBanner = () => {
  return (
    <div className="flex justify-center">
      <Swiper
        className="w-[100%] h-[150px] xl:w-[80%] md:h-[400px] xl:h-[400px]"
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {imgUrl.map((url) => {
          const uid = v4();
          return (
            <SwiperSlide key={uid}>
              <img
                className="w-[100%] h-[100%] rounded-xl object-cover"
                src={`../slide/${url}.png`}
                alt={`banner${url}`}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default HomeBanner;

'use client'
import Image from "next/image";
import { Aboutdata } from "@/constants/ProjectConstants";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const Network = () => {
    return (
        <div className="bg-babyblue" id="project">
            <div className="mx-auto max-w-2xl py-20 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h3 className="text-4xl sm:text-6xl font-semibold text-center my-10 lh-81">Our network & world <br /> work details.</h3>

                <Image src={'/assets/network/map.png'} alt={"map-image"} width={1400} height={800} />

                <Swiper
                    spaceBetween={30}
                    slidesPerView={4}
                    navigation
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination]}
                    className="mySwiper"
                >
                    {Aboutdata.map((item, i) => (
                        <SwiperSlide key={i}>
                            <div className="bg-white rounded-2xl p-5 shadow-xl">
                                <div className="flex justify-start items-center gap-2">
                                    <Image src={item.imgSrc} style={{ width: '250px', height: '200px' }} alt={item.imgSrc} width={300} height={300} className="mb-2" />
                                </div>
                                <hr />
                                <h4 className="text-lg font-normal text-bluegrey my-2">
                                    {item.project[0].length > 100 ? `${item.project[0].slice(0, 100)}...` : item.project[0]} 
                                    &nbsp; <span onClick={() => {}} className="cursor-pointer text-black hover:text-blue-500 hover:underline">
                                        See more
                                    </span>
                                </h4>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default Network;

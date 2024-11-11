'use client'
import Image from "next/image";
import { Aboutdata } from "@/constants/ProjectConstants";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useRouter } from "next/navigation";

import qs from 'query-string';

const Network = () => {

    const router = useRouter();
    return (
        <div id="work" className="pb-80">
            <div className="bg-babyblue" id="project">
                <div className="mx-auto max-w-2xl py-20 pb-10 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h3 className="text-4xl sm:text-6xl font-semibold text-center my-10 lh-81">Our Work Details</h3>

                    <Swiper
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        modules={[Navigation, Pagination]}
                        loop={true}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                            1280: {
                                slidesPerView: 4,
                            },
                        }}
                        className="mySwiper"
                    >
                        {Aboutdata.map((item, i) =>{
                            
                            const url = qs.stringifyUrl({
                                url: '/project',
                                query: {id: i}
                              }, { skipNull: true });
                            
                            return (

                            
                            <SwiperSlide key={i}>
                                <div className="transition-transform hover:scale-105 mb-12 bg-white rounded-2xl p-5 shadow-xl">
                                    <div className="rounded-2xl flex justify-center items-center gap-2">
                                        <Image 
                                            src={item.imgSrc} 
                                            style={{  height: '200px' }} 
                                            alt={item.imgSrc} 
                                            width={300} 
                                            height={300} 
                                            className="rounded-2xl mb-2" 
            
                                        />
                                    </div>
                                    <hr/>
                                    <h4 className="text-lg font-medium text-gray-700 mb-2 my-2 overflow-hidden text-ellipsis" style={{ minHeight: '90px' }}>
                                        {item.project[0].length > 50 ? `${item.project[0].slice(0, 50)} ...` : item.project[0]} 
                                        &nbsp;
                                        <span onClick={() => {router.push(url)}} className="cursor-pointer text-black hover:text-blue-500 hover:underline">
                                            See more
                                        </span>
                                    </h4>
                                </div>
                            </SwiperSlide>
                        )}
                        )}
                    </Swiper>
                    <style jsx global>{`
                        .mySwiper .swiper-pagination {
                            margin-bottom: 0px; /* Adjust this as needed */
                        }
                    `}</style>
                </div>
            </div>
        </div>
    );
}

export default Network;

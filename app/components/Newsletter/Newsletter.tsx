import Image from "next/image";

const Newsletter = () => {
    return (
        <div className='-mt-32 relative z-3'>
            <div className="mx-auto max-w-2xl lg:max-w-7xl bg-blue-500 rounded-3xl">
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 lg:grid-cols-2 xl:gap-x-8">

                    {/* COLUMN-1 */}
                    <div className='hidden lg:block'>
                        <div className='float-right pt-20 relative'>
                            <Image src={'/assets/newsletter/bgImage.png'} alt="bgimg" width={588} height={334} />
                            <div className="absolute top-10 right-0">
                                <Image src={'/assets/newsletter/leaf.svg'} alt="leafimg" width={81} height={81}/>
                            </div>
                            <div className="absolute bottom-8 left-2">
                                <Image src={'/assets/newsletter/circel.svg'} alt="circleimg" width={30} height={30}/>
                            </div>
                        </div>
                    </div>

                    {/* COLUMN-2 */}
                    <div className="p-10 flex flex-col justify-center">
                        <h3 className="text-3xl md:text-4xl font-semibold mb-2 text-white">Contact Us</h3>
                        <h4 className="text-base font-normal mb-4 text-offwhite">Craven omni memoria patriae zombieland clairvius narcisse religionis sunt diri undead historiarum.</h4>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2">
                                    <input type="text" name="firstname" className="py-4 text-sm w-full text-black bg-white rounded-lg pl-4" placeholder="Enter your first name" autoComplete="off" />
                                    <input type="Email address" name="q" className="py-4 text-sm w-full text-black bg-white rounded-lg pl-4" placeholder="Enter your last name" autoComplete="off" />    
                                </div>
                                <div className="flex gap-2">
                                    <input type="Email address" name="q" className="py-4 text-sm w-full text-black bg-white rounded-lg pl-4" placeholder="Enter your email" autoComplete="off" />
                                    <input type="Email address" name="q" className="py-4 text-sm w-full text-black bg-white rounded-lg pl-4" placeholder="Enter your phone number" autoComplete="off" />
                                </div>
                                
                                
                                <textarea className="py-4 text-sm w-full text-black bg-white rounded-lg pl-4" placeholder="Enter your message" rows={4}></textarea>
                                </div>
                            <button className="flex items-center justify-center gap-2 bg-midblue text-white font-medium py-2 px-4 rounded-r-lg">
                                Contact Us <Image src={'/assets/newsletter/plane.svg'} alt="plane-img" width={20} height={20} />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Newsletter;
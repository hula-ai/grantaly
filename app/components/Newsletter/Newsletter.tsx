'use client'
import { ContactUsValidation } from "@/Validation/Client/validator";
import Image from "next/image";
import { useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";

const Newsletter = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: ""
    }); 

    const [disabled,setDisabled] = useState(false);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { value, error } = ContactUsValidation.validate(formData, { abortEarly: false });


        if (error) {
          // Show the first error message in a toast
          toast.error(error.details[0].message);
          return;
        }
        
        try {
            setDisabled(true)
            const response = await fetch("/api/auth/contactus", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            
            if (response.ok) {
                toast.success("Your Response has been submitted!");
                setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
            } else {
                toast.error("Failed to send message");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setDisabled(false)
        }
    };

    // Update form data state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div id="contactus" className="-mt-32 relative z-3">
            <div className="mx-auto max-w-2xl lg:max-w-7xl bg-blue-500 rounded-3xl">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 lg:grid-cols-2 xl:gap-x-8">

                        {/* COLUMN-1 */}
                        <div className="hidden lg:block">
                            <div className="float-right pt-20 relative">
                                <Image src={'/assets/newsletter/bgImage.png'} alt="bgimg" width={588} height={334} />
                                <div className="absolute top-10 right-0">
                                    <Image src={'/assets/newsletter/leaf.svg'} alt="leafimg" width={81} height={81} />
                                </div>
                                <div className="absolute bottom-8 left-2">
                                    <Image src={'/assets/newsletter/circel.svg'} alt="circleimg" width={30} height={30} />
                                </div>
                            </div>
                        </div>

                        {/* COLUMN-2 */}
                        <div className="p-10 flex flex-col justify-center">
                            <h3 className="text-3xl md:text-4xl font-semibold mb-2 text-white">Contact Us</h3>
                            <div className="flex flex-col gap-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="py-4 text-sm w-full text-black bg-white rounded-lg pl-4"
                                        placeholder="Enter your first name"
                                        autoComplete="off"
                                        disabled={disabled}
                                    />
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="py-4 text-sm w-full text-black bg-white rounded-lg pl-4"
                                        placeholder="Enter your last name"
                                        autoComplete="off"
                                        disabled={disabled}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="py-4 text-sm w-full text-black bg-white rounded-lg pl-4"
                                        placeholder="Enter your email"
                                        autoComplete="off"
                                        disabled={disabled}
                                    />

                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="py-4 text-sm w-full text-black bg-white rounded-lg pl-4"
                                        placeholder="Enter your phone number"
                                        autoComplete="off"
                                        disabled={disabled}
                                    />
                                </div>
                                
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="py-4 text-sm w-full text-black bg-white rounded-lg pl-4"
                                    placeholder="Enter your message"
                                    rows={4}
                                    disabled={disabled}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={disabled}
                                className="flex items-center justify-center gap-2 bg-midblue text-white font-medium py-2 px-4 rounded-r-lg"
                            >
                                {disabled ? <LoaderIcon style={{ width: 28, height: 28 }} /> : <> Contact Us <Image src={'/assets/newsletter/plane.svg'} alt="plane-img" width={20} height={20} /> </>}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Newsletter;

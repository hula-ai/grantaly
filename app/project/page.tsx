'use client'
import { Aboutdata } from "@/constants/ProjectConstants";
import Image from "next/image";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSearchParams } from "next/navigation";



const ProjectPage = () => {

  const params = useSearchParams();
  const id = params?.get("id");

  const IdInt = parseInt(id);

  let ID=0;
  if(IdInt < Aboutdata.length && IdInt >= 0){
    ID = IdInt
  }
  const project = Aboutdata[ID]; 

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12 mb-40">
      {/* Title Section */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-primary mb-8">
        {project.projectTitle}
      </h1>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-start">
        {/* Left Column - Image */}
        <div className="relative overflow-hidden rounded-lg duration-500">
  {/* Centering the container */}
  <div className="flex justify-center items-center">
    <Image
      src={project.imgSrc}
      alt="Project Image"
      layout="intrinsic" // Use intrinsic layout to control exact dimensions
      width={500} // Reduced width (change as per your requirement)
      height={400} // Reduced height (change as per your requirement)
      className="object-cover rounded-lg border-4 border-gray-100 shadow-xl"
    />
  </div>
</div>



        {/* Right Column - Content */}
        <div className="mx-40">
          {/* Country & Project Intro */}
          <div className="text-center sm:text-left mb-8">
            <p className="text-xl font-semibold text-gray-800">{`Country: Project Country`}</p>
            <p className="text-lg font-semibold text-gray-600"> Project tag line</p>
          </div>

          {/* Project Details */}
          <div className="space-y-8">
            {project.project.map((paragraph, index) => (
              <p
                key={index}
                className="text-lg text-gray-700 leading-relaxed"
                data-aos="fade-up"
              >
                {paragraph}
              </p>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectPage;

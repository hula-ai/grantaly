'use client'
import { FormInput } from "@/components/PI-Components/form/FormInput";
import { IPortfolio } from "@/interface/interface";
import { useState, ChangeEvent } from "react";

interface Props {
  Portfolio: IPortfolio;
}

const EditPortfolioPage = ({ Portfolio }: Props) => {
  // Load the first project as the default editable project

  // State for editable fields  
  const [title, setTitle] = useState<string>(Portfolio.projectTitle);
  const [tagline, setTagline] = useState<string>(Portfolio.projectTagLine);
  const [imgSrc, setImgSrc] = useState<string>(Portfolio.image);
  const [projectDetails, setProjectDetails] = useState<string[]>(Portfolio.content);

  // Handle project details editing
  const handleDetailChange = (index: number, newValue: string) => {
    const updatedDetails = [...projectDetails];
    updatedDetails[index] = newValue;
    setProjectDetails(updatedDetails);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submit logic here, such as sending updated data to an API
    console.log({
      title,
      tagline,
      imgSrc,
      projectDetails,
    });
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      {/* Title Section */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-primary mb-8">
        Edit Project
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid gap-8">
        {/* Title Input */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Project Title
          </label>
          <FormInput
            label=""
            onChange={(e:string) => setTitle(e)}
            value={title}
            type="text"
          />
        </div>

        {/* Image URL Input */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Project Image 
          </label>
          <FormInput
            label=""
            onChange={(e:string) => setImgSrc(e)}
            value={imgSrc}
            type="text"
          />
        </div>

        {/* Tagline Input */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Tagline
          </label>
          <FormInput
            label=""
            onChange={(e: string) => setTagline(e)}
            value={tagline}
            type="text"
          />
        </div>

        {/* Project Details */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Project Details
          </label>
          {projectDetails.map((detail, index) => (
            <div key={index} className="flex items-center gap-4 mb-4">
              <textarea
                value={detail}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleDetailChange(index, e.target.value)}
                className="w-full border rounded-lg p-3"
                rows={3}
              />
              <button
                type="button"
                onClick={() => setProjectDetails(projectDetails.filter((_, i) => i !== index))}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setProjectDetails([...projectDetails, ""])}
            className="text-blue-500 hover:text-blue-700"
          >
            Add Detail
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditPortfolioPage;

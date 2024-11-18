import { File } from "@/interface/interface";
import React from "react";



interface Props {
  isModalOpen: boolean;
  doc: File | null;
  closeModal: (e: any) => void;
}

const ViewContentModal = ({ isModalOpen, doc, closeModal }: Props) => {
  if (!isModalOpen || !doc) return null;

  // Extract the file extension from the URL
  const fileExtension = doc.url.split('.').pop()?.toLowerCase();

  // Function to check if the file is an image
  const isImage = (ext: string | undefined) => {
    return ext && ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext);
  };

  // Function to check if the file is a PDF
  const isPdf = (ext: string | undefined) => {
    return ext === 'pdf';
  };

  // Function to check if the file is a Word document
  const isWordDoc = (ext: string | undefined) => {
    return ext === 'doc' || ext === 'docx';
  };

  // Check for readable or displayable file types
  const renderContent = () => {
    if (isImage(fileExtension)) {
      return <img src={doc.url} alt={doc.name} className="max-w-full h-auto" />;
    } else if (isPdf(fileExtension)) {
      return (
        <embed
          src={doc.url}
          type="application/pdf"
          width="100%"
          height="100%"
        />
      );
    } else if (isWordDoc(fileExtension)) {
      // Use Google Docs Viewer for Word documents
      const viewerUrl = `https://docs.google.com/gview?url=${doc.url}&embedded=true`;
      return (
        <iframe
          src={viewerUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          title="Word Document"
        ></iframe>
      );
    } else {
      return <p className="text-sm text-red-500">File is unreadable or unsupported.</p>;
    }
  };

  return (
    <div className=" fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-80 z-50">
      <div className="bg-white rounded-lg p-6 w-full h-full max-w-full max-h-full overflow-hidden">
        <div className="absolute top-4 right-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
          >
            {/* Close */}
            &#x2715;
          </button>
        </div>

        <h3 className="text-lg font-bold mb-4">Document Details</h3>
        <p className="text-sm mb-2">Name: {doc.name}</p>

        {/* Display content based on file type */}
        <div className="w-full h-full flex item-center justify-center">
          <div className="flex items-center justify-center w-4/5 h-4/5 overflow-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewContentModal;

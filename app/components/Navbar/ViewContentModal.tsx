import React from "react";

interface File {
  name: string;
  key: string;
  url: string; // URL to the file (e.g., https://example.com/document.pdf)
}

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
          height="500px"
        />
      );
    } else {
      return <p className="text-sm text-red-500">File is unreadable or unsupported.</p>;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <h3 className="text-lg font-bold mb-4">Document Details</h3>
        <p className="text-sm mb-2">Name: {doc.name}</p>

        {/* Display content based on file type */}
        {renderContent()}

        <button
          onClick={closeModal}
          className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewContentModal;

import React, { useState } from "react";
import ViewContentModal from "../Navbar/ViewContentModal";
import { File } from "@/interface/interface";

interface Props {
  clientDocs: File[];
  adminDocs: File[];
  isModalOpen: boolean;
  toggleModal: () => void;
}

const PreviewModal = ({ isModalOpen, toggleModal, clientDocs, adminDocs }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [doc, setDoc] = useState<File | null>(null);

  const closeModal = () => {
    setIsOpen(false);
  };

  if (!isModalOpen) return null; // Do not render if modal is not open

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-40">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={toggleModal} // Close PreviewModal when clicking outside
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-3/4 md:w-1/2 z-50">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={toggleModal}
        >
          &#x2715; {/* Close Icon */}
        </button>

        <div>
          <h2 className="text-xl font-semibold mb-4">Documents</h2>

          {/* Client Documents */}
          <div className="font-semibold mb-2">Client Documents:</div>
          {clientDocs.length === 0 ? (
            <p className="text-gray-500">Client has not uploaded any contract yet</p>
          ) : (
            clientDocs.map((Doc) => (
              <div
                key={Doc.url}
                className="mb-2 cursor-pointer text-blue-500 hover:underline"
                onClick={() => {
                  setDoc(Doc);
                  setIsOpen(true); // Open ViewContentModal
                }}
              >
                  {Doc.name}
              </div>
            ))
          )}

          {/* Admin Documents */}
          <div className="font-semibold mt-4 mb-2">Admin Documents:</div>
          {adminDocs.length === 0 ? (
            <p className="text-gray-500">Admin has not uploaded any contract yet</p>
          ) : (
            adminDocs.map((Doc) => (
              <div
                key={Doc.url}
                className="mb-2 cursor-pointer text-blue-500 hover:underline"
                onClick={() => {
                  setDoc(Doc);
                  setIsOpen(true); // Open ViewContentModal
                }}
              >
                {Doc.name}
              </div>
            ))
          )}
        </div>
      </div>

      {/* ViewContentModal Overlay */}
      <ViewContentModal isModalOpen={isOpen} closeModal={closeModal} doc={doc} />
    </div>
  );
};

export default PreviewModal;

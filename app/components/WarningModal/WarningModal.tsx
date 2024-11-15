import React, { useState } from "react";
import Loader from "../Loader/Loader";

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  isDisabled?: boolean;
  loading?: boolean;
  reason?: string;
  setReason?: (value: string) => void;
  showReasonInput?: boolean;
  description?: string;
  title?: string;
}

const WarningModal: React.FC<WarningModalProps> = ({
  loading,
  isOpen,
  onClose,
  reason,
  setReason,
  showReasonInput,
  onConfirm,
  description,
  title,
  isDisabled = false,
}) => {
  const [isReasonEmpty, setIsReasonEmpty] = useState(false);

  const handleConfirm = () => {
    // if (showReasonInput && !reason) {
    //   setIsReasonEmpty(true);
    //   return;
    // }
    onConfirm(reason);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-700">{title || "WARNING!"}</h2>
        </div>
        <div className="px-6 py-4">
          <p className="text-gray-600 font-medium">{description || "Are you sure you want to do this?"}</p>
          {showReasonInput && (
            <div className="mt-4">
              <input
                type="text"
                placeholder="Enter reason"
                value={reason || ""}
                onChange={(e) => {
                  setReason && setReason(e.target.value);
                  setIsReasonEmpty(false);
                }}
                className={`w-full px-4 py-2 border rounded-lg ${
                  isReasonEmpty ? "border-red-500" : "border-gray-300"
                } focus:outline-none`}
              />
              {isReasonEmpty && <p className="mt-1 text-red-500 text-sm">Reason cannot be empty.</p>}
            </div>
          )}
        </div>
        <div className="px-6 py-4 flex justify-center gap-4 border-t">
          <button
            onClick={onClose}
            disabled={isDisabled}
            className="w-24 px-4 py-2 border rounded-lg text-gray-700 disabled:opacity-50"
          >
            No
          </button>
          <button
            onClick={handleConfirm}
            disabled={isDisabled || loading}
            className="w-24 px-4 py-2 rounded-lg border text-black disabled:opacity-50"
          >
            {loading ? <Loader /> : "Yes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;

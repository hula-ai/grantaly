import React, { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


interface Props {
    setStep :  () => void;
}

const AdminWait: React.FC = ({setStep}:Props) => {

    const router = useRouter();


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="text-center text-white p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-4">You've done your part</h1>
        <p className="mb-6">Now, we’re waiting for the client to upload the data. Please be patient.</p>
        <div className='flex flex-col'>
            <Link href="/admin/dashboard" className="mt-6 inline-block text-lg text-blue-400 hover:underline cursor-pointer">
                Go back to Dashboard
            </Link>
            <div onClick={()=>{setStep()}} className="mt-6 inline-block text-lg text-blue-400 hover:underline cursor-pointer">
                {'<<'} Go back to Last Step
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminWait;

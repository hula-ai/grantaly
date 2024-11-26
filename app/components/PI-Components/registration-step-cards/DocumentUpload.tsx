import ViewContentModal from '@/components/Navbar/ViewContentModal';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Card } from '../multi-step/card/Card'
import styles from './AddonsCard.module.scss'
import ClipLoader from "react-spinners/ClipLoader"; 
import { File, user } from '@/interface/interface';
import { useRouter } from 'next/navigation';
import { Role } from '@/types/enum';
import { FormInput } from '../form/FormInput';
import Link from 'next/link';

interface Props {
    clientDocs : File[];
    adminDocs : File[];
    setClientDocs: React.Dispatch<React.SetStateAction<File[]>>;  // Function to update clientDocs
    setAdminDocs: React.Dispatch<React.SetStateAction<File[]>>; 
    currentUser: user
    dataUploadDeadline: string;
    setDataUploadDeadline : React.Dispatch<React.SetStateAction<string>>;
    resultUploadDeadline: string;
    setResultUploadDeadline: React.Dispatch<React.SetStateAction<string>>;
    hasAdminSubmittedContract: boolean;
}

const DocumentUpload = ({hasAdminSubmittedContract,currentUser,clientDocs,adminDocs,setClientDocs,setAdminDocs,dataUploadDeadline,resultUploadDeadline,setDataUploadDeadline,setResultUploadDeadline}:Props) => {

  const role = currentUser?.role === Role.ADMIN ? 'admin' : 'user'
  const IsAdminLoggedIn = role === 'admin' ? true : false;
  
  const [activeTab, setActiveTab] = useState("client"); // "client" or "admin"
  const [modalDoc, setModalDoc] = useState<File|null>(null);
  const [loader,setLoader] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const handleView = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    
    if (file) {
        try {
            setLoader(true)
          // Create a new FormData object to send the file to the backend
          const formData = new FormData();
          formData.append('file', file);  // Attach the file to the form data
    
          // Send the file to your backend endpoint (this could be an endpoint where you handle the S3 upload)
          const response = await axios.post('/api/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',  // Important to set the content-type for file upload
            },
          });

          const responseData:File = response.data;
        
            if (activeTab === 'client') {
                // If activeTab is false, store the response data in clientDocs
                setClientDocs(prevDocs => [...prevDocs, responseData]);
            } else {
                // If activeTab is true, store the response data in adminDocs
                setAdminDocs(prevDocs => [...prevDocs, responseData]);
            }
     
          // Handle the response (e.g., save the S3 URL or file key in your state/database)
          console.log('File uploaded successfully:', activeTab === 'client',activeTab,response.data,clientDocs,adminDocs);
        } catch (error) {
          console.error('Error uploading file:', error);
          toast.error('Error in uploading File')
        } finally {
            setLoader(false)
        }
      }
  };

  const handleDelete = (docKey) => {
    if (activeTab === "client") {
      // Filter the clientDocs array to remove the document with the specific key
      setClientDocs(clientDocs.filter((doc) => doc.key !== docKey));
    } else {
      // Filter the adminDocs array to remove the document with the specific key
      setAdminDocs(adminDocs.filter((doc) => doc.key !== docKey));
    }
  };
  

  const AdminView = () => {
    return (
    <>
        {/* Upload Section */}
      <div className='shadow-md rounded-lg p-2 my-2'>
      <label
                style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}
              >
                Upload Contract:
              </label>
              <div className="flex">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  style={{
                    display: 'inline',
                    cursor: 'pointer',
                  }}
                />
                <ClipLoader color={"#483EFF"} loading={loader} size={30} />
              </div>
      </div>

      {/* List of Uploaded Documents */}
      <div className='shadow-md rounded-lg p-2 my-2'>
        <h3 className='font-bold'>Admin Documents:</h3>
        {adminDocs.length === 0 && <span className=''>You have not uploaded any document yet:</span>}
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {adminDocs.map((doc, index) => (
                  <li
                    key={index}
                    style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}
                  >
                    <span className="w-[200px] inline-block overflow-hidden whitespace-nowrap text-ellipsis">
                      {doc.name}
                    </span>
                    <button
                      onClick={() => {
                        handleView();
                        setModalDoc(doc);
                      }}
                      className="ml-2 px-0.5 py-0.5 cursor-pointer bg-blue-500 text-white rounded"
                    >
                      👁️
                    </button>
                    <button
                      onClick={() => handleDelete(doc.key)}
                      style={{
                        marginLeft: '10px',
                        padding: '2px 8px',
                        cursor: 'pointer',
                        backgroundColor: '#ff4d4d',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                      }}
                    >
                      &times;
                    </button>
                  </li>
                ))}
        </ul>
      </div>

      <div className='shadow-md rounded-lg p-2 my-2 flex flex-col'>
        <h3 className='font-bold'>Deadline Dates:</h3>
        <div className='grid md:grid-cols-1 lg:grid-cols-2 gap-2'>
            <FormInput
              label='Select data upload deadline'
              value={dataUploadDeadline}
              type='date'
              min = {new Date().toISOString().split('T')[0]}
              onChange={(e) => {
                const newDataUploadDeadline = e;
                setDataUploadDeadline(newDataUploadDeadline);
            
                // Check and update the result upload deadline
                if (new Date(resultUploadDeadline) <= new Date(newDataUploadDeadline)) {
                  const nextDay = new Date(newDataUploadDeadline);
                  nextDay.setDate(nextDay.getDate() + 3); // Move 1 day forward
                  setResultUploadDeadline(nextDay.toISOString().split('T')[0]);
                }
              }}
            />
            <FormInput
              label='Select result upload deadline'
              value={resultUploadDeadline}
              type='date'
              min = {dataUploadDeadline}
              onChange={e => setResultUploadDeadline(e)}
            />
        </div>
      </div>
      
      
      {hasAdminSubmittedContract && <div>
        <div className="p-2 my-2 text-start text-black pt-2 bg-gray-800 rounded-lg shadow-md">
          <h3 className='font-bold'>Note: You&apos;ve done your part</h3>
          <p className="">Now, we’re waiting for the client to upload the contract and data. Please be patient.</p>
          <Link href="/admin/dashboard" className="mb-4 mt-2 inline-block  text-blue-400 hover:underline cursor-pointer">
                {'<<'}  Redirect to dashboard
          </Link>
        </div>
        
      </div>}
    </>
    )
  }

  const AdminViewLoggedOut = () => {
    return (
        <>
            {/* Upload Section */}
            <div className='shadow-md rounded-lg p-2 my-2'>
        <h3 className='font-bold'>Admin Contract:</h3>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {adminDocs.length === 0 && 
          <div>Looks Like admin has not uploaded any document yet</div>
        }
        {adminDocs.map((doc, index) => (
                  <li
                    key={index}
                    style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}
                  >
                    <span className="w-[200px] inline-block overflow-hidden whitespace-nowrap text-ellipsis">
                      {doc.name}
                    </span>
                    <button
                      onClick={() => {
                        handleView();
                        setModalDoc(doc);
                      }}
                      className="ml-2 px-0.5 py-0.5 cursor-pointer bg-blue-500 text-white rounded"
                    >
                      👁️
                    </button>
                  </li>
                ))}
        </ul>
      </div>

      <div className='shadow-md rounded-lg p-2 my-2 flex flex-col'>
        <h3 className='font-bold'>Deadline Dates:</h3>
        {dataUploadDeadline && resultUploadDeadline ? <div className='grid md:grid-cols-1 lg:grid-cols-2 gap-2'>
            <FormInput
              label='Data upload deadline'
              value={dataUploadDeadline}
              type='date'
              disabled={true}
              min = {new Date().toISOString().split('T')[0]}
              onChange={(e) => {
                const newDataUploadDeadline = e;
                setDataUploadDeadline(newDataUploadDeadline);
            
                // Check and update the result upload deadline
                if (new Date(resultUploadDeadline) <= new Date(newDataUploadDeadline)) {
                  const nextDay = new Date(newDataUploadDeadline);
                  nextDay.setDate(nextDay.getDate() + 3); // Move 1 day forward
                  setResultUploadDeadline(nextDay.toISOString().split('T')[0]);
                }
              }}
            />
            <FormInput
              label='Result upload deadline'
              value={resultUploadDeadline}
              type='date'
              disabled={true}
              min = {dataUploadDeadline}
              onChange={e => setResultUploadDeadline(e)}
            />
        
        </div> : <div>Looks Like admin has not uploaded deadlines yet</div>
        }
      </div>

        </>
        )
  }

  

  const ClientView = () => {
    return (
      <>
        {adminDocs.length === 0 ? (
          <div className='shadow-md my-2 p-2'>
            <label
              style={{ display: 'block', marginBottom: '0px', fontWeight: 'bold' }}
            >
              Client Contract:
            </label>
            <div>{IsAdminLoggedIn ? 'User' : 'You'} can not upload contract until admin uploads a contract</div>
            <div
              className="my-4 cursor-pointer hover:underline hover:text-blue-500"
              onClick={() => 
                IsAdminLoggedIn ? router.push('/admin/dashboard') : router.push('/user/dashboard')}
            >
              {'<<'} Redirect to Dashboard
            </div>
          </div>
        ) : (
          IsAdminLoggedIn && clientDocs.length === 0 ? <span>Please wait until client uploads their contract</span> :
          <div>
            <div className='shadow-md p-2 my-2 rounded-lg'>
              <label
                style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}
              >
                Upload Contract:
              </label>
              <div className="flex">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  style={{
                    display: 'inline',
                    cursor: 'pointer',
                  }}
                />
                <ClipLoader color={"#483EFF"} loading={loader} size={30} />
              </div>
            </div>
  
            <div className='shadow-md p-2 my-2 rounded-lg'>
              {clientDocs.length > 0 && <h3 className='font-bold'>Client Documents</h3>}
              <ul className="mt-1" style={{ listStyleType: 'none', paddingLeft: 0 }}>
                {clientDocs.map((doc, index) => (
                  <li
                    key={index}
                    style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}
                  >
                    <span className="w-[200px] inline-block overflow-hidden whitespace-nowrap text-ellipsis">
                      {doc.name}
                    </span>
                    <button
                      onClick={() => {
                        handleView();
                        setModalDoc(doc);
                      }}
                      className="ml-2 px-0.5 py-0.5 cursor-pointer bg-blue-500 text-white rounded"
                    >
                      👁️
                    </button>
                    <button
                      onClick={() => handleDelete(doc.key)}
                      style={{
                        marginLeft: '10px',
                        padding: '2px 8px',
                        cursor: 'pointer',
                        backgroundColor: '#ff4d4d',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                      }}
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <span className="pt-4">Note: Please upload image or pdf file</span>
          </div> 
        )}
      </>
    );
  };
  

  

  return (
    <Card>
        <Card.Title>Contract Management</Card.Title>
      <Card.Description>
        Please upload your contract
      </Card.Description>
    <div>
      {/* Tabs for Client and Admin Documents */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab("client")}
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            backgroundColor: activeTab === "client" ? '#007bff' : '#f0f0f0',
            color: activeTab === "client" ? '#fff' : '#000',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Client Documents
        </button>
        <button
          onClick={() => setActiveTab("admin")}
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            backgroundColor: activeTab === "admin" ? '#007bff' : '#f0f0f0',
            color: activeTab === "admin" ? '#fff' : '#000',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Admin Documents
        </button>
        
      </div>
       
       {IsAdminLoggedIn ? activeTab === "admin" ?<AdminView/> : <ClientView/> 
       : activeTab === "admin" ?<AdminViewLoggedOut/> : <ClientView/> }
        <ViewContentModal isModalOpen={isModalOpen} closeModal={closeModal} doc={modalDoc}/>
    </div>
    </Card>
  );
};

export default DocumentUpload;



      
    
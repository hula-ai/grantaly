import ViewContentModal from '@/components/Navbar/ViewContentModal';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';


interface File { 
    name: string;
    key: string;
    url: string;
}

const DocumentUpload = () => {
  const [activeTab, setActiveTab] = useState("client"); // "client" or "admin"
  const [clientDocs, setClientDocs] = useState<File[]|null>([]);
  const [adminDocs, setAdminDocs] = useState<File[]|null>([]);

  const [modalDoc, setModalDoc] = useState<File|null>(null);


  const [isModalOpen, setIsModalOpen] = useState(false);

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
          // Create a new FormData object to send the file to the backend
          const formData = new FormData();
          formData.append('file', file);  // Attach the file to the form data
    
          // Send the file to your backend endpoint (this could be an endpoint where you handle the S3 upload)
          const response = await axios.post('/api/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',  // Important to set the content-type for file upload
            },
          });

          activeTab ? setAdminDocs(response.data) : setClientDocs(response.data)
     
          // Handle the response (e.g., save the S3 URL or file key in your state/database)
          console.log('File uploaded successfully:', response.data);
        } catch (error) {
          console.error('Error uploading file:', error);
          toast.error('Error in uploading File')
        }
      }
  };

  const handleDelete = (docName) => {
    if (activeTab === "client") {
      setClientDocs(clientDocs.filter((doc) => doc !== docName));
    } else {
      setAdminDocs(adminDocs.filter((doc) => doc !== docName));
    }
  };

  const AdminView = () => {
    return (
    <>
        {/* Upload Section */}
      <div>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
          Upload Contract:
        </label>
        <input
          type="file"
          onChange={handleFileUpload}
          style={{
            display: 'block',
            marginBottom: '20px',
            padding: '5px',
            cursor: 'pointer'
          }}
        />
      </div>

      {/* List of Uploaded Documents */}
      <div>
        <h3>{activeTab === "client" ? "Client Documents" : "Admin Documents"}</h3>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          {adminDocs.map((doc, index) => (
            <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <span>{doc.name}</span>
              <button
                onClick={() => handleDelete(doc.key)}
                style={{
                  marginLeft: '10px',
                  padding: '2px 8px',
                  cursor: 'pointer',
                  backgroundColor: '#ff4d4d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px'
                }}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
    )
  }

  const AdminViewLoggedOut = () => {
    return (
        <>
            {/* Upload Section */}
          <div>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
               Admin Contract:
            </label>
          </div>
    
          {/* List of Uploaded Documents */}
          <div>
            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
              {adminDocs.length === 0 && 
                <div>Looks Like admin has not uploaded any document yet</div>
              }
              {adminDocs.map((doc, index) => (
                <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <span>{doc.name}</span>
                  <button
                    onClick={() => handleDelete(doc.key)}
                    style={{
                      marginLeft: '10px',
                      padding: '2px 8px',
                      cursor: 'pointer',
                      backgroundColor: '#ff4d4d',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px'
                    }}
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
        )
  }

  const ClientView = () => {
    return (
        <>
            {/* Upload Section */}
          <div>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
              Upload Contract:
            </label>
            <input
              type="file"
              onChange={handleFileUpload}
              style={{
                display: 'block',
                marginBottom: '20px',
                padding: '5px',
                cursor: 'pointer'
              }}
            />
          </div>
    
          {/* List of Uploaded Documents */}
          <div>
            {clientDocs.length>0 &&<h3>Client Documents</h3>}
            <ul className='mt-2' style={{ listStyleType: 'none', paddingLeft: 0 }}>
              {clientDocs.map((doc, index) => (
                <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
                  <span className="w-[200px] inline-block overflow-hidden whitespace-nowrap text-ellipsis">{doc}</span>
                  <button
                    onClick={() => handleDelete(doc.key)}
                    style={{
                      marginLeft: '10px',
                      padding: '2px 8px',
                      cursor: 'pointer',
                      backgroundColor: '#ff4d4d',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px'
                    }}
                  >
                    &times;
                  </button>
                    <button
                        onClick={()=>{handleView(); setModalDoc(doc)}}
                        className="ml-2 px-0.5 py-0.5 cursor-pointer bg-blue-500 text-white rounded"
                    >
                        👁️
                    </button>
                </li>
              ))}
            </ul>
          </div>
        </>
        )
  }

  const IsAdminLoggedIn = false;

  return (
    <div style={{ padding: '20px' }}>
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
       
       {IsAdminLoggedIn ? activeTab === "admin" ?<AdminView/> : <ClientView/> : activeTab === "admin" ?<AdminViewLoggedOut/> : <ClientView/> }
        
        <ViewContentModal isModalOpen={isModalOpen} closeModal={closeModal} doc={modalDoc}/>

      
    </div>
  );
};

export default DocumentUpload;

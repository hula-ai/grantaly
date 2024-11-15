import { useState } from 'react';
import { Card } from '../multi-step/card/Card';
import styles from './FinishingUpCard.module.scss';
import { FormInput } from '../form/FormInput';
import { FormTextArea } from '../textarea/textarea';
import Link from 'next/link';

interface DataUploadLink {
    url: string;
    description: string;
}

interface Props {
    resultContent: DataUploadLink[];
    setResultContent: React.Dispatch<React.SetStateAction<DataUploadLink[]>>;
    isAdmin: boolean;
}

const ResultDelivery = ({ isAdmin,resultContent, setResultContent }: Props) => {

    const handleAddUrl = () => {
        setResultContent([...resultContent, { url: '', description: '' }]);
    };

    const handleRemoveUrl = (index: number) => {
        setResultContent(resultContent.filter((_, i) => i !== index));
    };

    const handleUrlChange = (index: number, value: string) => {
        const updatedData = [...resultContent];
        updatedData[index].url = value;
        setResultContent(updatedData);
    };

    const handleDescriptionChange = (index: number, value: string) => {
        const updatedData = [...resultContent];
        updatedData[index].description = value;
        setResultContent(updatedData);
    };

    return (
        <Card>
            <Card.Title>Result Upload</Card.Title>
            <Card.Description>
                Share your data securely through URLs (e.g., Google Drive, Dropbox).
            </Card.Description>

            {isAdmin ? 
            <>
            <div className={styles.cardContent}>
                <div className={styles.summary}>
                    <div className="flex flex-col gap-4">
                        {resultContent.map((item, index) => (
                            <div key={index} className='flex flex-col gap-2'>
                                <FormInput
                                    label={`Enter your URL ${index + 1}`}
                                    value={item.url}
                                    type="text"
                                    placeholder="Enter URL"
                                    onChange={(e) => handleUrlChange(index, e)}
                                    autoFocus
                                    remove={true}
                                    func={() => handleRemoveUrl(index)}
                                />
                                <FormTextArea
                                    label="Description"
                                    value={item.description}
                                    placeholder={`Enter description ${index + 1}`}
                                    onChange={(e) => handleDescriptionChange(index, e)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <button
                type="button"
                onClick={handleAddUrl}
                style={{
                    display: 'flex',
                    alignSelf: 'end',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    marginLeft: '16px',
                    borderRadius: '4px',
                }}
            >
                + Add URL
            </button>
            </> : 
            <>
                <div className={styles.cardContent}>
                <div className={styles.summary}>
                    <div className="flex flex-col gap-4">
                        {resultContent.map((item, index) => (
                            <div key={index} className="flex flex-col gap-2">
                            <span className='font-bold'>Result {index+1}</span>
                            <div className='flex gap-1'>
                                <span>Link: </span>
                                <Link
                                    href={item.url.startsWith("http") ? item.url : `https://${item.url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline cursor-pointer"
                                >
                                {item.url}
                                </Link>
                                
                            </div>
                            <div className='flex gap-1'>
                                <span>Description: </span>
                                <div>{item.description}</div>
                            </div>
                            
                          </div>
                        ))}
                    </div>
                </div>
            </div>
            </>}
        </Card>
    );
};

export default ResultDelivery;

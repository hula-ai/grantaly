import { useState } from 'react';
import { Card } from '../multi-step/card/Card';
import styles from './FinishingUpCard.module.scss';
import { FormInput } from '../form/FormInput';
import { FormTextArea } from '../textarea/textarea';

interface DataUploadLink {
    url: string;
    description: string;
}

interface Props {
    dataUploadContent: DataUploadLink[];
    setDataUploadContent: React.Dispatch<React.SetStateAction<DataUploadLink[]>>;
    hasClientSubmittedUploadUrl: boolean;
}

const DataUpload = ({ hasClientSubmittedUploadUrl,dataUploadContent, setDataUploadContent }: Props) => {

    const handleAddUrl = () => {
        setDataUploadContent([...dataUploadContent, { url: '', description: '' }]);
    };

    const handleRemoveUrl = (index: number) => {
        setDataUploadContent(dataUploadContent.filter((_, i) => i !== index));
    };

    const handleUrlChange = (index: number, value: string) => {
        const updatedData = [...dataUploadContent];
        updatedData[index].url = value;
        setDataUploadContent(updatedData);
    };

    const handleDescriptionChange = (index: number, value: string) => {
        const updatedData = [...dataUploadContent];
        updatedData[index].description = value;
        setDataUploadContent(updatedData);
    };

    return (
        <Card>
            <Card.Title>Data Upload</Card.Title>
            <Card.Description>
                Share your data securely through URLs (e.g., Google Drive, Dropbox).
            </Card.Description>

            <div className={styles.cardContent}>
                <div className={styles.summary}>
                    <div className="flex flex-col gap-4">
                        {dataUploadContent.map((item, index) => (
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
        </Card>
    );
};

export default DataUpload;

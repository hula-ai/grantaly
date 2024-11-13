import { useState } from 'react'
import { Plan, PlanAddon, planAddons, PriceType } from '../../../config'
import { Card } from '../multi-step/card/Card'
import styles from './FinishingUpCard.module.scss'
import { FormInput } from '../form/FormInput'

interface Props {
  urls: string[]
  setUrls: React.Dispatch<React.SetStateAction<string[]>>
}

const DataUpload = ({ urls, setUrls }: Props) => {


  const handleAddUrl = () => {
    setUrls([...urls, ''])
  }

  const handleRemoveUrl = (index: number) => {
    setUrls(urls.filter((_, i) => i !== index))
  }

  const handleUrlChange = (index: number, value: string) => {
    const updatedUrls = [...urls]
    updatedUrls[index] = value
    setUrls(updatedUrls)
  }

  return (
    <Card>
      <Card.Title>Data Upload</Card.Title>
      <Card.Description>
        Share your data securely through URLs (e.g., Google Drive, Dropbox).
      </Card.Description>
        
      <div className={styles.cardContent}>
        <div className={styles.summary}>
          <div className={"flex flex-col gap-4"}>
            {urls.map((url, index) => (
              <div key={index}>
                <FormInput
                  label={`Enter your Url ${index + 1}`}
                  value={url}
                  type="text"
                  placeholder=""
                  onChange={(e) => handleUrlChange(index,e)}
                  autoFocus
                  remove={true}
                  func={ () => handleRemoveUrl(index)}
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
            backgroundColor: '#007bff' ,
            color: '#fff',
            border: 'none',
            marginLeft: '16px',
            borderRadius: '4px',
          }}
        >
          + Add URL
        </button>
    </Card>
  )
}

export default DataUpload;

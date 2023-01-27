import React, { useRef } from 'react'

import styles from '../styles/invoiceItems.module.css'

const InvoiceItems = (props) => {
    const descriptionRef = useRef()
    const quantityRef = useRef()
    const rateRef = useRef()

    const handleItemChange = () => {
        const changedItem = {
            id: props.id,
            description: descriptionRef.current.value,
            quantity: quantityRef.current.value,
            rate: rateRef.current.value,
            price: parseInt(quantityRef.current.value) * parseFloat(rateRef.current.value)
        }

        props.onEditItem(changedItem)
    }

  return (
    <div className={styles.invoiceItem}>
        <div className={styles.description}>
            <label>Item</label>
            <input 
                ref={descriptionRef}
                type='text' 
                placeholder='Description of service or product...'
                onChange={handleItemChange}
            />
        </div>

        <div className={styles.quantity}>
            <label>Quantity</label>
            <input 
                ref={quantityRef}
                type='number' 
                defaultValue={1}
                onChange={handleItemChange}
            />
        </div>

        <div className={styles.rate}>
            <label>Rate</label>
                <input 
                    ref={rateRef}
                    type='number' 
                    defaultValue={0}
                    onChange={handleItemChange}
                />
        </div>
    </div>
    
  )
}

export default InvoiceItems

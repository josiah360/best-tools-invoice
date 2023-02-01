import React, { useState, useRef } from 'react'

import styles from '../styles/invoiceItems.module.css'

const InvoiceItems = (props) => {
    const [price, setPrice] = useState()

    const descriptionRef = useRef()
    const quantityRef = useRef()
    const rateRef = useRef()

    

    const handleItemChange = () => {
        const price = parseInt(quantityRef?.current?.value) * parseFloat(rateRef?.current?.value)
        setPrice(price)
        const changedItem = {
            id: props.id,
            description: descriptionRef.current.value,
            quantity: quantityRef.current.value,
            rate: rateRef.current.value,
            price: price
        }

        props.onEditItem(changedItem)
    }

  return (
    <div className={styles.invoiceItem}>
        <div className={`${styles.description} ${styles.wrapper}`}>
            <label>Item</label>
            <input 
                ref={descriptionRef}
                type='text' 
                placeholder='Description of service or product...'
                onChange={handleItemChange}
            />
        </div>

        <div className={`${styles.quantity} ${styles.wrapper}`}>
            <label>Quantity</label>
            <input 
                ref={quantityRef}
                type='number' 
                defaultValue={1}
                onChange={handleItemChange}
            />
        </div>

        <div className={`${styles.price} ${styles.wrapper}`}>
            <label>Price</label>
                <input 
                    ref={rateRef}
                    type='number' 
                    defaultValue={0}
                    onChange={handleItemChange}
                />
        </div>
        s
        <div className={`${styles.total} ${styles.wrapper}`}>
            <label>Total</label>
            <p>₦ {price?.toString()}</p>
        </div>
    </div>
    
  )
}

export default InvoiceItems

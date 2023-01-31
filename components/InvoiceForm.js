import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'

import styles from '../styles/invoiceForm.module.css'
import InvoiceItems from './InvoiceItems'

const InvoiceForm = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const [invoiceItems, setInvoiceItems] = useState([{
        id: Math.random().toString(),
        description: '',
        quantity: 1,
        rate: 0
    }])

    const nameRef = useRef()
    const addressRef = useRef()
    const dateRef = useRef()

    const handleAddItem = () => {
        const newInvoiceItems = [...invoiceItems, {
            id: Math.random().toString(),
            description: '',
            quantity: 1,
            rate: 0
        }]
        setInvoiceItems(newInvoiceItems)
    }

    const editInvoiceItem = (editedItem) => {
        const newItems = [...invoiceItems]
        const itemIndex = newItems.findIndex(item => item.id === editedItem.id)
        newItems[itemIndex] = editedItem
        setInvoiceItems(newItems)
    }

    const saveInvoice = async(e) => {
        e.preventDefault()

        const invoice = {
            recipientName: nameRef.current.value,
            recipientAddress: addressRef.current.value,
            createdAt: dateRef.current.value,
            items: invoiceItems,
            status:'pending'
        }

        try{
            setIsLoading(true)
            await fetch('/api/add-new', {
                method: 'POST',
                body: JSON.stringify(invoice),
                headers: {
                    'Content-Type': 'application/json'
                }
            }) 

            setIsLoading(false)
            router.push('/')
        } catch(err) {
            console.log(err)
        }
    }

  return (
    <form onSubmit={saveInvoice}>
        <div className={styles.customerInfo}>
            <label>Bill to</label>
            <input 
                ref={nameRef}
                type='text' 
                placeholder='Who is this invoice to? (required)'
            />
        </div>
        {/* {console.log(invoiceItems)} */}
        <div className={styles.customerInfo}>
            <label>Ship to</label>
            <input 
                ref={addressRef}
                type='text' 
                placeholder='Which address is this invoice to? (optional)'
            />
        </div>
        <div className={styles.date}>
            <label>Date</label>
            <input 
                ref={dateRef}
                type='date'
                placeholder='Which address is this invoice to? (optional)'
            />
        </div>
        <div className={styles.invoiceItems}>
            {invoiceItems.map((item, index) => 
                    <InvoiceItems 
                        key={item.id}
                        id={item.id}
                        index={index}
                        description={item.description}
                        quantity={item.quantity}
                        rate={item.rate}
                        onEditItem={editInvoiceItem}
                    />
                )}
            
            <div className={styles.addButtonWrapper}>
                <button 
                    type='button' 
                    className={styles.addItemButton}
                    onClick={handleAddItem}>Add Item</button>
            </div>
        </div>
        <button type='submit' className={styles.addItemButton}>{isLoading ? 'Saving Invoice...' : 'Save Invoice'}</button>
    </form>
  )
}

export default InvoiceForm

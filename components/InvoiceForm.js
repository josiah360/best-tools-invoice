import React, { useState, useRef, useContext } from 'react'
import { useRouter } from 'next/router'

import { Context } from '@/store/invoice-context'

import styles from '../styles/invoiceForm.module.css'
import InvoiceItems from './InvoiceItems'

const InvoiceForm = () => {
    const router = useRouter()
    const invoiceContext = useContext(Context)
    const [isLoading, setIsLoading] = useState(false)

    const nameRef = useRef()
    const addressRef = useRef()
    const dateRef = useRef()

    const saveInvoice = async(e) => {
        e.preventDefault()

        const invoice = {
            recipientName: nameRef.current.value,
            recipientAddress: addressRef.current.value,
            createdAt: dateRef.current.value,
            items: invoiceContext.invoiceItems,
            status:'pending',
            total: invoiceContext.invoiceItems.reduce((total, item) => {
                    return total + item.price
                }, 0)
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
            invoiceContext.setInvoice(invoice)
            setIsLoading(false)
            router.push(`/invoice/1`)
        } catch(err) {
            console.log(err)
        }
    }

  return (
    <form onSubmit={saveInvoice}>
        <div className={styles.customerInfo}>
            <label>Recipient Name</label>
            <input 
                ref={nameRef}
                type='text' 
                placeholder='Who is this invoice to? (required)'
            />
        </div>
        {/* {console.log(invoiceItems)} */}
        <div className={styles.customerInfo}>
            <label>Recipient Address</label>
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
            />
        </div>
        <div className={styles.invoiceItems}>
            <div>
                {invoiceContext.invoiceItems.map((item, index) => 
                    <InvoiceItems 
                        key={item.id}
                        id={item.id}
                        index={index}
                        description={item.description}
                        quantity={item.quantity}
                        rate={item.rate}
                        onEditItem={invoiceContext.editInvoiceItem}
                    />
                )}
            </div>
            
            <div className={styles.addButtonWrapper}>
                <button 
                    type='button' 
                    className={styles.addItemButton}
                    onClick={invoiceContext.handleAddItem}>Add Item</button>
            </div>
        </div>
        <div className={styles.saveButtonWrapper}>
          <button type='submit' className={styles.saveItemButton}>{isLoading ? 'Saving Invoice...' : 'Save Invoice'}</button>
        </div>
        
    </form>
  )
}

export default InvoiceForm

import React from 'react'

import InvoiceForm from '@/components/InvoiceForm'
import styles from '../../styles/createInvoice.module.css'

const index = () => {
  return (
    <div className= {styles.mainWrapper}>
      <div className={styles.formWrapper}>
        <h1>INVOICE</h1>
        <InvoiceForm />
      </div>
    </div>
  )
}

export default index

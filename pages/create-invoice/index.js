import React from 'react'

import InvoiceForm from '@/components/InvoiceForm'
import styles from '../../styles/createInvoice.module.css'

import Header from '@/components/Header/Header'

const index = () => {
  return (
    <div className= {styles.mainWrapper}>
      <Header makeInvoice />
      <div className={styles.formWrapper}>
        <h1>INVOICE</h1>
        <InvoiceForm />
      </div>
    </div>
  )
}

export default index

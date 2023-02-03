import React, { useContext, useState, useEffect} from "react";
import { useRouter } from "next/router";

import { Context } from "@/store/invoice-context";

import InvoiceHeader from "@/components/invoice/InvoiceHeader";

import Header from "@/components/Header/Header";

import styles from '../../styles/Invoice.module.css'

import { isEmpty } from "@/util/helpers";

const InvoiceDetails = (props) => {
    const router = useRouter()

    const { invoice } = props
    const [invoiceItem, setInvoiceItem] = useState(invoice)
    const invoiceCtx = useContext(Context)

    if(router.isFallback) {
        return <h1>Page Not Found</h1>
    }

    useEffect(() => {
        if(isEmpty(invoice)) {
            setInvoiceItem(invoiceCtx.invoice) 
        }
    }, [])

    return (
        <div className= {styles.mainWrapper}>
            <Header invoiceDetails />
            <div className={styles.invoiceWrapper}>
                <InvoiceHeader />

                <div className={styles.invoiceBody}>
                    <div className={styles.invoiceDetails}>
                        <div className={styles.customerInfo}>
                            <h4>INVOICE TO:</h4>
                            <p>{ invoiceItem?.recipientName }</p>
                            <p>{ invoiceItem?.recipientAddress }</p>
                        </div>
                        <div className={styles.otherInfo}>
                            <p><span>Invoice No:</span> <span>{invoiceItem.id == null ? 1234 : invoiceItem?.id.slice(0, 6) }</span></p>
                            <p><span>Date:</span> <span>{ invoiceItem?.createdAt }</span></p>
                        </div>
                    </div>

                    <div className={styles.itemsList}>
                        <div className={styles.listHeader}>
                            <h4>SL</h4>
                            <h4 className={styles.description}>ITEM DESCRIPTION</h4>
                            <h4>PRICE</h4>
                            <h4>QTY</h4>
                            <h4>TOTAL</h4>
                        </div>
                        <div className={styles.listWrapper}>
                            {invoiceItem?.items?.map((item, index) => {
                                return (
                                <div className={styles.item}>
                                    <p>{index + 1}</p>
                                    <p className={styles.description}>{item?.description}</p>
                                    <p>{item?.rate}</p>
                                    <p className={styles.itemQuantity}>{item?.quantity}</p>
                                    <p>{item?.price}</p>
                                </div>
                               
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div className={styles.footerInfo}>
                    <div className={styles.bankInfo}>
                        <h4>Payment Info:</h4>
                        <p>ACCESS BANK</p>
                        <p><span>ACCT NO:</span>0764402447</p>
                        <p><span>TIN:</span>20571576-0001</p>
                    </div>

                    <div className={styles.amount}>
                        <p><span>SUB TOTAL:</span><span>{ invoiceItem?.total }</span></p>
                        <p><span>TAX:</span> <span>0.00%</span></p>
                        <p className={styles.total}><span>TOTAL</span> <span>₦{ invoiceItem?.total }</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvoiceDetails


// getStaticProps and getStaticPaths

export const getStaticProps = async (context) => {
    const invoiceId = context.params.id
    const response = await fetch(`http://localhost:3000/api/invoice/${invoiceId}`)
    const invoice = await response.json()
  
    return {
      props: {
        invoice: invoice.invoice || { }
      },
      revalidate: 10,
    }
}

export async function getStaticPaths() {
    const response = await fetch('http://localhost:3000/api/invoices')
    const result = await response.json()
  
    const paths = result.invoices.map((invoice) => ({
      params: { id: invoice._id },
    })) 

    console.log(paths)

    paths.push({
        params: { id: '1' },
      })

    return { 
        paths, 
        fallback: true 
    }
  }
  
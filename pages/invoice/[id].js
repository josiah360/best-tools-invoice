import React, { useContext, useState, useEffect} from "react";

import { useRouter } from "next/router";

import InvoiceHeader from "@/components/invoice/InvoiceHeader";

import Header from "@/components/Header/Header";

import styles from '../../styles/Invoice.module.css'

import getInvoice from "@/util/getInvoce";

import getAllInvoices from "@/util/getAllInvoices";

import DetailPageItem from "@/components/detailPageItem";

export const getStaticProps = async (context) => {
    const invoiceId = context.params.id.trim()

    const response = await getInvoice(invoiceId)

    const invoice = JSON.parse(JSON.stringify(response))
  
    return {
      props: {
        invoice: invoice || { }
      },
    //   revalidate: 10,
    }
}

export async function getStaticPaths() {

    const response = await getAllInvoices()
    const invoices = JSON.parse(JSON.stringify(response))

    const paths = invoices.map((invoice) => ({
        params: { id: invoice._id },
      })) 

    return { 
        paths, 
        fallback: true 
    }
  }

const InvoiceDetails = (props) => {
    const router = useRouter()

    const { invoice: invoiceItem } = props

    if(router.isFallback) {
        return <h1>Page Not Found</h1>
    }

    return (
        <div className= {styles.mainWrapper}>
            <Header invoiceDetails invoice={invoiceItem} />
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
                            <p><span>Invoice No:</span> <span>{ invoiceItem?._id.slice(0, 6) }</span></p>
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
                                    <DetailPageItem 
                                        key={item.id}
                                        index={index}
                                        item={item}
                                    />
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
                        <p><span>SUB TOTAL:</span><span>{ invoiceItem?.total?.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }) }</span></p>
                        <p><span>TAX:</span> <span>0.00%</span></p>
                        <p className={styles.total}><span>TOTAL</span> <span>{ invoiceItem?.total?.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }) }</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvoiceDetails


// getStaticProps and getStaticPaths


  
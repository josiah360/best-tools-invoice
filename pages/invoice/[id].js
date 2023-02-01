import React, { useContext } from "react";
import { useRouter } from "next/router";

import { Context } from "@/store/invoice-context";

import InvoiceHeader from "@/components/invoice/InvoiceHeader";

import styles from '../../styles/Invoice.module.css'

const Invoice = () => {
    const router = useRouter()
    const invoiceCtx = useContext(Context)

    return (
        <div className= {styles.mainWrapper}>
            <div className={styles.invoiceWrapper}>
                <InvoiceHeader />

                <div className={styles.invoiceBody}>
                    <div className={styles.invoiceDetails}>
                        <div className={styles.customerInfo}>
                            <h4>INVOICE TO:</h4>
                            <p>{ invoiceCtx?.recipientName }</p>
                            <p>{ invoiceCtx?.recipientAddress }</p>
                        </div>
                        <div className={styles.otherInfo}>
                            <p><span>Invoice No:</span> <span>01245</span></p>
                            <p><span>Date:</span> <span>{ invoiceCtx?.createdAt }</span></p>
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
                            {invoiceCtx?.invoiceItems?.map((item, index) => {
                                return (
                                <div className={styles.item}>
                                    <p>{index + 1}</p>
                                    <p className={styles.description}>{item?.description}</p>
                                    <p>{item?.rate}</p>
                                    <p>{item?.quantity}</p>
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
                        <p><span>SUB TOTAL:</span><span>₦2000</span></p>
                        <p><span>TAX:</span> <span>0.00%</span></p>
                        <p className={styles.total}><span>TOTAL</span> <span>₦2180058864</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Invoice
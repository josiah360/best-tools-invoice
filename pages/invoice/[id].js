import React from "react";
import { useRouter } from "next/router";

import InvoiceHeader from "@/components/invoice/InvoiceHeader";

import styles from '../../styles/Invoice.module.css'

const Invoice = () => {
    const router = useRouter()

    return (
        <div className= {styles.mainWrapper}>
            <div className={styles.invoiceWrapper}>
                <InvoiceHeader />

                <div className={styles.invoiceBody}>
                    <div className={styles.invoiceDetails}>
                        <div className={styles.customerInfo}>
                            <h4>INVOICE TO:</h4>
                            <p>OLAJIDE AJIBOLA</p>
                            <p>48, Kadara Street, Ebute Metta, Lagos</p>
                        </div>
                        <div className={styles.otherInfo}>
                            <p><span>Invoice No:</span> <span>01245</span></p>
                            <p><span>Date:</span> <span>25/02/2023</span></p>
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
                            <div className={styles.item}>
                                <p>1</p>
                                <p className={styles.description}>30 Pices of Nike Shoes</p>
                                <p>3000</p>
                                <p>2</p>
                                <p>6000</p>
                            </div>
                            <div className={styles.item}>
                                <p>1</p>
                                <p className={styles.description}>30 Pices of Nike Shoes</p>
                                <p>3000</p>
                                <p>2</p>
                                <p>6000</p>
                            </div>
                            <div className={styles.item}>
                                <p>1</p>
                                <p className={styles.description}>30 Pices of Nike Shoes</p>
                                <p>3000</p>
                                <p>2</p>
                                <p>6000</p>
                            </div>
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
import Link from 'next/link'

import styles from '../../styles/homePageInvoice.module.css'


const HomePageInvoice = (props) => {

    const { item: invoice } = props

    return (
        <Link href={`/invoice/${invoice._id}`}>
            <div className={styles.invoiceItem}>
                <div className={styles.left}>
                <p>{invoice._id.slice(0, 6)}</p>
                <h3>{invoice.recipientName}</h3>
                </div>
                <div className={styles.right}>
                <p className={styles.status}>{invoice?.status}</p>
                <h3>{invoice?.total?.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</h3>
                </div>
            </div>
        </Link>
    )
          
    
}

export default HomePageInvoice
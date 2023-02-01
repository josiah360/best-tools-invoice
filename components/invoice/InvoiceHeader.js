import styles from '../../styles/InvoiceHeader.module.css'

const InvoiceHeader = () => {
    return (
        <div className={styles.headerWrapper}>
            <h1>
            <div>
                <span>BEST </span>  
                <span>TOOLS</span>
            </div>
            <div className={styles.textWrapper}>
                <span>INVOICE</span>  
            </div>
            </h1>
        </div>
    )
}

export default InvoiceHeader
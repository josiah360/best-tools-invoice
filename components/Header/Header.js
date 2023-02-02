import { useRouter } from 'next/router'

import styles from '../../styles/Header.module.css'

const Header = (props) => {
    const router = useRouter()
    const { home, invoiceDetails, createInvoice, makeInvoice } = props

    const backToHome = () => {
        router.push('/')
    }

 return (
    <header className={styles.header}>
        {home && <button onClick={createInvoice}>Create Invoice</button>}
        {invoiceDetails && <button onClick={backToHome}>Back</button> || 
         makeInvoice && <button onClick={backToHome}>Back</button>}
        {invoiceDetails && <button>Download Invoice</button>}
        {invoiceDetails && <button>Delete Invoice</button>}
    </header>
 )
}

export default Header
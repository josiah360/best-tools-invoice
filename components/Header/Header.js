import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import styles from '../../styles/Header.module.css'

const Header = (props) => {
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()
    const { home, invoiceDetails, createInvoice, makeInvoice } = props

    const backToHome = () => {
        router.push('/')
    }

    const handleDownloadPDF = async() => {
        setIsLoading(true)
        const response = await fetch('/api/download-invoice', {
            method: 'POST',
            body: JSON.stringify(props.invoice),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const pdf = await response.blob();
        const url = URL.createObjectURL(pdf);
      
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
      
        URL.revokeObjectURL(url);
        setIsLoading(false)
    }

 return (
    <header className={styles.header}>
        {home && <button onClick={createInvoice}>Create Invoice</button>}
        {invoiceDetails && <button onClick={backToHome}>Back</button> || 
         makeInvoice && <button onClick={backToHome}>Back</button>}
        {invoiceDetails && <button onClick={handleDownloadPDF}>{isLoading ? 'Downloading...' : 'Download Invoice'}</button>}
        {invoiceDetails && <button>Delete Invoice</button>}
    </header>
 )
}

export default Header
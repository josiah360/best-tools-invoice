import Link from 'next/link'

import styles from '../styles/Home.module.css'

export const getStaticProps = async () => {
  const response = await fetch('http://localhost:3000/api/invoices')
  const invoices = await response.json()

  return {
    props: invoices || [],
    revalidate: 10,
  }
}

export default function Home(props) {

  const { invoices } = props

  let content;

  if(invoices.length === 0) {
    content = <div className={styles.emptyPage}>
      <h2>You haven't created any invoice yet. Click to create</h2>
      <button type='buton' className={styles.createButton}>Create Invoice</button>
    </div>
  } else {
    content = invoices.reverse().map(invoice => {
      return (
        <Link href={`/invoice/${invoice._id}`}>
          <div className={styles.invoiceItem}>
            <div className={styles.left}>
              <p>{invoice._id.slice(0, 6)}</p>
              <h3>{invoice.recipientName}</h3>
            </div>
            <div>
              <p>{invoice.status}</p>
              <h3>{invoice.total}</h3>
            </div>
          </div>
        </Link>
      )
    })
  }


  return (
    <>
        <div className={styles.mainWrapper}>
          
            <div className={styles.invoiceList}>
              <form className={styles.searchForm} >
                <input type='search' placeholder={`Seach for invoice using recipient's name`} />
                <button type='submit'>Search</button>
              </form>
             { content }
              
            </div>
        </div>
    </>
  )
}

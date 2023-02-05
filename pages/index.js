import { useRouter } from 'next/router'

import mongoConnect from "@/util/database"
import Invoice from "@/models/invoice"

import Link from 'next/link'

import styles from '../styles/Home.module.css'

import Header from '@/components/Header/Header'

export const getStaticProps = async () => {
  const response = await fetch('http://localhost:3000/api/invoices')
  const invoices = await response.json()
  // await mongoConnect()
  // const invoices = await Invoice.fetchAll()

  // console.log('static', invoices)

  return {
    props: invoices || [],
    revalidate: 10,
  }
}

export default function Home(props) {

  const { invoices } = props

  const router = useRouter()

  const goToCreateInvoice = () => {
    router.push('/create-invoice')
  }

  let content;

  if(invoices.length === 0) {
    content = <div className={styles.emptyPage}>
      <h2>You haven't created any invoice yet. Click to create</h2>
      <button type='buton' className={styles.createButton} onClick={goToCreateInvoice}>Create Invoice</button>
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
            <div className={styles.right}>
              <p>{invoice?.status}</p>
              <h3>{invoice?.total?.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</h3>
            </div>
          </div>
        </Link>
      )
    })
  }


  return (
    <>
        <div className={styles.mainWrapper}>
            <Header home createInvoice={goToCreateInvoice}/>
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

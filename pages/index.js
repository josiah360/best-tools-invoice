import { useRef, useState } from 'react'

import { useRouter } from 'next/router'

import getAllInvoices from '@/util/getAllInvoices'

import styles from '../styles/Home.module.css'

import Header from '@/components/Header/Header'

import HomePageInvoice from '@/components/invoice/homePageInvoice'

export const getStaticProps = async () => {
  // const response = await fetch('http://localhost:3000/api/invoices')
  // const invoices = await response.json()

  const response = await getAllInvoices()
  const invoices = JSON.parse(JSON.stringify(response))

  return {
    props: {
      propsInvoices: invoices || [] 
    },
    revalidate: 10
  }
}

export default function Home(props) {

  const searchInputRef = useRef()

  const { propsInvoices } = props

  const [invoices, setInvoices] = useState(propsInvoices)

  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const goToCreateInvoice = () => {
    router.push('/create-invoice')
  }

  const handleSearchForInvoice = async(e) => {
    e.preventDefault()

    const searchTerm = searchInputRef.current.value
    setIsLoading(true)
    try {
      const response = await fetch(`/api/search/${searchTerm}`)
      const invoices = await response.json()
      setInvoices(invoices.invoices)
    } catch(err) {
      console.log(err)
    }
   setIsLoading(false)
  }

  let content;

  if(invoices.length === 0) {
    content = <div className={styles.emptyPage}>
      <h2>No invoice found. Click to create invoice</h2>
      <button type='buton' className={styles.createButton} onClick={goToCreateInvoice}>Create Invoice</button>
    </div>
  } else {
    content = invoices.reverse().map(invoice => {
      return <HomePageInvoice
            key={invoice._id}
            item={invoice}
        />
      
    })
  }


  return (
    <>
        <div className={styles.mainWrapper}>
            <Header home createInvoice={goToCreateInvoice}/>
            <div className={styles.invoiceList}>
              <form className={styles.searchForm} onSubmit={handleSearchForInvoice}>
                <input ref={searchInputRef} type='search' placeholder={`Seach for invoice using recipient's name`} />
                <button type='submit'>{isLoading ? 'Searching...' : 'Search'}</button>
              </form>
             { content }
              
            </div>
        </div>
    </>
  )
}

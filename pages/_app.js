import '@/styles/globals.css'

import { Provider } from '@/store/invoice-context'

export default function App({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
  
}

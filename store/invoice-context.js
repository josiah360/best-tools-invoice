import React, {useState} from "react";

export const Context = React.createContext({
    invoiceItems: [],
    invoice: {},
    handleAddItem: () => {},
    editInvoiceItem: (item) => {},
    setInvoice: (item) => {}
})



export const Provider = (props) => {

    const [invoiceItems, setInvoiceItems] = useState([{
        id: Math.random().toString(),
        description: '',
        quantity: 1,
        rate: 0
    }])
    
    const [invoice, setInvoice] = useState({})
    
    
    const handleAddItem = () => {
        const newInvoiceItems = [...invoiceItems, {
            id: Math.random().toString(),
            description: '',
            quantity: 1,
            rate: 0
        }]
        setInvoiceItems(newInvoiceItems)
    }
    
    const editInvoiceItem = (editedItem) => {
        const newItems = [...invoiceItems]
        const itemIndex = newItems.findIndex(item => item.id === editedItem.id)
        newItems[itemIndex] = editedItem
        setInvoiceItems(newItems)
    }
    

    return (
        <Context.Provider value = {{
            invoiceItems,
            invoice,
            handleAddItem,
            editInvoiceItem,
            setInvoice
        }}>

        {props.children}
        </Context.Provider>
    )
    
}


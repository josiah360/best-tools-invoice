const html = (invoiceItem) => {
    let html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                body {
                    font-family: 'Arial';
                    margin: 0;
                }

                .invoiceWrapper{
                    display: flex;
                    flex-direction: column;
                    width: 1000px;
                    background-color: rgb(241, 241, 241);
                    min-height: 100%;
              
                    overflow: hidden;
                }
        
                .headerWrapper h1 {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 3rem;
                    color: white;
                }
        
                .textWrapper span{
                    font-size: 2rem;
                    font-weight: 300;
                }
        
                .headerWrapper {
                    background-color: rgb(68, 116, 170);
                    padding: 2rem 3rem;
                }
        
                .invoiceBody {
                    padding: 2rem 3rem;
                    color: rgb(73, 73, 73);
                    margin-bottom: auto;
                }

                .customerInfo p {
                    font-size: 1.1rem
                }
        
                .invoiceDetails {
                    display: flex;
                    justify-content: space-between;
                }
        
                .otherInfo p span:first-of-type {
                    font-weight: 500;
                }

                .otherInfo p {
                    font-size: 1.1rem
                }
        
                .itemsList {
                    margin-top: 3rem;
                }
        
                .listHeader {
                    background-color: rgb(68, 116, 170);
                    color: white;
                }
        
                .listHeader,
                .item{
                    display: flex;
                    padding: 1rem;
                }

                .item p {
                    font-size: 1.1rem
                }
        
                .listHeader h4,
                .item p {
                    width: 15%;
                }
        
                .description {
                    width: 40% !important
                }
        
                .item:nth-child(odd) {
                    background-color: rgb(223, 223, 223);
                }
        
                .footerInfo {
                    display: flex;
                    padding: 2rem 3rem;
                    justify-content: space-between;
                    color: rgb(73, 73, 73);
                }
        
                .bankInfo {
                    width: 30%;
                    background-color: rgb(230, 230, 230);
                    padding: 1rem;
                }
        
                .bankInfo p {
                    display: flex;
                    justify-content: space-between;
                    font-size: 1.1rem
                }
        
                .bankInfo span{
                    font-weight: 600;
                }
        
                .amount {
                    width: 30%
                }
        
                .amount p {
                    display: flex;
                    justify-content: space-between;
                    font-size: 1.1rem
                }
        
                .amount p span:nth-child(1){
                    font-weight: 600;
                }
        
                .total {
                    background-color: rgb(199, 223, 255);
                    padding: .5rem;
                }
            </style>
        </head>
        <body>
            <div class="invoiceWrapper">
                <div class="headerWrapper">
                    <h1>
                        <div>
                            <span>BEST </span>  
                            <span>TOOLS</span>
                        </div>
                        <div class="textWrapper">
                            <span>INVOICE</span>  
                        </div>
                    </h1>
                </div>
        
                <div class="invoiceBody">
                    <div class='invoiceDetails'>
                        <div class='customerInfo'>
                            <h4>INVOICE TO:</h4>
                            <p>${invoiceItem?.recipientName.toUpperCase()}</p>
                            <p>${invoiceItem?.recipientAddress}</p>
                        </div>
                        <div class='otherInfo'>
                            <p><span>Invoice No:</span> <span>${invoiceItem?.id == null ? 1234 : invoiceItem?.id.slice(0, 6)}</span></p>
                            <p><span>Date:</span> <span>${invoiceItem?.createdAt}</span></p>
                        </div>
                    </div>
        
                    <div class='itemsList'>
                        <div class='listHeader'>
                            <h4>SL</h4>
                            <h4 class='description'>ITEM DESCRIPTION</h4>
                            <h4>PRICE</h4>
                            <h4>QTY</h4>
                            <h4>TOTAL</h4>
                        </div>
        
                        <div class='listWrapper'>`

                        invoiceItem?.items?.forEach((item, index) => {
                
                        html +=   ` <div class='item'>
                                <p>${index + 1}</p>
                                <p class='description'>${item?.description}</p>
                                <p>${parseFloat(item?.rate).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</p>
                                <p class='itemQuantity'>${item?.quantity}</p>
                                <p>${item?.price.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</p>
                            </div>`
                            
                            
                        })

            html += `</div>
                    </div>
                </div>
                <div class='footerInfo'>
                    <div class='bankInfo'>
                        <h4>Payment Info:</h4>
                        <p>ACCESS BANK</p>
                        <p><span>ACCOUNT NO:</span>0764402447</p>
                        <p><span>TIN:</span>20571576-0001</p>
                    </div>
        
                    <div class='amount'>
                        <p><span>SUB TOTAL:</span><span>${invoiceItem?.total.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</span></p>
                        <p><span>TAX:</span> <span>0.00%</span></p>
                        <p class='total'><span>TOTAL</span> <span>${invoiceItem?.total.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</span></p>
                    </div>
                </div>
            </div>
        </body>
        </html>`;

    return html
}

export default html
import styles from '../styles/DetailPageItem.module.css'

const DetailPageItem = (props) => {

    const { item, index } = props

    return (
        <div className={styles.item}>
            <p>{index + 1}</p>
            <p className={styles.description}>{item?.description}</p>
            <p>{parseFloat(item?.rate)?.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</p>
            <p className={styles.itemQuantity}>{item?.quantity}</p>
            <p>{item?.price?.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</p>
        </div>
    )
}

export default DetailPageItem
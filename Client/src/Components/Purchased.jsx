import { useLocation } from 'react-router-dom';
import styles from './Purchased.module.css';

// Page for a successful purchase
function Purchased() {
    const location = useLocation();
    const { orderId, totalPrice } = location.state || {};

    return (
        <div className={styles.container}>
            <h1>Order Complete</h1>
            <p>Your order has been placed successfully!</p>
            <p>Order ID: {orderId}</p>
            <p>Total Price: ${totalPrice}</p>

        </div>
    );
}

export default Purchased;

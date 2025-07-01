import { useContext } from 'react';
import { CartContext } from '../context/CartProvider';
import Swal from 'sweetalert2';

const Cart = () => {
    const { cart, removeItem, clearCart } = useContext(CartContext);

    const total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handlePurchase = () => {
        Swal.fire(
            '¡Gracias por tu compra!',
            'Tu pedido ha sido realizado con éxito.',
            'success'
        ).then(() => {
            clearCart();
        });
    };

    return (
        <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      width: '300px',
      maxHeight: '80vh',
      overflowY: 'auto',
      backgroundColor: '#fff0f5',
      border: '2px solid #ffc0cb',
      borderRadius: '15px',
      padding: '1rem',
      boxShadow: '0 4px 12px rgba(255, 105, 180, 0.3)',
      zIndex: 1000
    }}>
            <h3>🛒 Carrito de Compras</h3>
            <p>Items: {cart.itemCount}</p>
            <hr />
            {cart.items.length === 0 ? (
                <p>El carrito está vacío 😔</p>
            ) : (
                cart.items.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <div>
                            <p>{item.title}</p>
                            <p><small>Cantidad: {item.quantity} x ${item.price.toFixed(2)}</small></p>
                        </div>
                        <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>🗑️</button>
                    </div>
                ))
            )}
            {cart.items.length > 0 && (
                <>
                    <hr />
                    <p style={{ textAlign: 'right', fontWeight: 'bold' }}>Total: ${total.toFixed(2)}</p>
                    <button
            onClick={handlePurchase}
            style={{
              backgroundColor: '#ff69b4',
              color: 'white',
              border: 'none',
              padding: '10px',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%',
              marginTop: '1rem',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => { e.target.style.backgroundColor = '#ff1493' }}
            onMouseOut={(e) => { e.target.style.backgroundColor = '#ff69b4' }}
          >
                        Comprar
                    </button>
                    <button
            onClick={() => clearCart()}
            style={{
              backgroundColor: '#d87093',
              color: 'white',
              border: 'none',
              padding: '10px',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%',
              marginTop: '0.5rem',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => { e.target.style.backgroundColor = '#c76183' }}
            onMouseOut={(e) => { e.target.style.backgroundColor = '#d87093' }}
          >
                        Limpiar Carrito
                    </button>
                </>
            )}
        </div>
    );
};

export default Cart;
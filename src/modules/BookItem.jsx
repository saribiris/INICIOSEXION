import { useContext, useState, useMemo } from 'react';
import { CartContext } from '../context/CartProvider';
import Swal from 'sweetalert2';

const BookItem = ({ info }) => {
  const { addItem } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const imageUrl = info.cover || 'https://via.placeholder.com/200x300.png/dddddd/000000?text=No+Cover'

  const price = useMemo(() => Math.floor(Math.random() * (30 - 10 + 1)) + 10, []); // Random price between 10 and 30

  const handleAddToCart = () => {
    Swal.fire({
      title: '¿Añadir al carrito?',
      text: `${info.title}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, añadir!'
    }).then((result) => {
      if (result.isConfirmed) {
        addItem({ ...info, price, id: info.id, quantity });
        Swal.fire(
          '¡Añadido!',
          'El libro ha sido añadido a tu carrito.',
          'success'
        )
      }
    })
  };

  return (
    <div style={{ border: '2px solidrgb(57, 9, 17)', borderRadius: '15px', padding: '1rem', textAlign: 'center', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(255, 105, 180, 0.3)', width: '250px' }}>
      <img src={imageUrl} alt={info.title} style={{ width: "100%", height: "250px", objectFit: "cover", marginBottom: "0.5rem" }} />
      <h4>{info.title}</h4>
      <p><strong>Autor:</strong> {info.author || 'Desconocido'} ✍️</p>
        <p><strong>Año:</strong> {info.year || 'N/A'} 📅</p>
      <p><strong>💰 Precio:</strong> ${price.toFixed(2)}</p>
      <div>
        <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>➖</button>
        <span style={{ margin: '0 10px' }}>{quantity}</span>
        <button onClick={() => setQuantity(q => q + 1)}>➕</button>
      </div>
      <button
          onClick={handleAddToCart}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#ff69b4',
            color: 'white',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => { e.target.style.backgroundColor = '#ff1493' }}
          onMouseOut={(e) => { e.target.style.backgroundColor = '#ff69b4' }}
        >
        🛒 Añadir al carrito
      </button>
    </div>
  );
};

export default BookItem;


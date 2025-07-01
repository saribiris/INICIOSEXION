import { useContext, useState } from "react";
import { LibraryContext } from "../context/LibraryProvider";
import BookItem from "./BookItem";
import Cart from "./Cart";

const SearchBooks = () => {
  const { books, fetching, fail, loadBooks } = useContext(LibraryContext);
  const [query, setQuery] = useState("");

  const handleQuery = (e) => {
    e.preventDefault();
    if (query.trim()) {
      loadBooks(query);
    }
  };

  return (
    <section>
        <Cart />
      <form onSubmit={handleQuery} style={{ marginBottom: "2rem", textAlign: 'center' }}>
        <input
          placeholder="Buscar libros..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "0.75rem",
            borderRadius: "5px",
            border: "2px solid #ffc0cb",
            width: '300px',
            transition: 'border-color 0.3s'
          }}
          onFocus={(e) => { e.target.style.borderColor = '#ff69b4' }}
          onBlur={(e) => { e.target.style.borderColor = '#ffc0cb' }}
        />
        <button
          type="submit"
          style={{
            marginLeft: "0.5rem",
            backgroundColor: "#d87093",
            color: "white",
            padding: "0.75rem",
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => { e.target.style.backgroundColor = '#c76183' }}
          onMouseOut={(e) => { e.target.style.backgroundColor = '#d87093' }}
        >
          Buscar
        </button>
      </form>

      {fetching && <p style={{ color: "purple" }}>Cargando libros...</p>}
      {fail && <p style={{ color: "red" }}>{fail}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
        {books.map((book, i) => (
          <BookItem key={i} info={book} />
        ))}
      </div>
    </section>
  );
};

export default SearchBooks;

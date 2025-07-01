import { createContext, useEffect, useState } from "react";

export const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [fail, setFail] = useState("");

  const loadBooks = async (term = "harry potter") => {
    setFetching(true);
    setFail("");
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=18`);

      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const newBooks = data.items.map(item => ({
          id: item.id,
          title: item.volumeInfo.title,
          author: item.volumeInfo.authors?.[0] || 'Unknown',
          year: item.volumeInfo.publishedDate?.substring(0, 4) || 'N/A',
          cover: item.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'
        }));
        setBooks(newBooks);
      } else {
        setBooks([]);
        setFail("No se encontraron libros.");
      }
    } catch {
      setFail("Hubo un problema al buscar los libros.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <LibraryContext.Provider value={{ books, fetching, fail, loadBooks }}>
      {children}
    </LibraryContext.Provider>
  );
};

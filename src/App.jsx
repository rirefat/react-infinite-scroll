import { useState } from "react";
import Card from "./Card";
import { useRef } from "react";
import { useEffect } from "react";

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  const productsPerPage = 10;

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://dummyjson.com/products?limit=${productsPerPage}&skip=${productsPerPage * page}`);
      const data = await response.json();

      if (data.products.length === 0) {
        setHasMore(false)
      } else {
        setProducts(prevProducts => [...prevProducts, ...data.products]);
        setPage(prevPage => prevPage + 1);
      }
    }

    const onIntersection = (item) => {
      const loaderItem = item[0];

      if (loaderItem.isIntersecting && hasMore) {
        fetchProduct();
      }
    }
    const observer = new IntersectionObserver(onIntersection);

    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    // cleanup function
    return () => {
      if (observer) {
        observer.disconnect();
      }
    }
  }, [hasMore, page])

  return (
    <>
      <h3 className="text-3xl text-center my-8">Available Products</h3>

      {/* Products Container */}
      <div className="px-8 flex items-center justify-center gap-4 flex-wrap">
        {
          products.map(product => (
            <Card key={product.id} product={product} />
          ))
        }
      </div>

      <div className="my-12">
        {
          hasMore &&
          <p
            ref={loaderRef}
            className="flex justify-center items-center gap-2"
          >
            Loading More Products <span className="loading loading-dots loading-md"></span>
          </p>
        }
      </div>
    </>
  );
};

export default App;
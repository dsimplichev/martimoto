import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { CartContext } from "../../Context/CartContext";
import { FavoritesContext } from "../../Context/FavoritesContext";
import { AuthContext } from "../../Context/AuthContext";
import "./accessoryDetails.css";
import SectionHeader from "../../Card/SectionHeader";
import ProductCard from "../../Card/ProductCard"; 

function AccessoryDetails() {
  const { accessoryName } = useParams();
  const navigate = useNavigate(); 
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [notification, setNotification] = useState("");
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const { addToFavorites } = useContext(FavoritesContext);

 
  const getImageUrl = (image) => {
    if (!image) return "/default-image.jpg";
    if (image.startsWith("http")) return image;
    return `http://localhost:5000/uploads/${image}`;
  };

  
  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(`http://localhost:5000/accessories/${encodeURIComponent(accessoryName.toLowerCase())}`)
      .then((response) => {
        setAccessories(response.data);
        setLoading(false);
        setCurrentPage(1);
      })
      .catch((error) => {
        console.error("Грешка при заявката:", error);
        setError("За съжаление, в момента няма качени аксесоари в тази категория. Моля, опитайте отново по-късно..");
        setLoading(false);
      });
  }, [accessoryName]);

  
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  
  const handleAddToCart = (e, accessory) => {
    e.stopPropagation();
    const productToAdd = {
      _id: accessory._id,
      title: accessory.title,
      price: accessory.price,
      image: getImageUrl(accessory.images?.[0]),
      quantity: 1,
      itemType: "accessory"
    };
    addToCart(productToAdd);
    showNotification(`Продуктът "${accessory.title}" беше добавен във вашата количка.`);
  };

 

  const handleAddToFavorites = (e, accessory) => {
    e.stopPropagation();

    if (!user) {
      
      showNotification(
        <div className="login-required-popup">
          <h3>Изисква се вход</h3>
          <p>Трябва да влезете в профила си,<br />за да добавяте в Любими</p>
          <button
            onClick={() => {
              setNotification(null);
              navigate("/login");
            }}
            className="login-btn-popup"
          >
            Вход в профил
          </button>
          <button
            onClick={() => setNotification(null)}
            className="close-popup-btn"
          >
            ×
          </button>
        </div>,
        0 
      );
      return;
    }

   
    const item = {
      _id: accessory._id,
      title: accessory.title,
      price: accessory.price,
      image: getImageUrl(accessory.images?.[0]),
      itemType: "accessory",
    };
    addToFavorites(item);
    showNotification(<div className="notif-success">`Продуктът "${accessory.title}" беше добавен в любими.`</div>, 3000);
  };
 

  
  const handleNavigate = (id, itemType) => {
    navigate(`/${itemType}/${id}`);
  };

 
  const totalPages = Math.ceil(accessories.length / itemsPerPage);
  const paginatedAccessories = accessories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPaginationButtons = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) pageNumbers.push("...");
    }

    for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }

    return pageNumbers.map((page, index) =>
      page === "..." ? (
        <span key={index} className="ellipsis">...</span>
      ) : (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={currentPage === page ? "active-page" : ""}
        >
          {page}
        </button>
      )
    );
  };

  if (loading) return <p className="loading-text center-message">Зареждане...</p>;
  if (error) return <p className="error-text center-message">{error}</p>;

  return (
    <div className="accessories-page">
      <SectionHeader title={accessoryName} />

      <div className="parts-grid">
        {paginatedAccessories.length > 0 ? (
          paginatedAccessories.map((accessory) => (
            <ProductCard
              key={accessory._id}
              img={getImageUrl(accessory.images?.[0])}
              title={accessory.title}
              id={accessory._id}
              price={accessory.price}
              itemType="parts"
              onNavigate={(id) => navigate(`/parts/${id}`)}
              onAddToCart={(e) => handleAddToCart(e, accessory)}
              onAddToFavorites={(e) => handleAddToFavorites(e, accessory)}
            />
          ))
        ) : (
          <p className="no-accessories">Няма налични аксесоари в тази категория.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <i className="fas fa-chevron-left"></i> Prev
          </button>

          {renderPaginationButtons()}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}

      {notification && (
        <div className="cart-notification-center">{notification}</div>
      )}
    </div>
  );
}

export default AccessoryDetails;
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import AboutUs from './AboutUs';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  
  const cartItems = useSelector(state => state.cart.items);
  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Easy to care for.", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", description: "Removes toxins.", cost: "$18" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Adds humidity.", cost: "$14" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Large shiny leaves.", cost: "$20" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/18/03/aloe-vera-3284622_1280.jpg", description: "Medicinal air purifier.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Plants",
      plants: [
        { name: "Lavender", image: "https://cdn.pixabay.com/photo/2015/07/02/10/22/lavender-828911_1280.jpg", description: "Soothing fragrance.", cost: "$20" },
        { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2018/05/23/18/34/jasmine-3424783_1280.jpg", description: "Sweet floral scent.", cost: "$18" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Great for cooking.", cost: "$15" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/26/17/57/mint-1162992_1280.jpg", description: "Refreshing aroma.", cost: "$10" },
        { name: "Eucalyptus", image: "https://cdn.pixabay.com/photo/2018/03/05/15/34/eucalyptus-3200989_1280.jpg", description: "Invigorating scent.", cost: "$22" },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2017/05/26/16/07/lemon-balm-2346338_1280.jpg", description: "Citrus aroma.", cost: "$14" }
      ]
    },
    {
      category: "Medicinal Plants",
      plants: [
        { name: "Peppermint", image: "https://cdn.pixabay.com/photo/2017/07/11/18/02/peppermint-2494541_1280.jpg", description: "Relieves digestion.", cost: "$13" },
        { name: "Echinacea", image: "https://cdn.pixabay.com/photo/2016/08/17/16/07/echinacea-1600813_1280.jpg", description: "Boosts immunity.", cost: "$16" },
        { name: "Thyme", image: "https://cdn.pixabay.com/photo/2016/07/28/19/28/thyme-1548906_1280.jpg", description: "Antimicrobial properties.", cost: "$12" },
        { name: "Calendula", image: "https://cdn.pixabay.com/photo/2019/07/19/09/48/calendula-4348386_1280.jpg", description: "Heals skin.", cost: "$11" },
        { name: "Chamomile", image: "https://cdn.pixabay.com/photo/2017/06/18/21/37/chamomile-2417283_1280.jpg", description: "Promotes sleep.", cost: "$15" },
        { name: "Basil", image: "https://cdn.pixabay.com/photo/2016/08/11/08/04/basil-1585040_1280.jpg", description: "Rich in antioxidants.", cost: "$10" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({ ...prevState, [plant.name]: true }));
  };

  return (
    <div>
      <nav className="navbar">
        <h2>Paradise Nursery</h2>
        <div>
          <a href="#" onClick={() => { setShowCart(false); setShowAbout(false); }}>Plants</a>
          <a href="#" onClick={() => setShowAbout(!showAbout)}>About Us</a>
          <a href="#" onClick={() => setShowCart(true)}>Cart 🛒 ({totalCartCount})</a>
        </div>
      </nav>

      {showAbout ? (
        <AboutUs />
      ) : showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div style={{ padding: '20px' }}>
          {plantsArray.map((categoryObj, index) => (
            <div key={index}>
              <h2 style={{ textAlign: 'center', marginTop: '20px' }}>{categoryObj.category}</h2>
              <div className="product-grid">
                {categoryObj.plants.map((plant, pIndex) => (
                  <div key={pIndex} className="product-card">
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p><strong>{plant.cost}</strong></p>
                    <button 
                      disabled={addedToCart[plant.name]} 
                      onClick={() => handleAddToCart(plant)}
                      style={{ padding: '8px 16px', backgroundColor: addedToCart[plant.name] ? '#ccc' : '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: addedToCart[plant.name] ? 'not-allowed' : 'pointer' }}
                    >
                      {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
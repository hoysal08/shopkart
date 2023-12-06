<template>
  <footer class="shopkart-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <!-- <img src="/assets/shopkart-logo.png" alt="ShopKart Logo" /> -->
        </div>
        <!-- <div class="footer-links">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">Categories</a></li>
            <li><a href="/cart">Cart</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div> -->
        <div class="footer-social">
          <a href="#"><i class="fab fa-facebook"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
      <div class="footer-info">
        <p>&copy; 2023 ShopKart. All Rights Reserved.</p>
        <p>123 Shopper's Street, City, Country</p>
        <p>Email: info@shopkart.com</p>
        <p>Phone: +123 456 7890</p>
      </div>
    </div>
  </footer>
</template>
  
<script>
export default {
  name: 'FooterComponent'
};
</script>
  
<style scoped>
.shopkart-footer {
  background-color: #333;
  color: #fff;
  padding: 20px 0;
  text-align: center;
  width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.footer-logo img {
  width: 150px;
  /* Adjust the logo size as needed */
}

.footer-links ul {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a {
  text-decoration: none;
  color: #fff;
  font-weight: bold;
}

.footer-social a {
  font-size: 24px;
  margin: 0 10px;
  text-decoration: none;
  color: #fff;
}

.footer-social a:hover {
  color: #007BFF;
}

.footer-info {
  text-align: center;
}

.footer-info p {
  margin: 5px 0;
  font-size: 14px;
}




</style>
  
<template>
  <div class="container">
    <page-header @select-value="selectValue" />
    <main class="main">
      <product-form @add-product="addProduct" />
      <div class="main__products products">
        <product-card
          @show-deleteButton="product.hasDeleteButton = true"
          @hide-deleteButton="product.hasDeleteButton = false"
          @delete-product="deleteProduct(product)"
          :product="product"
          v-for="(product, idx) in products"
          :key="product.name"
        />
      </div>
    </main>
  </div>
</template>

<script>
import upgradeLocalStorage from "./localStorageManager.js";

import productCard from "./components/productCard.vue";
import pageHeader from "./components/pageHeader.vue";
import productForm from "./components/productForm.vue";

export default {
  name: "App",
  components: {
    productCard,
    pageHeader,
    productForm,
  },

  data() {
    return {
      products: [],
      sortProducts: [],

      select: null,
    };
  },
  methods: {
    addProduct(product) {
      this.products.push(product);
    },

    deleteProduct(deleteProduct) {
      this.products = this.products.filter(
        (item) => item.name !== deleteProduct.name
      );
      upgradeLocalStorage(this.products);
    },

    selectValue(val) {
      this.select = val;
    },
  },

  watch: {
    select(val) {
      if (val === "maxValue") {
        this.products = this.products.sort((a, b) => a.price - b.price);
        upgradeLocalStorage(this.products);
      }

      if (val === "minValue") {
        this.products = this.products.sort((a, b) => b.price - a.price);
        upgradeLocalStorage(this.products);
      }
    },
  },

  created() {
    if (window.localStorage.products) {
      this.products = JSON.parse(localStorage.getItem("products"));
    }
  },
};
</script>

<style lang="scss">
@import url("./nullstyle.css");
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,600&display=swap");

* {
  font-family: "Source Sans Pro", sans-serif;
}
body {
  background-color: #e5e5e5;
}

.container {
  max-width: 1380px;
  margin: 0 auto;
  padding: 0 15px;
  @media (max-width: 1410px) {
    max-width: 1170px;
  }
  @media (max-width: 1170px) {
    max-width: 992px;
  }
  @media (max-width: 992px) {
    max-width: 768px;
  }
  @media (max-width: 768px) {
    max-width: 768px;
  }
}

.main {
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.products {
  display: flex;
  flex-wrap: wrap;
  background-color: #e5e5e5;
  width: 100%;
  @media (max-width: 768px) {
    margin: 16px 0 0 0;
  }
}
</style>

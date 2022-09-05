<template>
  <div class="container">
    <page-header @select-value="selectValue" />
    <main class="main">
      <product-form @add-product="addProduct"/>
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
    productForm
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

@mixin point {
  display: inline-block;
  position: relative;
  top: -5px;
  content: " ";
  width: 4px;
  height: 4px;
  background: #ff8484;
  border-radius: 4px;
}

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
}

.main {
  display: flex;

  &__forms {
    flex: 0 0 24%;
    padding: 24px;
    background: #fffefb;
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04),
      0px 6px 10px rgba(0, 0, 0, 0.02);
    border-radius: 4px;

    max-height: 435px;
  }

  &__form {
    font-weight: 400;
    font-size: 10px;
    line-height: 13px;
    letter-spacing: -0.02em;
    color: #49485e;
  }

  &__products {
  }
}
.form {
  &__name {
    &::after {
      @include point;
    }
  }

  &__input-block {
    margin: 0 0 16px 0;
    position: relative;
  }

  &__input {
    background: #fffefb;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    width: 100%;
    height: 36px;
    padding: 0.5rem;
    &:focus {
      background-color: #eeeeee;
      border-bottom: 1px solid #5264ae;
    }
  }

  &__completion-message {
    font-weight: 400;
    font-size: 8px;
    line-height: 10px;
    letter-spacing: -0.02em;
    color: #ff8484;
    margin-top: 4px;
    position: absolute;
  }

  &__description {
  }

  &__image {
    &::after {
      @include point;
    }
  }

  &__price {
    &::after {
      @include point;
    }
  }

  &__button {
    background: #eeeeee;
    border-radius: 10px;
    width: 100%;
    height: 36px;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: -0.02em;
    color: #b4b4b4;
    &:hover {
      transform: scale(1.02);
      transition-duration: 200ms;
    }
  }
}
.active {
  background: #7bae73;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  color: #ffffff;
}

.text {
  margin: 0 0 5px 0;
}
.input-description {
  height: 108px;
  resize: none;
  margin-bottom: 16px;
}
.products {
  display: flex;
  flex-wrap: wrap;
  background-color: #e5e5e5;
  width: 100%;
  &__product {
  }
}

.product {
  flex: 0 1 33.3333%;

  &__container {
    margin: 0 0 16px 16px;
    background: #fffefb;
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04),
      0px 6px 10px rgba(0, 0, 0, 0.02);
    border-radius: 4px;
    position: relative;
    cursor: pointer;
    &:hover {
      transform: scale(1.03);
      transition-duration: 200ms;
    }
  }

  &__image {
    & img {
      width: 100%;
      height: 100%;
      max-width: 332px;
      max-height: 200px;
      object-fit: cover;
    }
  }

  &__name {
    font-weight: 600;
    font-size: 20px;
    line-height: 25px;
    color: #3f3f3f;
    margin: 16px;
  }

  &__description {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #3f3f3f;
    margin: 16px;
  }

  &__price {
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    color: #3f3f3f;
    margin: 32px 0 0 16px;
    padding-bottom: 24px;
  }

  &__delete-button {
    width: 32px;
    height: 32px;
    background-color: #ff8484;
    position: absolute;
    right: -8px;
    top: -8px;
    border-radius: 10px;
  }
}
</style>

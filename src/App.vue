<template>
  <div class="container">
    <header class="header">
      <h2 class="header__title">Добавление товара</h2>
      <div class="header__select select">
        <div class="select__flex">
          <select v-model="select" name="select" id="select">
            <option value="defaultValue" selected>По умолчанию</option>
            <option value="maxValue">По возрастанию</option>
            <option value="minValue">По убыванию</option>
          </select>
        </div>
      </div>
    </header>
    <main class="main">
      <div class="main__forms">
        <form class="main__form form" action="">
          <div class="form__name text">Наименование товара</div>
          <div class="form__input-block">
            <input
              v-model="inputName"
              class="form__input"
              placeholder="Введите наименование товара"
              type="text"
            />
            <div v-if="hasName" class="form__completion-message">
              Поле является обязательным
            </div>
          </div>
          <div class="form__description text">Описание товара</div>
          <textarea
            v-model="inputDescription"
            class="form__input input-description"
            placeholder="Введите описание товара"
          />
          <div class="form__image text">Ссылка на изображение товара</div>
          <div class="form__input-block">
            <input
              v-model="inputImage"
              class="form__input"
              placeholder="Введите ссылку"
              type="text"
            />
            <div v-if="hasImage" class="form__completion-message">
              Поле является обязательным
            </div>
          </div>
          <div class="form__price text">Цена товара</div>
          <div class="form__input-block">
            <input
              v-model="inputPrice"
              class="form__input"
              placeholder="Введите цену"
              type="text"
            />
            <div v-if="hasPrice" class="form__completion-message">
              Поле является обязательным
            </div>
          </div>

          <button
            v-on:click="addProduct()"
            v-bind:class="{ active: validForm }"
            class="form__button"
            type="button"
          >
            Добавить товар
          </button>
        </form>
      </div>
      <div class="main__products products">
        <div
          v-for="(product, idx) in products"
          v-on:mouseover="product.hasDeleteButton = true"
          v-on:mouseout="product.hasDeleteButton = false"
          :key="product.name"
          class="products__product product"
        >
          <div class="product__container">
            <button
              v-show="product.hasDeleteButton"
              v-on:click="deleteProduct(product)"
              class="product__delete-button"
            >
              <img src="../public/img/icons/delete.svg" alt="" />
            </button>
            <div class="product__image">
              <img
                class="image"
                v-bind:src="product.image"
                alt="product-image"
              />
            </div>
            <div class="product__name">{{ product.name }}</div>
            <div class="product__description">
              {{ product.description }}
            </div>
            <div class="product__price">
              {{ formatPrice(product.price) }} руб.
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { Product } from "./classes/classProduct.js";
import upgradeLocalStorage from "./localStorageManager.js";

export default {
  name: "App",
  data() {
    return {
      inputName: "",
      inputDescription:
        "",
      inputImage: "",
      inputPrice: "",

      hasName: false,
      hasImage: false,
      hasPrice: false,

      products: [],
      sortProducts: [],

      select: "defaultValue",
    };
  },
  methods: {
    addProduct() {
      if (!this.validForm) {
        if (!this.inputName) {
          this.hasName = true;
        } else this.hasName = false;

        if (!this.inputImage) {
          this.hasImage = true;
        } else this.hasImage = false;

        if (!this.inputPrice) {
          this.hasPrice = true;
        } else this.hasPrice = false;
        return;
      }

      const product = new Product(
        this.inputName,
        this.inputDescription,
        this.inputImage,
        this.inputPrice,
        false
      );
      this.products.push(product);

      this.clearInputs();
      this.hideMessages();
      upgradeLocalStorage(this.products);
    },

    deleteProduct(deleteProduct) {
      this.products = this.products.filter(
        (item) => item.name !== deleteProduct.name
      );
      upgradeLocalStorage(this.products);
    },

    clearInputs() {
      this.inputName = "";
      this.inputDescription = "";
      this.inputImage = "";
      this.inputPrice = "";
    },

    formatPrice(price) {
      return new Intl.NumberFormat("ru-RU").format(price);
    },

    hideMessages() {
      this.hasName = false;
      this.hasImage = false;
      this.hasPrice = false;
    },
  },

  computed: {
    validForm() {
      return this.inputName && this.inputImage && this.inputPrice
        ? true
        : false;
    },
  },

  watch: {
    select(val) {
      if (val === "maxValue") {
        this.products = this.products.sort((a, b) => a.price - b.price);
      }

      if (val === "minValue") {
        this.products = this.products.sort((a, b) => b.price - a.price);
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
.header {
  margin: 32px 0 16px 0;
  display: flex;
  align-items: center;

  &__title {
    font-weight: 600;
    font-size: 28px;
    line-height: 35px;
    color: #3f3f3f;
  }

  &__select {
    flex: 1 1 auto;
    display: flex;
    justify-content: end;
    align-items: center;
  }
}
.select {
  &__flex {
    background: #fffefb;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 10px 16px 10px 16px;
    border-radius: 4px;
  }
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

<template>
  <div class="container">
    <header class="header">
      <h2 class="header__title">Добавление товара</h2>
      <div class="header__select select">
        <div class="select__flex">
          <select name="select" id="select">
            <option value="default">По умолчанию</option>
          </select>
        </div>
      </div>
    </header>
    <main class="main">
      <div class="main__forms">
        <form class="main__form form" action="">
          <div class="form__name text">Наименование товара</div>
          <input
            v-model="inputName"
            class="form__input"
            placeholder="  Введите наименование товара"
            type="text"
          />
          <div class="form__description text">Описание товара</div>
          <textarea
            v-model="inputDescription"
            class="form__input input-description"
            placeholder="  Введите описание товара"
          />
          <div class="form__image text">Ссылка на изображение товара</div>
          <input
            v-model="inputImage"
            class="form__input"
            placeholder="  Введите ссылку"
            type="text"
          />
          <div class="form__price text">Цена товара</div>
          <input
            v-model="inputPrice"
            class="form__input"
            placeholder="  Введите цену"
            type="text"
          />
          <button v-on:click="addProduct()" class="form__button" type="button">
            Добавить товар
          </button>
        </form>
      </div>
      <div class="main__products products">
        <div
          v-for="(product, idx) in products"
          :key="product.name"
          class="products__product product"
        >
          <div class="product__container">
            <button
              v-on:click="deleteProduct(product)"
              class="product__delete-button"
            >
              <img src="../public/img/icons/delete.svg" alt="" />
            </button>
            <div class="product__image">
              <img
                class="image"
                src="../public/img/icons/product-image.jpg"
                alt="product-image"
              />
            </div>
            <div class="product__name">{{ product.name }}</div>
            <div class="product__description">
              {{ product.description }}
            </div>
            <div class="product__price">{{ product.price }} руб.</div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { Product } from "./class/classProduct.js";

export default {
  name: "App",
  data() {
    return {
      inputName: "Наименование товара",
      inputDescription:
        "Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк",
      inputImage: "",
      inputPrice: "10000",

      products: [],
    };
  },
  methods: {
    addProduct() {
      const product = new Product(
        this.inputName,
        this.inputDescription,
        this.inputImage,
        this.inputPrice
      );
      this.products.push(product);
    },
    deleteProduct(deleteProduct) {
      this.products=this.products.filter((item) => item.name !== deleteProduct.name);
      
    },
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
    max-height: 440px;
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
  }

  &__input {
    background: #fffefb;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    width: 100%;
    height: 36px;
    margin: 0 0 16px 0;
  }

  &__description {
  }

  &__image {
  }

  &__price {
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
  }
}
.text {
  margin: 0 0 4px 0;
}
.input-description {
  height: 108px;
  resize: none;
}
.products {
  display: flex;
  flex-wrap: wrap;
  background-color: #e5e5e5;
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
  }

  &__image {
    max-width: 332px;
    & img {
      width: 100%;
      height: 100%;
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

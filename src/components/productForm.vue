<template>
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
        v-on:click="setProduct()"
        v-bind:class="{ active: validForm }"
        class="form__button"
        type="button"
      >
        Добавить товар
      </button>
    </form>
  </div>
</template>

<script>
import { Product } from "../classes/classProduct.js";
import upgradeLocalStorage from "../localStorageManager.js";

export default {
  data() {
    return {
      inputName: "",
      inputDescription: "",
      inputImage: "",
      inputPrice: "",

      hasName: false,
      hasImage: false,
      hasPrice: false,
    };
  },

  methods: {
    setProduct() {
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

      this.clearInputs();

      this.hideMessages();

      upgradeLocalStorage(this.products);

      this.$emit("add-product", product);
    },

    clearInputs() {
      this.inputName = "";
      this.inputDescription = "";
      this.inputImage = "";
      this.inputPrice = "";
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
};
</script>

<style lang="scss">
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

.main {
  &__forms {
    @media (max-width: 1170px) {
      flex: 0 1 35%;
    }
    @media (max-width: 992px) {
      flex: 0 1 50%;
    }
    @media (max-width: 768px) {
      flex: 0 0 100%;
    }
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

.product {
  @media (max-width: 1170px) {
    flex: 0 1 50%;
  }
  @media (max-width: 992px) {
    flex: 0 1 100%;
  }
  @media (max-width: 768px) {
    flex: 0 1 100%;
  }
  flex: 0 1 33.3333%;

  &__container {
    @media (max-width: 768px) {
      margin: 0 0 16px 0;
    }
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
    @media (max-width: 768px) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    & img {
      @media (max-width: 992px) {
        max-width: 100%;
        max-height: 100%;
      }
      @media (max-width: 768px) {
        max-width: 100%;
        max-height: 100%;
      }
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

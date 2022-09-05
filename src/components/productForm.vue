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
        v-on:click="addProduct()"
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

  methods:{
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

      this.clearInputs();

      this.hideMessages();

      upgradeLocalStorage(this.products);

      this.$emit('add-product', product)
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

  computed:{
    validForm() {
      return this.inputName && this.inputImage && this.inputPrice
        ? true
        : false;
    },
  },
};
</script>

<style lang="scss"></style>

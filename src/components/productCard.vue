<template>
  <div class="products__product product">
    <div
      v-on:mouseover="showDeleteButton()"
      v-on:mouseout="hideDeleteButton()"
      class="product__container"
    >
      <button
        v-show="product.hasDeleteButton"
        v-on:click="deleteProduct(this.product)"
        class="product__delete-button"
      >
        <img src="./image/delete.svg" alt="" />
      </button>
      <div class="product__image">
        <img class="image" v-bind:src="product.image" alt="product-image" />
      </div>
      <div class="product__name">{{ product.name }}</div>
      <div class="product__description">
        {{ product.description }}
      </div>
      <div class="product__price">{{ formatPrice(product.price) }} руб.</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },

  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat("ru-RU").format(price);
    },

    showDeleteButton() {
      this.$emit("show-deleteButton");
    },

    hideDeleteButton() {
      this.$emit("hide-deleteButton");
    },

    deleteProduct(product) {
      this.$emit("delete-product", product);
    },
  },
};
</script>

<style lang="scss">
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

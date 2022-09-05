<template>
  <header class="header">
    <h2 class="header__title">Добавление товара</h2>
    <div class="header__select select">
      <div class="select__flex">
        <select v-model="selectedValue" name="select" id="select">
          <option value="defaultValue" selected>По умолчанию</option>
          <option value="maxValue">По возрастанию</option>
          <option value="minValue">По убыванию</option>
        </select>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      selectedValue: "defaultValue",
    };
  },

  watch: {
    selectedValue() {
      this.$emit("select-value", this.selectedValue);
    },
  },
};
</script>

<style lang="scss">
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
</style>

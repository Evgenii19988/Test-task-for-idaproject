function upgradeLocalStorage(products) {
  localStorage.clear();
  localStorage.setItem("products", JSON.stringify(products));
}
export default upgradeLocalStorage;

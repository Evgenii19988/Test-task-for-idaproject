export class Product {
  constructor(name, description, image, price, hasButton) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
    this.hasDeleteButton = hasButton;
  }
}

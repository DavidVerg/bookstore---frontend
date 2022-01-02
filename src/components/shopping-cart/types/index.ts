export interface ShoppingCart {
  userId: string;
  creationDate: string;
  lastUpdateDate: string;
  bookCart: BookCart[];
  totalPrice: Number;
}

type BookCart = {
  bookId: string;
  quantity: number;
};

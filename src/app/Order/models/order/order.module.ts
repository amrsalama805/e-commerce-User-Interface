export interface Order {
  id: number;
  finalPrice:number;
  date: Date; 
  state:number;
  userID:string;
}
export interface  OrderDetails {
  id: number,
  quantity:number;
  totalPrice:number;
  productId:number;
  orderId:number; 
  productName:string;
}
export interface Cart{
  id: number,
  productId:number,
  custId: number,
  quantity:number,
  totalPrice: number
}

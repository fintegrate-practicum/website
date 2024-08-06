import Item from "../../../components/generic/item";
export interface IOrder extends Item {

  userId: string,
  products: { id: string, qty: number }[];
  deliveryMethod: string,
  destinationAddress: {
    city: string,
    street: string,
    numBuild: number,
    apartmentNumber: number,
    floor: number,
    lastName: string
  },
  businessCode: string,
  settingManeger: number

}
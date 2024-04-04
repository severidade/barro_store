export interface Product {
  _id: string;
  productName: string;
  categories: {
    _ref: string;
    _type: string;
  }[];
  images: {
    asset: {
      _ref: string;
      _type: string;
    };
  }[];
  price: number;
  promotion: {
    isPromotional: boolean;
    discount: number;
  };
  installmentPayments: number;
}

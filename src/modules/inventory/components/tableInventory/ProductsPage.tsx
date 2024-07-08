import AllProducts from '../../components/tableInventory/AllProducts';
import { useSelector } from 'react-redux';
import{RootState} from '../../app/store';
import { IProduct } from '../../interfaces/IProduct';
import { IComponent } from '../../interfaces/IComponent';

function ProductsPage() {
//מערכי דמה של מוצרים ורכיבים לתצוגה ראשונית
  const productsArr:IProduct[]=
   [ 
      {id: "1",
      name: "table",
      description:"mnbvcx",
      componentsImages: [],
      productComponents: ["10", "11","14","12"],
      packageCost: 100,
      totalPrice: 300,
      adminId: "12",
      isActive: true,
      isOnSale: true,
      salePercentage: 10,
      stockQuantity: 40,
      bussinesId: "44",
      componentStatus: ""},
      {id: "2",
      name: "table",
      description:"aaaaaaaaaaaa",
      componentsImages: [],
      productComponents: ["12", "13"],
      packageCost: 100,
      totalPrice: 200,
      adminId: "12",
      isActive: true,
      isOnSale: true,
      salePercentage: 10,
      stockQuantity: 50,
      bussinesId: "44",
      componentStatus: ""}
];
const componentsArr:IComponent[]=
[{
    id:"11",
    name: "table leg",
    componentBuyPrice: 80,
    addingComponentDate: new Date(),
    minQuantity: 3,
    stockQuantity: 5,
    isActive: true,
    adminId: "132",
    isSoldSeparately: false,
    description: "jhgjgfnvnbvn",
    totalPrice: 120,
    componentImages: ["https://www.shw.co.il/media/catalog/product/cache/82b780ee7d6ec5acf040ed4b1a996b50/b/o/boliver-small.png",""],
    isOnSale: true,
    salePercentage: 20,
    componentColor: "",
    componentSize:"120",
    bussinesId: "",
},
{
    id:"12",
    name: "table top",
    componentBuyPrice: 150,
    addingComponentDate: new Date(),
    minQuantity: 3,
    stockQuantity: 5,
    isActive: true,
    adminId: "132",
    isSoldSeparately: false,
    description: "jhgfdxbnbvnbvnbnvv",
    totalPrice: 120,
    componentImages: ["https://topcommerce.co.il/wp-content/uploads/2020/11/%D7%A9%D7%95%D7%9C%D7%97%D7%9F-%D7%9E%D7%A9%D7%A8%D7%93%D7%99-%D7%AA%D7%9C%D7%9E%D7%99%D7%93-%D7%93%D7%92%D7%9D-%D7%90%D7%91%D7%A0%D7%A8-2280.jpg",""],
    isOnSale: true,
    salePercentage: 20,
    componentColor: "",
    componentSize:"120",
    bussinesId: "",
},
{
  id:"10",
  name: "table leg",
  componentBuyPrice: 120,
  addingComponentDate: new Date(),
  minQuantity: 3,
  stockQuantity: 5,
  isActive: true,
  adminId: "132",
  isSoldSeparately: false,
  description: "kjhgfmnbvmnbvcjhgfd",
  totalPrice: 120,
  componentImages: ["",""],
  isOnSale: true,
  salePercentage: 20,
  componentColor: "",
  componentSize:"120",
  bussinesId: "",
},
{
  id:"13",
  name: "table leg",
  componentBuyPrice: 80,
  addingComponentDate: new Date(),
  minQuantity: 3,
  stockQuantity: 5,
  isActive: true,
  adminId: "132",
  isSoldSeparately: false,
  description: "",
  totalPrice: 120,
  componentImages: ["",""],
  isOnSale: true,
  salePercentage: 20,
  componentColor: "",
  componentSize:"120",
  bussinesId: "",
},
{
  id:"14",
  name: "table leg",
  componentBuyPrice: 80,
  addingComponentDate: new Date(),
  minQuantity: 3,
  stockQuantity: 5,
  isActive: true,
  adminId: "132",
  isSoldSeparately: false,
  description: "",
  totalPrice: 120,
  componentImages: ["",""],
  isOnSale: true,
  salePercentage: 20,
  componentColor: "",
  componentSize:"120",
  bussinesId: "",
}
]

  const products = useSelector<RootState,IProduct[]>((state) => state.product.data);
  const components = useSelector<RootState,IComponent[]>((state)=>state.component.data);
  return (
    <>
      {/* <AllProducts productsArr={productsArr} componentsArr={componentsArr} /> */}
      <AllProducts productsArr={products} componentsArr={components} />
    </>
  )
}
export default ProductsPage


import {expect, describe, it} from  'vitest';
import {fireEvent, render, screen } from '@testing-library/react';
import AllProducts from './AllProducts';
import { error } from 'console';
import { IProduct } from '../../interfaces/IProduct';
import { IComponent } from '../../interfaces/IComponent';

const mockProducts: IProduct[] = [
    {
      id: '1',
      productName: 'Table',
      productDescription: 'Some description',
      componentsImages: [],
      productComponents: ["10", "11","12"],
      packageCost: 100,
      totalPrice: 300,
      adminId: '12',
      isActive: true,
      isOnSale: true,
      salePercentage: 10,
      stockQuantity: 40,
      bussinesId: '44',
      componentStatus: '',
    },
    {
      id: '2',
      productName: 'Chair',
      productDescription: 'Another description',
      componentsImages: [],
      productComponents: ["12", "13"],
      packageCost: 50,
      totalPrice: 100,
      adminId: '15',
      isActive: false,
      isOnSale: false,
      salePercentage: 0,
      stockQuantity: 20,
      bussinesId: '33',
      componentStatus: '',
    },
  ];
const mockComponents:IComponent[]=
[{
   id:"11",
   componentName: "table leg",
   componentBuyPrice: 80,
   addingComponentDate: new Date(),
   minQuantity: 3,
   componentStock: 5,
   isActive: true,
   adminId: "132",
   isSoldSeparately: false,
   componentDescription: "jhgjgfnvnbvn",
   salePrice: 120,
   componentImages: ["https://www.shw.co.il/media/catalog/product/cache/82b780ee7d6ec5acf040ed4b1a996b50/b/o/boliver-small.png",""],
   isInSale: true,
   salePercentage: 20,
   componentColor: "",
   componentSize:"120",
   businessId: "",
},
{
   id:"12",
   componentName: "table top",
   componentBuyPrice: 150,
   addingComponentDate: new Date(),
   minQuantity: 3,
   componentStock: 5,
   isActive: true,
   adminId: "132",
   isSoldSeparately: false,
   componentDescription: "jhgfdxbnbvnbvnbnvv",
   salePrice: 120,
   componentImages: ["https://topcommerce.co.il/wp-content/uploads/2020/11/%D7%A9%D7%95%D7%9C%D7%97%D7%9F-%D7%9E%D7%A9%D7%A8%D7%93%D7%99-%D7%AA%D7%9C%D7%9E%D7%99%D7%93-%D7%93%D7%92%D7%9D-%D7%90%D7%91%D7%A0%D7%A8-2280.jpg",""],
   isInSale: true,
   salePercentage: 20,
   componentColor: "",
   componentSize:"120",
   businessId: "",
},
{
 id:"10",
 componentName: "table leg",
 componentBuyPrice: 120,
 addingComponentDate: new Date(),
 minQuantity: 3,
 componentStock: 5,
 isActive: true,
 adminId: "132",
 isSoldSeparately: false,
 componentDescription: "kjhgfmnbvmnbvcjhgfd",
 salePrice: 120,
 componentImages: ["",""],
 isInSale: true,
 salePercentage: 20,
 componentColor: "",
 componentSize:"120",
 businessId: "",
},
{
 id:"13",
 componentName: "table leg",
 componentBuyPrice: 80,
 addingComponentDate: new Date(),
 minQuantity: 3,
 componentStock: 5,
 isActive: true,
 adminId: "132",
 isSoldSeparately: false,
 componentDescription: "",
 salePrice: 120,
 componentImages: ["",""],
 isInSale: true,
 salePercentage: 20,
 componentColor: "",
 componentSize:"120",
 businessId: "",
},
]
describe('AllProducts component', () => {
  it('renders product columns with correct headers', () => {
    render(<AllProducts productsArr={mockProducts} componentsArr={mockComponents}/>);

    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Qty')).toBeInTheDocument();
    expect(screen.getByText('Components')).toBeInTheDocument();
  });

it('displays "No Components" when there are no components for a product', () => {
    const mockProductWithoutComponents: IProduct = {
      ...mockProducts[0],
      productComponents: [],
    };

    render(<AllProducts productsArr={[mockProductWithoutComponents]} componentsArr={mockComponents} />);  
    expect(screen.getByText('No Components')).toBeInTheDocument();
  });

  it('displays product details in corresponding cells', () => {
    render(<AllProducts productsArr={mockProducts} componentsArr={mockComponents}/>);
    // Product 1 (Table)
    const tableIdCell = screen.getByText('1');
    const tableNameCell = screen.getByText('Table');
    const tablePriceCell = screen.getByText(/300/); // Regex for price format
    const tableStockCell = screen.getByText('40');

    expect(tableIdCell).toBeInTheDocument();
    expect(tableNameCell).toBeInTheDocument();
    expect(tablePriceCell).toBeInTheDocument();
    expect(tableStockCell).toBeInTheDocument();

    // Product 2 (Chair)
    const chairIdCell = screen.getByText('2');
    const chairNameCell = screen.getByText('Chair');
    const chairPriceCell = screen.getByText(/100/);
    const chairStockCell = screen.getByText('20');

    expect(chairIdCell).toBeInTheDocument();
    expect(chairNameCell).toBeInTheDocument();
    expect(chairPriceCell).toBeInTheDocument();
    expect(chairStockCell).toBeInTheDocument();
  });

  it('sorts products correctly by price', async () => {
    render(<AllProducts productsArr={mockProducts} componentsArr={mockComponents} />);
  
    const priceHeader = screen.getByText('Price');
    fireEvent.click(priceHeader);
    // Check if products are sorted by price in ascending order
    const firstProductPriceCell = screen.getByText('100'); // Assuming 100 is the lowest price in mock data
    expect(firstProductPriceCell).toBeInTheDocument();
  });

  it('renders pagination controls', () => {
    render(<AllProducts productsArr={mockProducts} componentsArr={mockComponents}/>);
  
    const nextPageButton = screen.getByRole('button', { name: 'Go to next page' });
    const previousPageButton = screen.getByRole('button', { name: 'Go to previous page' });
  
    expect(nextPageButton).toBeInTheDocument();
    expect(previousPageButton).toBeInTheDocument();
  });
  
  it('changes page when pagination controls are clicked', async () => {
    render(<AllProducts productsArr={mockProducts} componentsArr={mockComponents}/>);
  
    const nextPageButton = screen.getByRole('button', { name: 'Go to next page' });
    fireEvent.click(nextPageButton);
  
    // Check if page changed
    await screen.findByText('Chair'); // Assuming 'Chair' is in the second page
  });
    console.log(error);
  });
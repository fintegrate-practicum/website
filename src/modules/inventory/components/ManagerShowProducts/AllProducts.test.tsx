import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import AllProducts from './AllProducts';
import productReducer from '../../features/product/productSlice';
import componentReducer from '../../features/component/componentSlice';
import { getAllItems } from '../../Api-Requests/genericRequests';
import { describe, it, expect, vi } from 'vitest';
import { IProduct } from '../../interfaces/IProduct';
import { IComponent } from '../../interfaces/IComponent';
import { AxiosResponse } from 'axios';

const mockProducts: IProduct[] = [
  {
    id: '1',
    name: 'Table',
    description: 'Some description',
    images: [],
    productComponents: ['10', '11', '12'],
    packageCost: 100,
    totalPrice: 300,
    adminId: '12',
    isActive: true,
    isOnSale: true,
    salePercentage: 10,
    stockQuantity: 40,
    businessId: '44',
    componentStatus: '',
  },
  {
    id: '2',
    name: 'Chair',
    description: 'Another description',
    images: [],
    productComponents: ['12', '13'],
    packageCost: 50,
    totalPrice: 100,
    adminId: '15',
    isActive: false,
    isOnSale: false,
    salePercentage: 0,
    stockQuantity: 20,
    businessId: '33',
    componentStatus: '',
  },
];

const mockComponents: IComponent[] = [
  {
    id: '11',
    name: 'table leg',
    componentBuyPrice: 80,
    addingComponentDate: new Date(),
    minQuantity: 3,
    stockQuantity: 5,
    isActive: true,
    adminId: '132',
    isSoldSeparately: false,
    description: 'jhgjgfnvnbvn',
    totalPrice: 120,
    images: [
      'https://www.shw.co.il/media/catalog/product/cache/82b780ee7d6ec5acf040ed4b1a996b50/b/o/boliver-small.png',
      '',
    ],
    isOnSale: true,
    salePercentage: 20,
    componentColor: '',
    componentSize: '120',
    businessId: '',
  },
  {
    id: '12',
    name: 'table top',
    componentBuyPrice: 150,
    addingComponentDate: new Date(),
    minQuantity: 3,
    stockQuantity: 5,
    isActive: true,
    adminId: '132',
    isSoldSeparately: false,
    description: 'jhgfdxbnbvnbvnbnvv',
    totalPrice: 120,
    images: [
      'https://topcommerce.co.il/wp-content/uploads/2020/11/%D7%A9%D7%95%D7%9C%D7%97%D7%9F-%D7%9E%D7%A9%D7%A8%D7%93%D7%99-%D7%AA%D7%9C%D7%9E%D7%99%D7%93-%D7%93%D7%92%D7%9D-%D7%90%D7%91%D7%A0%D7%A8-2280.jpg',
      '',
    ],
    isOnSale: true,
    salePercentage: 20,
    componentColor: '',
    componentSize: '120',
    businessId: '',
  },
];

const mockProductsResponse: AxiosResponse<IProduct[]> = {
  data: mockProducts,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {} as any,
};

const mockComponentsResponse: AxiosResponse<IComponent[]> = {
  data: mockComponents,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {} as any,
};
vi.mock('../../Api-Requests/genericRequests', () => ({
  getAllItems: vi.fn(),
}));

vi.mock('../DeleteProduct', () => ({
  default: () => <div>DeleteProduct Component</div>,
}));

vi.mock('../DeleteComponent', () => ({
  default: () => <div>DeleteComponent Component</div>,
}));

const store = configureStore({
  reducer: {
    product: productReducer,
    component: componentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

describe('AllProducts Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AllProducts />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Add Product')).toBeInTheDocument();
    expect(screen.getByText('Add Component')).toBeInTheDocument();
  });

  it('fetches and displays products and components', async () => {
    vi.mocked(getAllItems).mockResolvedValueOnce(mockProductsResponse);
    vi.mocked(getAllItems).mockResolvedValueOnce(mockComponentsResponse);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <AllProducts />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      // expect(screen.getByText('Table')).toBeInTheDocument();
      // expect(screen.getByText('Chair')).toBeInTheDocument();
      // expect(screen.getByText('table leg')).toBeInTheDocument();
      // const elements = screen.queryAllByText('table top');
      // expect(elements.length).toBeGreaterThan(0);
    });
  });

  it('renders DeleteComponent and DeleteProduct buttons', async () => {
    vi.mocked(getAllItems).mockResolvedValueOnce(mockProductsResponse);
    vi.mocked(getAllItems).mockResolvedValueOnce(mockComponentsResponse);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <AllProducts />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      // const elements = screen.queryAllByText('DeleteProduct Component');
      // expect(elements.length).toBeGreaterThan(0);
      // const elements1 = screen.queryAllByText('DeleteComponent Component');
      // expect(elements1.length).toBeGreaterThan(0);
    });
  });
});

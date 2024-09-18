import { ProductStock } from './lowStockProductsList';
import { orderStats } from './orderStatsChart';
import { orderStatus } from './statusDistributionChart';
import { Task } from './openTasksByEmployee';
import workerInstance from '../../auth0/WorkersInterceptors';
import axios from 'axios';

export async function fetchOrderStats(
  businessCode: string,
): Promise<orderStats[] | any> {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_ORDERS_SERVICE_URL}/orders/stats/${businessCode}`,
    );
    return response.data as orderStats[];
  } catch (error) {
    console.error('Failed to fetch order stats:', error);
    return { error: (error as Error).message };
  }
}

export async function fetchStatusDistribution(
  businessCode: string,
): Promise<orderStatus[] | any> {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_ORDERS_SERVICE_URL}/orders/status-distribution/${businessCode}`,
    );
    return response.data as orderStatus[];
  } catch (error) {
    console.error('Failed to fetch status distribution:', error);
    return { error: (error as Error).message };
  }
}

export async function fetchLowStockProducts(
  businessCode: string,
): Promise<ProductStock[]> {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_INVENTORY_SERVICE_URL}/api/inventory/product/low-stock/${businessCode}`,
    );
    return response.data as ProductStock[];
  } catch (error) {
    console.error('Failed to fetch low stock products:', error);
    throw new Error(
      `Failed to fetch low stock products: ${(error as Error).message}`,
    );
  }
}

export async function fetchOpenTasksByEmployee(
  businessCode: string,
): Promise<Task[] | any> {
  try {
    const response = await workerInstance.get(
      `/tasks/open-by-employee/${businessCode}`,
    );
    return response.data as Task[];
  } catch (error) {
    console.error('Failed to fetch open tasks by employee:', error);
    return { error: (error as Error).message };
  }
}

import { ProductStock } from './lowStockProductsList '
import { orderStats } from './orderStatsChart '
import { orderStatus } from './statusDistributionChart'
import { Task } from './openTasksByEmployee'

export async function fetchOrderStats(businessCode: string): Promise<orderStats[] | any> {
  try {
    const response = await fetch(`http://localhost:4004/orders//stats/${businessCode}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: orderStats[] = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch order stats:', error);
    return { error: (error as Error).message };
  }
}

export async function fetchStatusDistribution(businessCode: string): Promise<orderStatus[] | any> {
  try {
    const response = await fetch(`http://localhost:4004/orders//status-distribution/${businessCode}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: orderStatus[] = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch order stats:', error);
    return { error: (error as Error).message };
  }
}

export async function fetchLowStockProducts(businessCode: string): Promise<ProductStock[]> {
  try {
    const response = await fetch(`http://localhost:4003/api/inventory/product/low-stock/${businessCode}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: ProductStock[] = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch low stock products:', error);
    throw new Error(`Failed to fetch low stock products: ${(error as Error).message}`);
  }
}

export async function fetchOpenTasksByEmployee(businessCode: string): Promise<Task[] | any> {
  try {
    //לכאן חוזר עם מזהה וכמות
    const responseId = await fetch(`http://localhost:4006/tasks/open-by-employeeId/${businessCode}`);
    if (!responseId.ok) {
      throw new Error(`HTTP error! Status: ${responseId.status}`);
    }
    const responseName = await fetch(`http://localhost:4006/workers/open-by-employeeName/${responseId}`);
    if (!responseName.ok) {
      throw new Error(`HTTP error! Status: ${responseName.status}`);
    }
    const data: Task[] = await responseName.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch order stats:', error);
    return { error: (error as Error).message };
  }
}

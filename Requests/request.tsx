import httpRequsts from './httpRequests';

export const DeleteOrder =  (id: string): Promise<any> => {   
        return httpRequsts.delete(`/${id}`);
}
export const GetAllOrders = (order:any) => {  
    return httpRequsts.get(`/${order}`);
};
export const GetOrdersByUser = (id: string ,order:any) => {
        return httpRequsts.get(`/${id}/${order}`);
};
export const AddAnOrder =  (order: any) => {  
        return httpRequsts.post(`/${order}`);
};

export const UpdateOrder =  (id: string , order: any)=> {
    return httpRequsts.put(`/${id}/${order}`);      
};
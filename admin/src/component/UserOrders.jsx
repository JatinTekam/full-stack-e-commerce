import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);


  const getUserOrders = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/orders/all");
    console.log(response.data[0].orderedProducts);
  
    setOrders(response.data);
  };

  const handleOrderStatus= async (e,id)=>{
      e.preventDefault();

      const response= await axios.patch(`http://localhost:3000/api/v1/orders/status/${id}?status=${e.target.value}`);

      if(response.status==200){
        await getUserOrders();
      } 
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <div className="mt-7 w-screen flex justify-center">
      <div className="w-350  p-4  bg-white rounded-2xl">
        <h2 className="text-3xl">Orders</h2>

        <table className="mt-5  w-340">
          <thead>
            <tr>
              <th className="p-3 text-xl">Order</th>
              <th className="p-3 text-xl">Customer</th>
              <th className="p-3 text-xl">Total</th>
              <th className="p-3 text-xl">Address</th>
              <th className="p-3 text-xl">Phone No</th>
              <th className="p-3 text-xl">Payment</th>
              <th className="p-3 text-xl w-90">Order</th>
              <th className="p-3 text-xl">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((product) => (
              <tr className="text-center" key={product.id}>
                <td>{product.id}</td>
                <td>{product.email}</td>
                <td>{product.amount}</td>
                <td>{product.userAddress}</td>
                <td>{product.phoneNumber}</td>
                <td className="text-green-700">{product.paymentStatus}</td>
                
                {
                  product.orderedProducts.map((item)=>(
                    <tr className="" key={product.id}>
                      <td colSpan="2" className="pr-2">{item.title}</td>
                      <td className="pr-2">{item.category}</td>
                      <td className="pr-2">{item.size}</td>
                      <td>{item.quantity} X</td>
                      {" "}<td className="pr-2">{item.price}</td>
                      <td> {item.color}</td>
                      
                    </tr>
                  ))
                }
                <td className="w-40">
                  <select name="" id="" onChange={(e)=>handleOrderStatus(e,product.id)}>
                    <option value="In Process">{product.orderStatus}</option>
                    <option value="Order Preparing">Order Preparing</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Out For Delivery">Out For Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserOrders;

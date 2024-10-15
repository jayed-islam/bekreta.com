import React from "react";
import logo from "../../../public/assets/logo.jpg";
import Image from "next/image";
import { IOrder } from "@/types/order";

interface Props {
  order: IOrder;
}
const Invoice = ({ order }: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "-2000%",
      }}
    >
      <div
        id="invoiceDoc"
        style={{
          width: "1280px", // A4 width
          height: "1760px", // A4 height
          padding: "60px", // Margin for print
          boxSizing: "border-box",
          position: "relative",
          backgroundColor: "white",
        }}
      >
        <div>
          {/* Invoice Header */}
          <div className="flex items-start justify-between border-b-2 border-gray-300">
            <div className="">
              <h3 className="text-lg font-semibold">BILL FROM:</h3>
              <div className="text-md mt-3 pb-7 ">
                <p>Bekreta</p>
                <p>Aftabnagar, Dhaka</p>
                <p>Dhaka, 1212</p>
                <p>Bangladesh</p>
                <p>bekretabd@gmail.com</p>
              </div>
            </div>
            <Image
              src={logo}
              height={100}
              width={100}
              alt="Bekreta"
              className="h-16"
            />
          </div>

          <div className="mt-16 flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">BILL TO:</h3>
              <div className="text-md mt-3">
                <p>{order.name}</p>
                <p>{order.phone}</p>
                <p className="max-w-64">{order.address}</p>
              </div>
            </div>
            {/* Invoice Details */}
            <div className="w-72">
              <div className="flex items-center justify-between w-full px-3 py-1">
                <h1 className="text-sm font-semibold">INVOICE</h1>
                <h2 className="text-sm">#{order._id}</h2>
              </div>
              <div className="flex items-center justify-between w-full px-3 py-1">
                <h1 className="text-sm font-semibold">INVOICE DATE</h1>
                <h2 className="text-sm">
                  {new Date(order?.createdAt as Date).toLocaleString()}
                </h2>
              </div>
              <div className="flex items-start justify-between w-full bg-gray-300 px-3 h-6 mt-3">
                <h1 className="text-sm font-semibold">AMOUNT DUE</h1>
                <h2 className="text-sm">৳{order.totalPrice.toFixed(2)}</h2>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="mt-28">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-gray-300">
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-1 pl-3">Item</th>
                  <th className="text-left py-1">Description</th>
                  <th className="text-center py-1">Quantity</th>
                  <th className="text-center py-1">Unit Cost</th>
                  <th className="text-right py-1 pr-3">Line Total</th>
                </tr>
              </thead>
              <tbody>
                {/* Table Row 1 */}
                {order.products.map((item) => (
                  <tr
                    className="border-b-2 border-gray-200"
                    key={item.product._id}
                  >
                    <td className="py-3 pl-3">{item.product._id}</td>
                    <td className="py-3">{item.product.name}</td>
                    <td className="text-center py-3">{item.quantity}X</td>
                    <td className="text-center py-3">৳{item.price}</td>
                    <td className="text-right py-3 pr-3">
                      ৳{item.quantity * item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-16 flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">NOTES/MEMO</h3>
              <div className="text-md mt-3">
                <p>test notes</p>
              </div>
            </div>
            {/* Invoice Details */}
            <div className="w-72">
              <div className="flex items-center justify-between w-full px-3 py-1">
                <h1 className="text-sm font-semibold">SUBTOTAL</h1>
                <h2 className="text-sm">৳{order.subTotal}</h2>
              </div>
              <div className="flex items-center justify-between w-full px-3 py-1">
                <h1 className="text-sm font-semibold">TAX</h1>
                <h2 className="text-sm">0</h2>
              </div>
              <div className="flex items-center justify-between w-full px-3 py-1">
                <h1 className="text-sm font-semibold">DELIVERY CHARGE</h1>
                <h2 className="text-sm">{order.deliveryCharge}</h2>
              </div>
              <div className="flex items-center justify-between w-full bg-gray-300 px-3 py-1">
                <h1 className="text-sm font-semibold">TOTAL</h1>
                <h2 className="text-sm">৳{order.totalPrice}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;

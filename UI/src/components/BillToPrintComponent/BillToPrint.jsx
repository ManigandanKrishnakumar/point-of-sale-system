import React from 'react';
import './BillToPrint.scss';

const BillToPrint = ({bill}) => {
  return (
    <div className="bill-to-print-container">
      <div className="non-table">
        <div className="store-details">
          <h1>Bloomerang</h1>
          <p>
            Shop #9, Delifresh Hypermarket, Asher Mill Stop,Opp. Prime
            Apartments,
          </p>
          <p>Tiruppur - 641 603, Phone: 9994499143</p>
        </div>

        <div className="bill-customer-info">
          <div className="bill-info">
            <p>Bill No: {bill.BILL_ID}</p>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
          <div className="customer-info">
            <p> Name: {bill.CUSTOMER_NAME}</p>
            <p>Phone:{bill.PHONE_NUMBER}</p>
          </div>
        </div>
      </div>

      <div className="items-table">
        <table>
          <thead>
            <tr>
              <th>Product Id</th>
              <th>Product Name</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {JSON.parse(bill.ITEMS).items.map((item, i) => {
              return (
                <tr key={item.id}>
                  <td>
                    <span className="sl-no">{i + 1 + ')'}</span> {item.id}
                  </td>
                  <td> {item.name}</td>
                  <td> {item.qty}</td>
                  <td> {item.billUnitPrice} </td>
                  <td> {item.qty * item.billUnitPrice} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="total">TOTAL: {bill.TOTAL_COST} rs.</p>
      <p className="c">Software by Full Stack Solutions @ 9994655540</p>
    </div>
  );
};

export default BillToPrint;

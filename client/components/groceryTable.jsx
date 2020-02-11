import React from 'react';
import GroceryItem from './groceryItem';

function GroceryTable(props) {
  let groceries = props.groceries.map(grocery => (
    <GroceryItem
      key ={grocery.id}
      id={grocery.id}
      onDelete={props.onDelete}
      onUpdate={props.onUpdate}
      name={grocery.itemName}
      location={grocery.locationName}
      amount={grocery.remainingAmount}
      unit={grocery.unitName}
    />
  ));
  return (
    <table style={{ 'minWidth': '510px' }} className='table table-striped table-bordered'>
      <colgroup>
        <col width='25%'/>
        <col width='20%'/>
        <col width='20%'/>
        <col width='35%'/>
      </colgroup>
      <thead className='thead-light'>
        <tr>
          <th>Item Name</th>
          <th>Amount</th>
          <th>Location</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
        {groceries}
      </tbody>
    </table>
  );
}

export default GroceryTable;

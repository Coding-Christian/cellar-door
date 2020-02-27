import React from 'react';
import GroceryItem from './groceryItem';

function GroceryTable(props) {
  let groceries;
  if (props.data.length) {
    groceries = props.data.map(grocery => (
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
  } else {
    groceries = (
      <tr>
        <td colSpan='4' className='text-center'>
          <h3 className='d-none d-md-inline-block text-center col-9'>No Groceries Here... Time to add some!</h3>
          <h6 className='d-md-none text-center'>No Groceries Here... Time to add some!</h6>
        </td>
      </tr>
    );
  }
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

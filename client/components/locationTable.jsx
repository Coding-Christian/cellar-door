import React from 'react';
import LocationItem from './locationItem';

function LocationTable(props) {
  let locations;
  if (props.locations.length) {
    locations = props.locations.map(location => (
      <LocationItem
        key={location.id}
        locationId={location.id}
        name={location.name}
        description={location.description}
        onDelete={props.onDelete}
        onUpdate={props.onUpdate}
      />
    ));
  } else {
    locations = (
      <tr>
        <td colSpan='3' className='text-center'>
          <h3 className='d-none d-md-inline-block text-center col-9'>No Locations Here... Time to add some!</h3>
          <h6 className='d-md-none text-center'>No Locations Here... Time to add some!</h6>
        </td>
      </tr>
    );
  }
  return (
    <table style={{ 'minWidth': '510px' }} className='table table-striped table-bordered'>
      <colgroup>
        <col width='25%'/>
        <col width='40%'/>
        <col width='35%'/>
      </colgroup>
      <thead className='thead-light'>
        <tr>
          <th>Location Name</th>
          <th>Description</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
        {locations}
      </tbody>
    </table>
  );
}

export default LocationTable;

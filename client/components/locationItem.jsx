import React from 'react';

class LocationItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: props.name, description: props.description };
    this.id = props.locationId;
    this.onDelete = props.onDelete;
  }
  render() {
    return (
      <tr>
        <td key='name'>{this.state.name}</td>
        <td key='description'>{this.state.description}</td>
        <td key='operations'>
          <div className="row">
            <div className='col-12 col-xl-4 my-1'>
              <button onClick={() => this.onDelete(this.id)} className={`btn btn-danger w-100`}>
                Delete
              </button>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

export default LocationItem;

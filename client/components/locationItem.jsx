import React from 'react';

class LocationItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: props.name, description: props.description };
    this.id = props.id;
  }
  render() {
    return (
      <tr>
        <td key='name'>{this.state.name}</td>
        <td key='description'>{this.state.description}</td>
        <td key='operations'>Not Available</td>
      </tr>
    );
  }
}

export default LocationItem;

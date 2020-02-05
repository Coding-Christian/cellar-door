import React from 'react';
import GroceryDetails from './groceryDetails';
import GroceryEdit from './groceryEdit';

class GroceryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      details: false,
      prevDetails: false,
      name: props.name,
      amount: `${props.amount} ${props.unit}`,
      location: props.location
    };
    this.id = props.id;
    this.onDelete = props.onDelete;
    this.onUpdate = props.onUpdate;
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleDetails = this.toggleDetails.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
  }
  updateInfo(name, amount, location) {
    let newAmount = this.state.amount.split(' ');
    newAmount[0] = amount;
    this.setState({ name, amount: newAmount.join(' '), location }, this.toggleEdit);
  }
  toggleDetails() {
    if (!this.state.editing) {
      this.setState({ details: !this.state.details });
    }
  }
  toggleEdit() {
    if (this.state.editing) {
      this.setState({ editing: false, details: this.state.prevDetails }, this.getAllGroceries);
    } else {
      this.setState({ editing: true, details: true, prevDetails: this.state.details });
    }
  }
  handleDelete() {
    if (!this.state.editing) {
      this.onDelete(this.id);
    }
  }
  render() {
    let infoElems;
    if (this.state.editing) {
      infoElems = (
        <GroceryEdit
          id={this.id}
          onUpdate={this.onUpdate}
          toggleEdit={this.toggleEdit}
          updateInfo={this.updateInfo}
        />
      );
    } else if (this.state.details) {
      infoElems = (<GroceryDetails id={this.id}/>);
    } else {
      infoElems = [
        <td key='name'>{this.state.name}</td>,
        <td key='amount'>{this.state.amount}</td>,
        <td key='location'>{this.state.location}</td>
      ];
    }
    return (
      <tr>
        {infoElems}
        <td>
          <div className='row'>
            <div className='col-12 col-xl-4 my-1'>
              <button
                onClick={this.toggleDetails}
                className={`btn btn-info w-100 ${this.state.editing ? 'disabled' : ''}`}
              >
                {this.state.details ? 'Less' : 'More'}
              </button>
            </div>
            <div className='col-12 col-xl-4 my-1'>
              <button onClick={this.toggleEdit} className='btn btn-outline-info w-100'>
                {this.state.editing ? 'Cancel' : 'Edit'}
              </button>
            </div>
            <div className='col-12 col-xl-4 my-1'>
              <button onClick={this.handleDelete} className={`btn btn-danger w-100 ${this.state.editing ? 'disabled' : ''}`}>
                Delete
              </button>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

export default GroceryItem;

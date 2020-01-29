import React from 'react';

class GroceryDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groceryItem: {
        name: '',
        category: '',
        location: { name: '', description: '' },
        amount: { initial: '', quantity: '', unit: '' },
        purchaseDate: '',
        expirationDate: '',
        notes: ''
      }
    };
    this.id = props.id;
  }
  getGroceryItemDetails() {
    fetch(`/api/groceries/${this.id}`)
      .then(response => response.json())
      .then(groceryItem => this.setState({ groceryItem }));
  }
  componentDidMount() {
    this.getGroceryItemDetails();
  }
  render() {
    const unit = this.state.groceryItem.amount.unit;
    const purchaseDate = this.state.groceryItem.purchaseDate.substring(0, 10);
    const expirationDate = this.state.groceryItem.expirationDate.substring(0, 10);
    return (
      <td colSpan="3" className='text-center'>
        <div className="row py-1">
          <div className="col-4">
            <h6>Name:</h6>
            {this.state.groceryItem.name}
          </div>
          <div className="col-4">
            <h6>Initial Amount:</h6>
            {this.state.groceryItem.amount.initial} {unit}
          </div>
          <div className="col-4">
            <h6>Remaining Amount:</h6>
            {this.state.groceryItem.amount.quantity} {unit}
          </div>
        </div>
        <hr/>
        <div className="row py-1">
          <div className="col-4">
            <h6>Category:</h6>
            {this.state.groceryItem.category}
          </div>
          <div className="col-4">
            <h6>Purchase Date:</h6>
            {(purchaseDate === '1900-01-01') ? '' : purchaseDate}
          </div>
          <div className="col-4">
            <h6>Expiration Date:</h6>
            {(expirationDate === '1900-01-01') ? '' : expirationDate}
          </div>
        </div>
        <hr/>
        <div className="row py-1">
          <div title={this.state.groceryItem.location.description} className="col-6">
            <h6>Location:</h6>
            {this.state.groceryItem.location.name}
          </div>
          <div className="col-6">
            <h6>Notes:</h6>
            {this.state.groceryItem.notes}
          </div>
        </div>
      </td>
    );
  }
}

export default GroceryDetails;

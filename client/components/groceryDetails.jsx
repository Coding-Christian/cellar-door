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
    const purchaseDate = this.state.groceryItem.purchaseDate.substring(0, 9);
    const expirationDate = this.state.groceryItem.expirationDate.substring(0, 9);
    return (
      <td colSpan="3" className='text-center'>
        <div className="row py-1">
          <span className="col-4">Name: {this.state.groceryItem.name}</span>
          <span className="col-4">Category: {this.state.groceryItem.category}</span>
          <span title={this.state.groceryItem.location.description} className="col-4">Location: {this.state.groceryItem.location.name}</span>
        </div>
        <hr/>
        <div className="row py-1">
          <span className="col-6 text-center">Initial Amount: {this.state.groceryItem.amount.initial} {unit}</span>
          <span className="col-6 text-center">Remaining Amount: {this.state.groceryItem.amount.quantity} {unit}</span>
        </div>
        <hr/>
        <div className="row py-1">
          <span className="col-4">Purchase Date: {purchaseDate}</span>
          <span className="col-4">Expiration Date: {expirationDate}</span>
          <span className="col-4">Notes: {this.state.groceryItem.notes}</span>
        </div>
      </td>
    );
  }
}

export default GroceryDetails;

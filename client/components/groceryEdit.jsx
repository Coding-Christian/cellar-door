import React from 'react';

class GroceryEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        title: 'Name',
        value: '',
        isValid: false,
        error: 'Name must be between 2 and 60 alphanumeric characters'
      },
      amount: {
        title: 'Amount',
        value: '',
        isValid: false,
        error: 'Please enter a valid number for the amount'
      },
      remainingAmount: {
        title: 'Remaining Amount',
        value: '',
        isValid: false,
        error: 'Please enter a valid number for the remaining amount'
      },
      unit: {
        title: 'Unit',
        value: '1',
        options: []
      },
      location: {
        title: 'Location',
        value: '1',
        options: []
      },
      category: {
        title: 'Category',
        value: '1',
        options: []
      },
      purchaseDate: {
        title: 'Purchase Date',
        value: ''
      },
      expirationDate: {
        title: 'Expiration Date',
        value: ''
      },
      notes: {
        title: 'Notes',
        value: '',
        error: 'Notes must be limited to 256 alphanumeric characters'
      }
    };
    this.id = props.id;
  }
  getGroceryItemDetails() {
    fetch(`/api/groceries/${this.id}`)
      .then(response => response.json())
      .then(groceryItem => this.setInitialValues(groceryItem));
  }
  setInitialValues(groceryItem) {
    const newState = {
      name: Object.assign(this.state.name),
      category: Object.assign(this.state.category),
      amount: Object.assign(this.state.amount),
      remainingAmount: Object.assign(this.state.remainingAmount),
      unit: Object.assign(this.state.unit),
      purchaseDate: Object.assign(this.state.purchaseDate),
      expirationDate: Object.assign(this.state.expirationDate),
      location: Object.assign(this.state.location),
      notes: Object.assign(this.state.notes)
    };
    newState.name.value = groceryItem.name;
    newState.category.value = groceryItem.category.id;
    newState.amount.value = groceryItem.amount.initial;
    newState.remainingAmount.value = groceryItem.amount.quantity;
    newState.unit.value = groceryItem.amount.unitId;
    newState.purchaseDate.value = groceryItem.purchaseDate;
    newState.expirationDate.value = groceryItem.expirationDate;
    newState.location.value = groceryItem.location.id;
    newState.notes.value = groceryItem.notes;
    this.setState(newState);
  }
  componentDidMount() {
    this.getGroceryItemDetails();
  }
  render() {
    return null;
  }
}

export default GroceryEdit;

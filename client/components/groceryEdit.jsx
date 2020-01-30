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
    this.handleChange = this.handleChange.bind(this);
  }
  getGroceryItemDetails() {
    fetch(`/api/groceries/${this.id}`)
      .then(response => response.json())
      .then(groceryItem => this.setInitialValues(groceryItem));
  }
  getAllLocations() {
    fetch('/api/locations')
      .then(response => response.json())
      .then(locations => {
        const location = Object.assign(this.state.location);
        location.options = locations;
        this.setState({ location });
      });
  }
  getAllUnits() {
    fetch('/api/units')
      .then(response => response.json())
      .then(units => {
        const unit = Object.assign(this.state.unit);
        unit.options = units;
        this.setState({ unit });
      });
  }
  getAllCategories() {
    fetch('/api/categories')
      .then(response => response.json())
      .then(categories => {
        const category = Object.assign(this.state.category);
        category.options = categories;
        this.setState({ category });
      });
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
    this.setState(newState, this.validateForm);
  }
  handleChange(event) {
    let newFieldState = Object.assign(this.state[event.target.id]);
    newFieldState.value = event.target.value;
    this.setState({ [event.target.id]: newFieldState }, this.validateForm);
  }
  validateForm() {
    const wordPatt = /[^\w\s]/g;
    const numPatt = /[^\d.]/g;
    let name = Object.assign(this.state.name);
    let amount = Object.assign(this.state.amount);
    let remainingAmount = Object.assign(this.state.remainingAmount);
    let notes = Object.assign(this.state.notes);
    name.isValid = !(wordPatt.test(name.value) || name.value.length < 2 || name.value.length > 60);
    amount.isValid = !(numPatt.test(amount.value) || isNaN(Number(amount.value)) || Number(amount.value) < 0);
    remainingAmount.isValid = !(numPatt.test(amount.value) || isNaN(Number(amount.value)) || Number(amount.value) < 0);
    notes.isValid = !(wordPatt.test(notes.value) || notes.value.length > 256);
    this.setState({ name, amount, remainingAmount, notes });
  }
  componentDidMount() {
    this.getAllLocations();
    this.getAllUnits();
    this.getAllCategories();
    this.getGroceryItemDetails();
  }
  render() {
    const categoryOptions = this.state.category.options.map(option => (
      <option key={option.id} value={option.id}>{option.name}</option>
    ));
    const locationOptions = this.state.location.options.map(option => (
      <option key={option.id} value={option.id}>{option.name}</option>
    ));
    const unitOptions = this.state.unit.options.map(option => (
      <option key={option.id} value={option.id}>{option.name}</option>
    ));
    return (
      <td colSpan="3" className='text-center'>
        <div className="row py-1">
          <div className="col-12 col-lg-4">
            <h6>Name:</h6>
            <input
              onChange={this.handleChange}
              placeholder={this.state.name.title}
              value={this.state.name.value}
              className={`form-control ${this.state.name.isValid ? 'is-valid' : 'is-invalid'}`}
              type='text'
              id='name'
              required
            />
          </div>
          <div className="col-12 col-lg-4">
            <h6>Initial Amount:</h6>
            <input
              onChange={this.handleChange}
              placeholder={this.state.amount.title}
              value={this.state.amount.value}
              className={`form-control ${this.state.amount.isValid ? 'is-valid' : 'is-invalid'}`}
              type='text'
              id='amount'
              required
            />
            <select
              onChange={this.handleChange}
              value={this.state.unit.value}
              className={`form-control`}
              id='unit'
            >
              {unitOptions}
            </select>
          </div>
          <div className="col-12 col-lg-4">
            <h6>Remaining Amount:</h6>
            <input
              onChange={this.handleChange}
              placeholder={this.state.remainingAmount.title}
              value={this.state.remainingAmount.value}
              className={`form-control ${this.state.remainingAmount.isValid ? 'is-valid' : 'is-invalid'}`}
              type='text'
              id='remainingAmount'
              required
            />
          </div>
        </div>
        <hr/>
        <div className="row py-1">
          <div className="col-12 col-lg-4">
            <h6>Category:</h6>
            <select
              onChange={this.handleChange}
              value={this.state.category.value}
              className={`form-control`}
              id='category'
            >
              {categoryOptions}
            </select>
          </div>
          <div className="col-12 col-lg-4">
            <h6>Purchase Date:</h6>
            <input
              type="date"
              onChange={this.handleChange}
              value={this.state.purchaseDate.value}
              className={`form-control`}
              id='purchaseDate'
            />
          </div>
          <div className="col-12 col-lg-4">
            <h6>Expiration Date:</h6>
            <input
              type="date"
              onChange={this.handleChange}
              value={this.state.expirationDate.value}
              className={`form-control`}
              id='expirationDate'
            />
          </div>
        </div>
        <hr/>
        <div className="row py-1">
          <div title='' className="col-12 col-lg-6">
            <h6>Location:</h6>
            <select
              onChange={this.handleChange}
              value={this.state.location.value}
              className={`form-control`}
              id='location'
            >
              {locationOptions}
            </select>
          </div>
          <div className="col-12 col-lg-6">
            <h6>Notes:</h6>
            <input
              onChange={this.handleChange}
              placeholder={this.state.notes.title}
              value={this.state.notes.value}
              className={`form-control ${this.state.notes.isValid ? 'is-valid' : 'is-invalid'}`}
              type='text'
              id='notes'
              required
            />
          </div>
        </div>
      </td>
    );
  }
}

export default GroceryEdit;

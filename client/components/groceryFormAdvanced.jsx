import React from 'react';
import InputField from './inputField';
import SelectField from './selectField';
import DateField from './dateField';
import TextField from './textField';

class GroceryFormAdvanced extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        title: 'Name',
        value: props.formValues.name,
        isValid: false,
        error: 'Name must be between 2 and 60 alphanumeric characters'
      },
      amount: {
        title: 'Amount',
        value: props.formValues.amount,
        isValid: false,
        error: 'Please enter a valid number for the amount'
      },
      unit: {
        title: 'Unit',
        value: props.formValues.unit,
        options: []
      },
      location: {
        title: 'Location',
        value: props.formValues.location,
        options: []
      },
      category: {
        title: 'Category',
        value: props.formValues.category,
        options: []
      },
      purchaseDate: {
        title: 'Purchase Date',
        value: (props.formValues.purchaseDate.length ? props.formValues.purchaseDate : this.getCurrentDate())
      },
      expirationDate: {
        title: 'Expiration Date',
        value: (props.formValues.expirationDate.length ? props.formValues.expirationDate : this.getCurrentDate())
      },
      notes: {
        title: 'Notes',
        value: props.formValues.notes,
        isValid: true,
        error: 'Notes must be limited to 256 alphanumeric characters'
      }
    };
    this.toggleForm = props.toggleForm;
    this.onSubmit = props.onSubmit;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }
  getCurrentDate() {
    const date = new Date();
    const formattedDate = date.toISOString().substring(0, 10);
    return formattedDate;
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
    let notes = Object.assign(this.state.notes);
    name.isValid = !(wordPatt.test(name.value) || name.value.length < 2 || name.value.length > 60);
    amount.isValid = !(numPatt.test(amount.value) || isNaN(Number(amount.value)) || Number(amount.value) < 0);
    notes.isValid = !(wordPatt.test(notes.value) || notes.value.length > 256);
    this.setState({ name, amount, notes });
  }
  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.name.isValid && this.state.amount.isValid) {
      const status = await this.onSubmit(
        this.state.name.value,
        this.state.category.value,
        this.state.amount.value,
        this.state.amount.value,
        this.state.unit.value,
        this.state.purchaseDate.value,
        this.state.expirationDate.value,
        this.state.location.value,
        this.state.notes.value
      );
      if (status < 300) {
        this.toggleForm();
      } else {
        this.setState({ error: 'Could not reach server. Please try again.' });
      }
    }
  }
  handleClear() {
    const newState = {
      name: Object.assign(this.state.name),
      category: Object.assign(this.state.category),
      amount: Object.assign(this.state.amount),
      unit: Object.assign(this.state.unit),
      purchaseDate: Object.assign(this.state.purchaseDate),
      expirationDate: Object.assign(this.state.expirationDate),
      location: Object.assign(this.state.location),
      notes: Object.assign(this.state.notes)
    };
    for (const property in newState) {
      if (property === 'name' || property === 'amount' || property === 'notes') {
        newState[property].value = '';
        newState[property].isValid = false;
      } else if (property === 'category' || property === 'unit' || property === 'location') {
        newState[property].value = '1';
      } else {
        newState[property].value = this.getCurrentDate();
      }
    }
    this.setState(newState, () => {
      this.getCurrentDate();
      this.getAllLocations();
      this.getAllUnits();
      this.getAllCategories();
    });
  }
  handleToggle() {
    const formValues = {};
    for (const field in this.state) {
      formValues[field] = this.state[field].value;
    }
    this.toggleForm(formValues);
  }
  componentDidMount() {
    this.getAllLocations();
    this.getAllUnits();
    this.getAllCategories();
    this.validateForm();
  }
  render() {
    let disabledClass = '';
    if (!this.state.name.isValid || !this.state.amount.isValid) {
      disabledClass = 'disabled';
    }
    return (
      <form onSubmit={this.handleSubmit} className='d-flex flex-column order-1 order-md-2 mb-4 col-12 col-md-3'>
        <div className="form-group mb-0">
          <InputField handleChange={this.handleChange} id='name' field={this.state.name} faClass='fas fa-pencil-alt'/>
          <InputField handleChange={this.handleChange} id='amount' field={this.state.amount} faClass='fas fa-weight'/>
          <SelectField handleChange={this.handleChange} id='unit' field={this.state.unit} faClass='fas fa-ruler-combined'/>
          <SelectField handleChange={this.handleChange} id='location' field={this.state.location} faClass='far fa-compass'/>
          <SelectField handleChange={this.handleChange} id='category' field={this.state.category} faClass='fas fa-list'/>
          <DateField handleChange={this.handleChange} id='purchaseDate' field={this.state.purchaseDate} faClass='far fa-calendar-alt'/>
          <DateField handleChange={this.handleChange} id='expirationDate' field={this.state.expirationDate} faClass='far fa-calendar-alt'/>
          <TextField handleChange={this.handleChange} id='notes' field = {this.state.notes} faClass='fas fa-sticky-note'/>
        </div>
        <button type='button' onClick={this.handleToggle} className='btn btn-link align-self-end px-0 mb-1'>- Advanced Options</button>
        <div>
          <button className={`btn btn-primary col-5 col-md-12 col-lg-4 offset-lg-3 mb-2 ${disabledClass}`} type='submit'>Submit</button>
          <button type='button' onClick={this.handleClear} className='btn btn-secondary col-5 col-md-12 col-lg-4 offset-2 offset-md-0 offset-lg-1 mb-2'>Clear</button>
        </div>
      </form>
    );
  }
}

export default GroceryFormAdvanced;

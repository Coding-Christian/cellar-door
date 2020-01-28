import React from 'react';
import InputField from './inputField';
import SelectField from './selectField';

class GroceryFormSimple extends React.Component {
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
      unit: {
        title: 'Unit',
        value: '1',
        options: []
      },
      location: {
        title: 'Location',
        value: '1',
        options: []
      }
    };
    this.toggleForm = props.toggleForm;
    this.onSubmit = props.onSubmit;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
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
  handleChange(event) {
    let newFieldState = Object.assign(this.state[event.target.id]);
    newFieldState.value = event.target.value;
    this.setState({ [event.target.id]: newFieldState });
  }
  validateForm() {
    // const wordPatt = /[^\w\s]/g;
    // const numPatt = /[^\d.]/g;
    // let name = Object.assign(this.state.name);
    // let course = Object.assign(this.state.course);
    // let grade = Object.assign(this.state.grade);
    // name.isValid = !(wordPatt.test(name.value) || name.value.length < 2 || name.value.length > 60);
    // course.isValid = !(wordPatt.test(course.value) || course.value.length < 2 || course.value.length > 60);
    // grade.isValid = !(numPatt.test(grade.value) || isNaN(Number(grade.value)) || Number(grade.value) < 0 || Number(grade.value) > 200);
    // this.setState({ name, course, grade });
  }
  async handleSubmit(event) {
    // event.preventDefault();
    // if (this.state.name.isValid && this.state.course.isValid && this.state.grade.isValid) {
    //   const status = await this.onSubmit(this.state.name.value, this.state.course.value, this.state.grade.value);
    //   if (status < 300) {
    //     this.handleClear();
    //   } else {
    //     this.setState({ error: 'Could not reach server. Please try again.' });
    //   }
    // }
  }
  handleClear() {
    const newState = {
      name: Object.assign(this.state.name),
      amount: Object.assign(this.state.amount),
      unit: Object.assign(this.state.unit),
      location: Object.assign(this.state.location)
    };
    for (const property in newState) {
      if (property === 'name' || property === 'amount') {
        newState[property].value = '';
        newState[property].isValid = false;
      } else {
        newState[property].value = '1';
      }
    }
    this.setState(newState, () => {
      this.getAllLocations();
      this.getAllUnits();
    });
  }
  componentDidMount() {
    this.getAllLocations();
    this.getAllUnits();
  }
  render() {
    let disabledClass = '';
    if (!this.state.name.isValid || !this.state.amount.isValid || !this.state.location.isValid) {
      disabledClass = 'disabled';
    }
    return (
      <form onSubmit={this.handleSubmit} className='d-flex flex-column order-1 order-md-2 mb-4 col-12 col-md-3'>
        <div className="form-group mb-0">
          <InputField handleChange={this.handleChange} id='name' field={this.state.name} faClass='fas fa-pencil-alt'/>
          <InputField handleChange={this.handleChange} id='amount' field={this.state.amount} faClass='fas fa-weight'/>
          <SelectField handleChange={this.handleChange} id='unit' field={this.state.unit} faClass='fas fa-ruler-combined'/>
          <SelectField handleChange={this.handleChange} id='location' field={this.state.location} faClass='far fa-compass'/>
        </div>
        <button onClick={this.toggleForm} className='btn btn-link align-self-end px-0 mb-1'>+ Advanced Options</button>
        <div>
          <button className={`btn btn-primary col-5 col-md-12 col-lg-4 offset-lg-3 mb-2 ${disabledClass}`} type='submit'>Submit</button>
          <button onClick={this.handleClear} className='btn btn-secondary col-5 col-md-12 col-lg-4 offset-2 offset-md-0 offset-lg-1 mb-2' type='button'>Clear</button>
        </div>
      </form>
    );
  }
}

export default GroceryFormSimple;

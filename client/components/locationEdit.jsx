import React from 'react';

class LocationEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        title: 'Name',
        value: props.name,
        isValid: true,
        error: 'Name must be between 2 and 60 alphanumeric characters'
      },
      description: {
        title: 'Description',
        value: props.description,
        isValid: true,
        error: 'Notes must be limited to 256 alphanumeric characters'
      }
    };
    this.id = props.id;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  validateForm() {
    const wordPatt = /[^\w\s]/g;
    let name = Object.assign(this.state.name);
    let description = Object.assign(this.state.description);
    name.isValid = !(wordPatt.test(name.value) || name.value.length < 2);
    description.isValid = !wordPatt.test(description.value);
    this.setState({ name, description });
  }
  handleChange(event) {
    let newFieldState = Object.assign(this.state[event.target.id]);
    newFieldState.value = event.target.value;
    this.setState({ [event.target.id]: newFieldState }, this.validateForm);
  }
  handleSubmit() {
    return null;
  }
  componentDidMount() {
    this.validateForm();
  }
  render() {
    let disabledClass = '';
    if (!this.state.name.isValid || !this.state.description.isValid) {
      disabledClass = 'disabled';
    }
    return (
      <td colSpan='2' className='text-center'>
        <div className="row">
          <div className="col-12 col-lg-6">
            <h6>Name:</h6>
            <input
              onChange={this.handleChange}
              placeholder={this.state.name.title}
              value={this.state.name.value}
              className={`form-control ${this.state.name.isValid ? 'is-valid' : 'is-invalid'}`}
              type='text'
              maxLength='32'
              id='name'
              required
            />
          </div>
          <div className="col-12 col-lg-6">
            <h6>Description:</h6>
            <textarea
              onChange={this.handleChange}
              placeholder={this.state.description.title}
              value={this.state.description.value}
              rows='1'
              maxLength='256'
              className={`form-control ${this.state.description.isValid ? 'is-valid' : 'is-invalid'}`}
              id='description'
              required
            ></textarea>
          </div>
          <div className="col-12 col-lg-6 offset-lg-3 mt-1">
            <button onClick={this.handleSubmit} className={`btn btn-success w-100 my-1 ${disabledClass}`}>Update</button>
          </div>
        </div>
      </td>
    );
  }
}

export default LocationEdit;

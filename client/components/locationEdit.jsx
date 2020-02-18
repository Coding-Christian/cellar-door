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
        value: props.description
      }
    };
    this.id = props.id;
  }
  handleChange(event) {
    return null;
  }
  handleSubmit() {
    return null;
  }
  render() {
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
              className='form-control is-valid'
              id='description'
              required
            ></textarea>
          </div>
          <div className="col-12 col-lg-6 offset-lg-3 mt-1">
            <button onClick={this.handleSubmit} className={`btn btn-success w-100 my-1`}>Update</button>
          </div>
        </div>
      </td>
    );
  }
}

export default LocationEdit;

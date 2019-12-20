import React from 'react';

class GradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      course: '',
      grade: '',
      error: ''
    };
    this.onSubmit = props.onSubmit;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }
  handleChange(event) {
    const field = event.target.id;
    const value = event.target.value;
    if (field === 'name') {
      this.setState({ name: value });
    } else if (field === 'course') {
      this.setState({ course: value });
    } else {
      this.setState({ grade: value });
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    const wordPatt = /\w*[!@#$%^&*()]+\w*/g;
    const { name, course } = this.state;
    const grade = Number(this.state.grade);
    if (name.match(wordPatt) || name.length < 2 || name.length > 60) {
      this.setState({ error: 'Name can be no longer than 60 characters and may not contain any special symbols' });
    } else if (course.match(wordPatt) || course.length < 2 || course.length > 60) {
      this.setState({ error: 'Course can be no longer than 30 characters and may not contain any special symbols' });
    } else if (isNaN(grade) || grade < 0 || grade > 200) {
      this.setState({ error: 'Please enter a valid grade' });
    } else {
      this.onSubmit(name, course, Number(grade));
      this.setState({ name: '', course: '', grade: '', error: '' });
    }
  }
  handleClear(event) {
    this.setState({ name: '', course: '', grade: '', error: '' });
  }
  render() {
    const { error } = this.state;
    let errorClass = '';
    if (error === '') { errorClass = ' d-none'; }
    return (
      <form onSubmit={this.handleSubmit} className='order-1 order-md-2 mb-4 col-xs-12 col-md-3'>
        <div className="form-group">
          <div className='input-group mb-2'>
            <div className="input-group-prepend">
              <div className="input-group-text"><i className='fas fa-user-graduate'></i></div>
            </div>
            <input onChange={this.handleChange} placeholder='Name' value={this.state.name} className='form-control' type='text' id='name'/>
          </div>
          <div className='input-group mb-2'>
            <div className="input-group-prepend">
              <div className="input-group-text"><i className='fas fa-book'></i></div>
            </div>
            <input onChange={this.handleChange} placeholder='Course' value={this.state.course} className='form-control' type='text' id='course'/>
          </div>
          <div className='input-group mb-2'>
            <div className="input-group-prepend">
              <div className="input-group-text"><i className='fas fa-percent'></i></div>
            </div>
            <input onChange={this.handleChange} placeholder='Grade' value={this.state.grade} className='form-control' type='text' id='grade'/>
          </div>
        </div>
        <button
          className='btn btn-primary col-5 col-md-12 col-lg-4 offset-lg-3 mb-2'
          type='submit'
        >
          Submit
        </button>
        <button
          onClick={this.handleClear}
          className='btn btn-secondary col-5 col-md-12 col-lg-4 offset-2 offset-md-0 offset-lg-1 mb-2'
          type='button'
        >
          Cancel
        </button>
        <div className={'alert alert-danger mt-4' + errorClass}>{this.state.error}</div>
      </form>
    );
  }
}

export default GradeForm;

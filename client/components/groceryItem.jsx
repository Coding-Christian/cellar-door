import React from 'react';
// import UpdateField from './updateField';

class Grade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // editing: false,
      name: props.name,
      amount: `${props.amount} ${props.unit}`,
      location: props.location
    };
    // this.initialInfo = { name: props.name, course: props.course, grade: props.grade };
    this.id = props.id;
    // this.onDelete = props.onDelete;
    // this.onUpdate = props.onUpdate;
    // this.resetInfo = this.resetInfo.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  // resetInfo() {
  //   let newState = {
  //     editing: false,
  //     name: Object.assign(this.state.name),
  //     course: Object.assign(this.state.course),
  //     grade: Object.assign(this.state.grade),
  //     error: ''
  //   };
  //   for (const field in newState) {
  //     if (field === 'editing' || field === 'error') {
  //       continue;
  //     }
  //     newState[field].value = this.initialInfo[field];
  //     newState[field].isValid = true;
  //   }
  //   this.setState(newState);
  // }
  // handleChange(event) {
  //   let newFieldState = Object.assign(this.state[event.target.id]);
  //   newFieldState.value = event.target.value;
  //   this.setState({ newFieldState }, this.validateForm);
  // }
  // validateForm() {
  //   const wordPatt = /[^\w\s]/g;
  //   const numPatt = /[^\d.]/g;
  //   let name = Object.assign(this.state.name);
  //   let course = Object.assign(this.state.course);
  //   let grade = Object.assign(this.state.grade);
  //   name.isValid = !(wordPatt.test(name.value) || name.value.length < 2 || name.value.length > 60);
  //   course.isValid = !(wordPatt.test(course.value) || course.value.length < 2 || course.value.length > 60);
  //   grade.isValid = !(numPatt.test(grade.value) || isNaN(Number(grade.value)) || Number(grade.value) < 0 || Number(grade.value) > 200);
  //   this.setState({ name, course, grade });
  // }
  // async handleSubmit() {
  //   if (this.state.name.isValid && this.state.course.isValid && this.state.grade.isValid) {
  //     const grade = {
  //       id: this.id,
  //       name: this.state.name.value,
  //       course: this.state.course.value,
  //       grade: this.state.grade.value
  //     };
  //     const status = await this.onUpdate(grade);
  //     if (status < 300) {
  //       this.setState({ editing: false, error: '' },
  //         () => {
  //           this.initialInfo = {
  //             name: this.state.name.value,
  //             course: this.state.course.value,
  //             grade: this.state.grade.value
  //           };
  //         }
  //       );
  //     } else {
  //       this.setState({ error: 'Could not reach server. Please try again.' });
  //     }
  //   }
  // }
  render() {
    let infoElems, btnElems;
    // if (this.state.error === '') {
    //   errorClass = 'd-none';
    // } else {
    //   errorClass = '';
    // }
    // if (!this.state.name.isValid || !this.state.course.isValid || !this.state.grade.isValid) {
    //   disabledClass = 'disabled';
    // } else {
    //   disabledClass = '';
    // }
    // if (this.state.editing) {
    //   btnElems = [
    //     <button onClick={ this.handleSubmit } key='confirm' className={`btn btn-success mr-1 ${disabledClass}`}>Confirm</button>,
    //     <button onClick={this.resetInfo} key='cancel' className='btn btn-secondary mr-1'>Cancel</button>
    //   ];
    //   infoElems = [
    //     <UpdateField key='name' id='name' handleChange={this.handleChange} field={this.state.name}/>,
    //     <UpdateField key='course' id='course' handleChange={this.handleChange} field={this.state.course}/>,
    //     <UpdateField key='grade' id='grade' handleChange={this.handleChange} field={this.state.grade}/>
    //   ];
    // } else {
    btnElems = [
      <button onClick={() => {} } key='edit' className='btn btn-primary mr-1'>Edit</button>,
      <button onClick={() => {} } key='delete' className='btn btn-danger'>X</button>
    ];
    infoElems = [
      <td key='name'>{this.state.name}</td>,
      <td key='amount'>{this.state.amount}</td>,
      <td key='location'>{this.state.location}</td>
    ];
    // }
    return (
      <tr>
        {infoElems}
        <td className='d-flex flex-wrap justify-content-end'>
          {/* <div className={'alert alert-danger w-100 ' + errorClass}>{this.state.error}</div> */}
          {btnElems}
        </td>
      </tr>
    );
  }
}

export default Grade;

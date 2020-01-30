import React from 'react';
import GroceryDetails from './groceryDetails';
import GroceryEdit from './groceryEdit';

class Grade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      details: false,
      prevDetails: false,
      name: props.name,
      amount: `${props.amount} ${props.unit}`,
      location: props.location
    };
    this.id = props.id;
    this.onDelete = props.onDelete;
    this.toggleDetails = this.toggleDetails.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }
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
  toggleDetails() {
    if (!this.state.editing) {
      this.setState({ details: !this.state.details });
    }
  }
  toggleEdit() {
    if (this.state.editing) {
      this.setState({ editing: false, details: this.state.prevDetails });
    } else {
      this.setState({ editing: true, details: true, prevDetails: this.state.details });
    }
  }
  render() {
    let infoElems;
    if (this.state.editing) {
      infoElems = (<GroceryEdit id={this.id}/>);
    } else if (this.state.details) {
      infoElems = (<GroceryDetails id={this.id}/>);
    } else {
      infoElems = [
        <td key='name'>{this.state.name}</td>,
        <td key='amount'>{this.state.amount}</td>,
        <td key='location'>{this.state.location}</td>
      ];
    }
    return (
      <tr>
        {infoElems}
        <td>
          <div className='row'>
            <div className='col-12 col-lg-4 my-1'>
              <button
                onClick={this.toggleDetails}
                className={`btn btn-info w-100 ${this.state.editing ? 'disabled' : ''}`}
              >
                {this.state.details ? 'Less' : 'More'}
              </button>
            </div>
            <div className='col-12 col-lg-5 my-1'>
              <button onClick={this.toggleEdit} className='btn btn-outline-info w-100'>
                {this.state.editing ? 'Clear' : 'Edit'}
              </button>
            </div>
            <div className='col-12 col-lg-3 my-1'>
              <button onClick={() => this.onDelete(this.id) } className='btn btn-danger w-100'>X</button>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

export default Grade;

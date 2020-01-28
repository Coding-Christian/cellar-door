import React from 'react';
import Header from './header';
import GroceryTable from './groceryTable';
import GroceryFormSimple from './groceryFormSimple';
import GroceryFormAdvanced from './groceryFormAdvanced';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      advancedForm: false,
      groceries: []
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteGroceryItem = this.deleteGroceryItem.bind(this);
    // this.updateGrade = this.updateGrade.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }
  getAllGroceries() {
    fetch('/api/groceries')
      .then(response => response.json())
      .then(groceries => this.setState({ groceries }));
  }
  // async addNewGrade(grade) {
  //   const config = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(grade)
  //   };
  //   try {
  //     const response = await fetch('/api/grades', config);
  //     this.getAllGrades();
  //     return response.status;
  //   } catch {
  //     this.getAllGrades();
  //     return 503;
  //   }
  // }
  // async updateGrade(grade) {
  //   const config = {
  //     method: 'PATCH',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(grade)
  //   };
  //   try {
  //     const response = await fetch(`/api/grades/${grade.id}`, config);
  //     this.getAllGrades();
  //     return response.status;
  //   } catch {
  //     this.getAllGrades();
  //     return 503;
  //   }
  // }
  deleteGroceryItem(groceryItemId) {
    fetch(`/api/groceries/${groceryItemId}`, { method: 'DELETE' })
      .then(() => {
        const groceries = this.state.groceries.filter(grocery => !(grocery.id === groceryItemId));
        this.setState({ groceries }, this.getAllGroceries);
      });
  }

  // getAverageGrade() {
  //   const grades = this.state.grades;
  //   if (grades.length === 0) { return 0; }
  //   let total = 0;
  //   for (let grade of grades) {
  //     total += grade.grade;
  //   }
  //   return Math.round(total / grades.length);
  // }
  // handleSubmit(name, course, grade) {
  //   const newGrade = { name, course, grade };
  //   return this.addNewGrade(newGrade);
  // }
  toggleForm() {
    this.setState({ advancedForm: !this.state.advancedForm });
  }
  componentDidMount() {
    this.getAllGroceries();
  }
  render() {
    return (
      <>
      <Header title='Cellar Door'/>
      <div className="sgt container mt-2">
        <div className="row">
          <GroceryTable onDelete={this.deleteGroceryItem} onUpdate={this.updateGrade} groceries={this.state.groceries}/>
          {this.state.advancedForm
            ? <GroceryFormSimple onSubmit={this.handleSubmit} toggleForm={this.toggleForm}/>
            : <GroceryFormAdvanced onSubmit={this.handleSubmit} toggleForm={this.toggleForm}/>
          }
        </div>
      </div>
      </>
    );
  }
}

export default App;

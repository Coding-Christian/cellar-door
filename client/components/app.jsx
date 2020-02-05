import React from 'react';
import Header from './header';
import GroceryTable from './groceryTable';
import GroceryFormAdvanced from './groceryFormAdvanced';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groceries: [],
      formValues: {
        name: '',
        amount: '',
        unit: 1,
        location: 1,
        category: 1,
        purchaseDate: '1900-01-01',
        expirationDate: '1900-01-01',
        notes: ''
      },
      formIsValid: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteGroceryItem = this.deleteGroceryItem.bind(this);
    this.updateGroceryItem = this.updateGroceryItem.bind(this);
    this.changeFormStatus = this.changeFormStatus.bind(this);
  }
  getAllGroceries() {
    fetch('/api/groceries')
      .then(response => response.json())
      .then(groceries => this.setState({ groceries }));
  }
  async addNewGrocery(grocery) {
    const config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(grocery)
    };
    try {
      const response = await fetch('/api/groceries', config);
      this.getAllGroceries();
      return response.status;
    } catch {
      this.getAllGroceries();
      return 503;
    }
  }
  async updateGroceryItem(groceryItem) {
    const config = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(groceryItem)
    };
    try {
      const response = await fetch(`/api/groceries`, config);
      return response.status;
    } catch {
      return 503;
    }
  }
  deleteGroceryItem(groceryItemId) {
    fetch(`/api/groceries/${groceryItemId}`, { method: 'DELETE' })
      .then(() => {
        const groceries = this.state.groceries.filter(grocery => !(grocery.id === groceryItemId));
        this.setState({ groceries }, this.getAllGroceries);
      });
  }
  handleSubmit(name, category, amount, amountRemaining, unit, purchaseDate, expirationDate, location, notes) {
    const newGrocery = { name, category, amount, amountRemaining, unit, purchaseDate, expirationDate, location, notes };
    return this.addNewGrocery(newGrocery);
  }
  changeFormStatus(status) {
    this.setState({ formIsValid: status });
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
          <GroceryTable
            onDelete={this.deleteGroceryItem}
            onUpdate={this.updateGroceryItem}
            groceries={this.state.groceries}
          />
          <GroceryFormAdvanced
            onSubmit={this.handleSubmit}
            toggleForm={this.toggleForm}
            formValues={this.state.formValues}
            changeFormStatus={this.changeFormStatus}
          />
        </div>
      </div>
      </>
    );
  }
}

export default App;

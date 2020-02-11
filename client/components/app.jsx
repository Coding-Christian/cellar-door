import React from 'react';
import Header from './header';
import GroceryTable from './groceryTable';
import GroceryForm from './groceryForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { groceries: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteGroceryItem = this.deleteGroceryItem.bind(this);
    this.updateGroceryItem = this.updateGroceryItem.bind(this);
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
  componentDidMount() {
    this.getAllGroceries();
  }
  render() {
    return (
      <>
      <Header title='Cellar Door'/>
      <div className="sgt container mt-2">
        <div className="row">
          <div className="table-responsive order-2 order-md-1 col-12 col-md-9">
            <GroceryTable
              onDelete={this.deleteGroceryItem}
              onUpdate={this.updateGroceryItem}
              groceries={this.state.groceries}
            />
          </div>
          <GroceryForm
            onSubmit={this.handleSubmit}
            toggleForm={this.toggleForm}
            formValues={this.state.formValues}
            changeFormStatus={this.changeFormStatus}
          />
        </div>
        {this.state.groceries.length
          ? null
          : (<>
              <h3 className='d-none d-md-inline-block text-center col-9'>No Groceries Here... Time to add some!</h3>
              <h6 className='d-md-none text-center'>No Groceries Here... Time to add some!</h6>
            </>)
        }
      </div>
      </>
    );
  }
}

export default App;

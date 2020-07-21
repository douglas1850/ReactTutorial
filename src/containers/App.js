import React, { Component } from 'react';
import './App.css';
import Cockpit from '../components/Cockpit/Cockpit'
import Persons from '../components/Persons/Persons';

class App extends Component {
  state = {
    // age is *not* in parenthesis here and note spaces before name and after age, also : not =
    persons: [
      { id: 'asdf', name: "Porg", age: 2 },
      { id: 'wert', name: "Jenn", age: 28 },
      { id: 'uyio', name: "Douglas", age: 27 }
    ],
    myNum: 0,
    showPersons: false
  }


  switchNameHandler = () =>{
    this.setState( {
      myNum: Math.floor(Math.random() * Math.floor(3))
    })
      //this.switchNameHandler() calls this function immediately (no click needed)
  //this.switchNameHandler isn't called until something invokes it  
  // onClick={() => this.switchNameHandler("some parameter")} could be used to pass a param on click
  // the more efficient way to do this is: onClick={this.switchNameHAndler.bind(this, "some parameter")}
  }

  onNameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      // goes through each person in persons. 
      // If a match is found with the given 'id', store it in personIndex
      // because we're using 'findIndex' we return the index of the match,
      // not the object itself
      return p.id === id;
    });

    const person = {...this.state.persons[personIndex]}; //create a copy of this person, don't reference the original

    person.name = event.target.value; //update the person name to whatever is typed into the input field

    const persons = [...this.state.persons]; //create a copy of the whole persons array, not just the one person element
    persons[personIndex] = person; //update this one person in the person array

    this.setState( { persons: persons } ); //update the original persons array with our newer one. state.persons : new.persons
  }

  togglePersonHandler = () => {
    this.setState({showPersons: !this.state.showPersons}) //invert showPersons current state
  }

  // delete a person from the persons list
  deletePersonHandler = (index) => {
    const persons = this.state.persons.slice(); //slice creates a new copy instead of referencing the original
    //can also do the above with: const persons = [...this.state.persons];
    persons.splice(index, 1); //remove the 'index' element of the persons array. 'index' is the starting position, '1' is how many to remove starting from 'index'
    this.setState({persons: persons});
  }


  render() {
    // you can call methods as props. We create a variable click={this.switchNameHandler}
    // which can be accessed in the person class with props.click

    let persons = null;

    if(this.state.showPersons) {
      persons = (
          <div>
            <Persons 
              persons={this.state.persons} 
              clicked={this.deletePersonHandler} 
              changed={this.onNameChangeHandler} />
          </div>
      );
    }

    return (
        <div className="App">
          <Cockpit title={this.props.title}
          persons={this.state.persons} 
          show={this.state.showPersons} 
          clicked={this.togglePersonHandler}/>
          {persons}
        </div>
    );
  }
}

//this.state.showPersons ? {do this if true} : {do this if false}

export default App;

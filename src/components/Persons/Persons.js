import React, { Component } from 'react';
import Person from './Person/Person';

class Persons extends Component {

    componentWillUnmount = () => {
        console.log("[Persons.js] component will unmount.")
        //executes right before this component is removed. 
    }

    shouldComponentUpdate (nextProps, nextState) {
        // if Cockpit is changed, it will cause App.js to re-render, which will 
        // make it call all of its methods, including this persons class.
        // this is ineffcient, so we use this method to ensure this class only re-renders
        // in the case that persons is modified. 
        return nextProps.persons !== this.props.persons;
    }
    render() {
        return this.props.persons.map((person, index) => {
            return (
            <Person 
            click={() => this.props.clicked(index)}
            name={person.name} 
            age={person.age}
            key={person.id}
            changed={(event) => this.props.changed(event, person.id)}/>
            );
        });
    }
}

export default Persons;
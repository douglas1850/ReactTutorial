import React, {useEffect} from 'react';
import styled from 'styled-components';


const StyledButton = styled.button`
    background-color: ${props => props.buttonShow ? 'red' : 'green'};
    color: white;
    font: inherit;
    border: 1px solid blue;
    padding: 8px;
    cursor: pointer;
    
    &:hover {
      background-color: ${props => props.buttonShow ? 'salmon' : 'lightgreen'};
      color: black;
    }
    `;

const cockpit = (props) => {
    // executes for every render cycle of cockpit 
    useEffect(() => {
        console.log('[Cockpit.js] useEffect')
        //HTTP requests...
        setTimeout(() => {
            alert('Saved data to cloud!');
        }, 1000);
        return () => {
            console.log("[Cockpit.js] cleanup work in useEffect");  
            // will only execute if the Cockpit component is removed
        }
    }, [props.persons]); //only activates on changes to persons
    //if we only wanted it to activate once, we'd pass an empty array [ ] instead of [props.persons]
    //can pass in multiple, comma seperated fields to depend on
    //can have multiple useEffects
    
    const classes = [];
    if(props.persons.length < 3) {
      classes.push('red'); // if there's less than 3 persons left, make text red
    }
    if(props.persons.length < 2) {
      classes.push('bold'); // if there's less than 2 persons left, make text bold
    }
    if(props.persons.length < 1) {
      classes.push('increase-size'); // if there's less than 1 persons left, make text bold
    }
    return (    
        <div>      
            <h1 style={{color: 'purple'}}>{props.title}</h1>
            <p className={classes.join(' ')}>Oh My Merp</p>
            <StyledButton 
            onClick={props.clicked}
            buttonShow={props.show}>
            Toggle Names
            </StyledButton>
        </div>
        );
}

export default cockpit;
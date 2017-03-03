import React from 'react';
import ReactDOM from 'react-dom';

/* use map */
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);

const listItems = numbers.map((number) =>
    <li>{number}</li>
);

// ReactDOM.render(
//     <ul>{listItems}</ul>,
//     document.getElementById('list-items')
// );

function ListItem(props) {
    const value = props.value;
    return (
        // Wrong! There is no need to specify the key here:
        <li key={value.toString()}>
            {value}
        </li>
    );
}

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
        // <li key={number}>{number * 4}</li>
        // Correct! Key should be specified inside the array.
        <ListItem key={number.toString()}
                  value={number} />
    );
    return (
        <ul>{listItems}</ul>
    );
}

// const todoItems = todos.map((todo) =>
//     <li key={todo.id}>
//         {todo.text}
//     </li>
// );

// const todoItems = todos.map((todo, index) =>
//     // Only do this if items have no stable IDs
//     <li key={index}>
//         {todo.text}
//     </li>
// );

ReactDOM.render(
//    <ul>{listItems}</ul>,
    <NumberList numbers={numbers}/>,
    document.getElementById('list-items')
);

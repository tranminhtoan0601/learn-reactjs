import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './styles.scss';
TodoList.propTypes = {
    todoList: PropTypes.array,
    onTodoClick: PropTypes.func,
};

TodoList.defaultProps = {
    todoList: [],
    onTodoClick:null,
};
// const abc = (i) => {
//     console.log(i)
//     if(i === 'completed') {
//         return 'todo-item'
//     }
// }
// className = {abc(todo.status)}
function TodoList({ todoList,onTodoClick }) {
    const test = 'dasda'
    const test_ada = `${test}/sdfsdfds`
    const handleTodoClick = (todo, idx) => {
        if (!onTodoClick) return;
        onTodoClick(todo, idx);
        // console.log(todo, idx);
    }

    return (
        <ul className='todo-list'>
            {todoList.map((todo,idx) => (
                <li 
                key={todo.id} 
                className = {classnames({
                    'todo-item': true,
                    completed :todo.status === 'completed'
                })} 
                // className = {todo.status === 'completed' ? 'todo-item' : ''}
                onClick ={() =>handleTodoClick(todo, idx)}
                >
                    {todo.title}
                    </li>
            ))}
        </ul>
    );
}

export default TodoList;
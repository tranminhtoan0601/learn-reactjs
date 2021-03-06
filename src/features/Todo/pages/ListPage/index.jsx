/** @format */

import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import TodoForm from '../../components/TodoForm';
import TodoList from '../../components/TodoList';
ListPage.propTypes = {};

function ListPage(props) {
  const initTodoList = [
    {
      id: 1,
      title: 'Eat',
      status: 'new',
    },

    {
      id: 2,
      title: 'Sleep',
      status: 'new',
    },
    {
      id: 3,
      title: 'Code',
      status: 'completed',
    },
  ];
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  // console.log(match);
  const [todoList, setTodoList] = useState(initTodoList);
  const [filteredstatus, setfilteredstatus] = useState(() => {
    const params = queryString.parse(location.search);
    // console.log(params);
    return params.status || 'al';
  });
  useEffect(() => {
    const params = queryString.parse(location.search);
    // console.log(params);
    setfilteredstatus(params.status || 'al');
  }, [location.search]);
  const handleTodoClick = (todo, idx) => {
    // console.log("handleTodoClick", todo, idx)

    const newTodoList = [...todoList];
    console.log(newTodoList[idx].status);
    const newTodo = {
      ...newTodoList[idx],
      status: newTodoList[idx].status === 'new' ? 'completed' : 'new',
    };
    newTodoList[idx] = newTodo;
    setTodoList(newTodoList);
  };
  const handleShowAllClick = () => {
    // setfilteredstatus('al');
    const queryParams = { status: 'al' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };
  const handleShowCompletedClick = () => {
    // setfilteredstatus('completed');
    const queryParams = { status: 'completed' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };
  const handleShowNewClick = () => {
    // setfilteredstatus('new');
    const queryParams = { status: 'new' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const renderedTodoList = useMemo(() => {
    return todoList.filter((todo) => filteredstatus === 'al' || filteredstatus === todo.status);
  }, [todoList, filteredstatus]);
  // console.log(renderedTodoList);
  
  const handleTodoFormSubmit = (values) =>{
    console.log('Form submit: ', values);
    const newTodo = {
      id:todoList.length +1,
      title:values.title,
      status: 'new',
    }
    const newTodoList =[...todoList, newTodo];
    setTodoList(newTodoList);
  };

  return (


    <div> 
      <h3> What to do1</h3>
      <TodoForm onSubmit={handleTodoFormSubmit}/>
     

      <h3> Todo List</h3>
      <TodoList todoList={renderedTodoList} onTodoClick={handleTodoClick} />

      <div>
        {/* {filteredstatus}; */}

        <button onClick={handleShowAllClick}> Show All</button>
        <button onClick={handleShowCompletedClick}> Show completed</button>
        <button onClick={handleShowNewClick}> Show New</button>
      </div>
    </div>
  );
}

export default ListPage;

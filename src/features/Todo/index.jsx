import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TodoList from './components/TodoList'
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';
import NotFound from '../../components/NotFound';

TodoFeature.propTypes = {
    
};

function TodoFeature(props) {
   const match1 = useRouteMatch();
   console.log(match1);
    
// console.log(renderedTodoList);
    return (
        <div>
            todo UI
           <Switch>
               <Route path={match1.path} component={ListPage} exact/>
               <Route path={`${match1.path}/:todoId`} component={DetailPage} exact />
               <Route component={NotFound}/>
           </Switch>
        </div>
    );
       
}

export default TodoFeature;
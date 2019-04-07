import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AddItem from './components/AddItem';
import SearchItem from './components/SearchItem';
import TableItem from './components/TableItem';

export default function App(props) {
  let data = JSON.parse(localStorage.getItem('todoList'));
  if(!data) {
    data = [];
  }
  
  const [todoList, setTodoList] = useState(data);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  })

  return (
    <div className="App">
      <Container>
        <Row>
          <Col className="title" md="12">
            <h1>Quản Lý Công Việc</h1>
          </Col>
        </Row>

        <AddItem
          onAddItem={
            newItem => setTodoList([
              ...todoList,
              newItem
            ])
          }
        />

        <SearchItem 
          items={todoList}
          onSearchItem={
            filtered => setFilter(filtered)
          }
          />

        <TableItem 
          items={filter.length > 0 ? filter : todoList}
          onChangeStatus={
            index => setTodoList([
              ...todoList.slice(0, index),
              { ...todoList[index], status: !todoList[index].status },
              ...todoList.slice(index + 1)
            ])
          }
          onDeleteItem={
            index => setTodoList([
              ...todoList.slice(0, index),
              ...todoList.slice(index + 1)
            ])
          }
          />

      </Container>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import uuid from 'uuid/v1';

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
  useEffect(() => { 
    localStorage.setItem('todoList', JSON.stringify(todoList));
  })

  const [show, setShow] = useState(false); // set Show Form
  const [isEditing, setIsEditing] = useState(false);
  const [valueEditing, setValueEditing] = useState({});
  const [todoList, setTodoList] = useState(data);
  const [filter, setFilter] = useState(null);
  const [reRender, setReRender] = useState(false);

  return (
    <div className="App">
      <Container>
        <Row>
          <Col className="title" md="12">
            <h1>Quản Lý Công Việc</h1>
          </Col>
        </Row>

        <AddItem
          reRender={reRender}
          show={show}
          isEditing={isEditing}
          valueEditing={valueEditing}
          toggle={() => {
            setReRender(!reRender);
              if(isEditing) {
                setIsEditing(false);
              } else {
                setShow(!show);
              }
            }
          }
          onAddItem={
            newItem => {
              let newList = [...todoList];
              if (!isEditing) {
                newList.push({ ...newItem, id: uuid() });
              } else {
                const index = todoList.findIndex(item => item.id === newItem.id);
                newList.splice(index, 1, newItem);
              }
              setTodoList(newList);
            }
          }
        />

        <SearchItem 

          />

        <TableItem
          items={filter ? filter : todoList}
          onChangeStatus={
            id => {
              const index = todoList.findIndex(item => item.id === id);
              let newList = [...todoList];
              newList[index].status = !newList[index].status;
              setTodoList(newList); 
            }
          }
          onDeleteItem={
            id => {
              const index = todoList.findIndex(item => item.id === id);
              setTodoList([
                ...todoList.slice(0, index),
                ...todoList.slice(index + 1)
              ]); 
            }
          }
          onEditItem={
            id => {
              const found = todoList.find(item => item.id === id);
              setValueEditing(found);
              setIsEditing(true);
              setShow(true);
              setReRender(!reRender);
            }
          }
          onFilter={
            (filterName, filterStatus) => {
              console.log(filterName, filterStatus);
              let newList = todoList.filter(item => item.title.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
              if (filterStatus === '1' || filterStatus === '2') {
                let status = null;
                switch (filterStatus) {
                  case '1': status = true; break;
                  default: status = false;
                }
                newList = newList.filter(item => item.status === status);
              }
              setFilter(newList);
            }
          }
          />

      </Container>
    </div>
  );
}

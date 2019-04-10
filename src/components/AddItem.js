import React, { useReducer, useEffect } from 'react';
import { Row, Col, Button, Toast, ToastBody, ToastHeader, Form, Input } from 'reactstrap';

export default function AddItem(props) {
  const { onAddItem, toggle, show, isEditing, valueEditing, reRender } = props;
  const initItem = {
    title: '',
    status: false
  }
  const [newItem, setItem] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
      initItem
  );

  useEffect(() => {
    if (isEditing) {
      setItem(valueEditing);
    } else {
      setItem(initItem);
    }
  }, [reRender])

  const onHandleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.name === 'status' ? JSON.parse(target.value) : target.value;
    setItem({ [name]: value });
  }

  const AddItem = event => {
    event.preventDefault();
    onAddItem(newItem);
    clearForm();
    toggle();
  }

  const clearForm = () => {
    setItem({
      title: '',
      status: false
    })
  }

  return (
    <Row className="AddItem">
      <Col sm="6" md="4">
        <br />
        <Button color="primary" onClick={toggle}>
          Thêm Công Việc
        </Button>
        <br />
        <br />
        <Toast isOpen={show}>
          <ToastHeader toggle={toggle}>{ isEditing === false ? 'Thêm Công Việc' : 'Cập Nhật Công Việc' }</ToastHeader>
          <ToastBody>
            <Form onSubmit={AddItem}>
              <Input placeholder="Tên" name="title" value={newItem.title} onChange={onHandleChange}/>
              <br />
              <Input type="select" name="status" value={newItem.status} onChange={onHandleChange}>
                <option value={true}>Kích Hoạt</option>
                <option value={false}>Ẩn</option>
              </Input>
              <br />
              <Button color="primary">Lưu Lại</Button>{' '}
              <Button onClick={clearForm} color="danger">Hủy Bỏ</Button>
            </Form>  
          </ToastBody>
        </Toast>
      </Col>
    </Row>
  );
}



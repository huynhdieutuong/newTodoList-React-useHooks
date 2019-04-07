import React, { useState, useReducer } from 'react';
import { Row, Col, Button, Toast, ToastBody, ToastHeader, Form, Input } from 'reactstrap';

export default function AddItem(props) {
  const { onAddItem } = props;
  const [show, setShow] = useState(false);
  // const [newItem, setItem] = useState({ title: '', status: true });
  const [newItem, setItem] = useReducer(
    (state, newState) => ({ ...state, ...newState}),
    {
      title: '',
      status: true
    }
  )

  const toggle = () => setShow(!show);

  const onHandleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.name === 'status' ? JSON.parse(target.value) : target.value;
    setItem({ [name]: value });
  }

  const AddItem = event => {
    event.preventDefault();
    onAddItem(newItem);

  }

  return (
    <Row className="AddItem">
      <Col sm="6" md="4">
        <br />
        <Button color="primary" onClick={toggle}>Thêm Công Việc</Button>
        <br />
        <br />
        <Toast isOpen={show}>
          <ToastHeader toggle={toggle}>Thêm công việc</ToastHeader>
          <ToastBody>
            <Form onSubmit={AddItem}>
              <Input placeholder="Tên" name="title" onChange={onHandleChange}/>
              <br />
              <Input type="select" name="status" onChange={onHandleChange}>
                <option value={true}>Kích Hoạt</option>
                <option value={false}>Ẩn</option>
              </Input>
              <br />
              <Button color="primary">Lưu Lại</Button>{' '}
              <Button color="danger">Hủy Bỏ</Button>
            </Form>  
          </ToastBody>
        </Toast>
      </Col>
    </Row>
  );
}



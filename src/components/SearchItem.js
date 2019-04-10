import React, { useState } from 'react';
import { Row, Col, Button, InputGroup, InputGroupAddon, Input } from 'reactstrap';

import Arrange from './Arrange';

export default function SearchItem(props) {
  const { items, onSearchItem, onSortItem } = props;

  const [filtered, setFiltered] = useState([]);

  const onHandleChange = event => {
    const filteredItems = items.filter(item => item.title.indexOf(event.target.value) !== -1);
    setFiltered(filteredItems);
  }

  const searchItem = () => {
    onSearchItem(filtered);
  }

  return (
    <Row className="AddItem">
      <Col md="6">
        <InputGroup>
          <Input 
            placeholder="Nhập từ khóa..."
            onChange={onHandleChange}
          />
          <InputGroupAddon addonType="prepend">
            <Button 
              color="success"
              className="btn-search"
              onClick={searchItem}
            >Tìm</Button>
          </InputGroupAddon>
        </InputGroup>
        <br />
      </Col>
      <Col md="4">
        <Arrange 
          onSortItem={onSortItem}
          filtered={filtered}
          />
      </Col>
    </Row>
  );
}

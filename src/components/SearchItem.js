import React, { useState } from 'react';
import { Row, Col, Button, InputGroup, InputGroupAddon, Input } from 'reactstrap';

import Arrange from './Arrange';

export default function SearchItem(props) {

  return (
    <Row className="AddItem">
      <Col md="6">
        <InputGroup>
          <Input 
            placeholder="Nhập từ khóa..."
          />
          <InputGroupAddon addonType="prepend">
            <Button 
              color="success"
              className="btn-search"
            >Tìm</Button>
          </InputGroupAddon>
        </InputGroup>
        <br />
      </Col>
      <Col md="4">
        <Arrange 
          />
      </Col>
    </Row>
  );
}

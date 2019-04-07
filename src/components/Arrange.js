import React from 'react';
import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';

export default function Arrange () {
  return (
    <UncontrolledButtonDropdown>
      <DropdownToggle caret color="success">
        Sắp xếp
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>Tên A-Z</DropdownItem>
        <DropdownItem>Tên Z-A</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Trạng thái kích hoạt</DropdownItem>
        <DropdownItem>Trạng thái ẩn</DropdownItem>
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  );
}
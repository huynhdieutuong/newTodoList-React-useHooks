import React from 'react';
import { Table, Badge, Button } from 'reactstrap';

export default function TableItem (props) {
  const { items, onChangeStatus, onDeleteItem } = props;

  const changeStatus = index => onChangeStatus(index);
  const deleteItem = index => onDeleteItem(index);

  return (
    <Table hover>
      <thead>
        <tr>
          <th>STT</th>
          <th>Tên</th>
          <th>Trạng Thái</th>
          <th>Hành Động</th>
        </tr>
      </thead>
      <tbody>
        {
          items.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{item.title}</td>
              <td>
                {
                  item.status === true ? 
                  <Badge color="danger" onClick={() => changeStatus(index)}>Kích Hoạt</Badge> : 
                  <Badge className="ml-3" color="secondary" onClick={() => changeStatus(index)}>Ẩn</Badge> 
                }
              </td>
              <td>
                <Button color="warning">Sửa</Button>{' '}
                <Button onClick={() => deleteItem(index)} color="danger">Xóa</Button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  );
}
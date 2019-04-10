import React from 'react';
import { Table, Badge, Button } from 'reactstrap';

export default function TableItem (props) {
  const { items, onChangeStatus, onDeleteItem, onEditItem } = props;

  const changeStatus = id => onChangeStatus(id);
  const deleteItem = id => onDeleteItem(id);
  const editItem = id => onEditItem(id);

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
                <Badge 
                  color={ item.status === true ? 'danger' : 'secondary' }
                  className={ item.status === true ? '' : 'ml-3' } 
                  onClick={() => changeStatus(item.id)}
                >{ item.status === true ? 'Kích Hoạt' : 'Ẩn' }</Badge>
              </td>
              <td>
                <Button onClick={() => editItem(item.id)} color="warning">Sửa</Button>{' '}
                <Button onClick={() => deleteItem(item.id)} color="danger">Xóa</Button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  );
}
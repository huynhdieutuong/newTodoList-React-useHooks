import React, { useReducer, useEffect } from 'react';
import { Table, Badge, Button } from 'reactstrap';

export default function TableItem (props) {
  const { items, onChangeStatus, onDeleteItem, onEditItem, onFilter } = props;
  const [filterValue, setFilterValue] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      filterName: '',
      filterStatus: 0
    }
  )
  const { filterName, filterStatus } = filterValue;

  const changeStatus = id => onChangeStatus(id);
  const deleteItem = id => onDeleteItem(id);
  const editItem = id => onEditItem(id);

  const onChangeFilter = event => {
    const { name, value } = event.target;
    setFilterValue({ [name]: value });
    onFilter(filterName, filterStatus);
  }

  useEffect(() => {
    onFilter(filterName, filterStatus);
  }, [filterValue]);

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
        <tr>
          <th></th>
          <td><input 
                style={{width: '100%', height: '35px' }} 
                type="text" 
                name="filterName"
                onChange={onChangeFilter}  
              /></td>
          <td>
            <select 
              style={{width: '100%', height: '35px' }}
              name="filterStatus"
              onChange={onChangeFilter}
            >
              <option value={0}>Tất Cả</option>
              <option value={1}>Kích Hoạt</option>
              <option value={2}>Ẩn</option>
            </select>
          </td>
          <td></td>
        </tr>
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
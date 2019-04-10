import React, { useState } from 'react';
import checkIcon from '../images/checked.svg';
import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';

export default function Arrange (props) {
  const { filtered, onSortItem } = props;

  const sortTypes = [
    { title: 'Tên A-Z', character: 'a-z'},
    { title: 'Tên Z-A', character: 'z-a'},
    { title: 'Trạng thái kích hoạt', character: 'true'},
    { title: 'Trạng thái ẩn', character: 'false'}
  ];

  const [sort, setSort] = useState('a-z');

  const sortItem = (character) => {
    switch (character) {
      case 'a-z':
        filtered.sort((a, b) => {
          const titleA = a.title.toUpperCase();
          const titleB = b.title.toUpperCase();
          return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
        });
        break;
      case 'z-a':
        filtered.sort((a, b) => {
          const titleA = a.title.toUpperCase();
          const titleB = b.title.toUpperCase();
          return titleA < titleB ? 1 : titleA > titleB ? -1 : 0;
        });
        break;
      case 'true':
        filtered.sort((a, b) => b.status - a.status);
        break;
      default:
        filtered.sort((a, b) => a.status - b.status);
        break;
    }
    setSort(character);
    onSortItem(filtered);
  }

  return (
    <UncontrolledButtonDropdown>
      <DropdownToggle caret color="success">
        Sắp xếp
      </DropdownToggle>
      <DropdownMenu>
        {
          sortTypes.map((type, index) => 
            <DropdownItem key={index} 
              onClick={() => sortItem(type.character)}
            >
              {type.title} { sort === type.character ? <img src={checkIcon} style={{width: 15}} alt="" /> : '' }
            </DropdownItem>
          )
        }
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  );
}
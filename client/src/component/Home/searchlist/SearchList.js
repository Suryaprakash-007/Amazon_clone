import React from 'react';
import { useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

function SearchList(props) {
  const navigate = useNavigate();

  var data = useSelector((state) => state.productsList.products);
  var filteredData = data?.filter((item) => {
    if (props.input === '') {
      return null;
    } else {
      return item.name.toLowerCase().includes(props.input);
    }
  });

  return (
    <div>
      {filteredData?.slice(0, 5).map((item) => {
        return (
          <MenuItem
            className="search_result"
            onClick={() => {
              props.inputhandler('');
              props.setInput('');
              navigate(`/productView/${item.id}`);
            }}
            key={item.id}
          >
            {item.name}
          </MenuItem>
        );
      })}
    </div>
  );
}

export default SearchList;

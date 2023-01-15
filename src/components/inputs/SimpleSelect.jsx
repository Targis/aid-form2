import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SimpleSelect = ({ setOption, options, current = '' }) => {


  const handleChange = (event) => {
    setOption(options.find(item => item.name === event.target.value));
  };

  return (
    <div>
      <FormControl variant="outlined" sx={{ m: 1, minWidth: 320 }}>
        <InputLabel>Оберіть послугу</InputLabel>
        <Select
          value={current}
          onChange={handleChange}
          label="Оберіть послугу"
        >
          {/* <MenuItem value="">
            <em>---</em>
          </MenuItem> */}

          {options.map(option => (
            <MenuItem key={option?.id} value={option?.name}>{option?.name}</MenuItem>
          ))}

        </Select>
      </FormControl>

    </div>
  );
}

export default SimpleSelect
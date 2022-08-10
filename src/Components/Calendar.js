import React, {useState,useEffect} from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';


export default function StaticDatePickerLandscape(props) {
  
  const [value, setValue] = useState(props.date);
  
  useEffect(() => {
    setValue(props.date)
}, [props.date]);


  return (
    <LocalizationProvider  dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        orientation="landscape"
        minDate={new Date('2022-01-01')}
        disableFuture
        label={'History'}
        openTo="day"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          props.addDate(newValue)
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CircularProgress,} from '@mui/material';



export default function ComboBox(props) {
  
  const value='';
  const [open, setOpen] = React.useState(false);
  const [options,setOptions] = React.useState([]);

  const loading = open && options.length === 0;
  
  React.useEffect(() => setOptions(props.words.map((e) => ({...e,label:e.name}))),[props.words]);
 
 

 



  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      value={value}
      clearOnBlur
      defaultValue
      clearOnEscape
      noOptionsText = 'Sorry, you did not add it!'
      loading={loading}
      onChange={(e,value) => {
        props.addDate(value.date[value.date.length-1],value.date[value.date.length-1]);
      }}
      options={options}
      sx={{  minWidth:'200px', flexGrow:1,mr:'4px',ml:'4px'}}
      renderInput={(params) =>
         <TextField {...params} label="Type your word" variant="standard" sx={{pb:'16px'}}  InputProps={{
          ...params.InputProps,
          endAdornment: (
            <React.Fragment>
               {loading && <CircularProgress color="inherit" size={20} />}
              {params.InputProps.endAdornment}
            </React.Fragment>
          ),
        }}      />}/>
  );
}



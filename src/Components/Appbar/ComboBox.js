import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CircularProgress,} from '@mui/material';


const loading = false ;

export default function ComboBox(props) {
  
  const value='';
  const loading=false;
  const words = props.words.map((e) => ({label:e.name, date:e.date}));

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      value={value}
      clearOnBlur
      defaultValue
      clearOnEscape
      noOptionsText = 'Sorry, you did not add it!'
      loading={loading}
      onChange={(e,value) => {
        props.addDate(value.date,value.date);
      }}
      options={words}
      sx={{  minWidth:'200px', flexGrow:1,mr:'4px',ml:'4px'}}
      renderInput={(params) =>
         <TextField {...params}  label="Type your word" variant="standard" sx={{pb:'16px'}}  InputProps={{
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

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

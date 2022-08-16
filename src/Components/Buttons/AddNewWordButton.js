import  {React,useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddNewWord(props) {
  
  const [open, setOpen] = useState(false);
  const [value,setValue] = useState({name:'',translation:''});
  const [inputName,setInputName] = useState({label:'Type a word.',warningColor:false});
  const [inputTranslation, setInputTranslation] = useState({label:'Type translation.', warningColor:false});
  const [disabled,setDisabled] = useState(true);
  
  console.log('Render Dialog!')

  const setInput= (id,error=false) => {
  
    switch(id){
      case 'name' : 
      setInputName((error) ? {label:'You added this one',warningColor:'warning'} : {label:'Type a word.',warningColor:false});
      (error) && setInputTranslation({label:'Additional word translation'});
      break;
      case 'translation' : setInputTranslation((error) ? {label:'You had this translation',warningColor:'warning'}:{label:'Type translation.'});
      (!error) && setDisabled(false);
      (error)  && setDisabled(true);
    }

  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValue({name:'',translation:''});
    setInputName({label:'Type a word.',warningColor:false});
    setDisabled(true);

  };
  const handleChange = (e) => {
    
    let wordsArr =  props.words.map((elem) => elem[e.target.id].toLowerCase());
    
    setValue({...value,[e.target.id]:e.target.value});

    if(wordsArr.includes(e.target.value.toLowerCase().trim())) { 

        setInput(e.target.id,true);
        
      } else {
        setInput(e.target.id);
      }
  };

  return (
    <div>
      <Button sx={props.sx} variant="outlined" onClick={handleClickOpen}>
        Add word
      </Button>
      <Dialog open={open} onClose={handleClose} sx={{borderRadius:'10px'}}>
        <DialogTitle >New word</DialogTitle>
        <DialogContent sx={{backgroundColor:'background.paper'}}>
          <TextField
            autoFocus
            autoComplete='off'
            color={inputName.warningColor}
            value={value.name}
            onChange={handleChange}
            margin="dense"
            id="name"     
            label={inputName.label}
            type="text"
            fullWidth
            variant="standard"
          />
         <TextField
            autoFocus
            value={value.translation}
            color={inputTranslation.warningColor}
            margin="dense"
            onChange={handleChange}
            id="translation"
            label={inputTranslation.label}
            type="text"
            autoComplete='off'
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions sx={{backgroundColor:'background.paper',}}>
          <Button onClick={handleClose}  sx={{mb:1}}>Cancel</Button>
          <Button onClick={handleClose} disabled={disabled} sx={{mr:1,mb:1}}>Add word</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

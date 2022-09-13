import  {React,useState,useRef} from 'react';
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
  const index = useRef(false);

  console.log('Render Dialog!')

  const setInput= (e) => {
    
    let id = e.target.id;
    let value = e.target.value

    console.log(index);
    

    switch(id){
      case 'name' : 
      let indexError = props.words.findIndex((elem) => elem.name.toLowerCase().trim() === value.toLowerCase().trim());
      if(indexError !== -1) {
        index.current = indexError;
        setInputName({label:'You added this one',warningColor:'warning'});
        setInputTranslation({label:'Additional word translation'});
      }
      break;

      case 'translation' :
      console.log(index.current);
      let error = (index.current) ? props.words[index.current].translation.map((elem) => elem.toLowerCase().trim())
      .includes(e.target.value.toLowerCase().trim()) : false;
      console.log(!error);
      
      if(error){
        setInputTranslation({label:'You had this translation',warningColor:'warning'}); 
        setDisabled(true);
      }  
      if(!error) {
        setDisabled(false);
        setInputTranslation((index.current) ? {label:'Another one translation'} : {label:'Translation of the word'})
      }
      break;
    }

  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {

    if(e.target.id === 'button-add-word') props.addNewWord({name:value.name,translation:value.translation,date:new Date()})
    setOpen(false);
    setValue({name:'',translation:''});
    setInputName({label:'Type a word.',warningColor:false});
    setDisabled(true);

   

  };
 
  const handleChange = (e) => {
    
    setValue({...value,[e.target.id]:e.target.value});
    setInput(e);
    
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
            onBlur={() => index.current = false}
            autoComplete='off'
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions sx={{backgroundColor:'background.paper',}}>
          <Button onClick={handleClose}  sx={{mb:1}}>Cancel</Button>
          <Button id='button-add-word' onClick={handleClose} disabled={disabled} sx={{mr:1,mb:1}}>Add word</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

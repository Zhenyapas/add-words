import  {React,useState,useRef, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';



export default function AddWord(props) {
  
  
  const [open, setOpen] = useState(false);

   const {register,handleSubmit,formState:{errors,isValid},reset,setError} = useForm({
     mode:'onChange',
 });

  const [value, setValue] = useState('')
  console.log("RENDER INPUTS");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    console.log(errors);
    setOpen(false);
    reset();
  };

  console.log((Object.keys(errors).length));

  const onSubmit = data => {
    console.log(data);
    handleClose()
  };


  

  return (
    <div>
      <Button sx={props.sx} variant="outlined" onClick={handleClickOpen}>
        Add word
      </Button>

      <Dialog open={open} onClose={handleClose} sx={{borderRadius:'10px'}}>

       <form noValidate onSubmit={handleSubmit(onSubmit)}>

        <DialogTitle >New word</DialogTitle>
        <DialogContent sx={{backgroundColor:'background.paper'}}>

            <TextField
              label='Name'
              autoFocus
              autoComplete='off'
              margin="dense"    
              type="text"
              fullWidth
              variant="standard"
              {...register('name', {
                required:true,
                maxLength:10,
                onChange: (e) => console.log(e) 
              })}
             
            /> 
            <TextField
                autoFocus
                label='Translation'
                margin="dense"
                type="text"
                autoComplete='off'
                fullWidth
                variant="standard"
               
                {...register('translation',{ required: true })}
              />
 
        </DialogContent>

        <DialogActions sx={{backgroundColor:'background.paper',}}>
          <Button onClick={handleClose}  sx={{mb:1}}>Cancel</Button>
          <Button id='button-add-word' type='submit' disabled={!isValid}  sx={{mr:1,mb:1}}>Add word</Button>
        </DialogActions>

       </form>

      </Dialog>
    </div>
  );
}

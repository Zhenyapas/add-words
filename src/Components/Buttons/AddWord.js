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
  

 

  const index = useRef(false);
  const index2 = useRef(false);
  const button = useRef();

  

   const {register,handleSubmit,formState:{errors,isValid},reset,setError,clearErrors} = useForm({
     mode:'onChange',
 });


  console.log("RENDER INPUTS");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
    index.current = false;
    reset();
  };

  const onSubmit = data => {
    console.log(data);
    handleClose()
  };

  const useTextFieldValidation = () => {

   

    let helperText,error,color;

    return (inputName = '') => {


    



      if(errors[inputName]) {
      
      error = true;
        switch (errors[inputName].type) {
          case 'required': 
            
            helperText = inputName + ' :Your field is empty!';
            break;
          case 'fieldName' :
            helperText = 'You had this word';

            if(index) {
            console.log('Works')
            error = false;
            color = 'warning';
           

            break;
          }
          case 'fieldTranslation':

            helperText ='Add another translation of this word.';
            if(index2.current === 'Error'){
              error = true;
              helperText=  'You had this translation!';
            }
      } 
    }
    


      return  { helperText,error,color} ;
    }

  }

  let textFieldValidation1 = useTextFieldValidation();
  let textFieldValidation2 = useTextFieldValidation();
  
 




  console.log(index);



  
  const checkNewWord = (e,inputName) => {

    console.log(errors);
   


    switch (inputName) {
 
      case 'name':

        let indexError = props.words.findIndex((elem) => (elem.name.toLowerCase().trim() === e.target.value.toLowerCase()));
        if(indexError !== -1) {

          index.current = indexError;
          console.log('you had this word');
         
        } else { 
          index.current = false;
        }

        break;
    
      case 'translation':

        let error = (index.current) ? props.words[index.current].translation.map((elem) => elem.toLowerCase().trim())
        .includes(e.target.value.toLowerCase().trim()) : false; 

        if(error){

           console.log('You had this word translation');
           index2.current='Error';
      
 
        } else { 
          index2.current = false;
         
        }


    }

  }

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
              fullWidth
              variant="standard"
              
              {...textFieldValidation1('name')}
              

              {...register('name', {
                required:true,
                hasTranslation:true,
                onChange: (e) => {
                  checkNewWord(e,'name');
                },
                validate : {
                  fieldName : (word) => {
                    if(index && !index2) return true;
                    return !(props.words.map((e) => e.name.toLowerCase()).some((elem) => word === elem.toLowerCase().trim() )) 
                  },
                }
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
                {...textFieldValidation2('translation')}

                {...register('translation',{ 
                  required: true,
                  onChange: (e) => {
                    checkNewWord(e,'translation');
                  },
                  validate : {
                    fieldTranslation: (word) => {
                      console.log(index2)
                      if(index2.current === 'Error') {
                       return !props.words[index.current].translation.map((elem) => elem.toLowerCase().trim())
                        .includes(word.toLowerCase().trim()) 
                      }
                      return true
                  }
                 }})}
              />
 
        </DialogContent>

        <DialogActions sx={{backgroundColor:'background.paper',}}>
          <Button onClick={handleClose}  sx={{mb:1}}>Cancel</Button>
          <Button id='button-add-word'  ref={button} type='submit' disabled={!isValid}  sx={{mr:1,mb:1}}>Add word</Button>
        </DialogActions>

       </form>

      </Dialog>
    </div>
  );
}

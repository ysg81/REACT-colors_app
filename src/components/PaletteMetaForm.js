import React,{useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

function PaletteMetaForm(props) {
  const [open, setOpen] = React.useState(false);
  const [newPaletteName, setNewPaletteName] = useState("")

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
      props.palettes.every(
        (paletteName) => paletteName.paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }, [newPaletteName])

  const handlePaletteNameChange = (e) => {
    setNewPaletteName(e.target.value)
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Input New Palette name
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>

        <ValidatorForm
          onSubmit={() => props.handleSubmit(newPaletteName)}
          style={{display: "flex", flexDirection: "column"}}
        >
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new palette.
            </DialogContentText>

            <TextValidator
              fullWidth
              margin="normal"
              placeholder="Palette Name"
              name="newPaletteName"
              value={newPaletteName}
              onChange={handlePaletteNameChange}  
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={['Enter Palette Name!', 'Name already used!']}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              >
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}

export default PaletteMetaForm

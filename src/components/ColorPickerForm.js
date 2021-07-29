import React,{useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker} from 'react-color';

function ColorPickerForm(props) {

  const {paletteIsFull, addNewColor, colors} = props
  const [currentColor, setCurrentColor] = useState("black")
  const [newColorName, setNewColorName] = useState("")

  const updateCurrentColor = (newColor) => {
    setCurrentColor(newColor.hex)
  }
  const handleColorNameChange = (e) => {
    setNewColorName(e.target.value)
  }
  const handleSubmit = () => {
    const newColor = {
      color: currentColor,
      name: newColorName
    }
    addNewColor(newColor)
  }
  useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', value => 
      colors.every(
        (color) => color.name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule('isColorUnique', value => 
      colors.every(
        (color) => color.color !== currentColor
      )
    );
  }, [colors, currentColor])
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}>
      <ChromePicker
        color={currentColor}
        onChangeComplete={updateCurrentColor}
        />
      <ValidatorForm
        onSubmit={handleSubmit}
        style={{display: "flex", flexDirection: "column", width: "100%"}}
      >
        <TextValidator
          placeholder="Color Name"
          margin="normal"
          variant="filled"
          name="newColorName"
          value={newColorName}
          onChange={handleColorNameChange}
          validators={['required', 'isColorNameUnique', 'isColorUnique']}
          errorMessages={[
            'Enter a color name!',
            'Color name must be unique!',
            'Color already used!'
          ]}
          style={{margin: "15px 0", backgroundColor: "rgba(0,0,0,0.1)", width: "100%", }}
        />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          style={{backgroundColor: paletteIsFull ? "grey" : currentColor, padding: "16px 0", width: "100%"}}
          disabled={paletteIsFull}
        >
          <span style={{fontSize: "20px", fontWeight: "600"}}>{paletteIsFull ? "Palette Full" : "Add Color"}</span>
        </Button>
      </ValidatorForm>
    </div>
  )
}

export default ColorPickerForm

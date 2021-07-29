import React,{useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker} from 'react-color';

function ColorPickerForm(props) {

  const {paletteIsFull, addNewColor, colors} = props
  const [currentColor, setCurrentColor] = useState("white")
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
    <div>
      <ChromePicker 
          color={currentColor}
          onChangeComplete={updateCurrentColor}
        />
        <ValidatorForm
          onSubmit={handleSubmit}
          style={{display: "flex"}}  
        >
          <TextValidator
            name="newColorName"
            value={newColorName}
            onChange={handleColorNameChange}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={[
              'Enter a color name!',
              'Color name must be unique!',
              'Color already used!'
            ]}
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            style={{backgroundColor: paletteIsFull ? "grey" : currentColor}}
            disabled={paletteIsFull}
          >
            {paletteIsFull ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
    </div>
  )
}

export default ColorPickerForm

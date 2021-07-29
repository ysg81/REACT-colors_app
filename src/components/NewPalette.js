import React,{useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker} from 'react-color';
import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';
import { arrayMove } from 'react-sortable-hoc';


const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function NewPalette(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  
  const [currentColor, setCurrentColor] = useState("")
  const [colors, setColors] = useState(props.palettes[0].colors)
  const [newColorName, setNewColorName] = useState("")
  const [maxColor, setMaxColor] = useState(20)

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  
  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const updateCurrentColor = (newColor) => {
    setCurrentColor(newColor.hex)
  }
  const addNewColor = () => {
    const newColor = {
      color: currentColor,
      name: newColorName
    }
    setColors([...colors, newColor])
  }
  const handleColorNameChange = (e) => {
    setNewColorName(e.target.value)
  }
  const handleSubmit = (newPaletteName) => {
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, "-"),
      colors: colors
    }
    props.savePalette(newPalette)
    props.history.push("/")
  }
  const removeColor = (colorName) => {
    setColors(colors.filter(color => (
      color.name !== colorName
    )))
  }
  const clearPalette = () => {
    setColors([])
  }
  const addRandomColor = () => {
    const allColor = props.palettes.map(p => p.colors).flat()
    const idx = Math.floor(Math.random() * allColor.length)
    const randomColor = allColor[idx]
    setColors([...colors, randomColor])
  }
  const onSortEnd = ({oldIndex, newIndex}) => {
    setColors(arrayMove(colors, oldIndex, newIndex))
  }
  useEffect(() => {
    // console.log(colors)
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
  }, [currentColor, colors, newColorName])

  return (
    <div className={classes.root}>
      <PaletteFormNav
        open={open}
        classes={classes}
        palettes={props.palettes}
        colors={colors}
        handleDrawerOpen={handleDrawerOpen}
        handleSubmit={handleSubmit}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <Typography variant="h4">Design Your Palette!</Typography>
        <div>
          <Button variant="contained" color="secondary" onClick={clearPalette}>Clear Palette</Button>
          <Button variant="contained" color="primary" onClick={addRandomColor} disabled={colors.length >= maxColor}>Random Color</Button>
        </div>
        <ChromePicker 
          color={currentColor}
          onChangeComplete={updateCurrentColor}
        />
        <ValidatorForm
          onSubmit={addNewColor}
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
            style={{backgroundColor: colors.length >= maxColor ? "grey" : currentColor}}
            disabled={colors.length >= maxColor}
          >
            {colors.length >= maxColor ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader}/>
        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
        />
      </main>
    </div>
  );
}

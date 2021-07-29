import React,{useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker} from 'react-color';
import DraggableColorBox from './DraggableColorBox';

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
  const [colors, setColors] = useState([])
  const [newColorName, setNewColorName] = useState("")
  const [newPaletteName, setNewPaletteName] = useState("")
  
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
  const handlePaletteNameChange = (e) => {
    setNewPaletteName(e.target.value)
  }
  const handleSubmit = () => {
    let newName = newPaletteName;
    const newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, "-"),
      colors: colors
    }
    props.savePalette(newPalette)
    props.history.push("/")
  }
  useEffect(() => {
    console.log(colors)
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
    ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
      props.palettes.every(
        (paletteName) => paletteName.paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }, [currentColor, colors, newColorName])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        color='default'
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
          <ValidatorForm onSubmit={handleSubmit} style={{display: "flex"}}>
            <TextValidator
              name="newPaletteName"
              value={newPaletteName}
              onChange={handlePaletteNameChange}  
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={['Enter Palette Name!', 'Name already used!']}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Save Palette
            </Button>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
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
          <Button variant="contained" color="secondary">Clear Palette</Button>
          <Button variant="contained" color="primary">Random Color</Button>
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
            style={{backgroundColor: currentColor}}
          >
            Add Color
          </Button>
        </ValidatorForm>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader}/>
        {colors.map(color => (
          <DraggableColorBox color={color.color} name={color.name}/>
        ))}
      </main>
    </div>
  );
}

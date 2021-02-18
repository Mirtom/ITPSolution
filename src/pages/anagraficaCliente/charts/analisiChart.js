import React, {useState } from 'react'
import { makeStyles, createMuiTheme, ThemeProvider, responsiveFontSizes  } from "@material-ui/core/styles"
import { Box, Button, Container, Typography } from "@material-ui/core"
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Sector, Cell} from 'recharts'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
    Header:{
      backgroundColor: "white",
      boxShadow: "1px 3px 1px #9a9a9a",
      paddingTop:10,
      paddingBottom:10,
    },
    holder:{
      marginTop:40,
      backgroundColor:'white'
    },
    standardRowImage:{
      height:50,
    },
    standardRowImageSMALL:{
      height:22,
      marginRight:10
    },
    toolbarOrder:{
      display:'flex',
      justifyContent:'space-between',
      paddingRight:'2%'
    },
    headerPart:{
      display:'flex',
      justifyContent:'space-between',
      paddingLeft:15,
      paddingRight:15,
      alignItems:'center'
    },
    headerRow:{
      width:'auto',
      alignItems:'center',
      display:'flex',
      justifyContent:'space-between'
    },
    headerText:{
      fontSize:20,
      color:'#898989'
    },
    boldHeaderText:{
      fontSize:30,
      color:'#71A8DB',
      fontWeight:'bold'
    },
    pulsanteAttivita:{
      borderRadius:20,
      padding:'5px 50px',
      border:'1px solid #5692d8',
      fontWeight:'bold',
      letterSpacing:'.05em',
      color:'#5692d8'
    },
    "&:hover":{
      backgroundColor:'transparent'
    },
    activityRowMenu:{
      paddingRight:10,
      marginRight:20
    },
    analisiChart:{
      display:'flex',
      width:'40%',
      backgroundColor:'white'
    },
    analisiChartRight:{
      marginLeft:20,
      height:200,
      width:200
    },
    buttonAnalisi:{
      borderColor:'#8a8a8a',
      color:'#535353',
      margin:'0 auto',
      marginTop:10,
      width:150,
      '&:hover': {
        borderColor:'#A5D7CF',
        backgroundColor: 'transparent !important',
      }
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      width: 'fit-content',
    },
    formControl: {
      marginTop: theme.spacing(2),
      minWidth: 120,
    },
    formControlLabel: {
      marginTop: theme.spacing(1),
    },
    partTitle:{
      paddingLeft:70,
      paddingTop:15,
      fontWeight:'bold',
      letterSpacing:'.05em',
      color:'#535353'
    }
  }))

const AnalisiChart = ({chartData}) => {
  const analisiPieChart = [
    { name: 'Ordinari', value: 17 },
    { name: 'Straordinari', value: 6 },
  ];
  const COLORS = ['#4D8AFF', '#FE5461'];

  const dataFiltered = (data) => {
    if(startMonth != 0 && endMonth != 0) {
      return data.filter( item => (item.name >= startMonth && item.name <= endMonth) )
      console.log('dasd')
    }else{
      return data
    }
  }
  //Function filter chart anagrafica
  const classes = useStyles();
  const { innerWidth: width, innerHeight: height } = window;
  //Dialog items
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //Dialog states
  const [startMonth,setStartMonth] = useState(0)
  const [endMonth,setEndMonth] = useState(0)


  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme);

    return (
            <>{/* DIALOG FORM FILTER DATA*/}
              <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
              <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Periodo grafico
              </DialogTitle>
              <DialogContent dividers>
                <Typography gutterBottom>
                  Seleziona il periodo dei grafici
                </Typography>
                <Box style={{display:'flex',justifyContent:'space-between'}}>
                  <Select
                    style={{width:'45%'}}
                    labelId="demo-simple-select-labell"
                    id="demo-simple-selectt"
                    value={startMonth}
                    onChange={(e) => setStartMonth(e.target.value)}
                  >
                    <MenuItem value={1}>Gennaio</MenuItem>
                    <MenuItem value={2}>Febbraio</MenuItem>
                    <MenuItem value={3}>Marzo</MenuItem>
                    <MenuItem value={4}>Aprile</MenuItem>
                    <MenuItem value={5}>Maggio</MenuItem>
                    <MenuItem value={6}>Giugno</MenuItem>
                    <MenuItem value={7}>Luglio</MenuItem>
                    <MenuItem value={8}>Agosto</MenuItem>
                    <MenuItem value={9}>Settembre</MenuItem>
                    <MenuItem value={10}>Ottobre</MenuItem>
                    <MenuItem value={11}>Novembre</MenuItem>
                    <MenuItem value={12}>Dicembre</MenuItem>
                  </Select>
                  <Select
                    style={{width:'45%'}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={endMonth}
                    onChange={(e) => setEndMonth(e.target.value)}
                  >
                    <MenuItem value={1}>Gennaio</MenuItem>
                    <MenuItem value={2}>Febbraio</MenuItem>
                    <MenuItem value={3}>Marzo</MenuItem>
                    <MenuItem value={4}>Aprile</MenuItem>
                    <MenuItem value={5}>Maggio</MenuItem>
                    <MenuItem value={6}>Giugno</MenuItem>
                    <MenuItem value={7}>Luglio</MenuItem>
                    <MenuItem value={8}>Agosto</MenuItem>
                    <MenuItem value={9}>Settembre</MenuItem>
                    <MenuItem value={10}>Ottobre</MenuItem>
                    <MenuItem value={11}>Novembre</MenuItem>
                    <MenuItem value={12}>Dicembre</MenuItem>
                  </Select>
                </Box>
                
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                  Filtra
                </Button>
              </DialogActions>
            </Dialog>
            <Box style={{backgroundColor:'white',marginBottom:50}}>
            <ThemeProvider theme={theme}>
              <Typography variant='h5' className={classes.partTitle}>ANALISI MANUTENZIONE</Typography>
            </ThemeProvider>
            <Box className={classes.analisiChart} >
              
              <BarChart width={(width / 100) * 45} height={400} data={dataFiltered(chartData)}
                      margin={{top: 20, right: 30, bottom: 5}}>
                      <CartesianGrid strokeDasharray="4 3"/>
                      <XAxis dataKey="code"/>
                      <YAxis/>
                      <Tooltip/>
                      <Bar barSize={20} dataKey="Ordinari" stackId="a" fill="#4D8AFF" />
                      <Bar barSize={20} dataKey="Straordinari" stackId="a" fill="#FE5461" />
              </BarChart>
              <Box className={classes.analisiChartRight}>
              <div style={{width:150,height:150}}>
                  <ResponsiveContainer>
                  <PieChart>
                      <Pie
                      data={analisiPieChart}
                      innerRadius={30}
                      outerRadius={40}
                      fill="#8884d8"
                      paddingAngle={3}
                      >
                      {
                          analisiPieChart.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                      }
                      </Pie>
                  </PieChart>
                  </ResponsiveContainer>
              </div>
              <Box style={{display:'flex',flexDirection:'column'}}>
                  <Button onClick={handleClickOpen} variant="outlined" color="primary" className={classes.buttonAnalisi}>
                  Periodo
                  </Button>
                  <Button variant="outlined" color="primary" className={classes.buttonAnalisi}>
                  Report
                  </Button>
              </Box>
              </Box>
            </Box>
            </Box>
            
            
        </>
    );
}

export default AnalisiChart
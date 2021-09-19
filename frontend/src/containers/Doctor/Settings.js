import React from 'react';
import './style.css';

import Telemedicine from './settings/TelemedicineSetting';
import PasswordSetting from './settings/PasswordSetting';
import GeneralSetting from './settings/GeneralSetting';
import HolidaySetting from './settings/HolidaySetting';
import PaymentSetting from './settings/PaymentSetting';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    width: '100%',
    marginTop:90,
    alignContent:'center',
    // textAlign:'center',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <div  className={classes.root}>
    <div className="mx-4">
      <AppBar position="static" color="default" style={{marginLeft:'auto',marginRight:'auto',marginBottom:50}}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="General" {...a11yProps(0)} />
          <Tab label="Password" {...a11yProps(1)} />
          <Tab label="Telemede" {...a11yProps(2)} />
          <Tab label="Payments" {...a11yProps(3)} />
          {/* <Tab label="Payments" {...a11yProps(4)} /> */}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <GeneralSetting style={{marginTop:20,width:'100%'}}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PasswordSetting style={{marginTop:20,width:'100%'}}/>
      </TabPanel>
      <TabPanel value={value} index={2} >
        <Telemedicine style={{marginTop:20,width:'100%'}}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <PaymentSetting style={{width:'100%'}}/>
      </TabPanel>
      {/* <TabPanel value={value} index={4}>
        <PaymentSetting style={{width:'100%'}}/>
      </TabPanel> */}
    </div>
    </div>
  );
}

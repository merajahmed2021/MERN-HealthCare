import React from 'react';
import Footer from '../../components/Footer';

import Grid from '@material-ui/core/Grid';

const About = () => {
    return (
       <div>
         <div style={{height:'100vh',background:'lightgray'}}>
          <div style={{textAlign:'center',paddingTop:'20vh'}}>
               <h1 >Why to use us?</h1>
          </div>
          <Grid>
             <Grid lg={6} xs={12}></Grid>
             <Grid lg={6} xs={12}></Grid>
          </Grid>
         </div>
         <div style={{height:'100vh',background:'pink'}}>
          <div style={{textAlign:'center',paddingTop:'20vh'}}>
               <h1 >Why to teacher uses us?</h1>
          </div>
          <Grid>
             <Grid lg={6} xs={12}></Grid>
             <Grid lg={6} xs={12}></Grid>
          </Grid>
         </div>
         <div style={{height:'100vh',background:'lightgreen'}}>
          <div style={{textAlign:'center',paddingTop:'20vh'}}>
               <h1  >Why to students uses us?</h1>
          </div>
          <Grid>
             <Grid lg={6} xs={12}></Grid>
             <Grid lg={6} xs={12}></Grid>
          </Grid>
         </div>
         <Footer/>
      </div>
    );
}
export default About;
import React,{useEffect,useState} from 'react';

import {
  GetPostbyId,GetLatestPost
} from "../../actions/posts";

import { NavLink} from 'react-router-dom';
// import Footer from '../../components/Footer';
import { useHistory, useParams } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';



import Divider from '@material-ui/core/Divider';


const Doctor=[
  {
    id:1,
    name:'Meraj'
  },
  {
    id:1,
    name:'Akhlakh'
  },
  {
    id:1,
    name:'Rehan'
  },
]
  





export default function Blogs() {

  const { id } = useParams();
  // console.log(id);
  
  const [doctor, setdoctor] = useState([]);
  console.log(doctor);

  const [latestPost, setlatestPost] = useState([])

  useEffect(() => {
    GetPostbyId(id).then((data)=>{
       setdoctor(data);
   });
   GetLatestPost().then((data)=>{
     setlatestPost(data);
   }) 
  }, [])


  const ViewPost=(post)=>{
  //  console.log(post._id,post);
   setdoctor(post);
  }

      

    return (
        <div style={{marginTop:70,background:'rgb(243, 242, 239)'}}>
                  <div >
                      <Grid container style={{padding:0}}>
                      <Grid item lg={9} xs={12}>
                        <Card  elevation={6} className='ml-2' style={{margin:'50px 10px',background:'rgb(243, 242, 239)'}}>
                          <CardMedia style={{height:280}}
                            image={"http://localhost:5000/images/" + doctor.image}
                          />                        
                          <CardContent style={{marginTop:10}}>
                            <div>
                                <p style={{marginTop:20,fontSize:'21px'}}>  {doctor.title}</p>  
                            </div>
                              <Divider style={{backgroundColor:'gray',marginTop:30}}/>
                              <Card className='mt-4' variant='outlined' style={{borderRadius:20}}>
                                <CardContent>
                                <p style={{color: '#02475b',fontSize:'16px',lineHeight:'25px'}}>
                                     {doctor.content}
                                   </p>
                                   <p style={{color: '#02475b',fontSize:'16px',lineHeight:'25px'}}>
                                     {doctor.description}
                                   </p> 
                                </CardContent>
                              </Card>
                          </CardContent>
                        </Card>
                      </Grid>
                    
                        <Grid item lg={3} xs={12}>
                            <div  style={{marginTop:'50px'}}> </div>
                            {
                              latestPost.map((row,index)=>(
                                <Card elevation={6} className='m-2  mt-3'  style={{borderRadius:'20px'}} 
                                onClick={()=>ViewPost(latestPost[index])}>
                                  <CardActionArea>
                                    <CardMedia
                                      component="img"
                                      alt="Contemplative Reptile"
                                      height="140"
                                      image={"http://localhost:5000/images/" + row.image}
                                    />
                                    <CardContent>
                                      <Typography gutterBottom variant="h5" component="h2">{row.title}</Typography>
                                      <Typography variant="body2" color="textSecondary" component="p">{row.content}</Typography>
                                    </CardContent>
                                  </CardActionArea>
                                </Card>
                              ))
                            }
                        <div className='text-center m-4'>
                          <NavLink to="/blogs" style={{textDecoration:'none'}}>
                          <Button variant='contained' color='secondary'>See more</Button>
                          </NavLink>
                        </div>
                        </Grid>
                      </Grid>
                  </div>
        </div>
    )
}

import React,{useState,useEffect} from 'react';
import { NavLink} from 'react-router-dom';

import {
  CreateProfile,
  GetProfile,
  CreateProfileEdu,  GetProfileEdu, DeleteEdu
} from '../../../actions/doctor';

import {GetLatestPost
} from "../../../actions/posts";

import Paper from '@material-ui/core/Paper';
import '../style.css';
import {
    Col,
    Row,
    Container,
    InputGroup,
    FormControl,Form,
    ListGroup,
  } from "react-bootstrap";

  import Typography from "@material-ui/core/Typography";

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';

import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function EditProfile() {

  const [education, seteducation] = useState([]);

  console.log(education);

  useEffect(() => {
    GetProfileEdu().then((data)=>{
      // console.log(data);
      seteducation(data);
    });
  }, [])

    const classes = useStyles();

    const [change, setchange] = useState([]);
  
    const [formData, setFormData] = useState({
      first_name:'' ,
      last_name:'',
      basic_details:'',
      gender:'',
      address:'',
      city:'',
      country:'',
      hospital:'',
      mobileno:'',
    });
    const { first_name,last_name,mobileno,basic_details,gender,address,city,country,hospital } = formData;  
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const [formEdu, setFormEdu] = useState({
       degree:'',
       university:'',
       year:''
    });
    const {degree,university,year} = formEdu;
    const onChangeEdu = e => setFormEdu({ ...formEdu, [e.target.name]: e.target.value });

    
    const [image ,setimage]=useState(null);
    const handleImageChange = (e) => {
      setimage(e.target.files[0])
    };
  
    const handleCreate = () => {    
      // let post_data = new FormData();
      // post_data.append('title', title);
      // post_data.append('content', content);
      // post_data.append('description', description);
      // post_data.append('image', image);
      // CreatePost(post_data);
    };

    const updateEducation=()=>{
      console.log(degree,university,year);
      const edu={degree,university,year};
      CreateProfileEdu(edu);
    }
    



    const   handleUpdate=()=>{
    //  console.log(change);
    console.log( first_name,last_name,mobileno,basic_details,gender,address,city,country);
    const profile={first_name,last_name,mobileno,basic_details,gender,address,city,country,hospital};
    CreateProfile(profile);
   }


   
  const handleDelete=(id)=>{
    DeleteEdu(id);
  }



  // const [doctor, setdoctor] = useState([]);
  // console.log(doctor);

  const [latestPost, setlatestPost] = useState([])

  useEffect(() => {
   
   GetLatestPost().then((data)=>{
     setlatestPost(data);
   }) 
  }, [])



    return (
        <div>
            <div >
              <Grid container style={{padding:0}}>
                      <Grid item lg={9} xs={12}>
                        <Card  elevation={6} className='ml-2' style={{background:'rgb(243, 242, 239)'}}>
                            <Card variant="outlined" className='py-4' style={{background:'darkviolet',color:'white'}}>
                                <h5 className='mx-4'>Password Reset</h5>
                            </Card>
                          <div>
                            <Card variant="outlined" className='py-3' style={{background:'rgb(243, 242, 239)'}}>
                                <div className='mx-4'>
                                  <Row>
                                      <Col  lg='6' xs={12}>
                                         <Form.Group controlId="fname" className="my-4">
                                           <Form.Label>Email</Form.Label>
                                           <Form.Control type="text" placeholder="Email*" 
                                           value={first_name}
                                           name='first_name'  
                                           onChange={e => onChange(e)}
                                         />
                                         </Form.Group>
                                         <Form.Group controlId="lname" className="my-4">
                                           <Form.Label>Current Password</Form.Label>
                                           <Form.Control type="text" placeholder="Current Password*" 
                                            value={last_name}
                                            name='last_name' onChange={e => onChange(e)}/>
                                         </Form.Group>
                                      </Col>
                                      <Col lg='6' xs={12}>
                                         <Form.Group controlId="bdetails" className="my-4">
                                           <Form.Label>New Password</Form.Label>
                                           <Form.Control type="text" placeholder="New Password" 
                                           name='basic_details' value={basic_details} 
                                           onChange={e => onChange(e)}/>
                                         </Form.Group>
                                         <Form.Group controlId="bdetails" className="my-4">
                                           <Form.Label>Re-enter New Password</Form.Label>
                                           <Form.Control type="text" placeholder="Re-enter Password" 
                                           name='basic_details' value={basic_details} 
                                           onChange={e => onChange(e)}/>
                                         </Form.Group>
                                      </Col>
                                  </Row>
                                </div>
                            </Card>
                            <Card variant='outlined' style={{background:'rgb(243, 242, 239)'}}>
                                <div className='mx-4'>
                                   <Button variant='contained' color='primary' className='my-4' 
                                   style={{float:'right'}} onClick={handleUpdate}>Save</Button>
                                </div>
                            </Card>
                         </div>
                      </Card>
                    </Grid>
                    
                    <Grid item lg={3} xs={12}>
                          <div  style={{marginTop:'20px'}}> </div>
                            {
                              latestPost.map((row,index)=>(
                                <NavLink  to={`/blog_details/${row._id}`} style={{textDecoration:"none"}}>
                                  <Card elevation={6} className='m-2  mt-3'  style={{borderRadius:'20px'}} >
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
                                </NavLink>
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



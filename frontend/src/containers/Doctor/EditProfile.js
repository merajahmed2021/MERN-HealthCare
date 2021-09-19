import React,{useState,useEffect} from 'react';
import { NavLink} from 'react-router-dom';

import {
  CreateProfile,
  GetProfile,
  CreateProfileEdu,  GetProfileEdu, DeleteEdu,
  CreateProfileExp,GetProfileExp
} from '../../actions/doctor';

import {GetLatestPost
} from "../../actions/posts";

import Paper from '@material-ui/core/Paper';
import './style.css';
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
import AddIcon from "@material-ui/icons/Add";

import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



export default function EditProfile() {

  const classes = useStyles();
 
  const [education, setEducation] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [latestPost, setlatestPost] = useState([])
  // console.log(education); 

  // if(education.length==0){
  //   console.log("Not found");
  // }else{
  //   console.log("Found");
  //   console.log(education);
  // }
 
  useEffect(() => {
    GetProfileEdu().then((data)=>{
        setEducation(data);
        // setEducation(data[0].educations);
        // setExperiences(data[0].experiences);  
    })
    GetProfileExp().then((data)=>{
      setExperiences(data);
    })
    GetLatestPost().then((data)=>{
      setlatestPost(data);
    }) 
  }, [])


    const [service, setService] = useState([]);
    const [formData, setFormData] = useState({
      first_name:'' ,
      last_name:'',
      basic_details:'',
      gender:'',
      year_of_experiences:'',
      address:'',
      city:'',
      country:'',
      hospital:'',
      mobileno:'',
    });
    const { first_name,last_name,mobileno,basic_details,gender,year_of_experiences,address,city,country,hospital } = formData;  
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
       
    const [image ,setimage]=useState(null);
    const handleImageChange = (e) => {
      setimage(e.target.files[0])
    };

    const   handleUpdate=()=>{
     var totalService=[];
     for(var i=0;i<service.length;i++){
       totalService.push(service[i].title);
     }
     console.log("Total Service: ",totalService);

     let post_data = new FormData();
      post_data.append('first_name', first_name);
      post_data.append('last_name', last_name);
      post_data.append('mobileno', mobileno);
      post_data.append('basic_details', basic_details);
      post_data.append('gender', gender);
      post_data.append('year_of_experiences', year_of_experiences);
      post_data.append('address', address);
      post_data.append('city', city);
      post_data.append('country', country);
      post_data.append('hospital', hospital);
      post_data.append('service', totalService);
      post_data.append('image', image);
    // const profile={first_name,last_name,mobileno,basic_details,gender,year_of_experiences,address,city,country,hospital,service,image};
    // console.log(profile);
    CreateProfile(post_data);
   }



  const [checked, setChecked] = React.useState(false);
  const handleEducationcollapse = () => {
    setChecked((prev) => !prev);
  };
      
  const [formEdu, setFormEdu] = useState({
    degree:'',
    university:'',
    year:''
 });
 const {degree,university,year} = formEdu;
 const onChangeEdu = e => setFormEdu({ ...formEdu, [e.target.name]: e.target.value });

 const updateEducation=()=>{
   console.log(degree,university,year);
   const edu={degree,university,year};
   CreateProfileEdu(edu);
 } 

  const handleDelete=(id)=>{
    DeleteEdu(id);
  }




  
  const [experince, setExperince] = React.useState(false);
  const handleexperiencecollapse = () => {
    setExperince((prev) => !prev);
  };

  const [formExp, setFormExp] = useState({
    type:'',
    detail:'',
    time_duration:''
 });
 const {type,detail,time_duration} = formExp;
 const onChangeExp = e => setFormExp({ ...formExp, [e.target.name]: e.target.value });

 
 const createExperience=()=>{
  console.log(type,detail,time_duration);
  const exp={type,detail,time_duration};
  CreateProfileExp(exp);
} 

    return (
        <div style={{marginTop:100}}>
            <div >
              <Grid container style={{padding:0}}>
      
{/* FOR PROFILE INFORMATION */}
                <Grid item lg={9} xs={12}>

{/*GENERAL PROFILE INFORMATION  */}
                      <Card  elevation={6} className='ml-2' style={{margin:'20px 10px'}}>
                            <Card variant="outlined" className='py-4' style={{
                              background:'darkviolet',color:'white',display:'flex',justifyContent:'space-between'}}>
                                <h5 className='mx-4'>Edit Profile</h5>
                                <Button variant='contained' color='secondary' style={{marginRight:20,borderRadius:20}}>Delete</Button>
                            </Card>
                            <div>
{/* PERSONAL INFORMATION*/}
                              <Card variant="outlined" className='py-3' style={{background:'rgb(243, 242, 239)'}}>
                                <div className='mx-4'>
                                  <h6>Basic information</h6>
                                  <Row>
                                      <Col  lg='6' xs={12}>
                                         <Form.Group controlId="fname" className="my-4">
                                           <Form.Label>First Name</Form.Label>
                                           <Form.Control type="text" placeholder="First name*" 
                                           value={first_name}
                                           name='first_name'  
                                           onChange={e => onChange(e)}
                                         />
                                         </Form.Group>
                                         <Form.Group controlId="lname" className="my-4">
                                           <Form.Label>Last Name</Form.Label>
                                           <Form.Control type="text" placeholder="Last name*" 
                                            value={last_name}
                                            name='last_name' onChange={e => onChange(e)}/>
                                         </Form.Group>

                                         <Form.Group controlId="bdetails" className="my-4">
                                           <Form.Label>Specialization</Form.Label>
                                         </Form.Group>
                                         <Autocomplete  className='mb-4'
                                            multiple
                                            id="tags-standard"
                                            options={serviceList}
                                            onChange={(event, value) => setService(value)}
                                            getOptionLabel={(option) => option.title}
                                            defaultValue={[serviceList[5]]}
                                            renderInput={(params) => (
                                              <TextField 
                                                {...params}
                                                variant="outlined"
                                                placeholder="Specialist Category"
                                              />
                                            )}
                                        />
                                        <Form.Group controlId="year_of_experiences" className="my-4">
                                           <Form.Label>Year of Experiences</Form.Label>
                                           <Form.Control type="text" placeholder="Year of Experiences*" 
                                            value={year_of_experiences}
                                            name='year_of_experiences' onChange={e => onChange(e)}/>
                                        </Form.Group>
                                      </Col>
                                      <Col lg='6' xs={12}>
                                         <Form.Group controlId="bdetails" className="my-4">
                                           <Form.Label>Basic Details</Form.Label>
                                           <Form.Control type="text" placeholder="Details" 
                                           name='basic_details' value={basic_details}  as='textarea' rows={6}
                                           onChange={e => onChange(e)}/>
                                         </Form.Group>

                                         <Form.Group  className='my-4'>
                                           <Form.Label>Gender</Form.Label>
                                           <div style={{display:'flex',justifyContent:'space-around'}}>
                                             <Form.Check
                                               type="radio"
                                               label="Male"
                                               name="gender"
                                               id="formHorizontalRadios1"
                                               value='male'
                                               onChange={e => onChange(e)}
                                              //  onChange={(e)=>setCategory(e.target.value)}
                                             />
                                             <Form.Check
                                               type="radio"
                                               label="Female"
                                               name="gender"
                                               id="formHorizontalRadios2"
                                               value='female'
                                               onChange={e => onChange(e)}
                                              //  onChange={(e)=>setCategory(e.target.value)}
                                             />
                                            <Form.Check
                                               type="radio"
                                               label="Other"
                                               name="gender"
                                               id="formHorizontalRadios2"
                                               value='other'
                                               onChange={e => onChange(e)}
                                              //  onChange={(e)=>setCategory(e.target.value)}
                                             />
                                           </div>
                                        </Form.Group>
                                        <Form.Group>
                                          <Form.Label>Upload Image</Form.Label>
                                          <Form.File id="custom-file" custom accept="image/png, image/jpeg"
                                            onChange={handleImageChange}
                                          />
                                        </Form.Group>
                                      </Col>
                                  </Row>
                                </div>
                            </Card>
{/* ADDRESS INFORMATION */}
                              <Card variant="outlined" className='py-3' style={{background:'rgb(243, 242, 239)'}}>
                                <div className='mx-4'>
                                  <h6 >Contact information</h6>
                                  <Row>
                                      <Col lg='6' xs={12}>
                                         <Form.Group controlId="address" className='my-4'>
                                           <Form.Label>Address</Form.Label>
                                           <Form.Control type="text" as="textarea" rows={5} 
                                           placeholder="Enter address" 
                                           value={address} name='address' onChange={e => onChange(e)}/>
                                         </Form.Group>
                                       
                                         <Form.Group controlId="city" className='my-4'>
                                           <Form.Label>City</Form.Label>
                                           <Form.Control type="text" placeholder="City" 
                                           value={city} name='city' onChange={e => onChange(e)}/>
                                         </Form.Group>
                                      </Col>
                                      <Col lg='6' xs={12}>
                                         <Form.Group controlId="country" className='my-4'>
                                           <Form.Label>Country</Form.Label>
                                           <Form.Control type="text" placeholder="Country" 
                                             value={country} name='country' onChange={e => onChange(e)}/>
                                         </Form.Group>

                                         <Form.Group controlId="code" className='my-4'>
                                           <Form.Label>Hospital Name</Form.Label>
                                           <Form.Control type="text" placeholder="Hospital Name*" 
                                           value={hospital} name='hospital' onChange={e => onChange(e)}/>
                                         </Form.Group>

                                         <Form.Group controlId="mnumber" className="my-4">
                                           <Form.Label>Mobile Number</Form.Label>
                                           <Form.Control type="email" placeholder="Mobile Number*" 
                                           name='mobileno' value={mobileno} onChange={e => onChange(e)}/>
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

{/* FOR EDUCATION SECTION */}
                      <div   style={{background:'rgb(243, 242, 239)',margin:'20px 10px'}}>
                                  <div className='my-2'>
                                  <div style={{display:'flex',justifyContent:'space-between',background:"darkviolet"}}>
                                        <div className='py-4 px-4'>
                                           <h1 style={{ color: 'white',fontSize: '21px',fontWeight: 500,lineHeight: '26px'}}>Qualification</h1>
                                        </div>
                                        <Button style={{height:40}}
                                          variant="contained"
                                          color="secondary"
                                          className='m-4'
                                          onClick={handleEducationcollapse}
                                          startIcon={<AddIcon/>}
                                        >Education</Button>
                                    </div>
                                    <Card elevation={6} style={{background:'rgb(243, 242, 239)'}}>
                                      <Collapse in={checked}>
                                        <Row className='my-1 p-4'>
                                            <h6 className='my-1'>Add Qualification</h6>
                                            <Col lg='4' xs={12}>
                                               <Form.Group controlId="degree" className='my-2'>
                                                 <Form.Label>Degree</Form.Label>
                                                 <Form.Control type="text" placeholder="Enter degree*"
                                                 name='degree' value={degree} onChange={e => onChangeEdu(e)}/>
                                               </Form.Group>
                                            </Col>
                                            <Col lg='4' xs={12}>
                                               <Form.Group controlId="university" className='my-2'>
                                                 <Form.Label>University</Form.Label>
                                                 <Form.Control type="text" placeholder="Enter university*" 
                                                 name='university' value={university} onChange={e => onChangeEdu(e)}/>
                                               </Form.Group>
                                            </Col>
                                            <Col lg='4' xs={12}>
                                               <Form.Group controlId="year" className='my-2'>
                                                 <Form.Label>Year</Form.Label>
                                                 <Form.Control type="text" placeholder="Enter year*" 
                                                 name='year' value={year} onChange={e => onChangeEdu(e)}/>
                                               </Form.Group>
                                            <Button variant='outlined' color='secondary' 
                                            className='my-4'  style={{borderRadius:20}}
                                            onClick={updateEducation}>Add Qualifications</Button>
                                            </Col>
                                        </Row>
                                      </Collapse>
                                  </Card>

                                  <TableContainer component={Paper} elevation={6}>
                                    <Table className={classes.table} aria-label="simple table">
                                      <TableHead>
                                        <TableRow style={{background:'darkviolet'}}>
                                          <TableCell style={{color:'white'}}>Degree</TableCell>
                                          <TableCell style={{color:'white'}} align="left">University</TableCell>
                                          <TableCell style={{color:'white'}} align="center">Year</TableCell>
                                          <TableCell style={{color:'white'}} align="center">Actions</TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {education.map((row) => (
                                          <TableRow key={row._id}>
                                            <TableCell component="th" scope="row">{row.degree}</TableCell>
                                            <TableCell >{row.university}</TableCell>
                                            <TableCell align="center">{row.year}</TableCell>
                                            <TableCell align="center">
                                              <Tooltip title="Edit">
                                                <IconButton aria-label="delete">
                                                  <EditIcon className='text-primary'/>
                                                </IconButton>
                                              </Tooltip>
                                              <Tooltip title="Delete">
                                                <IconButton aria-label="delete"
                                                  onClick={()=>handleDelete(row._id)}>
                                                  <DeleteIcon className='text-danger'/>
                                                </IconButton>
                                              </Tooltip>
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                  </div>
                                </div>                            

{/* FOR EXPERINCES SECTION */}
                      <div  style={{background:'rgb(243, 242, 239)',margin:'20px 10px'}}>
                                  <div className='my-4'>
                                  <div style={{display:'flex',justifyContent:'space-between',background:"darkviolet"}}>
                                        <div className='py-4 px-4'>
                                           <h1 style={{ color: 'white',fontSize: '21px',fontWeight: 500,lineHeight: '26px'}}>Experiences</h1>
                                        </div>
                                        <Button style={{height:40}}
                                          variant="contained"
                                          color="secondary"
                                          className='m-4'
                                          onClick={handleexperiencecollapse}
                                          startIcon={<AddIcon/>}
                                        >Experiences</Button>
                                    </div>
                                    <Card elevation={6} style={{background:'rgb(243, 242, 239)'}}>
                                      <Collapse in={experince}>
                                        <Row className='my-1 p-4'>
                                            <h6 className='my-1'>Add Experiences</h6>
                                            <Col lg='4' xs={12}>
                                               <Form.Group controlId="type" className='my-2'>
                                                 <Form.Label>Type</Form.Label>
                                                 <Form.Control type="text" placeholder="Enter degree*"
                                                 name='type' value={type} onChange={e => onChangeExp(e)}/>
                                               </Form.Group>
                                            </Col>
                                            <Col lg='4' xs={12}>
                                               <Form.Group controlId="detail" className='my-2'>
                                                 <Form.Label>Detail</Form.Label>
                                                 <Form.Control type="text" placeholder="Enter university*" 
                                                 name='detail' value={detail} onChange={e => onChangeExp(e)}/>
                                               </Form.Group>
                                            </Col>
                                            <Col lg='4' xs={12}>
                                               <Form.Group controlId="time_duration" className='my-2'>
                                                 <Form.Label>Duration</Form.Label>
                                                 <Form.Control type="text" placeholder="Enter year*" 
                                                 name='time_duration' value={time_duration} onChange={e => onChangeExp(e)}/>
                                               </Form.Group>
                                            <Button variant='outlined' color='secondary' 
                                            className='my-4'  style={{borderRadius:20}}
                                            onClick={createExperience}>Add Experiences</Button>
                                            </Col>
                                        </Row>
                                      </Collapse>
                                    </Card>

                                  <TableContainer component={Paper} elevation={6}>
                                    <Table className={classes.table} aria-label="simple table">
                                      <TableHead>
                                        <TableRow style={{background:'darkviolet'}}>
                                          <TableCell style={{color:'white'}}>Type</TableCell>
                                          <TableCell style={{color:'white'}} align="left">Details</TableCell>
                                          <TableCell style={{color:'white'}} align="center">Duration</TableCell>
                                          <TableCell style={{color:'white'}} align="center">Actions</TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {experiences.map((row) => (
                                          <TableRow key={row._id}>
                                            <TableCell component="th" scope="row">{row.type}</TableCell>
                                            <TableCell >{row.details}</TableCell>
                                            <TableCell align="center">{row.duration_type}</TableCell>
                                            <TableCell align="center">
                                              <Tooltip title="Edit">
                                                <IconButton aria-label="delete">
                                                  <EditIcon className='text-primary'/>
                                                </IconButton>
                                              </Tooltip>
                                              <Tooltip title="Delete">
                                                <IconButton aria-label="delete"
                                                  onClick={()=>handleDelete(row._id)}>
                                                  <DeleteIcon className='text-danger'/>
                                                </IconButton>
                                              </Tooltip>
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                  </div>
                                </div>                            
                      
                </Grid>

{/* FOR side blogs */}
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


// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const serviceList = [
    { title: 'General Physician'},
    { title: 'Psychiatry'},
    { title: 'Opthalmology'},
    { title: 'Cardiology'},
    { title: 'Immumnology'},
    { title: 'Hematology'},
    { title: "Dental"},
    { title: 'Pulmonologist'},
    { title: 'Orthopedic'},
    { title: 'Homeopathy '},
  ];
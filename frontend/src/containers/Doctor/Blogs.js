import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import {
  CreatePost,
  DeletePost,
  UpdatePost,
  GetPost,
  GetUserPost,
} from "../../actions/posts";

import {
  Col,
  Row,
  Container,
  InputGroup,
  FormControl,
  Form,
  ListGroup,
} from "react-bootstrap";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddIcon from "@material-ui/icons/Add";
import Collapse from "@material-ui/core/Collapse";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Fab from "@material-ui/core/Fab";
import Divider from "@material-ui/core/Divider";
// import Card from '@material-ui/core/Card';
import ClearIcon from "@material-ui/icons/Clear";

import { NavLink } from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 140,
  },
});

export default function DoctorBlogs() {
  const classes = useStyles();

  const [checked, setChecked] = React.useState(false);

  const handleChangeinput = () => {
    setChecked((prev) => !prev);
  };

  const [post, setPost] = React.useState([]);
  const [userpost, setuserPost] = React.useState([]);

  useEffect(() => {
    GetPost().then((res) => {
      setPost(res);
    });
    GetUserPost().then((res) => {
      setuserPost(res);
    });
  }, []);

  const [postcreated, setpostcreated] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    description: "",
  });

  const { title, content, description } = formData;
  const [image, setimage] = useState(null);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleImageChange = (e) => {
    setimage(e.target.files[0]);
  };

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenAdd = () => {
    setOpen(true);
    setFormData({
      title: "",
      content: "",
      description: "",
    });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    let post_data = new FormData();
    post_data.append("title", title);
    post_data.append("content", content);
    post_data.append("description", description);
    post_data.append("image", image);
    CreatePost(post_data);
    setOpen(false);
  };

  const handleDelete = (id) => {
    DeletePost(id);
  };

  const handleUpdate = (id, title, content, description, image) => {
    // handleChangeinput();
    handleClickOpen();
    console.log("update=", id);
    setFormData({
      title: title,
      content: content,
      description: description,
    });
    setimage(image.name);

    let post_update = new FormData();
    post_update.append("title", title);
    post_update.append("content", content);
    post_update.append("description", description);
    post_update.append("image", image);
    UpdatePost(id, post_update);
  };

  return (
    <div style={{ marginTop: 80 }}>
      <Dialog
        fullWidth
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Create your blogs"}
        </DialogTitle>
        <DialogContent>
          <div className="my-2">
            <Card elevation={4} variant="outlined" className="p-2">
              <DialogContentText>
                Let Google help apps determine location. This means sending
                anonymous location data to Google, even when no apps are
                running.
              </DialogContentText>
              <Form.Group controlId="formBasicPassword" className="my-4">
                <Form.Label>Heading</Form.Label>
                <Form.Control type="text" placeholder="Heading*" name="title" value={title}
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Upload Image</Form.Label>
                <Form.File id="custom-file" custom accept="image/png, image/jpeg"
                  onChange={handleImageChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className="my-4">
                <Form.Label>Short Description</Form.Label>
                <Form.Control type="text" as="textarea" name="content" rows={4} value={content}
                  placeholder="Short Description*"
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className="my-4">
                <Form.Label>Details Description</Form.Label>
                <Form.Control  type="text"  as="textarea"  name="description"  rows={10}  value={description}  placeholder="Details Description*"
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>
            </Card>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit" variant="outlined">
            Cancel
          </Button>
          <Button  variant="contained"  className="my-4"  color="primary"  style={{ float: "right" }}  onClick={handleCreate}>
            Post
          </Button>
        </DialogActions>
      </Dialog>


      <div style={{marginTop:100,background: "rgb(243, 242, 239)"}}>
        <Card elevation={10} className='m-2 mt-4' style={{background: "rgb(243, 242, 239)"}}>
          <CardContent>
          <p className='text-center' style={{ color: '#02475b',fontSize: '20px',fontWeight: 500,lineHeight: '25px'}} 
          >Blogs created by you</p>
            <Grid container style={{display:'flex',overflow:'scroll',overflowY:'hidden',padding:'20px'}}>
              {userpost.map((row) => (
              <Grid item lg={3} xs={12}>
                      <Card
                        className="mt-4 mx-2"
                        elevation={6}
                        style={{ borderRadius: 20 }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="200"
                            image={"http://localhost:5000/images/" + row.image}
                          />
                          <CardContent>
                            <div>
                              <h2  style={{    fontSize: "16px",    fontWeight: 500,    lineHeight: "21px",  }}>  {row.title}</h2>
                              <p  style={{    color: "#02475b",    fontSize: "12px",    lineHeight: "16px",  }}>
                                Most times, ideacide happens without us even
                                realizing it. A possible off-the-wall idea or
                                solution appears like a blip and disappears
                                without us even realizing. As a result, some of
                                our best stuff is suppressed before even getting
                                out into the world.
                              </p>
                            </div>

                            <div  style={{    display: "flex",    justifyContent: "space-between",  }}>
                              <p style={{ marginTop: 20, fontSize: "12px" }}>
                                December 14th, 2021 by Admin
                              </p>
                              <div>
                                {/* <IconButton
                                  style={{ marginLeft: "auto" }}
                                  color="inherit"
                                  aria-label="open drawer"
                                  edge="end"
                                  onClick={() =>
                                    handleUpdate(  row._id,  row.title,  row.content,  row.description,  row.image)
                                  }
                                >
                                  <EditIcon style={{ fontSize: 20 }} />
                                </IconButton> */}
                                <IconButton
                                  style={{ marginLeft: "auto" }}
                                  color="inherit"
                                  aria-label="open drawer"
                                  edge="end"
                                  onClick={() =>
                                    handleUpdate(  row._id,  row.title,  row.content,  row.description,  row.image)
                                  }
                                >
                                  <EditIcon style={{ fontSize: 20 }} />
                                </IconButton>
                                <IconButton
                                  style={{ marginLeft: "auto" }}
                                  color="danger"
                                  aria-label="open drawer"
                                  edge="end"
                                  onClick={() => handleDelete(row._id)}
                                >
                                  <DeleteIcon style={{ fontSize: 20 }} />
                                </IconButton>
                              </div>
                            </div>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
            </Grid>
          </CardContent>
        </Card>
      </div>

      <div>
        <Grid container style={{ padding: 0 }}>
          <Grid item lg={12} xs={12}>
            <Card
              elevation={6}
              className="ml-2"
              style={{ margin: "50px 10px", background: "rgb(243, 242, 239)" }}
            >
                <p className='text-center m-4' style={{ color: '#02475b',fontSize: '20px',fontWeight: 500,lineHeight: '25px'}} 
                  >Explore Blogs</p>
              <CardContent style={{ marginTop: 10 }}>
                <Grid container>
                  {
                  post.map((row) => (
                    <Grid item lg={3} xs={12}>
                    <NavLink
                    to={`/doctor/blogs/${row._id}`}
                    style={{ textDecoration: "none" }}
                  >
                      <Card
                        className="mt-4 mx-2"
                        elevation={6}
                        style={{ borderRadius: 20 }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="200"
                            image={"http://localhost:5000/images/" + row.image}
                          />
                          <CardContent>
                            <div>
                              <h2  style={{    fontSize: "16px",    fontWeight: 500,    lineHeight: "21px",  }}>  {row.title}</h2>
                              <p  style={{    color: "#02475b",    fontSize: "12px",    lineHeight: "16px",  }}>
                                Most times, ideacide happens without us even
                                realizing it. A possible off-the-wall idea or
                                solution appears like a blip and disappears
                                without us even realizing. As a result, some of
                                our best stuff is suppressed before even getting
                                out into the world.
                              </p>
                            </div>

                            <div  style={{    display: "flex",    justifyContent: "space-between",  }}>
                              <p style={{ marginTop: 20, fontSize: "12px" }}>
                                December 14th, 2021 by Admin
                              </p>
                            </div>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </NavLink>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>

      <Tooltip title="Create Post">
        <Fab
          color="primary"
          aria-label="add"
          style={{
            margin: 0,
            top: "auto",
            right: 20,
            bottom: 20,
            left: "auto",
            position: "fixed",
          }}
          onClick={handleClickOpenAdd}
          // onClick={handleChangeinput}
        >
          {checked == false ? <AddIcon /> : <ClearIcon />}
        </Fab>
      </Tooltip>
    </div>
  );
}

{
  /* <Container>
<Card outlined className='p-2'>
  <Row>
    <Col lg="8" xs="12">
    <div className='pt-4'>
        <h2>Blogs by you</h2>
      </div>
      <List component="nav" aria-label="main mailbox folders">
        {
          userpost.map((row)=>(
            <ListItem className="my-4" 
            style={{boxShadow: "0px 2px 4px rgb(0 0 0 / 20%)",cursor:'pointer',borderRadius: '5px',marginBottom:18}}
             buttton>
               <Row>
                 <Col lg="4" xs="12">
                    <ListItemIcon className='mx-3'>
                      <img    src={'http://localhost:5000/images/'+row.image} style={{width:'100%',height:150}}></img>
                    </ListItemIcon>
                 </Col>
                 <Col lg="8" xs="12">
                    <ListItemText  
                    primary={
                    <div>
                           <h2 style={{fontSize: '16px',fontWeight: 500,lineHeight: '21px'}}>
                               {row.title}</h2>
                            <p style={{color: '#02475b',fontSize:'12px',lineHeight:'16px'}}>
                            Most times, ideacide happens without us even realizing it. A possible off-the-wall idea or solution appears like a blip and disappears without us even realizing. As a result, some of our best stuff is suppressed before even getting out into the world.   
                            </p>   
                         </div>
                  } 
                    secondary={
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                     <p style={{marginTop:20,fontSize:'12px'}}>December 14th, 2021 by Admin</p>
                     <div>
                        <IconButton
                          style={{ marginLeft: "auto",}}
                          color="inherit"
                          aria-label="open drawer"
                          edge="end"
                          onClick={()=>handleUpdate(row._id,row.title,row.content,row.description,row.image)}
                        >
                          <EditIcon style={{ fontSize: 20 }} />
                        </IconButton>
                        <IconButton
                          style={{ marginLeft: "auto", }}
                          color="danger"
                          aria-label="open drawer"
                          edge="end"
                          onClick={()=>handleDelete(row._id)}
                          >
                          <DeleteIcon style={{ fontSize: 20 }} />
                        </IconButton>
                     </div>
                   </div>


                }
                />
                 </Col>
               </Row>
              </ListItem>
          ))
        }
      </List>
    </Col>
    <Col lg="4" xs="12">
      <div className='pt-4'>
        <h2>Latest Blogs</h2>
      </div>
      <List component="nav" aria-label="main mailbox folders">
        {
          post.map((row)=>(
            <NavLink to='blog_Details' style={{textDecoration:'none'}}>
            <ListItem className="my-4" outlined
            style={{boxShadow: "0px 2px 4px rgb(0 0 0 / 20%)",cursor:'pointer',borderRadius: '5px',marginBottom:18}}
             buttton>
                <ListItemIcon className='mx-3'>
                    <img 
                        src={'http://localhost:5000/images/'+row.image}
                    style={{width:100,height:100}}></img>
                </ListItemIcon>
                <ListItemText  
                primary={
                <div>
                           <h2 style={{fontSize: '16px',fontWeight: 500,lineHeight: '21px'}}>
                               69 Halsey St, New York, Ny 10002, United States</h2>
                         </div>} 
                 secondary={<p style={{marginTop:20,fontSize:'12px'}}>December 14th, 2021 by Admin</p>}
                />
              </ListItem>
            </NavLink>      
          ))
        }
      </List>
    </Col>
  </Row>
    </Card>
</Container> */
}

// <Container style={{ marginTop: 120 }}>
// <Col lg="12" xs={12}>
//   <div>
//     <Collapse in={checked}>
//       <div className="my-2">
//         <Card elevation={4} variant="outlined">
//           <h4 className="my-4 mx-4">Add Patient</h4>
//           <Row className="mx-2">
//             <Col lg="6" xs={12}>
//               <Form.Group
//                 controlId="formBasicPassword"
//                 className="my-4"
//               >
//                 <Form.Label>Heading</Form.Label>
//                 <Form.Control type="text" placeholder="Heading*"
//                   name='title'
//                   value={title}
//                   onChange={e => onChange(e)}
//                   />
//               </Form.Group>
//               <Form.Group>
//                 <Form.Label>Upload Image</Form.Label>
//                 <Form.File   id="custom-file"        custom
//                     accept="image/png, image/jpeg"  onChange={handleImageChange}  />
//               </Form.Group>
//             </Col>
//             <Col lg="6" xs={12}>
//               <Form.Group
//                 controlId="formBasicPassword"
//                 className="my-4"
//               >
//                 <Form.Label>Short Description</Form.Label>
//                 <Form.Control
//                   type="text"
//                   as="textarea" name='content'
//                   rows={4}  value={content}
//                   placeholder="Short Description*"
//                   onChange={e => onChange(e)}
//                 />
//               </Form.Group>
//             </Col>
//             <Form.Group controlId="formBasicPassword" className="my-4">
//               <Form.Label>Details Description</Form.Label>
//               <Form.Control
//                 type="text"
//                 as="textarea" name='description'
//                 rows={10} value={description}
//                 placeholder="Details Description*"
//                 onChange={e => onChange(e)}
//               />
//             </Form.Group>
//             <div>
//               <Button
//                 variant="contained"
//                 className="my-4"
//                 color="primary"
//                 style={{ float: "right" }}
//                 onClick={handleCreate}
//               >
//                 Post
//               </Button>
//             </div>
//           </Row>
//         </Card>
//       </div>
//     </Collapse>
//   </div>
// </Col>
// </Container>

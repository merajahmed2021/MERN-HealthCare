import React from "react";
import { NavLink } from "react-router-dom";

import Footer from "../../components/Footer";
import Servicesjson from './Services.json';
import serviceGif from './Webimages/service.gif';

import {
  Col,
  Carousel,
  Row,
  Container,
  InputGroup,
  FormControl,
  Form,
} from "react-bootstrap";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from '@material-ui/core/CardActionArea';

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import Breadcrumbs from "@material-ui/core/Breadcrumbs";
// import Link from "@material-ui/core/Link";
// import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginTop: 20,
    marginBottom: 12,
  },
});


const services = [
  {
    id: 1,
    name: "Psychiatry",
    icon: "fas fa-brain",
    text: "Lorem ispm dolor sit amaettum prahraph dolor sum",
  },
  {
    id: 2,
    name: "Opthalmology",
    icon: "fas fa-eye",
    text: "Lorem ispm dolor sit amaettum prahraph dolor sum",
  },
  {
    id: 3,
    name: "Cardiology",
    icon: "fas fa-heartbeat",
    text: "Lorem ispm dolor sit amaettum prahraph dolor sum",
  },
  {
    id: 4,
    name: "Immumnology",
    icon: "fas fa-microscope",
    text: "Lorem ispm dolor sit amaettum prahraph dolor sum",
  },
  {
    id: 5,
    name: "Hematology",
    icon: "fas fa-burn",
    text: "Lorem ispm dolor sit amaettum prahraph dolor sum",
  },
  {
    id: 6,
    name: "Dental",
    icon: "fas fa-tooth",
    text: "Lorem ispm dolor sit amaettum prahraph dolor sum",
  },
  {
    id: 7,
    name: "Pulmonologist",
    icon: "fas fa-lungs-virus",
    text: "Lorem ispm dolor sit amaettum prahraph dolor sum",
  },
  {
    id: 8,
    name: "Orthopedic",
    icon: "fas fa-bone",
    text: "Lorem ispm dolor sit amaettum prahraph dolor sum",
  },
];

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function Services() {
  const classes = useStyles();
  console.log(Servicesjson);

  return (
    <div >
      <div style={{ paddingBottom: 50, marginTop: 70,background:'rgb(243, 242, 239)' }}>
        <img src='https://cdn.pixabay.com/photo/2020/03/14/17/05/virus-4931227_960_720.jpg'
         style={{width:'100%',height:'500px'}}></img>
        <div className="mt-5">
          <Container>
            <Row>
              <h6 className="text-center mt-5">Services</h6>
              <h1
                className="text-center"
                style={{ marginTop: 20, paddingBottom: 80 }}
              >
                <span className="text-primary">Best Solution </span> For Your
                Health
              </h1>

              {Servicesjson.map((row) => (
                <Col lg={3} xs={12} className="mt-4">
                  <Card className={classes.root} elevation={6} style={{borderRadius:'20px'}}>
                    <CardActionArea>
                        <CardContent>
                          <i
                            class={row.icon}
                            style={{ fontSize: 60, color: "blue" }}
                          ></i>
                          <Typography className={classes.pos} color="textSecondary">
                            {row.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            component="p"
                            style={{
                              color: "#02475b",
                              fontSize: "12px",
                              lineHeight: "16px",
                            }}
                          >
                            {row.text}
                          </Typography>
                        </CardContent>
                    <NavLink to={`/details/${row.name}`} style={{textDecoration:'none'}}>
                      <CardActions>
                        <Button size="small" variant='outlined' color='secondary' style={{borderRadius:20}}>Learn More</Button>
                      </CardActions>
                    </NavLink>
                    </CardActionArea>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>

        <div className="bg-primary" style={{ padding: 70, marginTop: 100 }}>
          <Container>
            <Row>
              <Col lg="9">
                <h1 style={{ color: "white" }}>
                  <strong>Book An</strong> Appointment
                </h1>
                <p style={{ color: "white" }}>
                  We prodive a dedicated support 24/7 for any your question
                </p>
              </Col>
              <Col lg="3">
                <Button
                  style={{
                    background: "white",
                    color: "blue",
                    paddingTop: 20,
                    paddingBottom: 20,
                    paddingLeft: 30,
                    paddingRight: 30,
                    fontWeight: "bold",
                  }}
                >
                Appointment
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
}






{/* <div>
<Container
  style={{ marginTop: -30, opacity: 10, position: "relative" }}
>
  <Row
    style={{
      boxShadow: "0px 0px 20px rgb(128 128 128 / 20%)",
      borderRadius: "18px",
      background: "white",
    }}
  >
    <Col>
      <div style={{ height: "100%", borderRight: "1px solid blue" }}>
        <Row>
          <Col className="text-center">
            <i
              class="fas fa-diagnoses"
              style={{
                fontSize: 35,
                color: "blue",
                margin: 20,
                alignSelf: "center",
              }}
            ></i>
          </Col>
          <Col className="text-center">
            <h5 style={{ fontSize: "14px", margin: 20 }}>Diagnose</h5>
            <p style={{ fontSize: "12px", marginTop: -15 }}>
              Examination & Diagnosis
            </p>
          </Col>
        </Row>
      </div>
    </Col>
    <Col>
      <div style={{ height: "100%", borderRight: "1px solid blue" }}>
        <Row>
          <Col className="text-center">
            <i
              class="fas fa-lungs-virus"
              style={{
                fontSize: 35,
                color: "blue",
                margin: 20,
                alignSelf: "center",
              }}
            ></i>
          </Col>
          <Col className="text-center">
            <h5 style={{ fontSize: "14px", margin: 20 }}>
              Treatment
            </h5>
            <p style={{ fontSize: "12px", marginTop: -15 }}>
              Treatment of the disease
            </p>
          </Col>
        </Row>
      </div>
    </Col>
    <Col>
      <div style={{ height: "100%" }}>
        <Row>
          <Col className="text-center">
            <i
              class="fas fa-wheelchair"
              style={{
                fontSize: 35,
                color: "blue",
                margin: 20,
                alignSelf: "center",
              }}
            ></i>
          </Col>
          <Col className="text-center">
            <h5 style={{ fontSize: "14px", margin: 20 }}>
              Care Healthy
            </h5>
            <p style={{ fontSize: "12px", marginTop: -15 }}>
              Care and recuperation
            </p>
          </Col>
        </Row>
      </div>
    </Col>
  </Row>
</Container>
</div> */}
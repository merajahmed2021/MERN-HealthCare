import React,{useState} from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image
} from "@react-pdf/renderer";

import logo from './logo.png';

// import moment from "moment";


const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff"
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    textContainer: {
        display:'flex',
        flexDirection: "row",
        padding:'2px',
    },
    textHeading: {
        fontSize:'12px'
    },
    textContent:{
        fontSize:'12px',color:'gray'
    },
 
});

export function PdfDocument(props) {
    console.log("pdf props", props.data);
    
    const data=props.data;
    // const [data, setdata] = useState(props.data);

    return (
        <Document>
              <Page>
                  <View style={{display:'flex',flexDirection: "row",textAlign:'center'}}>
                    <View style={{width:'30%'}}>
                      <Image
                          style={{height:100,width:100,borderRadius:'100%',margin:30}}
                          source={logo}
                      />
                    </View>
                    <View style={{width:'70%',textAlign:'center',marginTop:50}}>
                        <Text style={{fontSize:'16px'}}>Welcome to Appointment Booking Platform</Text>
                        <Text style={styles.textHeading}>(An initialize for the welfare of people)</Text>
                    </View>
                  </View>
                  <View style={{margin:'50px 20px 20px 20px',border:'1px solid black',padding:'20px'}}>
                        <View>
                          <Text>Doctor Details</Text>
                        </View>
                  </View>
                  <View style={{margin:'0px 10px',border:'1px solid black',padding:'10px'}}>
                    <View>
                        <View style={[styles.textContainer,{borderBottom:'1px solid black',paddingBottom:5}]}>
                            <Text style={[styles.textHeading,{width:'5%' ,fontWeight:'bold'}]}>No.</Text>
                            <Text style={[styles.textHeading,{width:'20%',fontWeight:'bold'}]}>Email</Text>
                            <Text style={[styles.textHeading,{width:'20%',fontWeight:'bold'}]}>Name</Text>
                            <Text style={[styles.textHeading,{width:'20%',fontWeight:'bold'}]}>Address</Text>
                            <Text style={[styles.textHeading,{width:'15%',fontWeight:'bold'}]}>Mobile No.</Text>
                            <Text style={[styles.textHeading,{width:'10%',fontWeight:'bold'}]}>Visit</Text>
                            <Text style={[styles.textHeading,{width:'10%',fontWeight:'bold'}]}>Type</Text>
                        </View>
                    </View>
                      {
                          data.map((row,index)=>(
                              <View>
                                  <View style={[styles.textContainer,{borderBottom:'1px solid black',padding:2}]}>
                                      <Text style={[styles.textHeading,{width:'5%' ,padding:2}]}>{index+1}</Text>
                                      <Text style={[styles.textHeading,{width:'20%',padding:2}]}>{row.email}</Text>
                                      <Text style={[styles.textHeading,{width:'20%',padding:2}]}>{row.patient_name}</Text>
                                      <Text style={[styles.textHeading,{width:'20%',padding:2}]}>{row.address}</Text>
                                      <Text style={[styles.textHeading,{width:'15%',padding:2}]}>{row.mobileno}</Text>
                                      <Text style={[styles.textHeading,{width:'10%',padding:2}]}>Repeat</Text>
                                      <Text style={[styles.textHeading,{width:'10%',padding:2}]}>{row.appointment_type}</Text>
                                  </View>
                              </View>
                          ))
                      }

                  </View>
              </Page>
        </Document>
    );
}
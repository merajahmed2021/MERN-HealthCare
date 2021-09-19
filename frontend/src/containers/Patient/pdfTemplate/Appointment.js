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
        padding:'5px',
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
                        <View style={{marginTop:'10px'}}>
                            <View style={styles.textContainer}>
                                 <Text style={styles.textHeading}>Doctor Name :</Text>
                                 <Text style={styles.textContent}> {data.doctor_name}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                  <Text style={styles.textHeading}>Hospital : </Text>
                                  <Text style={styles.textContent}>{data.hospital_name}</Text>
                            </View>
                        </View>
                  </View>
                  <View style={{margin:'0px 20px',border:'1px solid black',padding:'20px'}}>
                       <View>
                          <Text>Patient Details</Text>
                        </View>
                        <View style={{marginTop:'10px'}}>
                            <View style={styles.textContainer}>
                                <Text style={styles.textHeading}>Patient Name : </Text>
                                <Text style={styles.textContent}>{data.doctor_name}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.textHeading}>Address : </Text>
                                <Text style={styles.textContent}>{data.hospital_name}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.textHeading}>Blood Group : </Text>
                                <Text style={styles.textContent}>{data.hospital_name}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.textHeading}>Gender : </Text>
                                <Text style={styles.textContent}>{data.hospital_name}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.textHeading}>Appointment Type : </Text>
                                <Text style={styles.textContent}>{data.doctor_name}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.textHeading}>Appointment Date : </Text>
                                <Text style={styles.textContent}>{data.doctor_name}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.textHeading}>Booking Date : </Text>
                                <Text style={styles.textContent}>{data.doctor_name}</Text>
                            </View>
                        </View>
                  </View>
              </Page>
            {/* <Page style={styles.page}>
                {props.data
                    ? props.data.map((a, index) => {
                            return (
                                <View key={index} style={styles.movieContainer}>
                                    <Image
                                        style={styles.image}
                                        source={
                                            a.poster_path !== null
                                                ? `${POSTER_PATH}${a.poster_path}`
                                                : "150.jpg"
                                        }
                                    />
                                    <View style={styles.movieDetails}>
                                        <Text style={styles.movieTitle}>{a.title}</Text>
                                        <View style={styles.subtitle}>
                                            <View style={styles.vote}>
                                                <Image source="star.png" style={styles.rating} />
                                                <Text style={styles.vote_text}>{a.vote_count}</Text>
                                            </View>
                                            <View style={styles.vote}>
                                                <Text style={styles.vote_pop}>{a.popularity}</Text>
                                                <Text style={styles.vote_pop_text}>Popularity</Text>
                                            </View>
                                        </View>
                                        <View style={styles.overviewContainer}>
                                            <Text style={styles.movieOverview}>{a.overview}</Text>
                                        </View>
                                        <View style={styles.detailsFooter}>
                                            <Text style={styles.lang}>
                                                Language: {a.original_language.toUpperCase()}
                                            </Text>
                                            <Text style={styles.vote_average}>
                                                Average Votes: {a.vote_average}
                                            </Text>
                                           
                                        </View>
                    </View>
                    </View>
                );
                })
            : ""}
            </Page> */}
        </Document>
    );
}
import React, { Component } from "react";
import { Text, View, Image, StyleSheet, Picker } from 'react-native';
import { Button } from 'react-native-elements';
import pylon from "./assets/pylon.jpg";

/* README
 --------------------------------------------------------
    This program is made to be used in landscape mode
    This program simulates the flight of a drone detecting problems with a electrical tower.
    The speed is denoted in the bottom left in between the decrease and increase buttons.
    To decrease or increase the speed just press the corresponding button.
        - decrements or increments are a 0.5 difference
    The fetch button simulates the drone spotting a new variation of random issues
    On the left is a Picker allowing the user to scroll through the detections then highlighting
        the current one so the user can pinpoint which detection they are looking at
 */





/* Class to display Faulty Powerline Detections
 Renders the detection at the given location
    (inputs come in the form: { "top": "XX%", "left": "XX%" })
 t: the detections top style (measure in %s)
 l: the detections left style (measure in %s)
 s: the detections borderColor style (currently just 'red' or 'yellow')
*/
class Detection extends Component {
    render() {
        const t = this.props.top;
        const l = this.props.left;
        const s = this.props.color;
        
        return (
                <View style={[styles.detection, {top: t, left: l, borderColor: s}]}/>
            
        )
    }
}

/* Main class
 state: the state of the App
    velocity: the speed of the drone (number > 0)
    detections: array of detection inputs
    chosen: the current detection that is selected on the picker
    index: the index of the selected picker item
 */
export default class App extends Component {
    
    //Constructor
    //Initially sets velocity to 10 and uses the given 3 detections stated in the assignment with the selected detection being the 0th detection
    constructor() {
        super();
        
        this.state = {
            velocity: 10,
            detections: [{ "top": "20%", "left": "50%" }, { "top": "35%", "left": "40%" }, { "top": "75%", "left": "15%" }],
            chosen: { "top": "20%", "left": "50%" },
            index: 0
            
        }
            
    }
    

    
    //Displays the application
    render() {
        //shortening constant names from the state variables
        const { chosen, index, detections} = this.state;

        //stores picker items from detections
        const pickerTags = this.state.detections.map( (item, i) => {
                const detectNum = 'Detect ' + i;
                //Changes color of the label in the picker if selected
                var col = 'black';
                if (i == index) { col = 'red'}
                return <Picker.Item color= {col} key={item} value={i} label={detectNum} /> })
                                                     
        //Displays detections (if detection is the current chosen one choose yellow border color else choose red border color)
        const detects = detections.map(function(item){
            if (item.top === chosen.top &&
                item.left === chosen.left) {
                return <Detection key={uniqueKey()} top= {item.top}
                                       left= {item.left} color= 'yellow' />
            } else {
                return <Detection key={uniqueKey()} top= {item.top}
                                       left= {item.left} color= 'red' />
            }
        });
        
        //Return statement
        return (
             {/* Organization of Views
                    container:
                        - image
                        - sidebar:
                            - picker:
                                - Picker Item 1...Picker Item N
                        - toolbar:
                            - Decrease Button
                            - Speed text
                            - Increase Button
                            - Fetch Button
                        - Detection Views 1...Detection View N
               */},
                
               <View style={styles.containView}>
                   <Image style={styles.backgroundImage} source={pylon}/>
                
                   <View style={styles.sidebar}>
                
                        <Picker selectedValue={index}
                
                            onValueChange={ (val, i) => (
                                //Changing state of chosen detection in picker
                                this.setState({chosen:detections[i]}),
                                this.setState({index: i})
                          )}>
                            {pickerTags}
                
                        </Picker>
                    </View>
           
                <View style={styles.toolbar}>
                
                    <Button style={styles.buttons} onPress={() => {
                            //Decreasing State of velocity
                            if (this.state.velocity >= 0.5) {
                                    this.setState({ velocity: this.state.velocity - 0.5 })
                                return this.state.velocity;}}}
                        title= 'Decrease'
                        type= 'solid'/>
                    
                    <Text style={styles.spedometer}>{this.state.velocity}</Text>
                    <Button style={styles.buttons} onPress={() => {
                                //Increasing State of velocity
                                this.setState({ velocity: this.state.velocity + 0.5 })}}
                            title='Increase'/>
                
                    <Button style= {styles.buttons} onPress={() => {
                                //Creating new randomly generated detections
                                var newDetects = makeDetections(ranNumber(10));
                                //setting States for new Detections and resetting index of picker
                                this.setState({ detections: newDetects }),
                                this.setState({ index: 0}),
                                this.setState({ chosen: newDetects[0] }) }}
                            title= 'Fetch' />
                    </View>
                        {detects}
               </View>
               
       )
    }
}

/* Functions
 ----------------------------------------------------------------
 - makePicks(list)
 - ranNumber(number)
 - uniqueKey()
 - ranPercentage()
 - makeDetections(number)
 */
                                                     
// Signature: ([detections]) -> [<Picker.Items/>]
// a detection come in the form: { "top": "XX%", "left": "XX%" })
// Creates the an array of Picker Items to be used in the picker

function makePicks(detectList) {
    var finArr = [detectList.size]
    for (let i = 0; i < detectList.size; i++) {
        const detectNumber ='Detect ' + i;
        finArr[i] = <Picker.Item label = {detectNumber}
                                 value = {detectList[i]}
                                 key = {i}/>
                             };
    return finArr;
}

//ranNumber: (number) -> number
//Generates a randon number from 1 to max
function ranNumber(max) {
    return Math.floor(Math.random() * max) + 1;
}

//uniqueKey: () -> String
//Generates a randon number concatenated to a string ('key')
//Warning: it is possible for two members in the array to have the same key
//This function just makes it highly unlikely and was created for the purposes of muting a warning
function uniqueKey() {
    return ranNumber(10000) * ranNumber(14) - ranNumber(35) + 'key';
}



//ranPercentage: () -> number
//Generates a randon number from 1 to 100
function ranPercentage() {
    var ans = Math.floor(Math.random() * 100) + 1;
    
    return ans;
}

//makeDetections: (number) -> [detections]
// a detection come in the form: { "top": "XX%", "left": "XX%" })
//Generates maxDetects amount of randomly generated detections
function makeDetections(maxDetects) {
    var finDetects = [maxDetects]
    for (let i= 0; i < maxDetects; i++) {
        
        finDetects[i] = { "top": ranPercentage() +'%', "left": ranPercentage() + '%' }
    }
    
    return finDetects;
}

{/*
  Styles Sheet
  ------------------------------------------------------------------------------------
    sidebar = the left column where you can high certain detections
    containView = the background view that contains all the other UI Elements
    backgroundImage = view of the drone
    toolbar = increase/decrease speed and fetch commands container
    detection = detection boxes that the drone spots
    buttons = Actual buttons for the toolbar
    spedometer = Text of speed in the toolbar
  
  */}

const styles = StyleSheet.create({
  sidebar: {
         position: 'absolute',
         height: '25%',
         width: '10%',
         top: '37.5%',
         backgroundColor: 'white',
         opacity: 0.6,
         borderRadius: 15
    },
  containView: {
        flex: 1,
        flexDirection: 'column',
 },
  backgroundImage: {
      flex: 1,
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      aspectRatio: 1.5
  },
  toolbar: {
      flexDirection: 'row',
      position: 'absolute',
      left: '2.5%',
      bottom: '2.5%',
      height: '10%',
      width: '40%',
      backgroundColor: 'white',
      opacity: 0.7,
      borderRadius: 15,
      borderWidth: 4,
      borderColor: 'white'
   },
    detection: {
        borderWidth: 4,
        borderColor: "red",
        backgroundColor: "transparent",
        width: 50,
        height: 50,
        position: 'absolute'
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        borderRadius: 15,
        padding: '2.5%',
                    
    },
    spedometer: {
      flex:1,
      flexDirection: 'row',
      fontWeight: 'bold',
      padding: '5%',
      fontSize: 20
     }
                                 
});




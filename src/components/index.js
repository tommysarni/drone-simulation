/* @flow */
import * as React from "react";
import { StatusBar, View, Text, Image } from "react-native";

class MainView extends React.Component {
  render() {
    return (
      <View>
        <StatusBar barStyle="light-content" />
        <View
          style={{
            width: "100%",
            height: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            source={require("../../assets/sterblue.png")}
            style={{
              width: "50%",
              height: "30%",
              resizeMode: "contain",
              position: "absolute",
              top: "10%"
            }}
          />
          <Text style={{ fontWeight: "bold", fontSize: 26 }}>
            Sterblue mobile internship test
          </Text>
          <Text>
            Congrats, you have everything up and running, now you can get
            started with the test!
          </Text>
        </View>
      </View>
    );
  }
}

export default MainView;

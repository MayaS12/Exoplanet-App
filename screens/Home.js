import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import data from "../data.js";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: data,
      url: "http://127.0.0.1:5000/",
    };
  }
  componentDidMount() {
    this.getPlanets();
  }
  getPlanets = () => {
    const { url } = this.state;

    axios
      .get(url)
      .then((response) => {
        return this.setState({ listData: response.data.data });
      })
      .catch((error) => {
        Alert.alert("Hi" + error.message);
      });
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.listContainer}
      onPress={() =>
        this.props.navigation.navigate("Details", { planet_name: item.name })
      }
    >
      <Text style={styles.title}>`Planet : ${item.name}`</Text>
      <Text style={styles.title}>
        `Distance from earth : ${item.distance_from_earth}`
      </Text>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View style={styles.upperContainer}>
          <Text style={styles.headerText}>Planets World</Text>
        </View>
        <View style={styles.lowerContainer}>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.listData}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edc988",
  },
  upperContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#132743",
  },
  lowerContainer: {
    flex: 0.9,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainerText: {
    fontSize: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d7385e",
  },
  listContainer: {
    backgroundColor: "#eeecda",
    padding: 10,
    margin: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
});

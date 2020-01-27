import React from 'react';
import { StyleSheet, 
  Text, 
  View, 
  StatusBar, 
  Dimensions, 
  TextInput,
  Platform,
  ScrollView } from 'react-native';
import Todo from "./Todo";
import {AppLoading} from "expo";

const { height, width } = Dimensions.get("window");



export default class App extends React.Component {
  
  state = {
    newTodo: "",
    loadedTodos: false
  };

  componentDidMount = () => {
    this._loadToDos();
  }

  render() {
    
    const {newTodo, loadedTodos} = this.state;
    if(!loadedTodos) {
      return <AppLoading />;
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Kwai To Do</Text>
        <View style={styles.card}>
          <TextInput 
            style={styles.input} 
            placeholder={"New To Do"} 
            value={newTodo} 
            onChangeText={this._controlnewTodo}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            autoCorrect={false}
          />
          <ScrollView contentContainerStyle={styles.todos}>
            <Todo/>
          </ScrollView>
        </View>
      </View>
  )};
  
  _controlnewTodo = text => {
    this.setState({
      newTodo: text
    });
  }

  _loadToDos = () => {

  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center'
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "200",
    marginTop: 50,
    marginBottom: 30
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    marginBottom: 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25,

  },
  todos: {
    alignItems: "center"
  }
});


import React from 'react';
import { StyleSheet, 
  Text, 
  View, 
  StatusBar, 
  Dimensions, 
  TextInput,
  Platform,
  ScrollView, 
  AsyncStorage} from 'react-native';
import Todo from "./Todo";
import {AppLoading} from "expo";
import uuidv1 from "uuid";

const { height, width } = Dimensions.get("window");



export default class App extends React.Component {
  
  state = {
    newTodo: "",
    loadedTodos: false,
    toDos: {}
  };

  componentDidMount = () => {
    this._loadToDos();
  }

  render() {
    
    const {newTodo, loadedTodos, toDos} = this.state;
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
            onSubmitEditing={this._addTodo}
          />
          <ScrollView contentContainerStyle={styles.todos}>
            {Object.values(toDos).map(toDo => 
              <Todo 
                key={toDo.id}
                deleteToDo={this._deleteToDo} 
                uncompletedTodo={this._uncompletedTodo} 
                completedTodo={this._completedTodo}
                updateTodo={this._updateTodo}
                {...toDo} />
            )}
          </ScrollView>
        </View>
      </View>
  )};
  
  _controlnewTodo = text => {
    this.setState({
      newTodo: text
    });
  }

  _loadToDos = async() => {
    try{
      
      const toDos = await AsyncStorage.getItem("toDos");
      const parstedToDos = JSON.parse(toDos);
      console.log(toDos);

      this.setState({
        loadedTodos: true,
        toDos: parstedToDos
      })
    }catch(err) {
      console.log(err);
    }
  };

  _addTodo = () => {
    const {newTodo} = this.state;
    if(newTodo != "") {
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newTodo,
            createdAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          newTodo: "",
          toDos: {
            ...prevState.toDos,
            ...newToDoObject
          }
        }
        this._saveToDos(newState.toDos);
        return {...newState};
      });
    }
  };

  _deleteToDo = (id) => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos
      };
      this._saveToDos(newState.toDos);
      return {...newState};
    });
  };

  _uncompletedTodo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id] : {
            ...prevState.toDos[id],
            isCompleted: false
          }
        }
      }
      this._saveToDos(newState.toDos);
      return { ...newState };
    });
  }

  _completedTodo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id] : {
            ...prevState.toDos[id],
            isCompleted: true
          }
        }
      };
      this._saveToDos(newState.toDos);
      return { ...newState };
    });
  }

  _updateTodo = (id, text) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos : {
          ...prevState.toDos,
          [id]: {...prevState.toDos[id], text: text}
        }
      };
      this._saveToDos(newState.toDos);
      return { ...newState };
    });
  }

  _saveToDos = (newToDos) => {
    const saveToDos = AsyncStorage.setItem("toDos", JSON.stringify(newToDos));
  }
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


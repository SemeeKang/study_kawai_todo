import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput} from "react-native";
import PropTypes from "prop-types"

const {width, height} = Dimensions.get("window");

export default class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isEditing: false, toDoValue: props.text}
    }

    static propTypes = {
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        deleteToDo: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired,
        completedTodo: PropTypes.func.isRequired,
        uncompletedTodo: PropTypes.func.isRequired,
        updateTodo: PropTypes.func.isRequired
    }

    render() {
        const {isEditing, toDoValue} = this.state;
        const { text, id, deleteToDo, isCompleted } = this.props;
        return(
            <View style={styles.continer}>
                <View style={styles.column}>
                    <TouchableOpacity onPressOut={this._toggleCompleteTodo}>
                        <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]} />    
                    </TouchableOpacity>
                    {isEditing ? (
                        <TextInput style={[
                            styles.text,
                            styles.input,
                            isCompleted ? styles.completedText : styles.uncompletedText
                        ] } value={toDoValue} multiline={true} onChangeText={this._controlInput}  returnKeyType={"done"} onBlur={this._finishEditing}/>
                    ) : (
                        <Text style={[
                            styles.text,
                            isCompleted ? styles.completedText : styles.uncompletedCircle ]}>
                            {text}
                        </Text>
                    )}
                    
                </View>
                {isEditing ? (
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._finishEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>F</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._startEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>E</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPressOut={(event) =>{ 
                                event.stopPropagation();
                                deleteToDo(id);
                            }}
                        >
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>D</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            
        )
    };

    _toggleCompleteTodo = event => {
        event.stopPropagation();
        const {isCompleted, completedTodo, uncompletedTodo, id} = this.props;
        if(isCompleted){
            uncompletedTodo(id);
        }
        else {
            completedTodo(id);
        }

    }

    _startEditing = () => {
        this.setState({
            isEditing: true
        });
    }

    _finishEditing = () => {
        const {toDoValue} = this.state;
        const {id, updateTodo} = this.props;

        updateTodo(id, toDoValue);
        this.setState({
            isEditing: false
        });
    }

    _controlInput = (text) => {
        this.setState({toDoValue : text});
    }
}

const styles = StyleSheet.create({
    continer: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    circle: {
        width: 25,
        height: 25,
        borderRadius: 15,
        borderWidth: 3,
        marginRight: 20
    },
    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20
    },
    completedCircle: {
        borderColor: "#bbb",
    },
    uncompletedCircle: {
        borderColor: "#F23657",
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncompletedText: {
        color: "#353839",
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
        width: width / 2
    },
    actions: {
        flexDirection: "row"
    },
    actionContainer: {
        marginVertical: 10,
        marginRight: 10,
    },
    input: {
        paddingBottom: 5,
        marginVertical: 15,
        width: width / 2
    }
});

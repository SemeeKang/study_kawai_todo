import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput} from "react-native";
const {width, height} = Dimensions.get("window");

export default class Todo extends React.Component {
    
    state = {
        isEditing: false,
        isCompleted: false,
        toDOValue: ""
    }

    render() {
        const {isEditing, isCompleted, toDOValue} = this.state;
        const { text } = this.props;
        return(
            <View style={styles.continer}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleCompleteTodo}>
                        <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]} />    
                    </TouchableOpacity>
                    {isEditing ? (
                        <TextInput style={[
                            styles.text,
                            styles.input,
                            isCompleted ? styles.completedText : styles.uncompletedText
                        ] } value={toDOValue} multiline={true} onChange={this._controlInput}  returnKeyType={"done"} onBlur={this._finishEditing}/>
                    ) : (
                        <Text style={[
                            styles.text,
                            isCompleted ? styles.completedText : styles.uncompletedCircle 
                            ]}>
                            {text}
                        </Text>
                    )}
                    
                </View>
                {isEditing ? (
                    <View style={styles.actions}>
                        <TouchableOpacity onPress={this._finishEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>F</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.actions}>
                        <TouchableOpacity onPress={this._startEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>E</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>D</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            
        )
    };

    _toggleCompleteTodo = () => {
        this.setState(prevState => {
            return({
                isCompleted: !prevState.isCompleted
            });
        });
    }

    _startEditing = () => {
        const {text} = this.props;
        this.setState({
            isEditing: true,
            toDOValue: text
        });
    }

    _finishEditing = () => {
        this.setState({
            isEditing: false
        });
    }

    _controlInput = (text) => {
        this.setState({toDOValue : text});
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
        marginVertical: 25
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
        width: width / 2,
        justifyContent: "space-between"
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

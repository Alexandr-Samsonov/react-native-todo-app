import React, { useState, useContext } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native'
import { FontAwesome, AntDesign } from '@expo/vector-icons';

import { THEME } from '../theme';
import {AppCard} from '../components/ui/AppCard';
import {EditModal} from '../components/EditModal';
import { AppTextBold } from '../components/ui/AppTextBold';
import { AppButton } from '../components/ui/AppButton';
import {ScreenContext} from "../context/screen/screenContext";
import {TodoContext} from "../context/todo/todoContext";

export const TodoScreen = () => {
    const { todos, updateTodo, removeTodo } = useContext(TodoContext);
    const { todoId, changeScreen } = useContext(ScreenContext);
    const [modal, setModal] = useState(false)

    const todo = todos.find(t => t.id === todoId);

    const saveHandlers = async (title) => {
        await updateTodo(todo.id, title)
        setModal(false);
    }

    return (
        <View>
            <EditModal value={todo.title} onSave={saveHandlers} visible={modal} onCancel={() => setModal(false)} />

            <AppCard style={styles.card}>
                <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
                <AppButton onPress={() => setModal(true)}><FontAwesome name="edit" size={20} /></AppButton>
            </AppCard>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <AppButton
                        color={THEME.GRAY_COLOR}
                        onPress={() => changeScreen(null)}
                    >
                        <AntDesign name="back" size={20} color="#fff"/>
                    </AppButton>
                </View>
                <View style={styles.button}>
                    <AppButton
                        color={THEME.DANGER_COLOR}
                        onPress={() => removeTodo(todo.id)}
                    >
                        <FontAwesome name="remove" size={20} color="#fff" />
                    </AppButton>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    card: {
        marginBottom: 20,
        padding: 15,
    },
    button: {
        // width: Dimensions.get('window').width / 3,
        width: Dimensions.get('window').width > 400 ? 150 : 100
    },
    title: {
        fontSize: 22,
    }
});

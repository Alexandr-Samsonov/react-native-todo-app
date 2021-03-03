import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Alert, Keyboard } from 'react-native';
import { AntDesign } from '@expo/vector-icons'

import {THEME} from '../theme';

export const AddTodo = ({ onSubmit }) => {
    const [value, setValue] = useState('')

    const pressHandler = () => {
        if (value.trim()) {
            onSubmit(value);
            setValue('');
            Keyboard.dismiss(); // Скрыть активную клавиатуру
        } else {
            // error
            Alert.alert('Название дела не может быть пустым')
        }
    }

    return (
        <View style={styles.block}>
            <TextInput
                onChangeText={setValue}
                value={value}
                placeholder="Введите название дела ..."
                style={styles.input}
                autocorrect={false}
                autoCapitalize='none'
            />
            <AntDesign.Button name="pluscircleo" onPress={pressHandler}>Добавить</AntDesign.Button>
            {/*<Button title="Добавить" onPress={pressHandler} />*/}
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    input: {
        width: '60%',
        padding: 10,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: THEME.MAIN_COLOR,
    },
});

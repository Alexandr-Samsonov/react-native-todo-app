import React, { useState, useEffect, useContext, useCallback } from 'react';
import {FlatList, StyleSheet, View, Image, Dimensions} from 'react-native';

import {AddTodo} from '../components/AddTodo';
import {Todo} from '../components/Todo';
import {THEME} from '../theme';
import {TodoContext} from '../context/todo/todoContext';
import {ScreenContext} from '../context/screen/screenContext';
import {AppLoader} from '../components/ui/AppLoader';
import { AppText } from '../components/ui/AppText';
import { AppButton } from '../components/ui/AppButton';

export const MainScreen = () => {
    const { addTodo, todos, removeTodo, fetchTodos, loading, error } = useContext(TodoContext);
    const { changeScreen } = useContext(ScreenContext);

    const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2

    const [deviceWidth, setDeviceWidth] = useState(width);

    const loadTodos = useCallback(async () => fetchTodos(), [fetchTodos])

    useEffect(() => {
        loadTodos();
    }, [])

    useEffect(() => {
        const update = () => {
            const widthUpdate = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2;
            setDeviceWidth(widthUpdate);
        }

        Dimensions.addEventListener('change', update);

        return () => {
            Dimensions.removeEventListener('change', update);
        }
    })

    if (loading) {
        console.log('- LOAD -');
        return <AppLoader />
    }

    if (error) {
        return (
            <View style={styles.center}>
                <AppText style={styles.error}>{error}</AppText>
                <AppButton onPress={loadTodos}>Повторить</AppButton>
            </View>
        );
    }

    let content = (
        <View style={{ width: deviceWidth }}>
            <FlatList
                keyExtractor={item => item.id}
                data={todos}
                renderItem={({ item }) => (
                    <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />
                )}
            />
        </View>
    );

    if (todos.length === 0) {
        content = (
            <View style={styles.imgWrap}>
                <Image
                    style={styles.image}
                    source={require('../../assets/no-items.png')}
                />
                {/*<Image*/}
                {/*    style={styles.image}*/}
                {/*    source={{ uri: 'https://e7.pngegg.com/pngimages/791/139/png-clipart-react-native-web-application-javascript-google-scholar-logo-symmetry-web-application.png' }}*/}
                {/*/>*/}
            </View>
        );
    }

    return (
        <View>
            <AddTodo onSubmit={addTodo} />
            {content}
        </View>
    );
}

const styles = StyleSheet.create({
    imgWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 300,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    error: {
        fontSize: 20,
        color: THEME.DANGER_COLOR
    }
});

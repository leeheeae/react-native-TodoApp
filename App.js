import {StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import React, {useEffect, useState} from 'react';
import todosStorage from './storages/todosStorage';

import DateHead from './components/DateHead';
import Empty from './components/Empty';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

export default function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '작업환경설정',
      done: false,
    },
    {
      id: 2,
      text: '리액트 네이티브 기초 공부',
      done: false,
    },
    {
      id: 3,
      text: '투두리스트 만들어보기',
      done: true,
    },
  ]);

  const today = new Date();

  useEffect(() => {
    const load = async () => {
      try {
        todosStorage.get().then(setTodos).catch(console.error);
      } catch (error) {
        console.error('Failed to load todos');
      }
    };
    load();
  }, []);

  //저장하기
  useEffect(() => {
    const save = async () => {
      try {
        todosStorage.set(todos).catch(console.error);
      } catch (error) {
        console.log('Failed to save todos');
      }
    };
    save();
  }, [todos]);

  //추가하기
  const onInsert = text => {
    const nextId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    const todo = {
      id: nextId,
      text,
      done: false,
    };
    setTodos(todos.concat(todo));
  };

  //상태 토글
  const onToggle = id => {
    const nextTodos = todos.map(todo =>
      todo.id === id ? {...todo, done: !todo.done} : todo,
    );
    setTodos(nextTodos);
  };

  //삭제
  const onRemove = id => {
    const nextTodos = todos.filter(todo => todo.id !== id);
    setTodos(nextTodos);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']} style={styles.block}>
        <KeyboardAvoidingView
          behavior={Platform.select({ios: 'padding'})}
          style={styles.avoid}>
          <DateHead date={today} />
          {todos.length === 0 ? (
            <Empty />
          ) : (
            <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
          )}
          <AddTodo onInsert={onInsert} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  avoid: {
    flex: 1,
  },
});

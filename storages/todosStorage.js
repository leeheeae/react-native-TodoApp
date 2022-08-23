import AsyncStorage from '@react-native-community/async-storage';

//상수로 선언해주어 손 쉽게 데이터를 바꿀 수 있도록 설정
const key = 'todos';

const todosStorage = {
  async get() {
    try {
      const rawTodos = await AsyncStorage.getItem(key);

      if (!rawTodos) {
        //저장된 데이터가 없으면 사용하지 않음
        throw new Error('No saved todos');
      }

      const savedTodos = JSON.parse(rawTodos);
      return savedTodos;
    } catch (error) {
      throw new Error('Faild to load todos');
    }
  },
  async set(data) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      throw new Error('Faild to save todos');
    }
  },
};

export default todosStorage;

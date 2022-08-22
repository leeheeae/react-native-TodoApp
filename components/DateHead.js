import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function DateHead({date}) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const {top} = useSafeAreaInsets();

  const formatted = `${year}년 ${month}월 ${day}일`;

  return (
    <>
      <View style={[styles.statusBarPlaceholder, {height: top}]} />
      <StatusBar backgroundColor={'#00695c'} barStyle="light-content" />
      <View style={styles.block}>
        <Text style={styles.dateText}>{formatted}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  statusBarPlaceholder: {
    backgroundColor: '#00695c',
  },
  block: {
    padding: 16,
    backgroundColor: '#00695c',
  },
  dateText: {
    fontSize: 24,
    color: '#FFF',
  },
});

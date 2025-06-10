import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { db } from '../firebase/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function CreatePostScreen() {
  const handleTestPost = async () => {
    try {
      await addDoc(collection(db, 'posts'), {
        title: 'Test Post',
        description: 'This is a test Firestore post',
        createdAt: Timestamp.now()
      });
      Alert.alert('Success', 'Post added to Firestore!');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>✍️ Create Post Screen</Text>
      <Button title="Add Test Post" onPress={handleTestPost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, marginBottom: 20 }
});

import React, { useState } from 'react';
import { View, TextInput, Text, Button, Switch, StyleSheet, Alert } from 'react-native';
import { db } from '../firebase/firebase';
import { collection, addDoc, Timestamp, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function CreatePostScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [anonymous, setAnonymous] = useState(false);

  const handleSubmit = async () => {
    if (!title || !description) {
      Alert.alert('Missing Info', 'Please enter both a title and description.');
      return;
    }

    try {
      const user = getAuth().currentUser;
      if (!user) {
        Alert.alert('Error', 'You must be logged in to post.');
        return;
      }

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        Alert.alert('Error', 'User profile not found.');
        return;
      }

      const userData = userDoc.data();

      await addDoc(collection(db, 'posts'), {
        title,
        description,
        anonymous,
        abroadCity: userData.abroadCity || 'Unknown',
        userId: user.uid,
        createdAt: Timestamp.now(),
      });

      setTitle('');
      setDescription('');
      setAnonymous(false);
      Alert.alert('Success', 'Your post has been submitted!');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="What's the topic?"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Share your tip, question, or experience..."
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <View style={styles.switchRow}>
        <Text>Post Anonymously</Text>
        <Switch value={anonymous} onValueChange={setAnonymous} />
      </View>
      <Button title="Submit Post" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginTop: 10, marginBottom: 4 },
  input: {
    borderWidth: 1, borderColor: '#ccc',
    borderRadius: 6, padding: 10, fontSize: 16,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  }
});

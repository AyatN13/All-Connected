import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../firebase/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';

export default function CityPostsScreen({ route }) {
  const { city } = route.params;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'posts'),
      where('abroadCity', '==', city),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(fetched);
    });
    return unsubscribe;
  }, [city]);

  const renderItem = ({ item }) => (
    <View style={styles.post}>
      <Text style={styles.title}>{item.anonymous ? 'Anonymous 🕵️' : item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Posts from {city}</Text>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No posts yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  post: {
    backgroundColor: '#eee',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: { fontSize: 18, fontWeight: '600' },
  description: { marginTop: 8 },
  empty: { marginTop: 40, textAlign: 'center' },
});

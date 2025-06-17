import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../firebase/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(fetched);
    });
    return unsubscribe;
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.post}>
      <Text style={styles.title}>
        {item.anonymous ? 'Anonymous 🕵️' : item.title}
      </Text>
      {!item.anonymous && <Text style={styles.subtitle}>{item.title}</Text>}
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No posts yet 😴</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  post: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    marginBottom: 12,
    borderRadius: 8,
  },
  title: { fontWeight: 'bold', fontSize: 18 },
  subtitle: { fontSize: 14, color: '#666' },
  description: { marginTop: 8, fontSize: 16 },
  empty: { marginTop: 40, textAlign: 'center', color: '#888' },
});

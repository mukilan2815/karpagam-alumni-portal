import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const alumniData = [
  {
    id: "1",
    name: "Jane Doe",
    image: "https://via.placeholder.com/80x80.png?text=JD",
  },
  {
    id: "2",
    name: "John Smith",
    image: "https://via.placeholder.com/80x80.png?text=JS",
  },
];

const NewAlumniScreen = () => {
  const navigation = useNavigation();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">All Alumni</ThemedText>
      <FlatList
        data={alumniData}
        renderItem={({ item }) => (
          <View style={styles.alumniCard}>
            <Image source={{ uri: item.image }} style={styles.alumniImage} />
            <ThemedText type="subtitle" style={styles.alumniName}>
              {item.name}
            </ThemedText>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  alumniCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  alumniImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  alumniName: {
    fontSize: 18,
  },
});

export default NewAlumniScreen;

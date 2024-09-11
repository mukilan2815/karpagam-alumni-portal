import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  Button,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Picker } from "@react-native-picker/picker";

const opportunities = [
  {
    id: "1",
    title: "Software Developer Internship",
    company: "TechCorp",
    details: "Work on developing scalable software solutions...",
  },
  {
    id: "2",
    title: "Marketing Internship",
    company: "CreativeInc",
    details: "Assist in marketing campaigns and digital strategies...",
  },
  // More opportunities
];

const InternshipOpportunitiesScreen = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredOpportunities = opportunities.filter(
    (opportunity) =>
      (filter === "All" || opportunity.company === filter) &&
      opportunity.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Internship Opportunities</ThemedText>
      <TextInput
        style={styles.searchInput}
        placeholder="Search internships..."
        value={search}
        onChangeText={setSearch}
      />
      <Picker
        selectedValue={filter}
        style={styles.picker}
        onValueChange={(itemValue) => setFilter(itemValue)}
      >
        <Picker.Item label="All" value="All" />
        <Picker.Item label="TechCorp" value="TechCorp" />
        <Picker.Item label="CreativeInc" value="CreativeInc" />
        {/* Add more filter options as needed */}
      </Picker>
      <FlatList
        data={filteredOpportunities}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <ThemedText type="subtitle">{item.title}</ThemedText>
            <Text>{item.company}</Text>
            <Text>{item.details}</Text>
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
  searchInput: {
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  picker: {
    marginBottom: 16,
  },
  card: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
});

export default InternshipOpportunitiesScreen;

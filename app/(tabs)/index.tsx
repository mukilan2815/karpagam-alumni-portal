import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  FlatList,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");
const LIGHT_GREEN = "#90EE90";
const DARK_GREEN = "#2E8B57";
const WHITE = "#FFFFFF";

const ThemedText = ({ style, children, type }: any) => {
  const baseStyle = {
    color: type === "title" ? DARK_GREEN : "#333333",
    fontSize: type === "title" ? 24 : type === "subtitle" ? 18 : 14,
    fontWeight: type === "title" || type === "subtitle" ? "bold" : "normal",
  };
  return <Text style={[baseStyle, style]}>{children}</Text>;
};

const Navbar = () => (
  <View style={styles.navbar}>
    <Image source={require("../../assets/kahelogo.png")} style={styles.logo} />
    <ThemedText style={styles.subtitle} type="subtitle">
      Karpagam Alumni Portal
    </ThemedText>
  </View>
);

const EventCard = ({
  title,
  date,
  image,
}: {
  title: string;
  date: string;
  image: string;
}) => {
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      activeOpacity={1}
    >
      <Animated.View
        style={[styles.eventCard, { transform: [{ scale: scaleAnim }] }]}
      >
        <Image source={{ uri: image }} style={styles.eventImage} />
        <View style={styles.eventInfo}>
          <ThemedText style={styles.subtitle} type="subtitle">
            {title}
          </ThemedText>
          <ThemedText style={styles.date} type="subtitle">
            {date}
          </ThemedText>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const InternshipCard = ({ title, company, details }: any) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("internship-opportunities", {
          title,
          company,
          details,
        } as never)
      }
    >
      <View style={styles.internshipCard}>
        <Text style={styles.internshipTitle}>{title}</Text>
        <Text style={styles.internshipCompany}>{company}</Text>
        <Text numberOfLines={2} style={styles.internshipDetails}>
          {details}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        navigation.navigate("login" as never);
      }
    };
    checkToken();
  }, [navigation]);
  const Navbar = () => (
    <View style={styles.navbar}>
      <Image
        source={require("../../assets/kahelogo.png")}
        style={styles.logo}
      />
      <ThemedText style={styles.subtitle} type="subtitle">
        Karpagam Alumni Portal
      </ThemedText>
    </View>
  );
  const upcomingEvents = [
    {
      id: "1",
      title: "Annual Gala",
      date: "2024-10-15",
      image: "https://via.placeholder.com/300x150.png?text=Annual+Gala",
    },
    {
      id: "2",
      title: "Tech Symposium",
      date: "2024-11-05",
      image: "https://via.placeholder.com/300x150.png?text=Tech+Symposium",
    },
  ];

  const pastEvents = [
    {
      id: "3",
      title: "Alumni Meetup",
      date: "2024-08-20",
      image: "https://via.placeholder.com/300x150.png?text=Alumni+Meetup",
    },
    {
      id: "4",
      title: "Career Fair",
      date: "2024-09-10",
      image: "https://via.placeholder.com/300x150.png?text=Career+Fair",
    },
  ];

  const newAlumni = [
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
    {
      id: "3",
      name: "Emma Wilson",
      image: "https://via.placeholder.com/80x80.png?text=EW",
    },
  ];

  const galleryImages = [
    "https://via.placeholder.com/160x160.png?text=Event+1",
    "https://via.placeholder.com/160x160.png?text=Event+2",
    "https://via.placeholder.com/160x160.png?text=Event+3",
  ];

  const internshipOpportunities = [
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
  ];

  const renderShowMoreButton = (section: string) => (
    <TouchableOpacity onPress={() => navigation.navigate(section as never)}>
      <Text style={styles.showMoreText}>Show More</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <Navbar />
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <ThemedText type="title" style={styles.sectionTitle}>
            Upcoming Events
          </ThemedText>
          <FlatList
            data={upcomingEvents}
            renderItem={({ item }) => <EventCard {...item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.eventList}
          />
          {renderShowMoreButton("upcoming-events")}

          <ThemedText type="title" style={styles.sectionTitle}>
            Past Events
          </ThemedText>
          <FlatList
            data={pastEvents}
            renderItem={({ item }) => <EventCard {...item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.eventList}
          />
          {renderShowMoreButton("past-events")}

          <ThemedText type="title" style={styles.sectionTitle}>
            New Alumni
          </ThemedText>
          <FlatList
            data={newAlumni}
            renderItem={({ item }) => (
              <View style={styles.alumniCard}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.alumniImage}
                />
                <ThemedText type="subtitle" style={styles.alumniName}>
                  {item.name}
                </ThemedText>
              </View>
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.alumniList}
          />
          {renderShowMoreButton("new-alumni")}

          <ThemedText type="title" style={styles.sectionTitle}>
            Event Gallery
          </ThemedText>
          <FlatList
            data={galleryImages}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.galleryImage} />
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.galleryList}
          />
          {renderShowMoreButton("event-gallery")}

          <ThemedText type="title" style={styles.sectionTitle}>
            Internship Opportunities
          </ThemedText>
          <FlatList
            data={internshipOpportunities}
            renderItem={({ item }) => <InternshipCard {...item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.internshipList}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  safeArea: {
    flex: 1,
    paddingTop: 20,
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: LIGHT_GREEN,
  },
  logo: {
    width: 140,
    height: 40,
    marginRight: 10,
  },
  contentContainer: {
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 10,
    color: DARK_GREEN,
  },
  showMoreText: {
    color: DARK_GREEN,
    textAlign: "right",
    marginVertical: 10,
    fontSize: 16,
  },
  eventCard: {
    width: 300,
    marginRight: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: WHITE,
    elevation: 3,
  },
  eventImage: {
    width: "100%",
    height: 150,
  },
  eventInfo: {
    padding: 10,
  },
  date: {
    color: "#666",
    fontSize: 14,
  },
  eventList: {
    marginBottom: 20,
  },
  alumniCard: {
    alignItems: "center",
    marginRight: 20,
  },
  alumniImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  alumniName: {
    marginTop: 10,
  },
  alumniList: {
    marginBottom: 20,
  },
  galleryImage: {
    width: 160,
    height: 160,
    marginRight: 10,
    borderRadius: 10,
  },
  galleryList: {
    marginBottom: 20,
  },
  internshipCard: {
    width: 300,
    padding: 15,
    marginRight: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    elevation: 3,
  },
  internshipTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  internshipCompany: {
    marginVertical: 5,
    color: DARK_GREEN,
  },
  internshipDetails: {
    fontSize: 14,
    color: "#666",
  },
  subtitle: {
    fontFamily: "Roboto",
    color: "#333333",
    fontSize: 18,
  },
  internshipList: {
    marginBottom: 20,
  },
});

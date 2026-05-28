import { Badge, ListItem, Text } from "@rneui/themed";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";

import {
  FORT_WAYNE_USER_LOCATION,
  type ParkType,
} from "@/features/parks/parkData";
import {
  getParksByDistance,
  type ParkWithDistance,
} from "@/features/parks/parksService";

function parkTypeLabel(type: ParkType) {
  return type === "park" ? "Park" : "Playground";
}

export default function Index() {
  const parks = getParksByDistance(FORT_WAYNE_USER_LOCATION);

  return (
    <SafeAreaView style={styles.container}>
      <Text h3 h3Style={styles.heading}>
        Nearby parks
      </Text>
      <FlatList
        data={parks}
        keyExtractor={(park) => park.id}
        renderItem={({ item }) => <ParkListItem park={item} />}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

function ParkListItem({ park }: { park: ParkWithDistance }) {
  const label = parkTypeLabel(park.type);

  return (
    <ListItem bottomDivider containerStyle={styles.listItem}>
      <ListItem.Content>
        <ListItem.Title style={styles.parkName}>{park.name}</ListItem.Title>
        <ListItem.Subtitle style={styles.distance}>
          {park.distanceMiles.toFixed(1)} miles away
        </ListItem.Subtitle>
      </ListItem.Content>
      <Badge
        value={label}
        status={park.type === "park" ? "success" : "primary"}
        badgeStyle={styles.badge}
        textStyle={styles.badgeText}
      />
    </ListItem>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7f9",
  },
  heading: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 24,
  },
  listItem: {
    minHeight: 72,
    paddingHorizontal: 16,
  },
  parkName: {
    fontSize: 17,
    fontWeight: "600",
  },
  distance: {
    color: "#5f6670",
    fontSize: 14,
    marginTop: 4,
  },
  badge: {
    borderRadius: 6,
    minWidth: 86,
    paddingHorizontal: 8,
    height: 28,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
});

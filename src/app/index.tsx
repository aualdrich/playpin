import { Badge, ListItem, Text } from "@rneui/themed";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";

import { PARKS, type Park, type ParkType } from "@/features/parks/parkData";

function parkTypeLabel(type: ParkType) {
  return type === "park" ? "Park" : "Playground";
}

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <Text h3 h3Style={styles.heading}>
        Nearby parks
      </Text>
      <FlatList
        data={PARKS}
        keyExtractor={(park) => park.id}
        renderItem={({ item }) => <ParkListItem park={item} />}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

function ParkListItem({ park }: { park: Park }) {
  const label = parkTypeLabel(park.type);

  return (
    <ListItem bottomDivider containerStyle={styles.listItem}>
      <ListItem.Content>
        <ListItem.Title style={styles.parkName}>{park.name}</ListItem.Title>
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

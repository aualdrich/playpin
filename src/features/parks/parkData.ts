export type Coordinate = {
  latitude: number;
  longitude: number;
};

export type ParkType = "park" | "playground";

export type Park = {
  id: string;
  name: string;
  type: ParkType;
  coordinate: Coordinate;
};

export const FORT_WAYNE_USER_LOCATION: Coordinate = {
  latitude: 41.0793,
  longitude: -85.1394,
};

export const PARKS: Park[] = [
  {
    id: "franke-park",
    name: "Franke Park",
    type: "park",
    coordinate: {
      latitude: 41.1016,
      longitude: -85.1727,
    },
  },
  {
    id: "promenade-park",
    name: "Promenade Park",
    type: "park",
    coordinate: {
      latitude: 41.0824,
      longitude: -85.1427,
    },
  },
  {
    id: "foster-park",
    name: "Foster Park",
    type: "park",
    coordinate: {
      latitude: 41.0448,
      longitude: -85.1512,
    },
  },
  {
    id: "lakeside-park",
    name: "Lakeside Park",
    type: "park",
    coordinate: {
      latitude: 41.0889,
      longitude: -85.1263,
    },
  },
  {
    id: "buckner-park",
    name: "Buckner Park",
    type: "park",
    coordinate: {
      latitude: 41.0502,
      longitude: -85.2506,
    },
  },
  {
    id: "kreager-park",
    name: "Kreager Park",
    type: "park",
    coordinate: {
      latitude: 41.0977,
      longitude: -85.0545,
    },
  },
  {
    id: "lawton-park-playground",
    name: "Lawton Park Playground",
    type: "playground",
    coordinate: {
      latitude: 41.0871,
      longitude: -85.1437,
    },
  },
  {
    id: "packard-park-playground",
    name: "Packard Park Playground",
    type: "playground",
    coordinate: {
      latitude: 41.0648,
      longitude: -85.1425,
    },
  },
  {
    id: "shoaff-park-playground",
    name: "Shoaff Park Playground",
    type: "playground",
    coordinate: {
      latitude: 41.1432,
      longitude: -85.1089,
    },
  },
  {
    id: "swinney-park-playground",
    name: "Swinney Park Playground",
    type: "playground",
    coordinate: {
      latitude: 41.0732,
      longitude: -85.1594,
    },
  },
];

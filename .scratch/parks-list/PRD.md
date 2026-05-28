---
Status: ready-for-agent
---

# PRD: Nearby Parks List

## Problem Statement

Parents want to quickly discover parks and playgrounds near their current location. Right now, Playpin has no way to show any parks — the home screen is blank. There is no way for a parent to find out what's nearby without leaving the app.

## Solution

Replace the blank home screen with a scrollable list of parks and playgrounds sorted by distance from the user's location. Each entry shows the park's name, distance, and whether it is a park or a playground. This gives parents an immediate, at-a-glance view of what's near them the moment they open the app.

## User Stories

1. As a parent, I want to see a list of parks and playgrounds when I open the app, so that I can quickly find somewhere to take my kids.
2. As a parent, I want each park entry to show the park's name, so that I know which place I'm looking at.
3. As a parent, I want each park entry to show how far away the park is from me, so that I can decide if it's worth the trip.
4. As a parent, I want to know whether each entry is a park or a playground, so that I can choose the right type of place for my kids' age.
5. As a parent, I want the list sorted by distance with the closest park first, so that I don't have to scan the whole list to find nearby options.
6. As a parent, I want the list to scroll if there are many results, so that I can browse all available options.

## Implementation Decisions

- **Home screen replaces the blank index.** The parks list is the root screen of the app — there is no separate route or tab for it.

- **Hardcoded user location.** For this iteration, the user's location is fixed to Fort Wayne, IN (lat: 41.0793, lng: -85.1394). Real device GPS is out of scope.

- **Fake park data.** 8–10 hand-crafted park entries with realistic Fort Wayne coordinates are seeded in a static data module. No network calls are made.

- **Park data shape.** Each park has: a unique ID, a display name, a type (`park` or `playground`), and a latitude/longitude coordinate pair.

- **Straight-line distance.** Distance is calculated using the Haversine formula (great-circle distance), displayed in miles. Driving distance is out of scope.

- **List sorted by distance, ascending.** The parks service is responsible for sorting — the home screen receives a pre-sorted list.

- **Three modules:**
  - *Park data model* — static data array + hardcoded user location constant. Simple interface; no logic.
  - *Distance calculator* — pure function: takes two coordinate pairs, returns distance in miles. Encapsulates the Haversine formula. Designed so the home screen and parks service never know the formula.
  - *Parks service* — takes a location, computes distance to each park, returns a sorted list of parks with distances attached. This is the seam where Google Maps data will be wired in later — the home screen will not need to change.

- **UI built with RNEUI.** The list uses `ListItem` components from `@rneui/themed`. A `Badge` or equivalent indicates the park type. No custom UI primitives.

- **No tap interaction on list items.** Tapping a park does nothing in this iteration. A detail screen is a separate future feature.

## Testing Decisions

No tests are in scope for this iteration. Testing will be added in a follow-up.

When tests are written, good tests should verify external behavior only — not implementation details like internal variable names or formula steps. The distance calculator and parks service are the right targets since they are pure logic modules with no UI dependency.

## Out of Scope

- Real device GPS / location permissions
- Google Maps or any external data source
- Detail screen when tapping a park
- Filtering by type (park vs. playground)
- Search by a specific address or location
- Map view
- User-facing distance units preference (miles vs. km)

## Further Notes

The parks service is intentionally designed as the seam for the future Google Maps integration. When that work begins, only the service's data-fetching internals change — the distance calculator and home screen remain untouched.

The fake data uses real Fort Wayne, IN park names and approximate coordinates to make the experience feel realistic during development.

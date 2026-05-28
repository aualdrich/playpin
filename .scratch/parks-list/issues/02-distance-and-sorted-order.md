---
Status: ready-for-agent
---

# Distance and sorted order

## Parent

`.scratch/parks-list/PRD.md`

## What to build

Add distance display and sort the parks list by distance from the user's hardcoded location (Fort Wayne, IN).

Build two modules:
- A **distance calculator** — a pure function that takes two coordinate pairs and returns the straight-line distance in miles using the Haversine formula.
- A **parks service** — takes a location, uses the distance calculator to compute each park's distance, and returns the full list sorted closest-first with the distance attached to each entry.

Update the home screen to call the parks service (instead of the raw data array directly) and display the computed distance on each list item.

The parks service is the intended seam for the future Google Maps integration — the home screen should not contain any distance or sorting logic itself.

## Acceptance criteria

- [ ] Each list item displays the park's distance from Fort Wayne, IN in miles
- [ ] The list is ordered closest park first
- [ ] Distance and sorting logic lives in the parks service, not the home screen
- [ ] The distance calculator is a pure function with no UI dependency

## Blocked by

`.scratch/parks-list/issues/01-parks-list-home-screen.md`

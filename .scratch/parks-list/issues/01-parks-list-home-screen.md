---
Status: ready-for-agent
---

# Parks list on home screen

## Parent

`.scratch/parks-list/PRD.md`

## What to build

Replace the blank home screen with a scrollable list of parks and playgrounds. Wire up a static park data model (fake data, type definitions, and the hardcoded Fort Wayne, IN user location constant) and render each park as a list item showing the park's name and a type badge indicating whether it is a park or a playground.

No distances or sorting in this slice — those come in the next issue. The list can appear in any order.

Use RNEUI (`@rneui/themed`) components for the list. No custom UI primitives.

## Acceptance criteria

- [ ] Opening the app shows a scrollable list of 8–10 parks/playgrounds instead of the blank screen
- [ ] Each list item displays the park's name
- [ ] Each list item displays a type badge distinguishing "park" from "playground"
- [ ] The list scrolls when the entries exceed the screen height
- [ ] Tapping a list item does nothing

## Blocked by

None — can start immediately.

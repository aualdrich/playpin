# About Playpin

Playpin is a small app that helps parents find parks and playgrounds near them or at specific locations.

# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v55.0.0/ before writing any code.

# Design System

We use React Native Elements (`@rneui/themed`, `@rneui/base`) as our design system. Prefer RNEUI components over building custom UI primitives. See `docs/design-system.md` for design rules and common UI patterns.

# Git Practices

- Never commit directly to `main`.
- Every feature or bug fix must be on its own branch.
- All work is done in the main worktree.
- Before opening a PR, do an internal code review of your own changes.
- When a feature or fix is complete, open a PR for review — do not merge directly.

# Package Manager

Always use `bun` instead of `npm` for this project. Use `bun install`, `bunx`, etc.

## Agent skills

### Issue tracker

Issues and PRDs live as local markdown files under `.scratch/<feature-slug>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default canonical label vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context repo — one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.

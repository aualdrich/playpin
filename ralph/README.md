# Local Ralph Runner

This directory contains a small repo-local runner for Codex. It does not depend on the Ralph plugin.

## Scratch Issue Layout

Work is read from local markdown issues:

```text
.scratch/<feature-slug>/
  PRD.md
  issues/
    01-first-slice.md
    02-next-slice.md
```

Each issue file should have a `Status:` line near the top:

```md
Status: ready-for-agent
```

Supported statuses:

- `ready-for-agent`
- `in-progress`
- `done`
- `blocked`

The runner always selects the lowest sorted `*.md` file in `.scratch/<feature-slug>/issues` whose status is `ready-for-agent`.

## Run Once

```sh
ralph/run-once.sh <feature-slug>
```

`run-once.sh` selects one ready issue and invokes:

```sh
codex exec -C <repo-root> --sandbox workspace-write --ask-for-approval never
```

The prompt tells Codex to work only on the selected issue, update its status, verify the work, and commit completed changes.

## Run AFK

```sh
ralph/run-afk.sh <feature-slug> [--max N]
```

AFK mode repeatedly runs one ready issue at a time until no ready issues remain or the max iteration count is reached. The default max is `10`.

AFK mode commits through Codex prompt instructions only. It does not push branches or open PRs.

## Issue Template

```md
# Add Distance Filter

Status: ready-for-agent
Type: AFK
Blocked by: None - can start immediately

## What to build

Add a distance filter to park search results.

## Acceptance criteria

- [ ] Users can choose a distance radius.
- [ ] Search results respect the selected radius.
- [ ] Existing search behavior still works when no radius is selected.
- [ ] `bun run lint` passes.
```

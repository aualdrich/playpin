# Local Ralph Issue Runner

You are continuing an autonomous implementation loop in a fresh Codex context.

The work queue lives in `.scratch/<feature-slug>/issues`. The runner has selected exactly one issue file for this iteration. Work only on that issue file. Do not start other issues, even if they are visible.

## Required Process

1. Read `AGENTS.md`, the selected issue file, and nearby project docs before changing code.
2. Confirm the selected issue is still `Status: ready-for-agent`. If it is not, stop and explain why.
3. Change only the selected issue status from `Status: ready-for-agent` to `Status: in-progress`.
4. Implement the issue end to end using the repo's existing patterns.
5. Verify the acceptance criteria with the narrowest useful checks.
6. Run the relevant project checks. Prefer `bun` commands; this repo does not use `npm`.
7. Do an internal code review of your own diff before finishing.
8. If the issue is complete, change only the selected issue status from `Status: in-progress` to `Status: done`.
9. Commit the completed issue with a descriptive commit message.

## Blocked Work

If you cannot complete the issue safely, do not fake completion. Leave useful notes in the selected issue file, change its status to `Status: blocked`, and do not commit unrelated partial work.

## Project Rules

- Follow `AGENTS.md`.
- Read the exact Expo v55 docs at `https://docs.expo.dev/versions/v55.0.0/` before writing Expo or React Native app code.
- Use React Native Elements (`@rneui/themed`, `@rneui/base`) for UI.
- Use `bun`, `bunx`, and repo scripts instead of `npm`.
- Never commit directly to `main`.
- Do not push branches or open PRs from this loop.
- Keep changes scoped to the selected issue.

## Completion Signal

At the end, report:

- Selected issue path
- Whether it is `done` or `blocked`
- Verification commands run
- Commit hash if committed

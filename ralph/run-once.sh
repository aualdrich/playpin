#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./lib.sh
source "$SCRIPT_DIR/lib.sh"

if [[ $# -ne 1 ]]; then
  ralph_usage_feature_slug "$0"
  exit 2
fi

FEATURE_SLUG="$1"
ROOT="$(ralph_repo_root)"
ISSUES_DIR="$(ralph_issues_dir "$ROOT" "$FEATURE_SLUG")"
PROMPT_FILE="$SCRIPT_DIR/prompt.md"

if [[ ! -f "$PROMPT_FILE" ]]; then
  echo "Missing prompt template: $PROMPT_FILE" >&2
  exit 1
fi

if ! ISSUE_FILE="$(ralph_find_ready_issue "$ISSUES_DIR")"; then
  echo "No ready issues found in $ISSUES_DIR"
  exit 0
fi

RELATIVE_ISSUE="${ISSUE_FILE#"$ROOT"/}"
ISSUE_TITLE="$(ralph_issue_title "$ISSUE_FILE")"

echo "Selected issue: $RELATIVE_ISSUE"

if [[ -n "$(git -C "$ROOT" status --porcelain)" ]]; then
  echo "Worktree is dirty. Refusing to run because wrapper commits require a clean starting point." >&2
  echo "Commit, stash, or revert unrelated changes first." >&2
  exit 1
fi

{
  cat "$PROMPT_FILE"
  printf "\n## Selected Feature\n\n%s\n" "$FEATURE_SLUG"
  printf "\n## Selected Issue File\n\n%s\n" "$RELATIVE_ISSUE"
  printf "\nRead and implement only this issue file in this iteration.\n"
} | codex \
  --ask-for-approval never \
  exec \
  -C "$ROOT" \
  --sandbox workspace-write \
  -

FINAL_STATUS="$(ralph_issue_status "$ISSUE_FILE")"
if [[ "$FINAL_STATUS" != "done" ]]; then
  echo "Issue finished with status: ${FINAL_STATUS:-missing}"
  echo "No commit created."
  exit 0
fi

if [[ -z "$(git -C "$ROOT" status --porcelain)" ]]; then
  echo "Issue is done, but there are no worktree changes to commit."
  exit 0
fi

git -C "$ROOT" add -A
git -C "$ROOT" commit -m "Complete ${ISSUE_TITLE}"
echo "Committed completed issue: $RELATIVE_ISSUE"

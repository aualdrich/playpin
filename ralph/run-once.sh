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

echo "Selected issue: $RELATIVE_ISSUE"

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

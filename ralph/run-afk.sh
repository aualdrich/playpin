#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./lib.sh
source "$SCRIPT_DIR/lib.sh"

usage() {
  echo "Usage: $0 <feature-slug> [--max N]" >&2
}

if [[ $# -lt 1 ]]; then
  usage
  exit 2
fi

FEATURE_SLUG="$1"
shift

MAX_ITERATIONS=10
while [[ $# -gt 0 ]]; do
  case "$1" in
    --max)
      if [[ $# -lt 2 || ! "$2" =~ ^[0-9]+$ || "$2" == "0" ]]; then
        echo "--max requires a positive integer" >&2
        exit 2
      fi
      MAX_ITERATIONS="$2"
      shift 2
      ;;
    *)
      usage
      exit 2
      ;;
  esac
done

ROOT="$(ralph_repo_root)"
ISSUES_DIR="$(ralph_issues_dir "$ROOT" "$FEATURE_SLUG")"

iteration=1
while [[ "$iteration" -le "$MAX_ITERATIONS" ]]; do
  if ! ralph_find_ready_issue "$ISSUES_DIR" >/dev/null; then
    echo "No ready issues found in $ISSUES_DIR"
    exit 0
  fi

  echo "Ralph AFK iteration $iteration of $MAX_ITERATIONS"
  "$SCRIPT_DIR/run-once.sh" "$FEATURE_SLUG"
  iteration=$((iteration + 1))
done

echo "Reached max iterations: $MAX_ITERATIONS"

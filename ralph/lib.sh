#!/usr/bin/env bash

set -euo pipefail

ralph_repo_root() {
  local script_dir
  script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  cd "$script_dir/.." && pwd
}

ralph_usage_feature_slug() {
  echo "Usage: $1 <feature-slug>" >&2
}

ralph_issues_dir() {
  local root="$1"
  local feature_slug="$2"
  printf "%s/.scratch/%s/issues" "$root" "$feature_slug"
}

ralph_issue_status() {
  local file="$1"
  sed -n '1,20{
    /^[[:space:]]*Status:[[:space:]]*/{
      s/^[[:space:]]*Status:[[:space:]]*//
      p
      q
    }
  }' "$file"
}

ralph_find_ready_issue() {
  local issues_dir="$1"
  local file
  local current_status

  if [[ ! -d "$issues_dir" ]]; then
    return 1
  fi

  while IFS= read -r file; do
    current_status="$(ralph_issue_status "$file")"
    if [[ "$current_status" == "ready-for-agent" ]]; then
      printf "%s\n" "$file"
      return 0
    fi
  done < <(find "$issues_dir" -maxdepth 1 -type f -name "*.md" | sort)

  return 1
}

ralph_issue_title() {
  local file="$1"
  local title

  title="$(sed -n '1,20{
    /^[[:space:]]*#/{
      s/^[[:space:]]*#[[:space:]]*//
      p
      q
    }
  }' "$file")"

  if [[ -n "$title" ]]; then
    printf "%s\n" "$title"
  else
    basename "$file" .md
  fi
}

#!/usr/bin/env bash
#
# Nightly backup of the site's SQLite database. Run from cron as `ability-x`
# (Webmin → Scheduled Cron Jobs is fine):
#
#     17 2 * * *  /home/ability-x/app/scripts/backup-vps.sh
#
# Uses SQLite's own backup command, never `cp`: the database runs in WAL mode,
# so recent changes live in the -wal file, and copying a live file can corrupt it.
# Local copies are kept 14 days. The off-site copy goes to a private R2 bucket
# of its own, never the media bucket (the media route serves any key in it).
set -euo pipefail

DB="${DB:-/home/ability-x/data/emdash.db}"
BACKUP_DIR="${BACKUP_DIR:-/home/ability-x/backups}"
KEEP_DAYS="${KEEP_DAYS:-14}"
OFFSITE="${OFFSITE:-r2:ability-x-backups}"
STAMP="$(date +%F)"

command -v sqlite3 >/dev/null || { echo "backup-vps: the sqlite3 CLI is required" >&2; exit 1; }
[ -f "$DB" ] || { echo "backup-vps: no database at $DB" >&2; exit 1; }

mkdir -p "$BACKUP_DIR"
# `sudo -u ability-x` from root's shell keeps /root as the working directory,
# which this user can't read; find would then fail under set -e.
cd "$BACKUP_DIR"

TARGET="$BACKUP_DIR/emdash-$STAMP.db"
echo "backup-vps: $DB -> $TARGET"
sqlite3 "$DB" ".backup '$TARGET'"

integrity=$(sqlite3 "$TARGET" "PRAGMA integrity_check;" || true)
if [ "$integrity" != "ok" ]; then
	echo "backup-vps: the copy failed its integrity check ($integrity); not keeping it" >&2
	rm -f "$TARGET"
	exit 1
fi

# Runs once an rclone remote named "r2" exists for this user (runbook, backups).
if command -v rclone >/dev/null && rclone listremotes 2>/dev/null | grep -qx "${OFFSITE%%:*}:"; then
	rclone copyto "$TARGET" "$OFFSITE/emdash-$STAMP.db"
	echo "backup-vps: copied off-site to $OFFSITE"
else
	echo "backup-vps: no rclone remote for $OFFSITE; off-site copy skipped" >&2
fi

find "$BACKUP_DIR" -maxdepth 1 -name 'emdash-*.db' -mtime "+$KEEP_DAYS" -print -delete
echo "backup-vps: done ($(du -h "$TARGET" | cut -f1))"

#!/bin/bash
set -e

BACKUP_DIR="backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "💾 Creating backup..."

mkdir -p $BACKUP_DIR

# Backup database
echo "Backing up database..."
pg_dump $DATABASE_URL > $BACKUP_DIR/db_$TIMESTAMP.sql

# Backup uploads
echo "Backing up uploads..."
tar -czf $BACKUP_DIR/uploads_$TIMESTAMP.tar.gz uploads/

echo "✅ Backup created: $BACKUP_DIR/db_$TIMESTAMP.sql"

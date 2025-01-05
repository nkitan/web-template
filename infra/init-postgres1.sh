#!/bin/bash
set -e

# Create a replication role
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE ROLE replicator WITH REPLICATION PASSWORD 'replicator_password' LOGIN;
  CREATE PUBLICATION app_publication FOR ALL TABLES;
EOSQL

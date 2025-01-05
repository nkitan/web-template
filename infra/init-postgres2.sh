#!/bin/bash
set -e

# Create a subscription to postgres1
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE SUBSCRIPTION app_subscription
  CONNECTION 'host=postgres1 port=5432 user=replicator password=replicator_password dbname=app_db'
  PUBLICATION app_publication;
EOSQL
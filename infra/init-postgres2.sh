#!/bin/bash
. ./.env
set -e

# Create a subscription to postgres1
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE SUBSCRIPTION $POSTGRES_SUBSCRIPTION_NAME
  CONNECTION 'host=postgres1 port=5432 user=$REPLICATOR_USER password=$REPLICATOR_PASSWORD dbname=$POSTGRES_DB'
  PUBLICATION $POSTGRES_PUBLICATION_NAME;
EOSQL
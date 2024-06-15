#!/bin/sh
COMPOSE_FILE=docker-compose.prod.yml:docker-compose.yml docker compose up -d --build

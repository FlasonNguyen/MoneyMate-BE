#!/bin/bash

dockerize -wait tcp://postgres:5432 -timeout 20s pg_isready

echo "Start Wait PostgreSQL"

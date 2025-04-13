.PHONY: install build start dev test migrate-up migrate-down

install:
	npm install

build:
	npm run build

start:
	npm start

dev:
	npm run dev

test:
	npm test

migrate-up:
	npx prisma migrate deploy

migrate-down:
	npx prisma migrate reset --force
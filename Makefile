install:
	npm ci

build:
	npm run build

test:
	npm run test

test-coverage:
	npm run test-coverage

lint:
	npm run lint

lint-fix:
	npm run lint-fix

typecheck:
	npm run typecheck

.PHONY: install build test test-coverage lint lint-fix typecheck

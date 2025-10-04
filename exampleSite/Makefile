#!make
#----------------------------------------
# Settings
#----------------------------------------
.DEFAULT_GOAL := help

#----------------------------------------
# Targets
#----------------------------------------
.PHONY: bootstrap
bootstrap: ## Ensures Node dependencies are installed
	@npm install --silent

.PHONY: dev
dev: clean ## Serves the site locally
	@hugo server --buildDrafts --minify --gc

.PHONY: build
build: clean bootstrap ## Compiles site for deployment
	@hugo --minify

.PHONY: serve
serve: clean bootstrap ## Serves the compiled site locally
	@hugo --minify --environment development
	@npx serve public -l 1313

.PHONY: clean
clean: ## Cleanup
	@hugo mod clean
	@hugo mod tidy
	@rm -rf public
	@rm -rf resources
	@rm -f .hugo_build.lock
	@rm -f hugo_stats.json

help:
	@fgrep -h "## " $(MAKEFILE_LIST) | fgrep -v fgrep | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-12s\033[0m %s\n", $$1, $$2}'

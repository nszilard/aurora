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
	@npm install --no-save @fullhuman/postcss-purgecss postcss-cli --silent

.PHONY: dev
dev: clean ## Serves the site locally
	@hugo server --themesDir ../.. --buildDrafts --minify --gc

.PHONY: build
build: clean bootstrap ## Compiles site for deployment
	@hugo --minify --themesDir ../..

.PHONY: clean
clean: ## Cleanup
	@rm -rf public
	@rm -rf resources
	@rm -f .hugo_build.lock
	@rm -f hugo_stats.json

help:
	@fgrep -h "## " $(MAKEFILE_LIST) | fgrep -v fgrep | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-9s\033[0m %s\n", $$1, $$2}'


html: README.html
	@true

# ###########################################################
# run: this is the relevant target in this directory.

name = $(notdir $(PWD))

run:
	echo $(name)
	docker run -it --rm --name $(name) alpine:latest

#
# ###########################################################
# for dev/SB only...

%.html: %.md
	markdown-wrapper $<

.PHONY: html run

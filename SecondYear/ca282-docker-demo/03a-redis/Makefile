
html: README.html
	@true

# ###########################################################
#

name = $(notdir $(PWD))

run:
	docker run --detach --rm --name $(name) --publish 6379:6379 redis:latest

ls:
	docker container ls

increment count:
	redis-cli incr count

stop:
	-docker container stop $(name)

#
# ###########################################################
# for dev/SB only...

%.html: %.md
	markdown-wrapper $<

.PHONY: html run ls increment count stop

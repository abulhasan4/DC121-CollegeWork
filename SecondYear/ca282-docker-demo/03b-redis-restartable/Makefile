
html: README.html
	@true

# ###########################################################
#

name = $(notdir $(PWD))

run:
	docker run --detach --name $(name) --publish 6379:6379 redis:latest

ls:
	docker container ls -a

increment count:
	redis-cli incr count

stop:
	docker container stop $(name)

restart start:
	docker container start $(name)

remove:
	-$(MAKE) stop
	docker container rm $(name)

#
# ###########################################################
# for dev/SB only...

%.html: %.md
	markdown-wrapper $<

.PHONY: html run ls increment count stop restart start remove

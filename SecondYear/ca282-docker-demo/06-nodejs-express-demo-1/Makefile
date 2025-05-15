
html: README.html
	@true

# ###########################################################
#

name = $(notdir $(PWD))

build:
	docker build . -t $(name)

run:
	docker run --detach --rm --publish 8000:80 --name $(name) $(name)

get:
	wget -O - -q http://localhost:8000/

stop:
	docker container stop $(name)

remove:
	docker image rm $(name)

#
# ###########################################################
# for dev/SB only...

%.html: %.md
	markdown-wrapper $<

.PHONY: html build run get stop remove

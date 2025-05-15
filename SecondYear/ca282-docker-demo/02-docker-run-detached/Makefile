
html: README.html
	@true

# ###########################################################
#

name = $(notdir $(PWD))

run:
	docker run --detach --rm --name $(name) --publish 8000:80 httpd:latest

ls:
	docker container ls

get:
	wget -O - -q http://localhost:8000/

date:
	docker exec $(name) date

connect:
	docker exec -it $(name) bash

stop:
	-docker container stop $(name)

#
# ###########################################################
# for dev/SB only...

%.html: %.md
	markdown-wrapper $<

.PHONY: html run ls date connect stop

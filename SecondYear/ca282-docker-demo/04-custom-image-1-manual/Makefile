
html: README.html
	@true

# ###########################################################
#

name = $(notdir $(PWD))
directory = /usr/local/apache2/htdocs

build:
	-$(MAKE) stop
	docker run --detach --rm --name $(name) httpd:latest
	docker cp ./nobody.txt $(name):$(directory)
	docker commit $(name) $(name)
	$(MAKE) stop

ls:
	docker image ls

run:
	docker run --detach --rm --name $(name) --publish 8000:80 $(name)

get:
	wget -O - -q http://localhost:8000/
	wget -O - -q http://localhost:8000/nobody.txt

stop:
	docker container stop $(name)

remove:
	docker image rm $(name)

#
# ###########################################################
# for dev/SB only...

%.html: %.md
	markdown-wrapper $<

.PHONY: html build ls run get stop remove

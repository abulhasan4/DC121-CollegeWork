
html: README.html
	@true

# ###########################################################
#

name = $(notdir $(PWD))
network = nodejs-express-network

build:
	docker build . -t $(name)

network:
	docker network create $(network)

redis:
	docker run --detach --rm --name redis --network $(network) redis

app:
	docker run --detach --rm --name $(name) --network $(network) --publish 8000:8000 $(name)

get:
	wget -O - -q http://localhost:8000/

stop:
	-docker container stop $(name) redis

remove:
	docker image rm $(name)
	docker network rm $(network)

#
# ###########################################################
# for dev/SB only...

%.html: %.md
	markdown-wrapper $<

.PHONY: html build network redis app get stop remove

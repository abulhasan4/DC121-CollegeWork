
html: README.html
	@true

# ###########################################################
#

name = $(notdir $(PWD))

build:
	docker build . -t $(name)
	#
	# We also install the necessary node module (express) locally.
	test -d node_modules/express || npm install express

run:
	docker run --detach --rm --publish 8000:80 --name $(name) \
	  --volume $(PWD):/app $(name)

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

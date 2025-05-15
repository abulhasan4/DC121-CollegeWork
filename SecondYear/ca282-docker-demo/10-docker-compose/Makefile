
html: README.html
	@true

# ###########################################################
#

up start:
	docker compose up --detach

get:
	wget -O - -q http://localhost:8000/

stop:
	docker compose stop

#
# ###########################################################
# for dev/SB only...

%.html: %.md
	markdown-wrapper $<

.PHONY: html up start get stop

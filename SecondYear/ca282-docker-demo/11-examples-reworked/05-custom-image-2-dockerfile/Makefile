
name = $(notdir $(PWD))

start up run:
	docker compose up --detach

get:
	wget -O - -q http://localhost:8000/
	wget -O - -q http://localhost:8000/nobody.txt

down stop:
	docker compose down

.PHONY: start up run get down stop


name = $(notdir $(PWD))

start up run:
	docker compose up --detach

get increment count:
	redis-cli incr count

down stop:
	docker compose down

.PHONY: start up run increment count down stop


html: README.html
	@true

# ###########################################################
#

network = alpine-network
container_1 = alpine-container-1
container_2 = alpine-container-2

network:
	docker network create $(network)

run:
	docker run --detach --rm --name $(container_1) --network $(network) alpine:latest /sbin/init
	docker run --detach --rm --name $(container_2) --network $(network) alpine:latest /sbin/init

ls:
	docker container ls

ping:
	@echo
	@echo test ping from $(container_1) to $(container_2)...
	docker exec -it $(container_1) ping -c 1 $(container_2)
	@echo
	@echo test ping from $(container_2) to $(container_1)...
	docker exec -it $(container_2) ping -c 1 $(container_1)


stop:
	docker container stop $(container_1) $(container_2)

remove:
	docker network remove $(network)

#
# ###########################################################
# for dev/SB only...

%.html: %.md
	markdown-wrapper $<

.PHONY: html network run ls ping stop remove

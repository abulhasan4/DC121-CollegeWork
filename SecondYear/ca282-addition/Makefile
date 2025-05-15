
# A poor man's test framework.
#
# We just run each implementation in various ways and grep for the expected result.
#
# Make will fail if any of the greps below fail.
#
# For additional languages, simply append tests as needed below.
#
# You should know that, for all of the indented lines below, the indetation is
# EXACTLY ONE TAB CHARACTER.  Yes.  It's weird.  But that's how it is.

grep = grep -q -w -x

build:
	$(MAKE) -C src build

test:
	$(MAKE) build
	#
	# Test ZSH implementation.
	zsh src/add-arguments.zsh | wc -l | $(grep) 1
	zsh src/add-arguments.zsh | $(grep) 0
	zsh src/add-arguments.zsh 1 2 3 | wc -l | $(grep) 1
	zsh src/add-arguments.zsh 1 2 3 | $(grep) 6
	zsh src/add-arguments.zsh 1 -2 3 | wc -l | $(grep) 1
	zsh src/add-arguments.zsh 1 -2 3 | $(grep) 2

	# Test Python3 implementation.
	python3 src/add-python3.py | wc -l | $(grep) 1
	python3 src/add-python3.py | $(grep) 0
	python3 src/add-python3.py 1 2 3 | wc -l | $(grep) 1
	python3 src/add-python3.py 1 2 3 | $(grep) 6
	python3 src/add-python3.py 1 -2 3 | wc -l | $(grep) 1
	python3 src/add-python3.py 1 -2 3 | $(grep) 2

	# Test Python2 implementation.
	python2 src/add-python2.py | wc -l | $(grep) 1
	python2 src/add-python2.py | $(grep) 0
	python2 src/add-python2.py 1 2 3 | wc -l | $(grep) 1
	python2 src/add-python2.py 1 2 3 | $(grep) 6
	python2 src/add-python2.py 1 -2 3 | wc -l | $(grep) 1
	python2 src/add-python2.py 1 -2 3 | $(grep) 2

	# Test perl implementation.
	perl src/add-perl.pl | wc -l | $(grep) 1
	perl src/add-perl.pl | $(grep) 0
	perl src/add-perl.pl 1 2 3 | wc -l | $(grep) 1
	perl src/add-perl.pl 1 2 3 | $(grep) 6
	perl src/add-perl.pl 1 -2 3 | wc -l | $(grep) 1
	perl src/add-perl.pl 1 -2 3 | $(grep) 2

	# Test C implementation.
	./src/add-c | wc -l | $(grep) 1
	./src/add-c | $(grep) 0
	./src/add-c 1 2 3 | wc -l | $(grep) 1
	./src/add-c 1 2 3 | $(grep) 6
	./src/add-c 1 -2 3 | wc -l | $(grep) 1
	./src/add-c 1 -2 3 | $(grep) 2
	
	#Test Javascript implementation
	node ./src/add-javascript.js | wc -l | $(grep) 1
	node ./src/add-javascript.js | $(grep) 0
	node ./src/add-javascript.js 1 2 3 | wc -l | $(grep) 1
	node ./src/add-javascript.js 1 2 3 | $(grep) 6
	node ./src/add-javascript.js 1 -2 3 | wc -l | $(grep) 1
	node ./src/add-javascript.js 1 -2 3 | $(grep) 2
	
	# Test Java implementation.
	java src/Add.java | wc -l | $(grep) 1
	java src/Add.java | $(grep) 0
	java src/Add.java 1 2 3 | wc -l | $(grep) 1
	java src/Add.java 1 2 3 | $(grep) 6
	java src/Add.java 1 -2 3 | wc -l | $(grep) 1
	java src/Add.java 1 -2 3 | $(grep) 2

#!/usr/bin/zsh

# Your repo will checked with this script or something quite like it.
#
# The tests in your Makefile will be checked manually.

integer correct=0

file=src/add-python3.py

# Test the Python3 script.
test -f $file && python3 $file | grep -q -x -w 0 && ((correct += 1))
test -f $file && python3 $file $(seq 10) | grep -q -x -w 55 && ((correct += 1))

file=src/add-python2.py

# Test the Python2 script.
python2="python2.7"
test -f $file && $python2 $file | grep -q -x -w 0 && ((correct += 1))
test -f $file && $python2 $file $(seq 10) | grep -q -x -w 55 && ((correct += 1))

file=src/add-c

# The C executable should not be in the repo!
test -f $file && ((correct -= 2))

# Try to build the C executable.
test -f $file.c && make -C src add-c && test -f $file && ((correct += 1))

# Test the C executable.
test -f $file && $file | grep -q -x -w 0 && ((correct += 1))
test -f $file && $file $(seq 10) | grep -q -x -w 55 && ((correct += 1))

# Remove the C executable again, if it exists.
test -f $file && rm $file

file=Add
cd src

# The Java class file should not be in the repo!
test -f $file.class && ((correct -= 2))

# Try to build the Java class file.
test -f $file.java && make Add.class && test -f $file.class && ((correct += 1))

# Test the Java implementation.
test -f $file.class && java Add | grep -q -w -x 0 && ((correct += 1))
test -f $file.class && java Add $(seq 10) | grep -q -w -x 55 && ((correct += 1))

# And remove the Java class file.
test -f $file.class && rm $file.class

# Test the Makefiles.
make build && test -x add-c && ((correct += 1))
make build && test -s Add.class && ((correct += 1))

# Remove the automatically-generated files again.
test -f add-c && rm add-c
test -f Add.class && rm Add.class

# Check that there are no updates to the repo.
git status | wc -l | grep -q -w -x 2 && ((correct +=1 ))

# Check the tests work.
# The details of the tests will be checked manually.
cd ..
make test && ((correct += 1))

print $correct

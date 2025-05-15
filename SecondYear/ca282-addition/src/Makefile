targets = add-c
targets += Add.class

build: $(targets)
	@true

%: %.c
	gcc -o $@ $<

%.class: %.java
	javac $<


def add(x, y):
   return x + y

<<<<<<< HEAD
def subtract(x, y):
   return x - y
=======
def multiply(x, y):
   return x * y
>>>>>>> multiply

if __name__ == "__main__":
   print "add(3, 4) ->", add(3, 4)
   assert(add(3, 4) == 7)

<<<<<<< HEAD
   print "subtract(10, 6) ->", subtract(10, 6)
   assert(subtract(10, 6) == 4)
=======
   print "multiply(3, 4) ->", multiply(3, 4)
   assert(multiply(3, 4) == 12)
>>>>>>> multiply

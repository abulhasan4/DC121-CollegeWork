#!/usr/bin/env python

import sys

total = 0

for v  in sys.argv[1:]:
   total = total + int(v)

print total

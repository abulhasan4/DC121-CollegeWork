#!/usr/bin/env python3

import sys

total = 0
for s in sys.argv[1:]:
   total += int(s)

print(total)

#include <stdlib.h>
#include <stdio.h>

int main(int argc, char *argv[])
{
   int i, total = 0;
   for (i = 1; i < argc; i += 1)
      total += atoi(argv[i]);
   printf("%d\n", total);

   return 0;
}

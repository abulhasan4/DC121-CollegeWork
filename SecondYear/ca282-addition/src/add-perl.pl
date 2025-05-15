#!/usr/bin/perl

$total = 0;

foreach $argnum (0..$#ARGV) {
   $total += $ARGV[$argnum];
}

print $total, "\n";

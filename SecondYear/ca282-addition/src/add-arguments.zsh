#!/usr/bin/zsh

integer total=0

for value in $argv
do
   (( total += $value ))
done

print $total

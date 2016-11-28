#!/bin/bash -xv

exec 2> /tmp/run.bash

ps aux			|
grep executable		|
awk '{print $2}'	|
xargs kill -KILL


echo 'Content-type: text/html'
echo 
/tmp/executable &> /tmp/executable.log
echo "--STDERR--"
cat /tmp/executable.log

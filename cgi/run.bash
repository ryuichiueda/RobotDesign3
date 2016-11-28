#!/bin/bash -xv

exec 2> /tmp/run.bash

ps aux			|
grep executable		|
awk '{print $2}'	|
xargs kill -KILL


echo 'Content-type: text/html'
echo 
/tmp/executable 2> /tmp/errorlog
echo "--STDERR--"
cat /tmp/errorlog

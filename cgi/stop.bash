#!/bin/bash -xv

exec 2> /tmp/stop.bash

echo 'Content-type: text/html'
echo 

ps aux			|
grep executable		|
awk '{print $2}'	|
xargs kill -KILL

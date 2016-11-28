#!/bin/bash -xv

exec 2> /tmp/log.bash

echo 'Content-type: text/html'
echo 
cat /tmp/executable.log

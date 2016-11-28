#!/bin/bash -xv

exec 2> /tmp/run.bash

echo 'Content-type: text/html'
echo 
/tmp/executable 2> /tmp/errorlog
echo "--STDERR--"
cat /tmp/errorlog

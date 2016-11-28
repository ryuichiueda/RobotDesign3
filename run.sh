#!/bin/bash -xv

exec 2> /tmp/log

###HTML等を/var/www/に転送###
sudo rm -Rf /var/www/*
sudo rsync -av /home/pi/RobotDesign3/cgi/ /var/www/

###スティッキービットの解除###
sudo chmod o-t /run/shm/

###マニピュレータの書き込みOKに###
sudo chmod 777 /dev/ttyUSB0

###アプリの起動###
sudo python /home/pi/RobotDesign3/scripts/robot_io.py &> /tmp/robot_io

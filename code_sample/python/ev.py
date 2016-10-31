#!/usr/bin/env python
#encoding: utf8

import sys,time,os

for i in range(10):
	with open("/run/shm/ev_on_off","w") as f:
		if i%2 == 0:
			f.write("1\n");
		else:
			f.write("0\n");

	time.sleep(1)

#パーミッションの関係でev_on_offが残るとCGIが動かなくなるので消しておく
os.remove("/run/shm/ev_on_off")

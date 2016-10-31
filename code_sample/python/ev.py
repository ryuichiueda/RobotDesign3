#!/usr/bin/env python

import sys,time

for i in range(10):
	with open("/run/shm/ev_on_off","w") as f:
		if i%2 == 0:
			f.write("1\n");
		else:
			f.write("0\n");

	time.sleep(1)

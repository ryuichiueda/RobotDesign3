#!/usr/bin/env python

import sys,os,time

def send_angles(j1,j2,j3,j5,j6,wait):
	with open("/run/shm/angles.tmp","w") as f:
		f.write("%d,%d,%d,%d,%d\n" % (j1,j2,j3,j5,j6))
		f.flush()

	os.rename("/run/shm/angles.tmp","/run/shm/angles")
	time.sleep(wait)

if __name__ == "__main__" :
	send_angles(0,0,90,90,0,2.0)

	for d in range(7):
		j2 = d*10
		j3 = 90
		j5 = 180 - j2 - j3
		send_angles(0,j2,j3,j5,0,0.5)

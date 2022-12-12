#!/usr/bin/python
# vim:fileencoding=utf-8
# ref: http://qiita.com/f_nishio/items/93387feade923a0d20a0

'''
The MIT License (MIT)
Copyright (c) 2015 Ryuichi Ueda
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
'''

import time, os
import wiringpi as wp
import threading

class RobotIO:
	PIN_BASE = 100
	EV_PIN = 17
	EV2_PIN = 27

	def __init__(self):
		wp.mcp3002Setup(RobotIO.PIN_BASE, 0)
		wp.wiringPiSetupGpio()
		wp.pinMode(RobotIO.EV_PIN, wp.GPIO.OUTPUT)
		wp.pinMode(RobotIO.EV2_PIN, wp.GPIO.OUTPUT)
		self.uart = open('/dev/ttyUSB0',"w")
		self.prev = ""

	def read_da(self,ch):
		return wp.analogRead(RobotIO.PIN_BASE+ch)

	def write_ev(self,value):
		wp.digitalWrite(RobotIO.EV_PIN, value)

	def write_ev2(self,value):
		wp.digitalWrite(RobotIO.EV2_PIN, value)

	def send_angles(self, angles):
		J1_ULMT = 150 
		J1_LLMT = -150
		angles = [ a if a < J1_ULMT else J1_ULMT for a in angles ]
		angles = [ a if a > J1_LLMT else J1_LLMT for a in angles ]

		s = [str(a) for a in angles ]
		s = ['0' + a if len(a) == 1 else a for a in s ] 
		s = ",".join(s) + '\n'

		try:
			if self.prev == s:
				return
			self.uart.write(s)
			self.uart.flush()
			self.prev = s
			print("manipulator: {}".format(s))
		except:
			print(s + " NG: /dev/ttyUSB0 unavailable")

def parse_angles(f):
	# 最初の行を読む
	for line in f:
		values = line.rstrip().split(',')
		if len(values) < 5:
			return

		values = [ int(x) for x in values ]
		if len(values) == 5:
			rio.send_angles(values)
		elif len(values) == 6:
			rio.send_angles(values[0:4])
			time.sleep(values[5]/1000.0)
		else:
			print("NG")

def send_angles():
    while True:
        try:
            with open("/run/shm/angles","r") as f:
                parse_angles(f)
            time.sleep(0.02)
        except:
            time.sleep(0.02)

if __name__ == '__main__':
	rio = RobotIO()
	threading.Thread(target=send_angles).start()

	while True:
		with open("/run/shm/adconv_values.tmp","w") as f:
			ans = str(rio.read_da(0)) + " " + str(rio.read_da(1)) + "\n"
			f.write(ans)
		
		os.rename("/run/shm/adconv_values.tmp","/run/shm/adconv_values")

		try:
			with open("/run/shm/ev_on_off","r") as f:
				v = int(f.readline())
				rio.write_ev(v)
				
			with open("/run/shm/ev2_on_off","r") as f:
				v = int(f.readline())
				rio.write_ev2(v)
		except:
			pass

		time.sleep(0.01)

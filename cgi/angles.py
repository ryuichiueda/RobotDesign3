#!/usr/bin/env python
#vim:fileencoding=utf-8

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
import os,cgi
import sys,time
import struct

if __name__ == '__main__':
	form = cgi.FieldStorage()

	http_header = "Content-type: text/html\n\n"
	print http_header

	if form.has_key("angles"):
		with open("/run/shm/angles","w") as f:
			f.write(form["angles"].value)
			os.chmod("/run/shm/angles",0777)
	else:
		print "GET ERROR"

	if form.has_key("ev"):
		with open("/run/shm/ev_on_off","w") as f:
			if form["ev"].value == "ON":
				f.write("1\n")
			else:
				f.write("0\n")

			os.chmod("/run/shm/ev_on_off",0777)


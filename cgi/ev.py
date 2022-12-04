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

import sys,cgi,os

if __name__ == '__main__':
	form = cgi.FieldStorage()
	http_header = "Content-type: text/html\n\n"
	print(http_header)

	if not form.has_key("onoff"):
		print("ERROR")
		sys.exit(1)

	try:
		with open("/run/shm/ev_on_off","w") as f:
			values = form["onoff"].value
			f.write(values + '\n')
			#os.chmod("/run/shm/ev_on_off", 0o777)
	except:
		print("FILE ERROR")

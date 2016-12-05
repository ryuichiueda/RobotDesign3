#!/usr/bin/env python
#coding: utf-8
import sys,time

j1,j2,j3,j5,j6 = 0,60,0,0,0

while True:
    # ロボットの角度の読み込み周期は20ms（アバウトです）
    time.sleep(0.05)

    ch0 = 0
    delta = 0

    #チャンネル0のADコンバータの値を読み込む（距離センサ）
    with open("/run/shm/adconv_values","r") as sensor:
        vs_str = sensor.readline().rstrip().split()
        ch0 = int(vs_str[0])

    #距離センサの値が300以上なら正の方向
    #そうでなければ負の方向に回る
    delta = 1 if ch0 > 300 else -1

    #もう向きが行きすぎていたら止めておく
    if j1 < -90 and delta < 0:  continue 
    if j1 > 90 and delta > 0:   continue 

    j1 += delta

    #アームの角度を指定
    s = "%d,%d,%d,%d,%d\n" % (j1,j2,j3,j5,j6)
    with open("/run/shm/angles","w") as arm:
        arm.write(s)
        print >> sys.stderr, s

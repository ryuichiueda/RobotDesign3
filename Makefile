install:
	#python-pipとpython-devをインストール
	apt-get install python-pip python-dev
	#WiringPiのインストール
	pip install wiringpi2 --upgrade
	#nkfのインストール
	apt-get install nkf
	#ウェブサーバとアプリのセットアップ
	apt-get install apache2
	a2enmod cgid

	rm /etc/apache2/sites-enabled/*
	cp ./apache2.conf /etc/apache2/sites-available/default
	ln -s /etc/apache2/sites-available/default /etc/apache2/sites-enabled/default.conf

	service apache2 restart
	rsync -av --delete /home/ubuntu/RobotDesign3/cgi/ /var/www/

	crontab crontab.conf
	echo "DO REBOOT"
uninstall:
	sudo crontab -r

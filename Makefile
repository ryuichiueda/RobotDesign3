install:
	#python-pipとpython-devをインストール
	apt install python3-pip python3-dev

	#WiringPiのインストール
	pip3 install wiringpi2 --upgrade

	#nkfのインストール
	apt install nkf

	#ウェブサーバとアプリのセットアップ
	apt install apache2
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

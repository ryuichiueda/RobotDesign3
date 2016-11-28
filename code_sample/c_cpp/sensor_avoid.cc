#include <stdio.h>
#include <unistd.h>

//関節角をマニピュレータに送る関数
//引数: 各関節角とwait（ms）
void sendAngles(int j1,int j2,int j3,int j5,int j6,double wait)
{
	FILE *manip = fopen("/run/shm/angles","w");
	if(manip == NULL)
		return;
	fprintf(manip,"%d,%d,%d,%d,%d\n",j1,j2,j3,j5,j6);
	fclose(manip);
	usleep((int)(wait*1000));
}

int main(int argc, char const* argv[])
{
	int ch0 = 0;
	int ch1 = 0;
	int j1 = 0;
	int j2 = 60;
       	int j3 = 0;
	int j5 = 0;
	int j6 = 0;

	while(1){
		usleep(50*1000);

		FILE *ad = fopen("/run/shm/adconv_values","r");
		fscanf(ad,"%d %d",&ch0,&ch1);
		fclose(ad);

                int delta = ch0 > 300 ? 1 : -1;

		//fprintf(stderr,"%d\n",ch0);
		if(j1 < -90 && delta < 0)
			continue;
		if(j1 > 90 && delta > 0)
			continue;

		j1 += delta;

		sendAngles(j1,j2,j3,j5,j6,0.0);
	}

	return 0;
}

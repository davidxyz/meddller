#include <iostream>
#include <fstream>
#include <string.h>
#include <stdio.h>
using namespace std;
int GetFileSize(std::string filename) // path to file
{
    FILE *p_file = NULL;
    p_file = fopen(filename.c_str(),"rb");
    fseek(p_file,0,SEEK_END);
    int size = ftell(p_file);
    fclose(p_file);
    return size;
}
int main (int argc, const char * argv[])
{
argv++;
if (strncmp("-add",*argv,strlen(*argv))==0 ||strncmp("-a",*argv,strlen(*argv))==0){
cout<<"add shit\n";
        ofstream outfile("logs.txt",ios_base::app);
        //cout<<"making logs.txt file\n";
	for(int i=0;i<argc-2;i++){      
             cout<<"added "<<*(argv++)<<" to logs.txt\n";
        outfile<<*argv<<"\n";
	}
        outfile.close();
 }else if(strncmp("-take",*argv,strlen(*argv))==0 || strncmp("-t",*argv,strlen(*argv))==0){
cout<<"take shit\n";
}else if(strncmp("-clear",*argv,strlen(*argv))==0 || strncmp("-c",*argv,strlen(*argv))==0){
ifstream infile;
infile.open("logs.txt");
string sLine="";
while (!infile.eof())
{
getline(infile, sLine);
cout << "clearing file: "<<sLine << endl;
ofstream outfile(sLine.c_str());
outfile.close();
}

infile.close();
}else if(strncmp("-empty",*argv,strlen(*argv))==0 || strncmp("-e",*argv,strlen(*argv))==0){ 
cout<<"clearing logs.txt..\n";
ofstream outfile("logs.txt");
outfile.close();
}else if(strncmp("-help",*argv,strlen(*argv))==0 || strncmp("-h",*argv,strlen(*argv))==0){ 
cout<<"-add: \t\t add a file or files to logs.txt\n";
cout<<"-take: \t\t take a file or files to logs.txt\n";
cout<<"-clear: \t\t clear the logs from logs.txt\n";
cout<<"-empty: \t\t empty logs.txt\n";
cout<<"-list: \t\t list the files from logs.txt\n";
}else if(strncmp("-list",*argv,strlen(*argv))==0 || strncmp("-l",*argv,strlen(*argv))==0){
cout<<"list of shit:\n";
ifstream infile;
string sLine="";
infile.open("logs.txt");
while (!infile.eof())
{
getline(infile, sLine);
cout << sLine << ": "<<GetFileSize(sLine)<<endl;
}
infile.close();
} else{
cout<<"stop being fucking stupid -h or -help\n";
}
return 0;
}

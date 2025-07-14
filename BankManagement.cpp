#include<iostream>
#include<vector>
using namespace std;

class BankAccount{
    private:
        string name;
        int accountNum;
        double balance;
    public:
        BankAccount(string n,int ac,double bal){
            name = n;
            accountNum = ac;
            balance = bal;
        }
    string getName(){
        return name;
    }
    int getAccountNum(){
        return accountNum;
    }
    double getBalance(){
        return balance;
    }

};
class BankManagement{
    private:
        vector<BankAccount> accounts;
    public:
        void AddAccount(string name, int accountNum,double balance){
            accounts.push_back(BankAccount(name,accountNum,balance));
        }
};

int main(){
    BankManagement bank;
    int choice;
    cout<<"\t\t :: Bank Management System"<<endl;
    cout<<"\t\t\tMain Menu"<<endl;
    cout<<"\t\t1. Create New Account"<<endl;
    cout<<"\t\t2. Show All Account"<<endl;
    cout<<"\t\t3. Search Account"<<endl;
    cout<<"\t\t4. Deposit Money"<<endl;
    cout<<"\t\t5. Withdraw Money"<<endl;
    cout<<"\t\t6. Exit"<<endl;
    cout<<"\t\t----------------------"<<endl;
    cout<<"\t\tEnter Your Choice :";
    cin>>choice;
    switch (choice)
    {
        case 1:{
        string name;
        int accountNum;
        double balance;
        cout<<"\t\tEnter Name :";
        cin>>name;
        cout<<"\t\tEnter Account Number :";
        cin>>accountNum;
        cout<<"\t\tEnter Initial Balance :";
        cin>>balance;
        bank.AddAccount(name,accountNum,balance);
        cout<<"Account Created Successfully....."<<endl;
        break;
        }
    default:
        break;
    }
    return 0;
}
//
// Created by batazor on 21.06.17.
//

#include <iostream>
#include <vector>

using namespace std;

void PrintWorlds(vector<string> words) {
    for (auto w : words) {
        cout << w << " ";
    }
}

void ChangeInt(int x) {
    x = 42;
}

int main() {
    PrintWorlds({"one", "two", "three"});

    int a = 5;
    ChangeInt(a);
    cout << endl << a << endl;
    return 0;
}
//
// Created by batazor on 20.06.17.
//

#include <iostream>
#include <vector>
using namespace std;

int main() {
    int a;
    vector<int> b;
    cin >> a;

    while (a >= 1) {
        b.push_back(a % 2);
        a = a / 2;
    }

    for (int i = (b.size() - 1); i >= 0; i--) {
        cout << b[i];
    }

    return 0;
}
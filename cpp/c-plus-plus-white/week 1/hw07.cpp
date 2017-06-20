//
// Created by batazor on 20.06.17.
//

#include <iostream>
using namespace std;

int main() {
    string a;
    cin >> a;
    int index = -2, count = 0;

    for (int i = 0; i <= a.size(); i += 1) {

        if (a[i] != 'f') continue;

        index = i;
        count += 1;

        if (count == 2) break;
    }

    if (count == 0) {
        cout << -2;
    } else if (count == 1) {
        cout << -1;
    } else {
        cout << index;
    }


    return 0;
}
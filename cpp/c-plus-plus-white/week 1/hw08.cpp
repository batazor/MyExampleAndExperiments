//
// Created by batazor on 20.06.17.
//

#include <iostream>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b;

    while (b != 0) {
        c = a % b;
        a = b;
        b = c;
    }

    cout << a;

    return 0;
}
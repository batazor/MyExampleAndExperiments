//
// Created by batazor on 20.06.17.
//

#include <iostream>
using namespace std;

int main() {
    int a, b;

    cin >> a >> b;

    if (b == 0) cout << "Impossible";
    else cout << a / b;

    return 0;
}
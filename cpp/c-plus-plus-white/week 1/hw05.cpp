//
// Created by batazor on 20.06.17.
//

#include <iostream>
using namespace std;

int main() {
    double N, A, B, X, Y;
    cin >> N >> A >> B >> X >> Y;

    if (N > A && N < B) {
        cout << N * ( 100 - X ) / 100;
    } else if (N > B) {
        cout << N * ( 100 - Y ) / 100;
    } else {
        cout << N;
    }

    return 0;
}
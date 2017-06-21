//
// Created by batazor on 21.06.17.
//

#include <iostream>
#include <vector>

using namespace std;

int Factorial(int N) {
    if (N <= 1) return 1;

    int sum = 1;

    while (N >= 1) {
        sum = sum * N;
        N -= 1;
    }

    return sum;
}

int main() {
    cout << Factorial(1) << endl;
    cout << Factorial(-2) << endl;
    cout << Factorial(4) << endl;
    return 0;
}
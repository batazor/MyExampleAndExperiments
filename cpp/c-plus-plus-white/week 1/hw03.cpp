//
// Created by batazor on 20.06.17.
//

#include <iostream>
#include <cmath>

using namespace std;

int main() {
    double a = 0, b = 0, c = 0;
    cin >> a >> b >> c;

    // Ax^2 + Bx + C = 0
    double D = b * b - 4 * a * c;
    double x1 = 0, x2 = 0;

    if (a == 0 && b == 0) {
        return 0;
    }

    if (a == 0.0) {
        x1 = -c / b;
        cout << x1;
        return 0;
    }

    if (D == 0.0) {
        x1 = -b / ( 2 * a );

        cout << x1;
    } else if (D > 0.0) {
        x1 = (-b + sqrt(D)) / (2 * a);
        x2 = (-b - sqrt(D)) / (2 * a);

        cout << x1 << " " << x2;
    }

    return 0;
}
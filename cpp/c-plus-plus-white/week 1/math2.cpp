#include <iostream>
using namespace std;

int main() {
    int a = 11;
    int b = 3;
    double d = 3;

    cout << a / b << endl << a / d << endl;

    int x = 5;
    x += 2;
    cout << x << endl;

    int c = 1;
    ++c;
    c *= 5;
    c -= 3;
    cout << c++;

    return 0;
}
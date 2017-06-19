#include <iostream>
using namespace std;

int main() {
    int x = 4;
    int y = 5;

    cout << (x + y) * (x - y) << "\n";

    if (x != y) {
        cout << "not equal" << "\n";
    } else {
        cout << "equal" << "\n";
    }

    string xx = "abc";
    string yy = "def";

    if (x < y) {
        cout << "less" << "\n";
    } else {
        cout << "not less" << "\n";
    }

    return 0;
}
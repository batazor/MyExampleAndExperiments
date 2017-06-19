//
// Created by batazor on 20.06.17.
//

#include <iostream>
#include <vector>

using namespace std;

/* programm for work
 * with other operators */

int main() {
    int x = 4;
    int y = 5;

    if (x == y) {
        cout << "equal";
    } else {
        cout << "not equal";
    }

    cout << endl;

    vector<int> nums = {1, 2, 3};
    for (auto a : nums) {
        cout << a << endl;
    }

    // sum save search number
    int n = 5;
    int sum = 0;
    for (int i = 1; i <= n; ++i) {
        sum += i;
    }
    cout << sum << endl;

    int i = 1;
    sum = 0;
    while (i <= n) {
        sum += i;
        i += 1;
    }
    cout << sum;

    return 0;
}
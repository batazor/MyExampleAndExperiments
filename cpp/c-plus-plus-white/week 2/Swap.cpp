//
// Created by batazor on 04.07.17.
//

#include <iostream>
#include <algorithm>

using namespace std;

void Swap(int& x, int& y) {
    int tmp = x;
    x = y;
    y = tmp;
}

void Sort(vector<int>& v) {
    sort(begin(v), end(v));
}

int main() {
    int a = 1;
    int b = 2;
    Swap(a, b);

    cout << "a == " << a << endl;
    cout << "b == " << b << endl;

    vector<int> nums = {3, 6, 1, 2, 0, 2};
    Sort(nums);
    for (auto x : nums) {
        cout << x << " ";
    }

    return 0;
}
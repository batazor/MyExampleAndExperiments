//
// Created by batazor on 19.06.17.
//

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    string s = "abcdefg";
    for (char c : s) {
      cout << c << ",";
    }

    cout << endl;

    vector<int> nums = {1, 5, 2, 3, 5};
    for (int c : nums) {
        cout << c << ",";
    }

    cout << endl;

    int quantity = 0;
    for (auto x : nums) {
        if (x == 5) {
            quantity += 1;
        }
    }

    cout << "There are " << quantity << " fives" << endl;

    quantity= count(begin(nums), end(nums), 5);

    cout << "There are " << quantity << " fives" << endl;

    vector<string> str = {"1", "5", "2", "3", "5+"};
    for (auto c : str) {
        cout << c << ",";
    }

    cout << endl;

    sort(begin(nums), end(nums));
    for (auto x : nums) {
        cout << x << " ";
    }

    return 0;
}
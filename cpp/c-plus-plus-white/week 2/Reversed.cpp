//
// Created by batazor on 05.07.17.
//

#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

vector<int> Reversed(const vector<int>& v) {
    vector<int> tmp = v;
    reverse(tmp.begin(), tmp.end());
    return tmp;
}

int main() {
    vector<int> numbers = {1, 5, 3, 4, 2};
    vector<int> test = Reversed(numbers);
    for (auto w : test) {
        cout << w << endl;
    }
}
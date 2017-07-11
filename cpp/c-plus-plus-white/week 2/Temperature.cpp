//
// Created by batazor on 06.07.17.
//

#include <iostream>
#include <vector>
#include <numeric>

using namespace std;

int Average(const vector<int> t) {
    int average = accumulate(t.begin(), t.end(), 0.0) / t.size();
    return average;
}

int main() {
    int K;
    cin >> K;

    vector<int> t(K);
    for(auto& k : t) {
        cin >> k;
    }

    int average = Average(t);

    int sum = 0;
    for(int i = 0; i < t.size(); i++) {
        if (t[i] > average) sum++;
    }
    cout << sum << endl;

    for(int i = 0; i < t.size(); i++) {
        if (t[i] > average) cout << i << ' ';
    }

    return 0;
}
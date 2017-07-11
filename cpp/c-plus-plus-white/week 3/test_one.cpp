#include <vector>
#include <algorithm>
#include <iostream>

using namespace std;

int main() {
    vector<int> v = { 1, 2, 3, 4 };
//    sort(v.begin(),v.end());
//    int cnt = 0;
//    for (const auto& i : v) {
//        cnt += i % 2;
//    }
//    int cnt = 0;
//    for (int i = 0; i < v.size(); ++i) {
//        cnt += i % 2;
//    }
//    for (auto& item : v) {
//        item = item + 1;
//    }

    for (auto & i : v) {
        cout << i << endl;
    }


    return 0;
}
//
// Created by batazor on 11.07.17.
//

#include <vector>
#include <algorithm>
#include <iostream>

using namespace std;

int main() {
    int COUNT;

    cin >> COUNT;

    vector<string> v(COUNT);

    for (auto& item : v) {
        cin >> item;
    }

    sort(begin(v), end(v), [](string a, string b) {

        for (auto& item : a) {
            item = tolower(item);
        }
        for (auto& item : b) {
            item = tolower(item);
        }

        return (a < b);
    });

    for (string item : v) {
        cout << item << " ";
    }

    return 0;
}
//
// Created by batazor on 21.06.17.
//

#include <iostream>
#include <vector>

using namespace std;

bool Containers(vector<string> words, string w) {
    for (auto s : words) {
        if (s == w) {
            return true;
        }
    }
    return false;
}

int main() {
    cout << Containers({"air", "water", "fire"}, "fire");
    cout << Containers({"air", "water", "fire"}, "milk");
    cout << Containers({"air", "water", "fire"}, "water");
    return 0;
}
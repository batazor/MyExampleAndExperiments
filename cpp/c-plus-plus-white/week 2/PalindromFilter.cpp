//
// Created by batazor on 04.07.17.
//

#include <iostream>
#include <vector>

using namespace std;

bool IsPalindrom(string word) {
    if (word.size() < 2) return true;

    int sizeCount = word.size() / 2 + 1;
    bool IsPalindrom = true;

    for (int i = 0; i < sizeCount; i++) {
        if (word.at(i) != word.at(word.size() - i - 1)) {
            IsPalindrom = false;
            break;
        }
    }

    return IsPalindrom;
}

vector<string> PalindromFilter(vector<string> words, int minLength) {
    vector<string> filterWord = {};

    for (auto i = words.begin(); i != words.end(); ++i) {
        string test = *i;
        if (test.size() >= minLength && IsPalindrom(test)) {
            filterWord.push_back(*i);
        }
    }

    return filterWord;
}

int main() {
    vector<string> test = {"weew", "bro", "code", "teteetet", "re345fd"};

    vector<string> result = PalindromFilter(test, 4);
    for (auto i = result.begin(); i != result.end(); ++i) {
        cout << *i << endl;
    }

    return 0;
}
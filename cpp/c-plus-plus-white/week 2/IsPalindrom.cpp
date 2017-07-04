//
// Created by batazor on 04.07.17.
//

#include <iostream>

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

int main() {
    cout << IsPalindrom("madam") << endl;
    cout << IsPalindrom("hello") << endl;
    cout << IsPalindrom("madam") << endl;
    cout << IsPalindrom("bro") << endl;
    cout << IsPalindrom("34jtj43") << endl;
    cout << IsPalindrom("34gfd456") << endl;
    return 0;
}
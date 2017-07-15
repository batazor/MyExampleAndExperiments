//
// Created by batazor on 15.07.17.
//
#include <vector>
#include <algorithm>
#include <iostream>

using namespace std;

class SortedStrings {
    private:
        vector<string> str;

    public:
        void AddString(const string& s) {
            str.push_back(s);
        }
        vector<string> GetSortedStrings() {
            sort(begin(str), end(str));
            return str;
        }
};

void PrintSortedStrings(SortedStrings& strings) {
    for (const string& s : strings.GetSortedStrings()) {
        cout << s << " ";
    }
    cout << endl;
}

int main() {
    SortedStrings strings;

    strings.AddString("first");
    strings.AddString("third");
    strings.AddString("second");
    PrintSortedStrings(strings);

    strings.AddString("second");
    PrintSortedStrings(strings);

    return 0;
}
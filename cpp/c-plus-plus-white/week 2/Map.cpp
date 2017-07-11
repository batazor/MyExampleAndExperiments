//
// Created by batazor on 09.07.17.
//

#include <iostream>
#include <map>

using namespace std;

void PrintMap(const map<int, string>& m) {
    cout << m.size() << endl;
    for (auto item : m) {
        cout << item.first << ": " << item.second << endl;
    }
}

map<string, int> BuildReverseMap(const map<int, string>& m) {
    map<string, int> result;

    for (auto item : m) {
        result[item.second] = item.first;
    }

    return result;
};

void PrintReverseMap(const map<string, int>& m) {
    cout << m.size() << endl;
    for (auto item : m) {
        cout << item.first << ": " << item.second << endl;
    }
}

map<string, bool> BuildReversedMap(const map<bool, string>& h) {
    map<string, bool> result;
    for (const auto& item : h) {
        result[item.second] = item.first;
    }
    return result;
}

int main() {

    map<int, string> events;
    events[1950] = "Bjarne Stroustrup's birth";
    events[1987] = "Ba da tru";
    events[1922] = "22 da tru";
    PrintMap(events);

    cout << events[1950] << endl;
    events.erase(1950);
    PrintMap(events);

    map<string, int> year = BuildReverseMap(events);
    PrintReverseMap(year);
    cout << year["22 da tru"] << endl;

    map<string, int> t = {{"one", 1}, {"two", 2}, {"three", 3}};
    PrintReverseMap(t);

    map<int, string> m = {{1, "odd"}, {2, "even"}, {1, "one"}};
    m[2] = "two";
    m.erase(1);
    m[3] = "three";
    m.erase(4);
    m[5] = "five";
    cout << m.size();

    map<bool, string> h = {{true, "3213"}, {false, "424"}, {true, "5643"}, {true, "5643"}};
    cout << BuildReversedMap(h).size() << endl;

    return 0;
}
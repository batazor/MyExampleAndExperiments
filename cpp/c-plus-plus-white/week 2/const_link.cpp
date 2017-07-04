//
// Created by batazor on 04.07.17.
//

#include <iostream>
#include <algorithm>
#include <vector>
#include <chrono>

using namespace std;
using namespace std::chrono;

struct Person {
    string name;
    string surname;
    int age;
};

vector<Person> GetMoscowPopulation() {
    vector<Person> moscow = {};

    for (int i = 0; i < 10000000; i++) {
        moscow.push_back({"Ivan", "Ivanov", i});
    }

    return moscow;
};

void PrintPopulationSize(const vector<Person>& p) {
    cout << "There are " << p.size() << " people in Moscow" << endl;
}

int main() {

    auto start = steady_clock::now();
    vector<Person> people = GetMoscowPopulation();
    auto finish = steady_clock::now();
    cout << "GetMoscowPopulation " << duration_cast<milliseconds>(finish - start).count() << endl;

    start = steady_clock::now();
    PrintPopulationSize(people);
    finish = steady_clock::now();
    cout << "PrintPopulationSize " << duration_cast<milliseconds>(finish - start).count() << endl;

    return 0;
}
//
// Created by batazor on 19.06.17.
//

#include <iostream>
#include <vector>
#include <map>
using namespace std;

struct Person {
    string name;
    string surname;
    int age;
};

int main() {
    int x = -5;
    double pi = 3.14;
    bool logical_value = false;
    char symbol = 'Z';

    string hw = "Hello, world";
    cout << hw << "\n";

    vector<int> nums = {1, 3, 5, 7};
    cout << nums.size() << "\n";

    map<string, int> name_to_value;
    name_to_value["one"] = 1;
    name_to_value["two"] = 2;
    cout << "two is" << name_to_value["two"] << "\n";

    vector<Person> staff;
    staff.push_back({"Ivan", "Ivanov", 25});
    staff.push_back({"Petr", "Petrov", 32});
    cout << staff[0].name << "\n";

    return 0;
}
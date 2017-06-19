#include <iostream>
#include <vector>
using namespace std;

int main() {
    int x = 5;
    x = 6;
    cout << x << endl;

    string s = "hello";
    string t = s;

    t += ", world";
    s = "Holiday";

    cout << "s = " << s << endl;
    cout << "t = " << t << endl;

    vector<string> w = {"a", "b", "c"};
    vector<string> v;

    v = w;
    v[0] = "d";

    cout << w[0] << " " << w[1] << endl;
    cout << v[0] << " " << v[1] << endl;

    return 0;
}
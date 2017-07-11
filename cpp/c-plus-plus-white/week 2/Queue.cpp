//
// Created by batazor on 06.07.17.
//

#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

void WORRY(vector<string>& Q, int index) {
    Q[index] = "WORRY";
}

void QUIET(vector<string>& Q, int index) {
    Q[index] = "QUIET";
}

void COME(vector<string>& Q, int count) {
    if (count > 0) {
        while (count > 0) {
            Q.push_back("QUIET");
            count--;
        }
    }
    else if (count < 0) {
        while (count < 0) {
            Q.pop_back();
            count++;
        }
    }
}

void WORRY_COUNT(const vector<string>& Q) {
    int sum = count(begin(Q), end(Q), "WORRY");

    cout << sum << endl;
}

int main() {
    int K;
    cin >> K;

    vector<string> Q;

    vector<string> command(K);
    for(int i = 0; i < command.size(); i++) {
        cin >> command[i];
        int value;

        if (command[i] == "WORRY") {
            cin >> value;
            WORRY(Q, value);
        }
        else if (command[i] == "QUIET") {
            cin >> value;
            QUIET(Q, value);
        }
        else if (command[i] == "COME") {
            cin >> value;
            COME(Q, value);
        }
        else if (command[i] == "WORRY_COUNT") {
            WORRY_COUNT(Q);
        }
    }

    return 0;
}
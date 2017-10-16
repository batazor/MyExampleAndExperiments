package ru.startandroid.develop.p1161mngtasks1;

import android.content.Intent;
import android.view.View;

public class ActivityB extends MainActivity {
    public void onClick(View v) {
        startActivity(new Intent(this, ActivityC.class));
    }
}
package ru.startandroid.develop.p1161mngtasks1;

import java.util.List;

import android.app.Activity;
import android.app.ActivityManager;
import android.app.ActivityManager.RunningTaskInfo;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

public abstract class MainActivity extends Activity {

    final String LOG_TAG = "myLogs";
    List<ActivityManager.RunningTaskInfo> list;
    ActivityManager am;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        setTitle(getResources().getString(R.string.app_name) + " : " + getLocalClassName());
        am = (ActivityManager) getSystemService(ACTIVITY_SERVICE);
    }

    public void onInfoClick(View v) {
        list = am.getRunningTasks(10);
        for (RunningTaskInfo task : list) {
            if (task.baseActivity.flattenToShortString().startsWith("ru.startandroid.develop.p116")){
                Log.d(LOG_TAG, "------------------");
                Log.d(LOG_TAG, "Count: " + task.numActivities);
                Log.d(LOG_TAG, "Root: " + task.baseActivity.flattenToShortString());
                Log.d(LOG_TAG, "Top: " + task.topActivity.flattenToShortString());
            }
        }
    }

    abstract public void onClick(View v);
}
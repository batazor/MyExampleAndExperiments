package ru.startandroid.develop.p1191pendingintent;

import android.app.Activity;
import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

public class MainActivity extends Activity {

    final String LOG_TAG = "myLogs";

    NotificationManager nm;
    AlarmManager am;
    Intent intent1;
    Intent intent2;
    PendingIntent pIntent1;
    PendingIntent pIntent2;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        nm = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        am = (AlarmManager) getSystemService(ALARM_SERVICE);
    }

    public void onClick1(View view) {
        intent1 = createIntent("action", "extra 1");
        pIntent1 = PendingIntent.getBroadcast(this, 0, intent1, 0);

        intent2 = createIntent("action", "extra 2");
        pIntent2 = PendingIntent.getBroadcast(this, 0, intent2, 0);

        Log.d("qwe", "start");
        am.set(AlarmManager.RTC, System.currentTimeMillis() + 2000, pIntent1);
        am.set(AlarmManager.RTC, System.currentTimeMillis() + 4000, pIntent2);
    }

    public void onClick2(View view) {
        am.cancel(pIntent2);
    }

    Intent createIntent(String action, String extra) {
        Intent intent = new Intent(this, Receiver.class);
        intent.setAction(action);
        intent.putExtra("extra", extra);
        return intent;
    }

    void compare() {
        Log.d(LOG_TAG, "intent1 = intent2: " + intent1.filterEquals(intent2));
        Log.d(LOG_TAG, "pIntent1 = pIntent2: " + pIntent1.equals(pIntent2));
    }

    void sendNotif(int id, PendingIntent pIntent) {
        Notification notif = new Notification(R.mipmap.ic_launcher, "Notif "
                + id, System.currentTimeMillis());
        notif.flags |= Notification.FLAG_AUTO_CANCEL;
        notif.setLatestEventInfo(this, "Title " + id, "Content " + id, pIntent);
        nm.notify(id, notif);
    }
}
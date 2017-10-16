package ru.startandroid.develop.p0991servicenotification;

import java.util.concurrent.TimeUnit;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.os.IBinder;

public class MyService extends Service {
    NotificationManager nm;

    @Override
    public void onCreate() {
        super.onCreate();
        nm = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
    }

    public int onStartCommand(Intent intent, int flags, int startId) {
        try {
            TimeUnit.SECONDS.sleep(5);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        sendNotif();
        return super.onStartCommand(intent, flags, startId);
    }

    void sendNotif() {

        Notification notif = new Notification(R.mipmap.ic_launcher, "Text in status bar",
                System.currentTimeMillis());

        Intent intent = new Intent(this, MainActivity.class);
        intent.putExtra(MainActivity.FILE_NAME, "somefile");
        PendingIntent pIntent = PendingIntent.getActivity(this, 0, intent, 0);

//        notif.setLatestEventInfo(this, "Notification's title", "Notification's text", pIntent);

        notif.flags |= Notification.FLAG_AUTO_CANCEL;

        nm.notify(1, notif);
    }

    public IBinder onBind(Intent arg0) {
        return null;
    }
}
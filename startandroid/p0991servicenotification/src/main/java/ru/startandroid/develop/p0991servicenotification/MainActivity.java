package ru.startandroid.develop.p0991servicenotification;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.TextView;

public class MainActivity extends Activity {

    public final static String FILE_NAME = "filename";

    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        TextView tv = (TextView) findViewById(R.id.tv);

        Intent intent = getIntent();

        String fileName = intent.getStringExtra(FILE_NAME);
        if (!TextUtils.isEmpty(fileName))
            tv.setText(fileName);
    }

    public void onClickStart(View v) {
        startService(new Intent(this, MyService.class));
    }


    public void onClickStop(View v) {
        stopService(new Intent(this, MyService.class));
    }
}
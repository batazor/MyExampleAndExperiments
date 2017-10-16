package ru.startandroid.develop.p1021touch;

import android.app.Activity;
import android.os.Bundle;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnTouchListener;
import android.widget.TextView;

public class MainActivity extends Activity implements OnTouchListener {

    TextView tv;
    float x;
    float y;
    String sDown;
    String sMove;
    String sUp;

    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        tv = new TextView(this);
        tv.setOnTouchListener(this);
        setContentView(tv);
    }

    @Override
    public boolean onTouch(View v, MotionEvent event) {
        x = event.getX();
        y = event.getY();

        switch (event.getAction()) {
            case MotionEvent.ACTION_DOWN:
                sDown = "Down: " + x + "," + y;
                sMove = ""; sUp = "";
                break;
            case MotionEvent.ACTION_MOVE:
                sMove = "Move: " + x + "," + y;
                break;
            case MotionEvent.ACTION_UP:
            case MotionEvent.ACTION_CANCEL:
                sMove = "";
                sUp = "Up: " + x + "," + y;
                break;
        }
        tv.setText(sDown + "\n" + sMove + "\n" + sUp);
        return true;
    }
}
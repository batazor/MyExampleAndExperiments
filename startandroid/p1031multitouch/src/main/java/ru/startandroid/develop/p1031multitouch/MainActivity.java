package ru.startandroid.develop.p1031multitouch;

import android.app.Activity;
import android.os.Bundle;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnTouchListener;
import android.widget.TextView;

public class MainActivity extends Activity implements OnTouchListener {

    StringBuilder sb = new StringBuilder();
    TextView tv;
    int upPI = 0;
    int downPI = 0;
    boolean inTouch = false;
    String result = "";

    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        tv = new TextView(this);
        tv.setTextSize(30);
        tv.setOnTouchListener(this);
        setContentView(tv);
    }

    @Override
    public boolean onTouch(View view, MotionEvent event) {
        int actionMask = event.getActionMasked();
        int pointerIndex = event.getActionIndex();
        int pointerCount = event.getPointerCount();

        switch (actionMask) {
            case MotionEvent.ACTION_DOWN:
                inTouch = true;
            case MotionEvent.ACTION_POINTER_DOWN:
                downPI = pointerIndex;
                break;

            case MotionEvent.ACTION_UP:
                inTouch = false;
                sb.setLength(0);
            case MotionEvent.ACTION_POINTER_UP:
                upPI = pointerIndex;
                break;

            case MotionEvent.ACTION_MOVE:
                sb.setLength(0);

                for (int i = 0; i < 10; i++) {
                    sb.append("Index = " + i);
                    if (i < pointerCount) {
                        sb.append(", ID = " + event.getPointerId(i));
                        sb.append(", X = " + event.getX(i));
                        sb.append(", Y = " + event.getY(i));
                    } else {
                        sb.append(", ID = ");
                        sb.append(", X = ");
                        sb.append(", Y = ");
                    }
                    sb.append("\r\n");
                }
                break;
        }
        result = "down: " + downPI + "\n" + "up: " + upPI + "\n";

        if (inTouch) {
            result += "pointerCount = " + pointerCount + "\n" + sb.toString();
        }
        tv.setText(result);
        return true;
    }
}
package ru.startandroid.develop.p1501pathmeasure;

import android.app.Activity;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.PathMeasure;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

public class MainActivity extends Activity {

    final String TAG = "myLogs";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(new DrawView(this));
    }

    class DrawView extends View {

        Paint paint;
        Path path;
        Path path1;
        PathMeasure pMeasure;

        public DrawView(Context context) {
            super(context);
            paint = new Paint(Paint.ANTI_ALIAS_FLAG);
            paint.setStyle(Paint.Style.STROKE);
            paint.setStrokeWidth(3);

            path = new Path();
            path.moveTo(100, 300);
            path.rLineTo(150, 150);
            path.rLineTo(150, -100);
            path.rQuadTo(150, 200, 300, 0);
            path.rLineTo(150, 100);
            path.rLineTo(150, -150);

            pMeasure = new PathMeasure(path, false);

            path1 = new Path();
            pMeasure.getSegment(150, 850, path1, true);
        }

        @Override
        protected void onDraw(Canvas canvas) {
            canvas.drawARGB(80, 102, 204, 255);
            canvas.drawPath(path1, paint);
        }
    }

}
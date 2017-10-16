package ru.startandroid.develop.p1421drawingfigure;

import android.app.Activity;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Rect;
import android.os.Bundle;
import android.view.View;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(new DrawView(this));
    }

    class DrawView extends View {

        Paint p;
        Rect rect;

        public DrawView(Context context) {
            super(context);
            p = new Paint();
            rect = new Rect();
        }

        @Override
        protected void onDraw(Canvas canvas) {
            canvas.drawARGB(80, 102, 204, 255);
            p.setColor(Color.RED);
            p.setStrokeWidth(10);
            canvas.drawPoint(50, 50, p);
            canvas.drawLine(100,100,500,50,p);
            canvas.drawCircle(100, 200, 50, p);
            canvas.drawRect(200, 150, 400, 200, p);
            rect.set(250, 300, 350, 500);
            canvas.drawRect(rect, p);
        }

    }

}
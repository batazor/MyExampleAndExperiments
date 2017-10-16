package ru.startandroid.develop.p1431drawingpath;

import android.app.Activity;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.RectF;
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
        RectF rectf;
        Path path;
        Path path1;

        public DrawView(Context context) {
            super(context);
            p = new Paint();
            p.setStrokeWidth(3);
            p.setStyle(Paint.Style.STROKE);

            rectf = new RectF(350,100,400,150);
            path = new Path();
            path1 = new Path();
        }

        @Override
        protected void onDraw(Canvas canvas) {
            canvas.drawARGB(80, 102, 204, 255);

            path.reset();

            path.moveTo(100, 100);
            path.lineTo(150, 200);
            path.lineTo(50, 200);

            path.moveTo(250, 100);
            path.lineTo(300, 200);
            path.lineTo(200, 200);
            path.close();

            path.addRect(rectf, Path.Direction.CW);
            path.addCircle(450, 150, 25, Path.Direction.CW);

            p.setColor(Color.BLACK);
            canvas.drawPath(path, p);

            path1.reset();

            path1.moveTo(50,50);
            path1.lineTo(500,250);
            path1.moveTo(500,50);
            path1.lineTo(50,250);

            p.setColor(Color.GREEN);
            canvas.drawPath(path1, p);

            path.addPath(path1);

            path.offset(500,100);

            p.setColor(Color.BLUE);
            canvas.drawPath(path, p);
        }

    }

}
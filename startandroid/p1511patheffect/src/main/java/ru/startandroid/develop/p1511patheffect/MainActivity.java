package ru.startandroid.develop.p1511patheffect;

import android.app.Activity;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.ComposePathEffect;
import android.graphics.CornerPathEffect;
import android.graphics.DiscretePathEffect;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.PathEffect;
import android.os.Bundle;
import android.view.View;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(new DrawView(this));
    }

    class DrawView extends View {

        Path path;
        Paint p1;
        Paint p2;
        Paint p3;
        Paint p4;
        Paint p5;

        public DrawView(Context context) {
            super(context);
            path = new Path();
            path.addRect(-100, 0, 100, 500, Path.Direction.CW);


            PathEffect pe1 = new CornerPathEffect(100);
            PathEffect pe2 = new DiscretePathEffect(15, 10);
            PathEffect pe3 = new ComposePathEffect(pe1, pe2);
            PathEffect pe4 = new ComposePathEffect(pe2, pe1);


            p1 = new Paint(Paint.ANTI_ALIAS_FLAG);
            p1.setStyle(Paint.Style.STROKE);
            p1.setStrokeWidth(7);

            p2 = new Paint(p1);
            p2.setColor(Color.GREEN);
            p2.setPathEffect(pe1);

            p3 = new Paint(p1);
            p3.setColor(Color.BLUE);
            p3.setPathEffect(pe2);

            p4 = new Paint(p1);
            p4.setColor(Color.RED);
            p4.setPathEffect(pe3);

            p5 = new Paint(p1);
            p5.setColor(Color.YELLOW);
            p5.setPathEffect(pe4);

        }

        @Override
        protected void onDraw(Canvas canvas) {
            canvas.drawARGB(80, 102, 204, 255);

            canvas.translate(120, 100);
            canvas.drawPath(path, p1);

            canvas.translate(250, 0);
            canvas.drawPath(path, p2);

            canvas.translate(250, 0);
            canvas.drawPath(path, p3);

            canvas.translate(250, 0);
            canvas.drawPath(path, p4);

            canvas.translate(250, 0);
            canvas.drawPath(path, p5);
        }

    }

}
package ru.startandroid.develop.p1461canvastransform;

import android.app.Activity;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Matrix;
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
        RectF rectf1;
        RectF rectf2;

        public DrawView(Context context) {
            super(context);
            p = new Paint();
            p.setStrokeWidth(3);
            p.setStyle(Paint.Style.STROKE);
            rectf1 = new RectF(50,50,100,100);
            rectf2 = new RectF(50,150,100,200);
        }

        protected void onDraw(Canvas canvas) {
            canvas.drawARGB(80, 102, 204, 255);

            int initSave = canvas.save();

            p.setColor(Color.GREEN);
            canvas.drawRect(rectf1, p);

            canvas.translate(100, 0);
            canvas.drawRect(rectf1, p);
            canvas.translate(100, 0);
            canvas.drawRect(rectf1, p);

            canvas.save();

            p.setColor(Color.YELLOW);
            canvas.translate(100, 0);
            canvas.drawRect(rectf1, p);
            canvas.translate(100, 0);
            canvas.drawRect(rectf1, p);

            int needSave = canvas.save();

            p.setColor(Color.RED);
            canvas.translate(100, 0);
            canvas.drawRect(rectf1, p);
            canvas.translate(100, 0);
            canvas.drawRect(rectf1, p);

            canvas.save();

            p.setColor(Color.BLUE);
            canvas.translate(100, 0);
            canvas.drawRect(rectf1, p);
            canvas.translate(100, 0);
            canvas.drawRect(rectf1, p);

            canvas.restoreToCount(needSave);

            p.setColor(Color.BLACK);
            canvas.drawRect(rectf2, p);

            canvas.restoreToCount(initSave);

            p.setColor(Color.MAGENTA);
            canvas.drawRect(rectf2, p);

        }
    }
}
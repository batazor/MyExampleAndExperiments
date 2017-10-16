package ru.startandroid.develop.p1531colorfilter;

import android.app.Activity;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.ColorFilter;
import android.graphics.ColorMatrix;
import android.graphics.ColorMatrixColorFilter;
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

        Paint paint;
        Bitmap bitmap;
        Rect rect;

        float[] cmData = new float[]{
                -1, 0, 0, 0, 255,
                0, -1, 0, 0, 255,
                0, 0, -1, 0, 255,
                0, 0,  0, 1, 0,};

        ColorMatrix cm;
        ColorFilter filter;
        Bitmap icon;

        public DrawView(Context context) {
            super(context);

            rect  = new Rect(0,0,200,200);

            paint = new Paint(Paint.ANTI_ALIAS_FLAG);
            paint.setStyle(Paint.Style.FILL_AND_STROKE);

            icon = BitmapFactory.decodeResource(context.getResources(), R.mipmap.ic_launcher);

            cm = new ColorMatrix();
            cm.setScale(1, 1, 0, 0.5f);
            filter = new ColorMatrixColorFilter(cm);

        }

        @Override
        protected void onDraw(Canvas canvas) {
            canvas.drawARGB(80, 102, 204, 255);

            canvas.translate(100, 100);
            drawObjects(canvas);

            paint.setColorFilter(filter);
            canvas.translate(0, 300);
            drawObjects(canvas);
        }

        void drawObjects(Canvas canvas) {
            canvas.save();

            paint.setColor(Color.RED);
            canvas.drawRect(rect, paint);

            paint.setColor(Color.GREEN);
            canvas.translate(220, 0);
            canvas.drawRect(rect, paint);

            paint.setColor(Color.BLUE);
            canvas.translate(220, 0);
            canvas.drawRect(rect, paint);

            paint.setColor(Color.WHITE);
            canvas.translate(220, 0);
            canvas.drawRect(rect, paint);

            canvas.translate(220, 0);
            canvas.drawBitmap(icon, null, rect, paint);
            canvas.restore();
        }

    }
}
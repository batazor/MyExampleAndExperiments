package ru.startandroid.develop.p1581bitmapcreate;

import android.app.Activity;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.os.Bundle;
import android.util.DisplayMetrics;
import android.view.View;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(new DrawView(this));
    }

    class DrawView extends View {

        Paint paint;
        Bitmap bitmap1;
        Bitmap bitmap2;
        Bitmap bitmap3;

        public DrawView(Context context) {
            super(context);
            paint = new Paint(Paint.ANTI_ALIAS_FLAG);
            paint.setStyle(Paint.Style.STROKE);

            bitmap1 = Bitmap.createBitmap(100, 100, Bitmap.Config.RGB_565);
            bitmap2 = Bitmap.createBitmap(100, 100, Bitmap.Config.RGB_565);
            bitmap3 = Bitmap.createBitmap(100, 100, Bitmap.Config.RGB_565);

            Bitmap bitmapIcon = BitmapFactory.decodeResource(getResources(), R.mipmap.ic_launcher);

            Canvas canvas = new Canvas(bitmap1);
            canvas.drawBitmap(bitmapIcon, 0, 0, paint);

            canvas = new Canvas(bitmap2);
            canvas.drawBitmap(bitmapIcon, 0, 0, paint);
            bitmap2.setDensity(DisplayMetrics.DENSITY_XHIGH);

            bitmap3.setDensity(DisplayMetrics.DENSITY_XHIGH);
            canvas = new Canvas(bitmap3);
            canvas.drawBitmap(bitmapIcon, 0, 0, paint);
        }

        @Override
        protected void onDraw(Canvas canvas) {
            canvas.drawARGB(80, 102, 204, 255);

            canvas.translate(100, 100);
            canvas.drawRect(0,0,100,100,paint);
            canvas.drawBitmap(bitmap1, 0, 0, paint);

            canvas.translate(150, 0);
            canvas.drawRect(0,0,100,100,paint);
            canvas.drawBitmap(bitmap2, 0, 0, paint);

            canvas.translate(150, 0);
            canvas.drawRect(0, 0, 100, 100, paint);
            canvas.drawBitmap(bitmap3, 0, 0, paint);
        }

    }
}
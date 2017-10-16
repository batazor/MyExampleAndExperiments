package ru.startandroid.develop.p1561avoidxfermode;

import android.app.Activity;
import android.content.Context;
import android.graphics.AvoidXfermode;
import android.graphics.AvoidXfermode.Mode;
import android.graphics.Bitmap;
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

        Paint paint;

        Rect rect;

        Bitmap bitmap;
        Mode mode = Mode.TARGET;

        public DrawView(Context context) {
            super(context);
            paint = new Paint(Paint.ANTI_ALIAS_FLAG);
            rect = new Rect(0, 0, 50, 100);
            createBitmap();
        }

        @Override
        protected void onDraw(Canvas canvas) {
            canvas.drawARGB(80, 102, 204, 255);
            canvas.drawBitmap(bitmap, 0, 0, paint);
        }

        void createBitmap() {
            bitmap = Bitmap.createBitmap(1100, 700, Bitmap.Config.ARGB_8888);
            Canvas bitmapCanvas = new Canvas(bitmap);

            Paint redPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
            redPaint.setStyle(Paint.Style.FILL_AND_STROKE);
            redPaint.setColor(Color.RED);

            drawBitmap(bitmapCanvas, redPaint);

            redPaint.setXfermode(new AvoidXfermode(Color.BLUE, 0, mode));
            drawBitmap(bitmapCanvas, redPaint);

            redPaint.setXfermode(new AvoidXfermode(Color.BLUE, 127, mode));
            drawBitmap(bitmapCanvas, redPaint);

            redPaint.setXfermode(new AvoidXfermode(Color.BLUE, 255, mode));
            drawBitmap(bitmapCanvas, redPaint);
        }

        void drawBitmap(Canvas bitmapCanvas, Paint redPaint) {
            Paint bitmapPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
            bitmapPaint.setStyle(Paint.Style.FILL_AND_STROKE);

            bitmapCanvas.save();
            bitmapCanvas.translate(25, 25);
            for (int i = 0; i < 20; i++) {
                bitmapPaint.setColor(Color.rgb(i * 10, i * 10, 255));
                bitmapCanvas.drawRect(rect, bitmapPaint);
                bitmapCanvas.translate(50, 0);
            }
            bitmapCanvas.restore();

            bitmapCanvas.drawRect(10, 75, 1035, 150, redPaint);

            bitmapCanvas.translate(0, 150);
        }

    }

}
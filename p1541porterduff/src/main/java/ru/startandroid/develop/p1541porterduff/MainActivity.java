package ru.startandroid.develop.p1541porterduff;

import android.app.Activity;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;
import android.os.Bundle;
import android.view.View;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(new DrawView(this));
    }

    class DrawView extends View {

        Paint paintSrc;
        Paint paintDst;
        Paint paintBorder;

        Path pathSrc;
        Path pathDst;

        Bitmap bitmapSrc;
        Bitmap bitmapDst;

        PorterDuff.Mode mode = PorterDuff.Mode.SRC;

        int colorDst = Color.BLUE;
        int colorSrc = Color.YELLOW;

        public DrawView(Context context) {
            super(context);

            if (android.os.Build.VERSION.SDK_INT >= 11) {
                setLayerType(View.LAYER_TYPE_SOFTWARE, null);
            }

            pathDst = new Path();
            pathDst.moveTo(0, 0);
            pathDst.lineTo(500, 0);
            pathDst.lineTo(500, 500);
            pathDst.close();

            bitmapDst = createBitmap(pathDst, colorDst);

            paintDst = new Paint();

            pathSrc = new Path();
            pathSrc.moveTo(0, 0);
            pathSrc.lineTo(500, 0);
            pathSrc.lineTo(0, 500);
            pathSrc.close();

            bitmapSrc = createBitmap(pathSrc, colorSrc);

            paintSrc = new Paint();
            paintSrc.setXfermode(new PorterDuffXfermode(mode));

            paintBorder = new Paint();
            paintBorder.setStyle(Paint.Style.STROKE);
            paintBorder.setStrokeWidth(3);
            paintBorder.setColor(Color.BLACK);
        }

        private Bitmap createBitmap(Path path, int color) {
            Bitmap bitmap = Bitmap.createBitmap(500, 500,
                    Bitmap.Config.ARGB_8888);
            Canvas bitmapCanvas = new Canvas(bitmap);

            Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG);
            paint.setStyle(Paint.Style.FILL_AND_STROKE);
            paint.setColor(color);

            bitmapCanvas.drawPath(path, paint);

            return bitmap;
        }

        @Override
        protected void onDraw(Canvas canvas) {
            canvas.translate(390, 80);

            canvas.drawBitmap(bitmapDst, 0, 0, paintDst);

            canvas.drawBitmap(bitmapSrc, 0, 0, paintSrc);

            canvas.drawRect(0, 0, 500, 500, paintBorder);

        }
    }
}
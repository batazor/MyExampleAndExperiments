package ru.startandroid.develop.p1591bitmapoptions;

import android.app.Activity;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;
import android.view.View;

import java.io.File;
import java.io.FileOutputStream;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(new DrawView(this));
    }

    class DrawView extends View {

        Paint paint;
        Bitmap bitmap;

        public DrawView(Context context) {
            super(context);
            paint = new Paint(Paint.ANTI_ALIAS_FLAG);
            paint.setTextSize(40);

            Bitmap bmpIcon = BitmapFactory.decodeResource(getResources(), R.mipmap.ic_launcher);
            bmpIcon = Bitmap.createScaledBitmap(bmpIcon, 500, 500, true);

            bitmap = Bitmap.createBitmap(500, 500, Bitmap.Config.RGB_565);
            Canvas canvas = new Canvas(bitmap);
            canvas.drawColor(Color.WHITE);
            canvas.drawBitmap(bmpIcon, 0,0, paint);
            canvas.drawText("Saved bitmap", 100, 50, paint);

            File file = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES), "savedBitmap.png");

            try {
                FileOutputStream fos = null;
                try {
                    fos = new FileOutputStream(file);
                    bitmap.compress(Bitmap.CompressFormat.JPEG, 100, fos);
                } finally {
                    if (fos != null) fos.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }

        }

        @Override
        protected void onDraw(Canvas canvas) {
            canvas.drawARGB(80, 102, 204, 255);
            canvas.drawBitmap(bitmap, 100, 100, paint);
        }

    }
}
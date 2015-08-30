package ru.startandroid.develop.p1441matrixtransform;

import android.app.Activity;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.graphics.Path;
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
        Path path;
        Matrix matrix;

        public DrawView(Context context) {
            super(context);
            p = new Paint();
            p.setStrokeWidth(3);
            p.setStyle(Paint.Style.STROKE);

            path = new Path();
            matrix = new Matrix();
        }

        @Override
        protected void onDraw(Canvas canvas) {
            canvas.drawARGB(80, 102, 204, 255);

            path.reset();
            path.addRect(300, 150, 450, 200, Path.Direction.CW);
            path.addRect(350, 100, 400, 250, Path.Direction.CW);

            p.setColor(Color.GREEN);
            canvas.drawPath(path, p);

            matrix.reset();
            matrix.setTranslate(300, 200);

            path.transform(matrix);

            p.setColor(Color.BLUE);
            canvas.drawPath(path, p);

        }

    }

}
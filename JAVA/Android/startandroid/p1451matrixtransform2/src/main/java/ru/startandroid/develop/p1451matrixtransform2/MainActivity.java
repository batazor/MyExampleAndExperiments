package ru.startandroid.develop.p1451matrixtransform2;

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
        Path path;
        Path pathDst;
        RectF rectfBounds;
        RectF rectfDst;
        Matrix matrix;

        public DrawView(Context context) {
            super(context);
            p = new Paint();
            p.setStrokeWidth(3);
            p.setStyle(Paint.Style.STROKE);

            rectfDst = new RectF();
            rectfBounds = new RectF();

            path = new Path();
            path.addCircle(200, 100, 50, Path.Direction.CW);
            path.addCircle(200, 225, 75, Path.Direction.CW);
            path.addCircle(200, 400, 100, Path.Direction.CW);

            pathDst = new Path();
            matrix = new Matrix();
        }

        @Override
        protected void onDraw(Canvas canvas) {
            canvas.drawARGB(80, 102, 204, 255);

            rectfDst.set(500, 50, 800, 150);

            p.setColor(Color.BLUE);
            canvas.drawPath(path, p);

            path.computeBounds(rectfBounds, true);
            p.setColor(Color.GREEN);
            canvas.drawRect(rectfBounds, p);

            p.setColor(Color.BLACK);
            canvas.drawRect(rectfDst, p);
            matrix.reset();
            matrix.setRectToRect(rectfBounds, rectfDst, Matrix.ScaleToFit.START);
            path.transform(matrix, pathDst);
            p.setColor(Color.BLUE);
            canvas.drawPath(pathDst, p);

            rectfDst.offset(0, 150);

            p.setColor(Color.BLACK);
            canvas.drawRect(rectfDst, p);
            matrix.reset();
            matrix.setRectToRect(rectfBounds, rectfDst,
                    Matrix.ScaleToFit.CENTER);
            path.transform(matrix, pathDst);
            p.setColor(Color.BLUE);
            canvas.drawPath(pathDst, p);

            rectfDst.offset(0, 150);

            p.setColor(Color.BLACK);
            canvas.drawRect(rectfDst, p);
            matrix.reset();
            matrix.setRectToRect(rectfBounds, rectfDst, Matrix.ScaleToFit.END);
            path.transform(matrix, pathDst);
            p.setColor(Color.BLUE);
            canvas.drawPath(pathDst, p);

            rectfDst.offset(0, 150);

            p.setColor(Color.BLACK);
            canvas.drawRect(rectfDst, p);
            matrix.reset();
            matrix.setRectToRect(rectfBounds, rectfDst, Matrix.ScaleToFit.FILL);
            path.transform(matrix, pathDst);
            p.setColor(Color.BLUE);
            canvas.drawPath(pathDst, p);

        }
    }

}
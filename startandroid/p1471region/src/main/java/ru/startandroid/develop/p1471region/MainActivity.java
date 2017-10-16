package ru.startandroid.develop.p1471region;

import android.app.Activity;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.Rect;
import android.graphics.Region;
import android.graphics.RegionIterator;
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
        Region region;
        Region clipRegion;
        Path path;
        Path pathDst;
        Rect rect;

        public DrawView(Context context) {
            super(context);
            p = new Paint();
            p.setStrokeWidth(3);
            p.setStyle(Paint.Style.STROKE);

            path = new Path();
            path.moveTo(100, 100);
            path.lineTo(150, 150);
            path.lineTo(100, 200);
            path.close();

            rect = new Rect(100, 100, 150, 150);
            clipRegion = new Region(rect);

            region = new Region();
            region.setPath(path, clipRegion);
            pathDst = region.getBoundaryPath();

        }

        @Override
        protected void onDraw(Canvas canvas) {
            canvas.drawARGB(80, 102, 204, 255);

            p.setColor(Color.GREEN);
            canvas.drawPath(path, p);

            canvas.translate(200, 0);

            p.setColor(Color.BLUE);
            canvas.drawPath(pathDst, p);

        }
    }
}
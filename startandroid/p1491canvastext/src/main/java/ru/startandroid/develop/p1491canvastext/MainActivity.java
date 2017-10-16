package ru.startandroid.develop.p1491canvastext;

import android.app.Activity;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
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
    String text = "Test text";
    int fontSize = 100;
    float pos[];

    public DrawView(Context context) {
      super(context);
      p = new Paint(Paint.ANTI_ALIAS_FLAG);
      p.setTextSize(fontSize);

      pos = new float[] { 100, 300, 200, 150, 300, 500, 400, 300, 500,
          250, 600, 350, 700, 400, 800, 200, 900, 500 };

    }

    @Override
    protected void onDraw(Canvas canvas) {
      canvas.drawARGB(80, 102, 204, 255);

      canvas.drawPosText(text, pos, p);

    }
  }

}
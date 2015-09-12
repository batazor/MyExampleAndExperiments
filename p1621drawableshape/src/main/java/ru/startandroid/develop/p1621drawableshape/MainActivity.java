package ru.startandroid.develop.p1621drawableshape;

import android.app.Activity;
import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.os.Bundle;
import android.widget.ImageView;

public class MainActivity extends Activity {

    ImageView imageView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        imageView = (ImageView) findViewById(R.id.imageView);
        setDrawable();
    }

    private void setDrawable() {
        GradientDrawable drawable = new GradientDrawable(GradientDrawable.Orientation.BL_TR,
                new int[] { Color.RED, Color.GREEN, Color.BLUE, Color.CYAN, Color.MAGENTA });
        drawable.setShape(GradientDrawable.RECTANGLE);
        drawable.setGradientType(GradientDrawable.LINEAR_GRADIENT);
        drawable.setCornerRadius(40);
        drawable.setStroke(10, Color.BLACK, 20, 5);
        imageView.setImageDrawable(drawable);
    }

}
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.Point;
import android.view.View;

class DrawView extends View {

    Paint p;
    Path path;
    String text;

    public DrawView(Context context) {
        super(context);
        p = new Paint(Paint.ANTI_ALIAS_FLAG);
        p.setStrokeWidth(1);
        p.setTextSize(20);
        path = new Path();
        text = "Draw the text, with origin at (x,y), using the specified paint";
    }

    @Override
    protected void onDraw(Canvas canvas) {
        canvas.drawARGB(80, 102, 204, 255);

        path.reset();
        path.addCircle(200, 200, 100, Path.Direction.CW);
        p.setColor(Color.BLACK);
        canvas.drawTextOnPath(text, path, 0, 0, p);

        path.reset();
        path.addCircle(500, 200, 100, Path.Direction.CCW);

        p.setStyle(Paint.Style.FILL);
        p.setColor(Color.BLUE);
        canvas.drawTextOnPath(text, path, 0, 0, p);
        p.setStyle(Paint.Style.STROKE);
        canvas.drawPath(path, p);

        path.offset(-300, 250);
        p.setStyle(Paint.Style.FILL);
        p.setColor(Color.GREEN);
        canvas.drawTextOnPath(text, path, 100, 0, p);
        p.setStyle(Paint.Style.STROKE);
        canvas.drawPath(path, p);

        path.offset(300, 0);
        p.setStyle(Paint.Style.FILL);
        p.setColor(Color.RED);
        canvas.drawTextOnPath(text, path, 0, 30, p);
        p.setStyle(Paint.Style.STROKE);
        canvas.drawPath(path, p);

    }

}
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.RectF;
import android.opengl.Matrix;
import android.view.View;

class DrawView extends View {

    Paint p;
    Matrix matrix;
    RectF rectf;
    RectF rectfDst;
    Path path;

    public DrawView(Context context) {
        super(context);
        p = new Paint();
        p.setStrokeWidth(3);
        p.setStyle(Paint.Style.STROKE);
        rectf = new RectF(100, 100, 200, 200);
        rectfDst = new RectF();
        matrix = new Matrix();
        path = new Path();
    }

    @Override
    protected void onDraw(Canvas canvas) {
        canvas.drawARGB(80, 102, 204, 255);

        path.reset();
        path.addRect(rectf, Path.Direction.CW);
        p.setColor(Color.BLACK);
        canvas.drawPath(path, p);

//        matrix.setRotate(45, 150, 150);
//        matrix.postScale(1.2f, 0.8f, 150, 150);
//        matrix.postTranslate(200, 0);
//        path.transform(matrix);

        p.setColor(Color.GREEN);
        canvas.drawPath(path, p);

//        matrix.mapRect(rectfDst, rectf);
        p.setColor(Color.BLUE);
        canvas.drawRect(rectfDst, p);

    }
}
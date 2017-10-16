package ru.startandroid.develop.p1611bitmapcache;

import java.io.File;

import android.app.Activity;
import android.content.Context;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.os.Environment;
import android.util.LruCache;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.ListView;

public class MainActivity extends Activity {

    ListView mLvImages;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mLvImages = (ListView) findViewById(R.id.lvImages);


        File dir = new File(Environment.getExternalStorageDirectory(), "Download/L0161");
        File[] filesArray = dir.listFiles();

        if (filesArray != null) {
            ImageAapter adapter = new ImageAapter(this, filesArray);
            mLvImages.setAdapter(adapter);
        }

    }


    static class ImageAapter extends ArrayAdapter<File> {

        LayoutInflater mInflater;
        int mSize;
        LruCache<String, Bitmap> mMemoryCache;

        public ImageAapter(Context context, File[] objects) {
            super(context, R.layout.list_item, objects);
            mInflater = LayoutInflater.from(context);
            mSize = context.getResources().getDimensionPixelSize(R.dimen.image_size);

            final int maxMemory = (int) (Runtime.getRuntime().maxMemory());
            final int cacheSize = maxMemory / 8;

            mMemoryCache = new LruCache<String, Bitmap>(cacheSize) {
                @Override
                protected int sizeOf(String key, Bitmap bitmap) {
                    return bitmap.getByteCount();
                }
            };
        }

        @Override
        public View getView(int position, View convertView, ViewGroup parent) {
            View view = convertView;
            if (view == null) {
                view = mInflater.inflate(R.layout.list_item, parent, false);
            }
            ImageView imageView = (ImageView) view.findViewById(R.id.imageView);
            Bitmap bitmap = getBitmap(position);
            imageView.setImageBitmap(bitmap);
            return view;
        }

        private Bitmap getBitmap(int position) {
            String filePath = getItem(position).getAbsolutePath();
            Bitmap bitmap = getBitmapFromMemCache(filePath);
            if (bitmap == null) {
                bitmap = Utils.decodeSampledBitmapFromResource(filePath, mSize, mSize);
                addBitmapToMemoryCache(filePath, bitmap);
            }
            return bitmap;

        }

        public void addBitmapToMemoryCache(String key, Bitmap bitmap) {
            if (getBitmapFromMemCache(key) == null) {
                mMemoryCache.put(key, bitmap);
            }
        }

        public Bitmap getBitmapFromMemCache(String key) {
            return mMemoryCache.get(key);
        }


    }
}
package ru.startandroid.simpleadapter;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ListView;
import android.widget.SimpleAdapter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class MainActivity extends AppCompatActivity {

    final String ATTRIBUTE_NAME_TEXT = "text";
    final String ATTRIBUTE_NAME_CHECKED = "checked";
    final String ATTRIBUTE_NAME_IMAGE = "image";

    ListView lvSimple;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        String[] texts = { "sometext 1", "sometext 2", "sometext 3", "sometext 4", "sometext 5" };
        boolean[] checked = { true, false, false, true, false };
        int img = R.mipmap.ic_launcher;

        ArrayList<Map<String, Object>> data = new ArrayList<Map<String, Object>>(texts.length);
        Map<String, Object> m;
        for (int i = 0; i < texts.length; i++) {
            m = new HashMap<String, Object>();
            m.put(ATTRIBUTE_NAME_TEXT, texts[i]);
            m.put(ATTRIBUTE_NAME_CHECKED, checked[i]);
            m.put(ATTRIBUTE_NAME_IMAGE, img);
            data.add(m);
        }

        String[] from = { ATTRIBUTE_NAME_TEXT, ATTRIBUTE_NAME_CHECKED, ATTRIBUTE_NAME_IMAGE };
        int[] to = { R.id.tvText, R.id.cbChecked, R.id.ivImg };

        SimpleAdapter sAdapter = new SimpleAdapter(this, data, R.layout.item, from, to);

        lvSimple = (ListView) findViewById(R.id.lvSimple);
        lvSimple.setAdapter(sAdapter);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}

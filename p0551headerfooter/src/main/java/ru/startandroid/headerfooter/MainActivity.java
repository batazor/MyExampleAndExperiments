package ru.startandroid.headerfooter;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.HeaderViewListAdapter;
import android.widget.ListView;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    final String LOG_TAG = "myLogs";

    String[] data = {"one", "two", "three", "four", "five"};
    ListView lvMain;
    ArrayAdapter<String> adapter;

    View header1;
    View header2;

    View footer1;
    View footer2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        lvMain = (ListView) findViewById(R.id.lvMain);
        adapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, data);

        header1 = createHeader("header 1");
        header2 = createHeader("header 2");
        footer1 = createFooter("footer 1");
        footer2 = createFooter("footer 2");

        fillList();
    }

    // Creating a list
    void fillList() {
        lvMain.addHeaderView(header1);
        lvMain.addHeaderView(header2, "some text for header 2", false);
        lvMain.addFooterView(footer1);
        lvMain.addFooterView(footer2, "some text for footer 2", false);
        lvMain.setAdapter(adapter);
    }

    // pressing the button
    public void onclick(View v) {
        Object obj;
        HeaderViewListAdapter hvlAdapter = (HeaderViewListAdapter) lvMain.getAdapter();
        obj = hvlAdapter.getItem(1);
        Log.d(LOG_TAG, "hvlAdapter.getItem(1) = " + obj.toString());
        obj = hvlAdapter.getItem(4);
        Log.d(LOG_TAG, "hvlAdapter.getItem(4) = " + obj.toString());

        ArrayAdapter<String> alAdapter = (ArrayAdapter<String>) hvlAdapter.getWrappedAdapter();
        obj = alAdapter.getItem(1);
        Log.d(LOG_TAG, "alAdapter.getItem(1) = " + obj.toString());
        obj = alAdapter.getItem(4);
        Log.d(LOG_TAG, "alAdapter.getItem(4) = " + obj.toString());
    }

    View createHeader(String text) {
        View v = getLayoutInflater().inflate(R.layout.header, null);
        ((TextView)v.findViewById(R.id.tvText)).setText(text);
        return v;
    }

    View createFooter(String text) {
        View v = getLayoutInflater().inflate(R.layout.footer, null);
        ((TextView)v.findViewById(R.id.tvText)).setText(text);
        return v;
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

package ru.p0651startandroid.tab;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.TabHost;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        TabHost tabHost = (TabHost) findViewById(android.R.id.tabhost);
        // init
        tabHost.setup();

        TabHost.TabSpec tabSpec;

        // create a tab and specify tag
        tabSpec = tabHost.newTabSpec("tag1");
        // Tab name
        tabSpec.setIndicator("Tab One");
        // specify the id of the component FrameLayout, he would be content
        tabSpec.setContent(R.id.tvTab1);
        // add the root element
        tabHost.addTab(tabSpec);

        tabSpec = tabHost.newTabSpec("tag2");
        // Specify name and picture
        // in this case, instead of images is xml-file
        // which determines the image as tabs
        tabSpec.setIndicator("Tab Two", getResources().getDrawable(R.drawable.tab_icon_selector));
        tabSpec.setContent(R.id.tvTab2);
        tabHost.addTab(tabSpec);

        tabSpec = tabHost.newTabSpec("tag3");
        // View from creating layout-file
        View v = getLayoutInflater().inflate(R.layout.tab_header, null);
        // and set it as a title
        tabSpec.setIndicator(v);
        tabSpec.setContent(R.id.tvTab3);
        tabHost.addTab(tabSpec);

        // second tab is selected by default
        tabHost.setCurrentTabByTag("tag2");

        // handler switching tabs
        tabHost.setOnTabChangedListener(new TabHost.OnTabChangeListener() {
            public void onTabChanged(String tabId) {
                Toast.makeText(getBaseContext(), "tabId = " + tabId, Toast.LENGTH_SHORT).show();
            }
        });
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

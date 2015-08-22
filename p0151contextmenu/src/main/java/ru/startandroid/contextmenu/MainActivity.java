package ru.startandroid.contextmenu;

import android.graphics.Color;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.ContextMenu;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    TextView tvColor, tvSize;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        tvColor = (TextView) findViewById(R.id.tvColor);
        tvSize = (TextView) findViewById(R.id.tvSize);

        // for tvColor and tvSize need to create a context menu
        registerForContextMenu(tvColor);
        registerForContextMenu(tvSize);
    }

    @Override
    public void onCreateContextMenu(ContextMenu menu, View v,
                                    ContextMenu.ContextMenuInfo menuInfo) {
        // TODO Auto-generated method stub
        switch (v.getId()) {
            case R.id.tvColor:
                getMenuInflater().inflate(R.menu.color, menu);
                break;
            case R.id.tvSize:
                getMenuInflater().inflate(R.menu.fontsize, menu);
                break;
        }
    }

    @Override
    public boolean onContextItemSelected(MenuItem item) {
        // TODO Auto-generated method stub
        switch (item.getItemId()) {
            // menu items for tvColor
            case R.id.menu_red:
                tvColor.setTextColor(Color.RED);
                tvColor.setText("Text color = red");
                break;
            case R.id.menu_green:
                tvColor.setTextColor(Color.GREEN);
                tvColor.setText("Text color = green");
                break;
            case R.id.menu_blue:
                tvColor.setTextColor(Color.BLUE);
                tvColor.setText("Text color = blue");
                break;
            // menu items for tvSize
            case R.id.fontsize_22:
                tvSize.setTextSize(22);
                tvSize.setText("Text size = 22");
                break;
            case R.id.fontsize_26:
                tvSize.setTextSize(26);
                tvSize.setText("Text size = 26");
                break;
            case R.id.fontsize_30:
                tvSize.setTextSize(30);
                tvSize.setText("Text size = 30");
                break;
        }
        return super.onContextItemSelected(item);
    }
}

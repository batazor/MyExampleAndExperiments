package ru.startandroid.logandmess;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private static final String TAG = "myLogs";
    TextView tvOut;
    Button btnOk;
    Button btnCancel;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // search View-elements
        Log.d(TAG, "search View-elements");
        tvOut = (TextView) findViewById(R.id.tvOut);
        btnOk = (Button) findViewById(R.id.btnOk);
        btnCancel = (Button) findViewById(R.id.btnCancel);

        // assign the button handler
        Log.d(TAG, "assign the button handler");
        btnOk.setOnClickListener(this);
        btnCancel.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        // by id define the button that caused the handler
        Log.d(TAG, "by id define the button that caused the handler");
        switch (v.getId()) {
            case R.id.btnOk:
                // button ОК
                Log.d(TAG, "button ОК");
                tvOut.setText("Enter button ОК");
                Toast.makeText(this, "Enter button ОК", Toast.LENGTH_LONG).show();
                break;
            case R.id.btnCancel:
                // button Cancel
                Log.d(TAG, "button Cancel");
                tvOut.setText("Enter button Cancel");
                Toast.makeText(this, "Enter button Cancel", Toast.LENGTH_LONG).show();
                break;
        }
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

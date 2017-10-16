package ru.p0651startandroid.files;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

import android.os.Bundle;
import android.os.Environment;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;

public class MainActivity extends AppCompatActivity {

    final String LOG_TAG = "myLogs";

    final String FILENAME = "file";

    final String DIR_SD = "MyFiles";
    final String FILENAME_SD = "fileSD";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void onclick(View v) {
        switch (v.getId()) {
            case R.id.btnWrite:
                writeFile();
                break;
            case R.id.btnRead:
                readFile();
                break;
            case R.id.btnWriteSD:
                writeFileSD();
                break;
            case R.id.btnReadSD:
                readFileSD();
                break;
        }
    }

    void writeFile() {
        try {
            // torn off stream for writing
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(
                    openFileOutput(FILENAME, MODE_PRIVATE)));
            // write data
            bw.write("The contents of the file");
            // close Feed
            bw.close();
            Log.d(LOG_TAG, "File recorded");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    void readFile() {
        try {
            // Opens a stream for reading
            BufferedReader br = new BufferedReader(new InputStreamReader(
                    openFileInput(FILENAME)));
            String str = "";
            // read contents
            while ((str = br.readLine()) != null) {
                Log.d(LOG_TAG, str);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    void writeFileSD() {
        // check the availability of SD
        if (!Environment.getExternalStorageState().equals(
                Environment.MEDIA_MOUNTED)) {
            Log.d(LOG_TAG, "SD-card is not available: " + Environment.getExternalStorageState());
            return;
        }
        // get the path to SD
        File sdPath = Environment.getExternalStorageDirectory();
        // add a directory to the path
        sdPath = new File(sdPath.getAbsolutePath() + "/" + DIR_SD);
        // create a directory
        sdPath.mkdirs();
        // forming an object File, which contains the path to the file
        File sdFile = new File(sdPath, FILENAME_SD);
        try {
            // open a stream for writing
            BufferedWriter bw = new BufferedWriter(new FileWriter(sdFile));
            // write data
            bw.write("The contents of the file to SD");
            // close Feed
            bw.close();
            Log.d(LOG_TAG, "File is recorded on the SD: " + sdFile.getAbsolutePath());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    void readFileSD() {
        // check the availability of SD
        if (!Environment.getExternalStorageState().equals(
                Environment.MEDIA_MOUNTED)) {
            Log.d(LOG_TAG, "SD-card is not available: " + Environment.getExternalStorageState());
            return;
        }
        // get the path to SD
        File sdPath = Environment.getExternalStorageDirectory();
        // add a directory to the path
        sdPath = new File(sdPath.getAbsolutePath() + "/" + DIR_SD);
        // forming an object File, which contains the path to the file
        File sdFile = new File(sdPath, FILENAME_SD);
        try {
            // open a stream for reading
            BufferedReader br = new BufferedReader(new FileReader(sdFile));
            String str = "";
            // read contents
            while ((str = br.readLine()) != null) {
                Log.d(LOG_TAG, str);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
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

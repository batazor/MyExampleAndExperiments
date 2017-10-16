package ru.startandroid.sqliteinnerjoin;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;

public class MainActivity extends AppCompatActivity {

    final String LOG_TAG = "myLogs";

    // Data for the table of posts
    int[] position_id = { 1, 2, 3, 4 };
    String[] position_name = { "director", "programmer", "accountant", "security guard" };
    int[] position_salary = { 15000, 13000, 10000, 8000 };

    // Data for the table people
    String[] people_name = { "Ivan", "Marya", "Peter", "Anton", "Dasha", "Boris", "Kostya", "Igor" };
    int[] people_posid = { 2, 3, 2, 2, 3, 1, 2, 4 };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Connect to DB
        DBHelper dbh = new DBHelper(this);
        SQLiteDatabase db = dbh.getWritableDatabase();

        // Description of the cursor
        Cursor c;

        // we derive a log data on positions
        Log.d(LOG_TAG, "--- Table position ---");
        c = db.query("position", null, null, null, null, null, null);
        logCursor(c);
        c.close();
        Log.d(LOG_TAG, "--- ---");

        // we derive a log data on humans
        Log.d(LOG_TAG, "--- Table people ---");
        c = db.query("people", null, null, null, null, null, null);
        logCursor(c);
        c.close();
        Log.d(LOG_TAG, "--- ---");

        // Display the result of combining
        // Use rawQuery
        Log.d(LOG_TAG, "--- INNER JOIN with rawQuery---");
        String sqlQuery = "select PL.name as Name, PS.name as Position, salary as Salary "
                + "from people as PL "
                + "inner join position as PS "
                + "on PL.posid = PS.id "
                + "where salary > ?";
        c = db.rawQuery(sqlQuery, new String[] {"12000"});
        logCursor(c);
        c.close();
        Log.d(LOG_TAG, "--- ---");

        // Display the result of combining
        // Use query
        Log.d(LOG_TAG, "--- INNER JOIN with query---");
        String table = "people as PL inner join position as PS on PL.posid = PS.id";
        String columns[] = { "PL.name as Name", "PS.name as Position", "salary as Salary" };
        String selection = "salary < ?";
        String[] selectionArgs = {"12000"};
        c = db.query(table, columns, selection, selectionArgs, null, null, null);
        logCursor(c);
        c.close();
        Log.d(LOG_TAG, "--- ---");

        // close DB
        dbh.close();
    }

    // output to the log data from the cursor
    void logCursor(Cursor c) {
        if (c != null) {
            if (c.moveToFirst()) {
                String str;
                do {
                    str = "";
                    for (String cn : c.getColumnNames()) {
                        str = str.concat(cn + " = " + c.getString(c.getColumnIndex(cn)) + "; ");
                    }
                    Log.d(LOG_TAG, str);
                } while (c.moveToNext());
            }
        } else {
            Log.d(LOG_TAG, "Cursor is null");
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

    class DBHelper extends SQLiteOpenHelper {

        public DBHelper(Context context) {
            super(context, "myDB", null, 1);
        }

        public void onCreate(SQLiteDatabase db) {
            Log.d(LOG_TAG, "--- onCreate database ---");

            ContentValues cv = new ContentValues();

            // create table positions
            db.execSQL("create table position ("
                    + "id integer primary key,"
                    + "name text," + "salary integer"
                    + ");");

            // fill it
            for (int i = 0; i < position_id.length; i++) {
                cv.clear();
                cv.put("id", position_id[i]);
                cv.put("name", position_name[i]);
                cv.put("salary", position_salary[i]);
                db.insert("position", null, cv);
            }

            // create table people
            db.execSQL("create table people ("
                    + "id integer primary key autoincrement,"
                    + "name text,"
                    + "posid integer"
                    + ");");

            // fill it
            for (int i = 0; i < people_name.length; i++) {
                cv.clear();
                cv.put("name", people_name[i]);
                cv.put("posid", people_posid[i]);
                db.insert("people", null, cv);
            }
        }

        public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

        }
    }
}

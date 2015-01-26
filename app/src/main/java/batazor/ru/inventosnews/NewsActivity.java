package batazor.ru.inventosnews;

import android.app.ListActivity;
import android.app.ProgressDialog;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ListAdapter;
import android.widget.SimpleAdapter;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;

import static batazor.ru.inventosnews.R.layout.list_item;

public class NewsActivity extends ListActivity {

    private ProgressDialog pDialog;

    // JSON Node names
    private static final String JSON_WIDGETS = "widgets";
    private static final String JSON_TITLE = "title";
    private static final String JSON_IMG = "img";
    private static final String JSON_IMG_URL = "url";
    private static final String JSON_DESC = "desc";
    private static final String JSON_TYPE = "type";

    // contacts JSONArray
    JSONArray news = null;

    //    Hashmap for ListView
    ArrayList<HashMap<String, String>> newsList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_news);

        newsList = new ArrayList<HashMap<String, String>>();
        getListView();

        // Calling async task to get json
        new GetContacts().execute();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_news, menu);
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

    /**
     * Async task class to get json by making HTTP call
     * */
    private class GetContacts extends AsyncTask<Void, Void, Void> {

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            // Showing progress dialog
            pDialog = new ProgressDialog(NewsActivity.this);
            pDialog.setMessage("Ждем или reset?");
            pDialog.setCancelable(false);
            pDialog.show();

        }

        @Override
        protected Void doInBackground(Void... arg0) {

            // Creating service handler class instance
            ServiceHandler sh = new ServiceHandler();

            // Making a request to url and getting response
            String url = "http://api.pandem.pro/healthcheck/w/";
            String jsonStr = sh.makeServiceCall(url);

            Log.d("Response: ", "> " + jsonStr);

            if (jsonStr != null) {
                try {
                    JSONObject jsonObj = new JSONObject(jsonStr);

                    // Getting JSON Array node
                    news = jsonObj.getJSONArray(JSON_WIDGETS);

                    // looping through All Contacts
                    for (int i = 0; i < news.length(); i++) {
                        JSONObject c = news.getJSONObject(i);
                        String type = c.getString(JSON_TYPE);

                        if (type.equals("events_put") || type.equals("news")) {

                            String title = c.getString(JSON_TITLE);
                            String img_url = null;
                            String desc = null;

                            if (type.equals("news")) {
                                desc = c.getString(JSON_DESC);
                                JSONObject img = c.getJSONObject(JSON_IMG);
                                img_url = img.getString(JSON_IMG_URL);
                            }

                            // tmp hashmap for single contact
                            HashMap<String, String> news = new HashMap<String, String>();

                            // adding each child node to HashMap key => value
                            news.put(JSON_TITLE, title);
                            news.put(JSON_IMG_URL, img_url);
                            news.put(JSON_DESC, desc);
                            newsList.add(news);
                        }

                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            } else {
                Log.e("ServiceHandler", "Couldn't get any data from the url");
            }

            return null;
        }

        @Override
        protected void onPostExecute(Void result) {
            super.onPostExecute(result);

            // Dismiss the progress dialog
            if (pDialog.isShowing())
                pDialog.dismiss();

            /**
             * Updating parsed JSON data into ListView
             * */


            ListAdapter adapter = new SimpleAdapter(
                    NewsActivity.this, newsList,
                    list_item, new String[] { JSON_TITLE, JSON_IMG_URL, JSON_DESC }, new int[] { R.id.name, R.id.imgUrl, R.id.desc });

            setListAdapter(adapter);
        }

    }

    public static Bitmap getBitmapFromURL(String src) {
        try {
            URL url = new URL(src);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoInput(true);
            connection.connect();
            InputStream input = connection.getInputStream();
            return BitmapFactory.decodeStream(input);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}

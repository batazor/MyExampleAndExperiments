package ru.startandroid.develop.p1151multiplescreen;

import android.content.res.Configuration;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;

public class DetailsActivity extends FragmentActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (getResources().getConfiguration().orientation
                == Configuration.ORIENTATION_LANDSCAPE
                && isLarge()) {
            finish();
            return;
        }

        if (savedInstanceState == null) {
            DetailsFragment details = DetailsFragment.newInstance(getIntent()
                    .getIntExtra("position", 0));
            getSupportFragmentManager().beginTransaction()
                    .add(android.R.id.content, details).commit();
        }
    }

    boolean isLarge() {
        return (getResources().getConfiguration().screenLayout
                & Configuration.SCREENLAYOUT_SIZE_MASK)
                >= Configuration.SCREENLAYOUT_SIZE_LARGE;
    }

}
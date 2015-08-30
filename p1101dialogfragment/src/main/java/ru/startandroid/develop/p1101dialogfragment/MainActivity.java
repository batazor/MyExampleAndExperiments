package ru.startandroid.develop.p1101dialogfragment;

import android.app.Activity;
import android.app.DialogFragment;
import android.os.Bundle;
import android.view.View;

public class MainActivity extends Activity {

    DialogFragment dlg1;
    DialogFragment dlg2;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        dlg1 = new Dialog1();
        dlg2 = new Dialog2();
    }

    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btnDlg1:
                dlg1.show(getFragmentManager(), "dlg1");
                break;
            case R.id.btnDlg2:
                dlg2.show(getFragmentManager(), "dlg2");
                break;
            default:
                break;
        }

    }
}
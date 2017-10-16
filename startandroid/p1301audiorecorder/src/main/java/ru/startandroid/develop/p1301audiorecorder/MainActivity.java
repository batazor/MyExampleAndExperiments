package ru.startandroid.develop.p1301audiorecorder;

import android.app.Activity;
import android.media.AudioFormat;
import android.media.AudioRecord;
import android.media.MediaRecorder;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

public class MainActivity extends Activity {

    final String TAG = "myLogs";

    int myBufferSize = 8192;
    AudioRecord audioRecord;
    boolean isReading = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        createAudioRecorder();

        Log.d(TAG, "init state = " + audioRecord.getState());
    }

    void createAudioRecorder() {
        int sampleRate = 8000;
        int channelConfig = AudioFormat.CHANNEL_IN_MONO;
        int audioFormat = AudioFormat.ENCODING_PCM_16BIT;

        int minInternalBufferSize = AudioRecord.getMinBufferSize(sampleRate,
                channelConfig, audioFormat);
        int internalBufferSize = minInternalBufferSize * 4;
        Log.d(TAG, "minInternalBufferSize = " + minInternalBufferSize
                + ", internalBufferSize = " + internalBufferSize
                + ", myBufferSize = " + myBufferSize);

        audioRecord = new AudioRecord(MediaRecorder.AudioSource.MIC,
            sampleRate, channelConfig, audioFormat, internalBufferSize);

        audioRecord.setPositionNotificationPeriod(1000);

        audioRecord.setNotificationMarkerPosition(10000);
        audioRecord.setRecordPositionUpdateListener(new AudioRecord.OnRecordPositionUpdateListener() {
            public void onPeriodicNotification(AudioRecord recorder) {
                Log.d(TAG, "onPeriodicNotification");
            }

            public void onMarkerReached(AudioRecord recorder) {
                Log.d(TAG, "onMarkerReached");
                isReading = false;
            }
        });
    }

    public void recordStart(View v) {
        Log.d(TAG, "record start");
        audioRecord.startRecording();
        int recordingState = audioRecord.getRecordingState();
        Log.d(TAG, "recordingState = " + recordingState);
    }

    public void recordStop(View v) {
        Log.d(TAG, "record stop");
        audioRecord.stop();
    }

    public void readStart(View v) {
        Log.d(TAG, "read start");
        isReading = true;
        new Thread(new Runnable() {
            @Override
            public void run() {
                if (audioRecord == null)
                    return;

                byte[] myBuffer = new byte[myBufferSize];
                int readCount = 0;
                int totalCount = 0;
                while (isReading) {
                    readCount = audioRecord.read(myBuffer, 0, myBufferSize);
                    totalCount += readCount;
                    Log.d(TAG, "readCount = " + readCount + ", totalCount = "
                            + totalCount);
                }
            }
        }).start();
    }

    public void readStop(View v) {
        Log.d(TAG, "read stop");
        isReading = false;
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        isReading = false;
        if (audioRecord != null) {
            audioRecord.release();
        }
    }
}
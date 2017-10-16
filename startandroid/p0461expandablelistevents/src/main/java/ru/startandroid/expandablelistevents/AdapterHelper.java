package ru.startandroid.expandablelistevents;

import android.content.Context;
import android.widget.SimpleExpandableListAdapter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class AdapterHelper {

    final String ATTR_GROUP_NAME= "groupName";
    final String ATTR_PHONE_NAME= "phoneName";


    // the names of the companies (groups)
    String[] groups = new String[] {"HTC", "Samsung", "LG"};

    // name of the phone (elements)
    String[] phonesHTC = new String[] {"Sensation", "Desire", "Wildfire", "Hero"};
    String[] phonesSams = new String[] {"Galaxy S II", "Galaxy Nexus", "Wave"};
    String[] phonesLG = new String[] {"Optimus", "Optimus Link", "Optimus Black", "Optimus One"};

    // collection for groups
    ArrayList<Map<String, String>> groupData;

    // collection of elements of one group
    ArrayList<Map<String, String>> childDataItem;

    // total collection of items for collections
    ArrayList<ArrayList<Map<String, String>>> childData;

    // a list of attributes of a group or element
    Map<String, String> m;

    Context ctx;

    AdapterHelper(Context _ctx) {
        ctx = _ctx;
    }

    SimpleExpandableListAdapter adapter;


    SimpleExpandableListAdapter getAdapter() {

        // fill a collection of groups from the array with the names of groups
        groupData = new ArrayList<Map<String, String>>();
        for (String group : groups) {
            // fill out the list of attributes for each group
            m = new HashMap<String, String>();
            m.put(ATTR_GROUP_NAME, group); // company name
            groupData.add(m);
        }

        // a list of attributes groups to read
        String groupFrom[] = new String[] {ATTR_GROUP_NAME};
        // List ID view-elements, which will be placed attributes groups
        int groupTo[] = new int[] {android.R.id.text1};

        // create a collection of items for collections
        childData = new ArrayList<ArrayList<Map<String, String>>>();

        // create a collection of items for the first group
        childDataItem = new ArrayList<Map<String, String>>();
        // fill out the list of attributes for each element
        for (String phone : phonesHTC) {
            m = new HashMap<String, String>();
            m.put(ATTR_PHONE_NAME, phone); // название телефона
            childDataItem.add(m);
        }
        // added to the collection of collections
        childData.add(childDataItem);

        // create a collection of items for the second group
        childDataItem = new ArrayList<Map<String, String>>();
        for (String phone : phonesSams) {
            m = new HashMap<String, String>();
            m.put(ATTR_PHONE_NAME, phone);
            childDataItem.add(m);
        }
        childData.add(childDataItem);

        // create a collection of items for the third group
        childDataItem = new ArrayList<Map<String, String>>();
        for (String phone : phonesLG) {
            m = new HashMap<String, String>();
            m.put(ATTR_PHONE_NAME, phone);
            childDataItem.add(m);
        }
        childData.add(childDataItem);

        // a list of attributes of elements to read
        String childFrom[] = new String[] {ATTR_PHONE_NAME};
        // List ID view-elements, which will be placed elements attributes
        int childTo[] = new int[] {android.R.id.text1};

        adapter = new SimpleExpandableListAdapter(
                ctx,
                groupData,
                android.R.layout.simple_expandable_list_item_1,
                groupFrom,
                groupTo,
                childData,
                android.R.layout.simple_list_item_1,
                childFrom,
                childTo);

        return adapter;
    }

    String getGroupText(int groupPos) {
        return ((Map<String,String>)(adapter.getGroup(groupPos))).get(ATTR_GROUP_NAME);
    }

    String getChildText(int groupPos, int childPos) {
        return ((Map<String,String>)(adapter.getChild(groupPos, childPos))).get(ATTR_PHONE_NAME);
    }

    String getGroupChildText(int groupPos, int childPos) {
        return getGroupText(groupPos) + " " +  getChildText(groupPos, childPos);
    }
}
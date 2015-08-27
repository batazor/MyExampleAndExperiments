package ru.startandroid.customadapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.ArrayList;

public class BoxAdapter extends BaseAdapter {
    Context ctx;
    LayoutInflater lInflater;
    ArrayList<Product> objects;

    BoxAdapter(Context context, ArrayList<Product> products) {
        ctx = context;
        objects = products;
        lInflater = (LayoutInflater) ctx
                .getSystemService(Context.LAYOUT_INFLATER_SERVICE);
    }

    // Number of elements
    @Override
    public int getCount() {
        return objects.size();
    }

    // element for position
    @Override
    public Object getItem(int position) {
        return objects.get(position);
    }

    // id by position
    @Override
    public long getItemId(int position) {
        return position;
    }

    // list item
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        // use by, but not used view
        View view = convertView;
        if (view == null) {
            view = lInflater.inflate(R.layout.item, parent, false);
        }

        Product p = getProduct(position);

        ((TextView) view.findViewById(R.id.tvDescr)).setText(p.name);
        ((TextView) view.findViewById(R.id.tvPrice)).setText(p.price + "");
        ((ImageView) view.findViewById(R.id.ivImage)).setImageResource(p.image);

        CheckBox cbBuy = (CheckBox) view.findViewById(R.id.cbBox);
        // assign checkboxes handler
        cbBuy.setOnCheckedChangeListener(myCheckChangList);
        // write position
        cbBuy.setTag(position);
        // fill in the data of the products: in the basket or not
        cbBuy.setChecked(p.box);
        return view;
    }

    // goods for the position
    Product getProduct(int position) {
        return ((Product) getItem(position));
    }

    // contents of the basket
    ArrayList<Product> getBox() {
        ArrayList<Product> box = new ArrayList<Product>();
        for (Product p : objects) {
            // If the basket
            if (p.box)
                box.add(p);
        }
        return box;
    }

    // handler for checkboxes
    CompoundButton.OnCheckedChangeListener myCheckChangList = new CompoundButton.OnCheckedChangeListener() {
        public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
            // change the data item (in the basket or not)
            getProduct((Integer) buttonView.getTag()).box = isChecked;
        }
    };
}
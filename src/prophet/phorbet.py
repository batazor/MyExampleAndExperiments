# Example
# https://github.com/facebook/prophet/blob/master/notebooks/quick_start.ipynb

import logging
logging.getLogger('fbprophet').setLevel(logging.ERROR)
import warnings
warnings.filterwarnings("ignore")

import pandas as pd
import numpy as np
from fbprophet import Prophet

def hello():
    print('Hello, world!')
    df = pd.read_csv('./examples/example_wp_peyton_manning.csv')
    df['y'] = np.log(df['y'])
    df.head()
    m = Prophet()
    m.fit(df);
    future = m.make_future_dataframe(periods=365)
    future.tail()
    forecast = m.predict(future)
    forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail()
    return forecast.to_json(orient='table')

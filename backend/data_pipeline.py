import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import os

def assign_category(name):
    name = name.lower()
    if any(x in name for x in ['milk', 'curd', 'paneer']): return 'Dairy'
    if any(x in name for x in ['soap', 'shampoo', 'face wash', 'body lotion', 'hand wash', 'toothpaste', 'toothbrush']): return 'Personal Care'
    if any(x in name for x in ['orange', 'mango', 'banana', 'apple', 'grapes']): return 'Fruits'
    if any(x in name for x in ['spinach', 'potato', 'carrot', 'capsicum', 'onion', 'tomato', 'cabbage', 'cauliflower', 'frozen peas', 'cucumber']): return 'Vegetables'
    if any(x in name for x in ['detergent', 'garbage bags', 'floor cleaner', 'dishwash']): return 'Household'
    if any(x in name for x in ['chips', 'namkeen', 'biscuits', 'chocolate']): return 'Snacks'
    if any(x in name for x in ['juice', 'soft drink', 'mineral water']): return 'Beverages'
    return 'Grocery'

def process_data(input_csv: str, output_csv: str):
    print(f"Loading data from {input_csv}...")
    df = pd.read_csv(input_csv)

    print("Generating synthetic timeseries...")
    end_date = datetime.now()
    dates = [end_date - timedelta(days=i) for i in range(90)]
    dates = sorted(dates)

    timeseries_data = []

    for _, row in df.iterrows():
        p_id = row['product_id']
        p_name = row['product_name']
        price = row['price']
        cost = row['cost']
        stock = row['stock_quantity']
        orders_per_day = row['orders_per_day']
        
        cat = assign_category(p_name)
        
        # We will generate daily sales using orders_per_day as the mean
        for d in dates:
            daily_sales = int(np.random.normal(loc=orders_per_day, scale=orders_per_day*0.2))
            daily_sales = max(0, daily_sales) # no negative sales
                
            timeseries_data.append({
                'product_id': p_id,
                'product_name': p_name,
                'date': d.strftime('%Y-%m-%d'),
                'sales': daily_sales,
                'stock_quantity': stock,
                'category': cat,
                'price': price,
                'cost': cost
            })

    print("Creating expanded timeseries dataset...")
    ts_df = pd.DataFrame(timeseries_data)
    
    os.makedirs(os.path.dirname(output_csv), exist_ok=True)
    ts_df.to_csv(output_csv, index=False)
    print(f"Data pipeline complete. Output saved to {output_csv}. Total rows: {len(ts_df)}")

if __name__ == "__main__":
    input_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'dataset', 'updated_data.csv')
    output_path = os.path.join(os.path.dirname(__file__), 'processed_timeseries.csv')
    process_data(input_path, output_path)

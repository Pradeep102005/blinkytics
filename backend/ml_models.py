import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
import warnings

warnings.filterwarnings("ignore")

def train_and_forecast_arima(df: pd.DataFrame, product_name: str, steps: int = 7):
    """
    Trains an ARIMA model on the sales history of a given product.
    Returns the forecast for the next `steps` days.
    """
    # Filter for the specific product
    product_data = df[df['product_name'] == product_name].copy()
    
    if product_data.empty:
        raise ValueError(f"No data found for product: {product_name}")
        
    # Ensure it's sorted by date
    product_data['date'] = pd.to_datetime(product_data['date'])
    product_data = product_data.sort_values('date')
    
    # Extract the sales series
    sales_series = product_data['sales'].values
    
    if len(sales_series) < 10:
        raise ValueError("Not enough data points to train ARIMA model.")
        
    # Train ARIMA model. (1, 1, 1) is a simple generic starting point.
    # In a production system, this would involve parameter tuning (auto_arima).
    model = ARIMA(sales_series, order=(1, 1, 1))
    model_fit = model.fit()
    
    # Forecast the next `steps`
    forecast = model_fit.forecast(steps=steps)
    
    # Ensure no negative sales are predicted
    forecast = [max(0, round(float(f))) for f in forecast]
    
    # Generate future dates for the forecast
    last_date = product_data['date'].max()
    future_dates = [(last_date + pd.Timedelta(days=i)).strftime('%Y-%m-%d') for i in range(1, steps + 1)]
    
    return [
        {"date": date, "predicted_sales": sales}
        for date, sales in zip(future_dates, forecast)
    ]

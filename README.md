# Blinklytics 📊

Blinklytics is a comprehensive, data-driven mobile application prototype and dashboard designed for sales analytics, inventory management, and market forecasting. It leverages machine learning to predict sales trends and provides businesses with actionable insights to optimize stock and promotions.

> [!NOTE]
> The original design inspiration for the UI is available on [Figma](https://www.figma.com/design/61gz78m9qrht6mpNb1HCNF/Blinklytics-Mobile-App-Prototype).

## 🚀 Key Features

* **Real-time Dashboard**: Visualize key metrics such as today's sales, active orders, and low stock alerts.
* **Sales Forecasting**: Utilize an integrated ARIMA machine learning model on the backend to forecast future product demand based on historical data.
* **Inventory Management**: Automatically flag low-selling products or items with low stock to prevent stockouts and dead inventory.
* **Dynamic Promotions**: Generate and track promotional codes for specific products to boost targeted sales segments.
* **User Tiers**: Categorize the user base into different engagement tiers (Gold, Silver, Bronze) for strategic marketing.

## 🛠️ Technology Stack

**Frontend:**
* React 18, React Router
* Vite for ultra-fast bundling
* Tailwind CSS for flexible styling
* Framer Motion for smooth app animations
* Recharts for seamless data visualization
* Radix UI for accessible UI primitives

**Backend:**
* Python & FastAPI
* PostgreSQL with SQLAlchemy (ORM) 
* Pandas & NumPy for data manipulation and analysis
* Statsmodels (ARIMA) for Time-Series Forecasting

## ⚙️ Getting Started

### Prerequisites
* Node.js and npm (or pnpm)
* Python 3.9+
* PostgreSQL database setup on your system

### 1. Backend Setup

Navigate to the `backend` directory and set up your Python virtual environment:

```bash
cd backend
python -m venv venv
```

Activate the virtual environment:
* **Windows:** `venv\Scripts\activate`
* **Mac/Linux:** `source venv/bin/activate`

Install dependencies:
```bash
pip install -r requirements.txt
```

*(Ensure your `.env` file is appropriately populated with PostgreSQL database credentials before running the server or seeding the DB).*

Run the FastAPI backend server:
```bash
uvicorn main:app --reload
```
By default, the API will be available at `http://localhost:8000`.

### 2. Frontend Setup

In the root directory of the project, install the dependencies:
```bash
npm install
```

Start the Vite development server:
```bash
npm run dev
```

Your frontend should now be running locally on `http://localhost:5173/` (or the port specified in your console).

## 📁 Repository Structure
* `/src` - Contains all frontend React components, routes, screens, and styling assets.
* `/backend` - Houses the FastAPI server, database endpoints, and machine learning models (`ml_models.py`, `business_logic.py`).
* `/dataset` - Contains historical CSV files used for database seeding and initial model training.
* `/guidelines` - Internal project documentation and guidelines.

## 📝 License
See `ATTRIBUTIONS.md` for proper attributions and code licensing details.

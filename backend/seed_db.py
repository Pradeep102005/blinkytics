import pandas as pd
import os
from database import engine, SessionLocal, Base
from models import Product, SalesRecord, User
import random

def seed_database():
    # Create tables
    Base.metadata.create_all(bind=engine)
    print("Database tables created.")

    data_path = os.path.join(os.path.dirname(__file__), 'processed_timeseries.csv')
    if not os.path.exists(data_path):
        print(f"File {data_path} not found.")
        return

    df = pd.read_csv(data_path)
    print(f"Loaded {len(df)} rows from CSV.")

    db = SessionLocal()
    try:
        # Extract unique products
        # 'product_id', 'product_name', 'category', 'price', 'cost', 'stock_quantity'
        unique_products = df.drop_duplicates(subset=['product_id'])
        
        products_to_insert = []
        existing_product_ids = {p[0] for p in db.query(Product.product_id).all()}

        for _, row in unique_products.iterrows():
            if row['product_id'] not in existing_product_ids:
                prod = Product(
                    product_id=int(row['product_id']),
                    name=row['product_name'],
                    category=row['category'],
                    price=float(row['price']),
                    cost=float(row['cost']),
                    stock_quantity=int(row['stock_quantity'])
                )
                products_to_insert.append(prod)

        if products_to_insert:
            db.add_all(products_to_insert)
            db.commit()
            print(f"Inserted {len(products_to_insert)} products.")
        else:
            print("No new products to insert.")

        # Extract sales records
        # 'product_id', 'date', 'sales'
        # To avoid duplicates, we check existing count or just delete existings
        existing_sales_count = db.query(SalesRecord).count()
        if existing_sales_count == 0:
            sales_to_insert = []
            for _, row in df.iterrows():
                # ensure pandas date is string/date
                dt = pd.to_datetime(row['date']).date()
                sale = SalesRecord(
                    product_id=int(row['product_id']),
                    date=dt,
                    sales=int(row['sales'])
                )
                sales_to_insert.append(sale)
            
            db.add_all(sales_to_insert)
            db.commit()
            print(f"Inserted {len(sales_to_insert)} sales records.")
        else:
            print(f"Sales records already exist ({existing_sales_count} rows). Skipping sales insertion.")

        # Extract users
        existing_user_count = db.query(User).count()
        if existing_user_count == 0:
            first_names = ["Alex", "Sarah", "Mike", "Emily", "John", "Emma", "David", "Sophia", "James", "Olivia"]
            last_names = ["Johnson", "Smith", "Davis", "Wilson", "Brown", "Taylor", "Anderson", "Thomas", "Jackson", "White"]
            tiers = ["Gold", "Silver", "Bronze"]
            # weight categories
            tier_weights = [0.15, 0.35, 0.50]  # 15% gold, 35% silver, 50% bronze

            users_to_insert = []
            for i in range(100):
                fname = random.choice(first_names)
                lname = random.choice(last_names)
                tier = random.choices(tiers, weights=tier_weights, k=1)[0]
                
                user = User(
                    name=f"{fname} {lname} {i}",
                    email=f"{fname.lower()}.{lname.lower()}{i}@example.com",
                    phone=f"+1-555-{random.randint(100, 999)}-{random.randint(1000, 9999)}",
                    tier=tier
                )
                users_to_insert.append(user)

            db.add_all(users_to_insert)
            db.commit()
            print(f"Inserted {len(users_to_insert)} users.")
        else:
            print(f"Users already exist ({existing_user_count} rows). Skipping user insertion.")

    except Exception as e:
        db.rollback()
        print("Error during seeding:", e)
    finally:
        db.close()
        print("Done.")

if __name__ == "__main__":
    seed_database()

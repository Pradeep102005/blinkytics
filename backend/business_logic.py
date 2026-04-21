from sqlalchemy.orm import Session
from sqlalchemy import func
import random
import string
from models import Promo, Product, SalesRecord

def get_low_selling_products(db: Session, threshold: float = 5.0):
    """
    Identifies products with average daily sales below the threshold using the database.
    """
    query = db.query(
        Product.name.label("product_name"),
        Product.category.label("category"),
        Product.price.label("price"),
        func.avg(SalesRecord.sales).label("avg_sales")
    ).join(
        SalesRecord, SalesRecord.product_id == Product.product_id
    ).group_by(
        Product.id
    ).having(
        func.avg(SalesRecord.sales) < threshold
    )
    
    results = query.all()
    
    output = []
    for row in results:
        output.append({
            "product_name": row.product_name,
            "average_daily_sales": round(float(row.avg_sales), 2) if row.avg_sales else 0,
            "category": row.category,
            "price": row.price
        })
        
    return output

def generate_promo_code(db: Session, product_name: str):
    """
    Generates a rich promo code object and stores it in the database.
    """
    prefixes = ['SAVE10', 'SAVE20', 'DISC15', 'PROMO25']
    suffix = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
    
    promo_code = f"{random.choice(prefixes)}-{suffix}"
    
    new_promo = Promo(
        code=promo_code,
        product_name=product_name,
        discount="20%",
        uses=random.randint(0, 10),
        max_uses=50,
        expires="Mar 30, 2026",
        assigned_to="All Users",
        category="Grocery"
    )
    db.add(new_promo)
    db.commit()
    return promo_code

def get_active_promos(db: Session):
    """
    Returns all active promos from the database as a list of objects.
    """
    promos = db.query(Promo).all()
    return [
        {
            "code": p.code,
            "product": p.product_name,
            "discount": p.discount,
            "uses": p.uses,
            "maxUses": p.max_uses,
            "expires": p.expires,
            "assignedTo": p.assigned_to,
            "category": p.category
        }
        for p in promos
    ]

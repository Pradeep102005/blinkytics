from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True) # internal ID
    product_id = Column(Integer, unique=True, index=True) # ID from CSV
    name = Column(String, index=True)
    category = Column(String)
    price = Column(Float)
    cost = Column(Float)
    stock_quantity = Column(Integer)

    sales = relationship("SalesRecord", back_populates="product")

class SalesRecord(Base):
    __tablename__ = "sales_records"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.product_id"))
    date = Column(Date, index=True)
    sales = Column(Integer)

    product = relationship("Product", back_populates="sales")

class Promo(Base):
    __tablename__ = "promos"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, unique=True, index=True)
    product_name = Column(String, index=True)
    discount = Column(String)
    uses = Column(Integer, default=0)
    max_uses = Column(Integer)
    expires = Column(String)
    assigned_to = Column(String)
    category = Column(String)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    phone = Column(String)
    tier = Column(String)  # Gold, Silver, Bronze

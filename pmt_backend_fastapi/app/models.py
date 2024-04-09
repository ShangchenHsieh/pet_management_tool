from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP
from database import Base


# owner
class Owner(Base): 
    __tablename__ = "owner"
    id = Column(Integer, primary_key=True, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    phone = Column(String)
    
# pet
class Pet(Base): 
    __tablename__ = "pet"
    pet_id = Column(Integer, primary_key=True, nullable=False)
    ownder_id = Column(Integer, ForeignKey("owner.id", ondelete="CASCADE"), primary_key=True)
    breed = Column(String, nullable=True)
    species = Column(String, nullable=True)
    name = Column(String, nullable=False)
    dob = Column(TIMESTAMP, nullable=True)
    age = Column(Integer, nullable=True)
    
# measurments
# feeding 




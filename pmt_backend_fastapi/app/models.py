from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Double
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
    
    pet = relationship("Pet", back_populates="owner")
    
# pet
class Pet(Base): 
    __tablename__ = "pet"
    id = Column(Integer, primary_key=True, nullable=False)
    ownder_id = Column(Integer, ForeignKey("owner.id", ondelete="CASCADE"), nullable=False)
    breed = Column(String, nullable=True)
    species = Column(String, nullable=True)
    name = Column(String, nullable=False)
    dob = Column(TIMESTAMP, nullable=True, server_default=text('now()'))
    age = Column(Integer, nullable=True)
    
    owner = relationship("Owner", back_populates="pet")
    record = relationship("PetRecord", back_populates="pet")
    feeding_record = relationship("PetFed", back_populates="pet")
    
# pet record
class PetRecord(Base): 
    __tablename__ = "pet_record"
    id = Column(Integer, primary_key=True, nullable=False)
    pet_id = Column(Integer, ForeignKey("pet.id", ondelete="CASCADE"))
    date = Column(TIMESTAMP, nullable=False, server_default=text('now()'))
    weight = Column(Double, nullable=True)
    height = Column(Double, nullable=True)
    
    pet = relationship("Pet", back_populates="record")

    
# feeding status 
class PetFed(Base): 
    __tablename__ = "feeding_record"
    id = Column(Integer, primary_key=True, nullable=False)
    pet_id = Column(Integer, ForeignKey("pet.id", ondelete="CASCADE"))
    time = Column(TIMESTAMP, nullable=False, server_default=text('now()'))
    
    pet = relationship("Pet", back_populates="feeding_record")


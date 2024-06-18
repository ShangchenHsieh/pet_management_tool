from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

#############
### Owner ###
#############
class Owner(BaseModel):
    first_name: str
    last_name: Optional[str] = None
    phone: Optional[str]
    username: EmailStr
    password: str

# owner response model because we do not want to send unncessary information back to the user  
class OwnerOut(BaseModel): 
    first_name: str
    username: EmailStr
    
    # tells the Pydantic model to read the data even if it is not a dict 
    class Config: 
        from_attributes = True 
    
########### 
### Pet ###
###########
# class Pet(BaseModel):
      
      
#############
### Login ###
#############
class Login(BaseModel):
    username: EmailStr
    passworrd: str
    
################
### Register ###
################
class Register(Login):
    confirm_pw: str
    

##################
### Pet Record ###
##################




###############
### Pet Fed ###
###############
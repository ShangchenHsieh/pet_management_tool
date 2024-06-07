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
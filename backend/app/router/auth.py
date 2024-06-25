from fastapi import APIRouter, Depends, status, HTTPException, Response 
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from database import get_db
from sqlalchemy.orm import Session 
import schemas, models, oauth2
from . import utils


auth = APIRouter(tags=['Auth'])

@auth.post("/login")
def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)): 
    """
    login functionality
    find the user first, raise exception if not found 
    
    then varify if the pw is correct 
    
    :param user_credentials: Login object with username and pw
    :param db: connection to the DB
    :return JWT: token
    """
    query = db.query(models.Owner).filter(models.Owner.username == user_credentials.username)
    user = query.first() 
    
    # username not found 
    if not user: 
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, 
                            detail=f"Invalid Credentials")
    
    # pw
    if not utils.verify(user_credentials.password, user.password): 
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, 
                            detail=f"Invalid Credentials")
    
    access_token = oauth2.create_access_token(data={"user_id": user.id, "first_name": user.first_name})
    return {"access_token": access_token, "token_type": "bearer"}
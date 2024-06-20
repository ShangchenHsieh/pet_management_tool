from jose import JWTError, jwt
from datetime import datetime, timedelta
import schemas
from fastapi import Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer
from dotenv import load_dotenv
import os

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = (int)(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

def create_access_token(data: dict):
    """
    create an access token 
    
    :param data: the data will be included in the token 
    :return token: JWT 
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire}) 
    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return token

def verify_access_token(token: str, credentials_exceptions):
    """
    Verify the access token
    
    :param token: The JWT token to verify
    :param credentials_exception: The exception to raise if token is invalid
    :return n/a: Token data extracted from the token
    """
    try: 
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
        username = payload.get("username")
        if username is None: 
            raise credentials_exceptions
        token_data = schemas.TokenData(username=username)
    except JWTError: 
        raise credentials_exceptions
    
    return token_data
    
def get_current_user(token: str = Depends(oauth2_scheme)): 
    """
    Retrieve the current user from the token
    
    :param token: The JWT token from the request
    :return: The token data if valid
    """
    credentials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"Could not validate credentials", headers={"WWW-Authenticate": "Bearer"})
    return verify_access_token(token, credentials_exception)
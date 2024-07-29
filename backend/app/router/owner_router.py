from passlib.context import CryptContext 
import fastapi 
import schemas
from schemas import Owner, OwnerOut
from fastapi import Response, status, HTTPException, Depends
import models
from database import get_db
from sqlalchemy.orm import Session
from . import utils
from dotenv import load_dotenv
import oauth2
import os


owner_router = fastapi.APIRouter(
    prefix="/owners",
    tags=['Owners']
)

@owner_router.get("/user/me")
async def get_user(current_user: schemas.TokenData =  Depends(oauth2.get_current_user)):
    return current_user

@owner_router.get("/all")
def get_all_owners(db: Session = Depends(get_db)): 
    """
    get all the owners
    
    :return: JSON package containing all the owners
    """
    owners = db.query(models.Owner).all()
    return owners

@owner_router.get("/{id}")
def get_owner_by_id(id: int, db: Session = Depends(get_db), current_user: schemas.TokenData =  Depends(oauth2.get_current_user)):
    """
    get the owner by id 
    
    :param id: the id of the owner
    :return Owner: the Owner object(from pydantic) 
    """
    owner = db.query(models.Owner).filter(models.Owner.id == id).first()

    if not owner: 
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail=f"owner with id: {id} doesn't exist")
    return owner


@owner_router.post("/", status_code=status.HTTP_201_CREATED)
def create_owner(owner: Owner, db: Session = Depends(get_db)): 
    """
    create new owner with their personal info

    :param owner: a JSON data converted to pydantic model by the pydantic library
    :return: temp. info 
    """
    query = db.query(models.Owner).filter(models.Owner.username == owner.username).first()
    if(query): 
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Username already exists")
    
    hashed_pw = utils.pwd_context.hash(owner.password)
    owner.password = hashed_pw
      
    # new_owner.dict() -> convert the pydantic model to a dictionary ** to unpack the dictionary 
    # new_owner = models.Owner(first_name=owner.first_name, 
    #              last_name=owner.last_name, 
    #              phone=owner.phone, 
    #              username=owner.username, 
    #              password=owner.password)
    
    # this lines serves the same functionality as the codes above 
    new_owner = models.Owner(** owner.model_dump()) # new_owner is a sqlalchemy model 
    
    
    
    db.add(new_owner)
    db.commit()
    db.refresh(new_owner)
    
    access_token = oauth2.create_access_token(data={"user_id": new_owner.id, "first_name": new_owner.first_name})
    return {"access_token": access_token, "token_type": "bearer"}


@owner_router.put("/{id}")
def update_owner_by_id(owner: schemas.UpdateOwner, id: int, db: Session = Depends(get_db), current_user: schemas.TokenData =  Depends(oauth2.get_current_user)):
    """
    required user to log in first, update owner information by id
    
    :param id: owner id
    :param owner: Owner object with pydantic
    :return: 
    """
    query = db.query(models.Owner).filter(models.Owner.id == id, models.Owner.id == current_user.id)

    exist_owner = query.first()

    if exist_owner == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"owner with id: {id} wasn't found")


    query.update(owner.model_dump(), synchronize_session=False)

    db.commit()

    return query.first()

    
@owner_router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_owner_by_id(id: int, db: Session = Depends(get_db), current_user: schemas.TokenData =  Depends(oauth2.get_current_user)):
    """
    delete owner by id
    
    :param id: owner's id
    :return: Response with code 204
    """
    owner_query = db.query(models.Owner).filter(models.Owner.id == id)
    owner = owner_query.first()
    if not owner: 
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail=f"DELETION: owner with id: {id} wasn't found")
    owner_query.delete(synchronize_session=False)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)



# add dummy users for testing 
@owner_router.post("/dummy")
def create_dummy_owners(db: Session = Depends(get_db)):

    pwd = utils.pwd_context.hash("pw123")
    admin = models.Owner(first_name="merlin", last_name="the_coder", username=os.getenv("ADMIN_USERNAME"), password=utils.pwd_context.hash(os.getenv("ADMIN_PW")))
    dummy_1 = models.Owner(first_name="first_1", last_name="last_1", phone="123456789", username="dummy2@gmail.com", password=pwd)
    dummy_2 = models.Owner(first_name="first_2", last_name="last_2", phone="987654321", username="dummy3@gmail.com", password=pwd)
    dummy_3 = models.Owner(first_name="first_3", last_name="last_3", phone="555666777", username="dummy4@gmail.com", password=pwd)
    dummy_4 = models.Owner(first_name="first_4", last_name="last_4", phone="444555666", username="dummy5@gmail.com", password=pwd)
    db.add(admin)
    db.add(dummy_1)
    db.add(dummy_2)
    db.add(dummy_3)
    db.add(dummy_4)
    db.commit()
    return {"message": "dummy users added"}


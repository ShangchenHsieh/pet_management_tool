from typing import List
import fastapi
from fastapi import Response, status, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas
from datetime import datetime
import oauth2


pet_router = fastapi.APIRouter(
    prefix="/pets",
    tags=['Pets']
)

# The following function are only available when the users are logged in
# Their operations should be associated with the user id's 

@pet_router.get("/all")
def get_all_pets(db: Session = Depends(get_db), current_user: schemas.TokenData =  Depends(oauth2.get_current_user)):
    """
    Get all the pets owned by the current user

    :param db: Database session
    :return: JSON package containing all the pets
    """
    
    pets = db.query(models.Pet).filter(models.Pet.owner_id == current_user.id).all()
    return pets

@pet_router.get("/{id}")
def get_pet_by_id(id: int, db: Session = Depends(get_db), current_user: schemas.TokenData =  Depends(oauth2.get_current_user)):
    """
    Get the pet by id owned by certain user

    :param id: The id of the pet
    :param db: Database session
    :return: The Pet object
    """

    pet = db.query(models.Pet).filter(models.Pet.id == id, models.Pet.owner_id == current_user.id).first()
    if not pet:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Pet with id: {id} doesn't belong to this owner")
    return pet

@pet_router.post("/", status_code=status.HTTP_201_CREATED)
def create_pet(pet: schemas.Pet, db: Session = Depends(get_db), current_user: schemas.TokenData =  Depends(oauth2.get_current_user)):
    """
    Create new pet with their info

    :param pet: A JSON data converted to pydantic model by the pydantic library
    :param db: Database session
    :return: The created Pet object
    """
    
    new_pet = models.Pet(owner_id=current_user.id, ** pet.model_dump())
    
    db.add(new_pet)
    db.commit()
    db.refresh(new_pet)
    return new_pet

@pet_router.put("/{id}")
def update_pet_by_id(id: int, pet: schemas.Pet, db: Session = Depends(get_db), current_user: schemas.TokenData =  Depends(oauth2.get_current_user)):
    """
    Update pet information by id
    Exception is raised when pet not found / not belong to the owner 

    :param id: Pet id
    :param pet: Pet object with pydantic
    :param db: Database session
    :return: The updated Pet object
    """
    query = db.query(models.Pet).filter(models.Pet.id == id, models.Pet.owner_id == current_user.id)
    exist_pet = query.first()
    if exist_pet is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Pet with id: {id} wasn't found")
    query.update(pet.model_dump(), synchronize_session=False)
    db.commit()
    return query.first()

@pet_router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_pet_by_id(id: int, db: Session = Depends(get_db), current_user: schemas.TokenData = Depends(oauth2.get_current_user)):
    """
    Delete pet by id

    :param id: Pet's id
    :param db: Database session
    :return: Response with code 204
    """
    pet_query = db.query(models.Pet).filter(models.Pet.id == id, models.Pet.owner_id == current_user.id)
    pet = pet_query.first()
    if not pet:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"DELETION: Pet with id: {id} wasn't found")
    pet_query.delete(synchronize_session=False)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@pet_router.post("/dummy")
def create_dummy_pets(db: Session = Depends(get_db)):
    """
    Create dummy pets for testing

    :param db: Database session
    :return: Message indicating success
    """
    pets = [
        models.Pet(owner_id=2, breed="Siamese", species="Cat", name="Mittens", dob=datetime(2019, 4, 20), age=5),
        models.Pet(owner_id=2, breed="Beagle", species="Dog", name="Rocky", dob=datetime(2021, 2, 18), age=3),
        models.Pet(owner_id=2, breed="Parakeet", species="Bird", name="Tweety", dob=datetime(2022, 7, 14), age=2),

        models.Pet(owner_id=3, breed="Bulldog", species="Dog", name="Buddy", dob=datetime(2018, 8, 15), age=5),
        models.Pet(owner_id=3, breed="Maine Coon", species="Cat", name="Whiskers", dob=datetime(2020, 3, 11), age=4),
        models.Pet(owner_id=3, breed="Cockatiel", species="Bird", name="Sunny", dob=datetime(2021, 9, 23), age=2),

        models.Pet(owner_id=4, breed="Parrot", species="Bird", name="Charlie", dob=datetime(2022, 1, 10), age=2),
        models.Pet(owner_id=4, breed="Labrador", species="Dog", name="Bella", dob=datetime(2016, 5, 29), age=8),
        models.Pet(owner_id=4, breed="Sphynx", species="Cat", name="Cleopatra", dob=datetime(2019, 6, 30), age=5),

        models.Pet(owner_id=5, breed="Golden Retriever", species="Dog", name="Fluffy", dob=datetime(2020, 6, 1), age=3),
        models.Pet(owner_id=5, breed="Persian", species="Cat", name="Snowball", dob=datetime(2019, 12, 25), age=4),
        models.Pet(owner_id=5, breed="Husky", species="Dog", name="Max", dob=datetime(2017, 11, 5), age=6),
    ]

    db.add_all(pets)
    db.commit()
    return {"message": "dummy pets added"}

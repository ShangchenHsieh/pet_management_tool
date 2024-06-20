import fastapi
from fastapi import Response, status, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas
from datetime import datetime


pet_router = fastapi.APIRouter(
    prefix="/pets",
    tags=['Pets']
)

@pet_router.get("/all")
def get_all_pets(db: Session = Depends(get_db)):
    """
    Get all the pets

    :param db: Database session
    :return: JSON package containing all the pets
    """
    pets = db.query(models.Pet).all()
    return pets

@pet_router.get("/{id}")
def get_pet_by_id(id: int, db: Session = Depends(get_db)):
    """
    Get the pet by id

    :param id: The id of the pet
    :param db: Database session
    :return: The Pet object
    """
    pet = db.query(models.Pet).filter(models.Pet.id == id).first()
    if not pet:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Pet with id: {id} doesn't exist")
    return pet

@pet_router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.Pet)
def create_pet(pet: schemas.Pet, db: Session = Depends(get_db)):
    """
    Create new pet with their info

    :param pet: A JSON data converted to pydantic model by the pydantic library
    :param db: Database session
    :return: The created Pet object
    """
    new_pet = models.Pet(**pet.model_dump())
    db.add(new_pet)
    db.commit()
    db.refresh(new_pet)
    return new_pet

@pet_router.put("/{id}")
def update_pet_by_id(id: int, pet: schemas.Pet, db: Session = Depends(get_db)):
    """
    Update pet information by id

    :param id: Pet id
    :param pet: Pet object with pydantic
    :param db: Database session
    :return: The updated Pet object
    """
    query = db.query(models.Pet).filter(models.Pet.id == id)
    exist_pet = query.first()
    if exist_pet is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Pet with id: {id} wasn't found")
    query.update(pet.model_dump(), synchronize_session=False)
    db.commit()
    return query.first()

@pet_router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_pet_by_id(id: int, db: Session = Depends(get_db)):
    """
    Delete pet by id

    :param id: Pet's id
    :param db: Database session
    :return: Response with code 204
    """
    pet_query = db.query(models.Pet).filter(models.Pet.id == id)
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
    dummy_1 = models.Pet(owner_id=1, breed="Golden Retriever", species="Dog", name="Fluffy", dob=datetime(2020, 6, 1), age=3)
    dummy_2 = models.Pet(owner_id=2, breed="Siamese", species="Cat", name="Mittens", dob=datetime(2019, 4, 20), age=5)
    dummy_3 = models.Pet(owner_id=3, breed="Bulldog", species="Dog", name="Buddy", dob=datetime(2018, 8, 15), age=5)
    dummy_4 = models.Pet(owner_id=4, breed="Parrot", species="Bird", name="Charlie", dob=datetime(2022, 1, 10), age=2)


    db.add(dummy_1)
    db.add(dummy_2)
    db.add(dummy_3)
    db.add(dummy_4)
    db.commit()
    return {"message": "dummy pets added"}

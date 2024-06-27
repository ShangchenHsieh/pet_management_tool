from typing import List
import fastapi
from fastapi import Response, status, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas
from datetime import datetime
import oauth2

pet_record_router = fastapi.APIRouter(
    prefix="/pet_records",
    tags=['PetRecords']
)

# The following function are only available when the users are logged in
# Their operations should be associated with the user id's
@pet_record_router.post("/dummy")
def create_dummy_pet_records(db: Session = Depends(get_db)):
    """
    Create dummy pet records for testing

    :param db: Database session
    :return: Message indicating success
    """
    pet_records = [
        models.PetRecord(owner_id=2, pet_id=1, date=datetime(2019, 4, 20), weight=5.0, height=30.0),
        models.PetRecord(owner_id=2, pet_id=1, date=datetime(2019, 4, 20),weight=5.2, height=30.5),
        models.PetRecord(owner_id=2, pet_id=1, date=datetime(2019, 4, 20),weight=7.0, height=40.0),
        models.PetRecord(owner_id=2, pet_id=2, date=datetime(2019, 4, 20),weight=6.5, height=35.0),
        models.PetRecord(owner_id=2, pet_id=2, date=datetime(2019, 4, 20),weight=6.5, height=35.0),
    ]

    db.add_all(pet_records)
    db.commit()
    return {"message": "dummy pet records added"}

@pet_record_router.get("/all", response_model=List[schemas.PetRecord])
def get_all_pet_records(db: Session = Depends(get_db), current_user: schemas.TokenData =  Depends(oauth2.get_current_user)):
    """
    Get all the pet records owned by the current user

    :param db: Database session
    :return: JSON package containing all the pet records
    """
    
    pet_records = db.query(models.PetRecord).join(models.Pet).filter(models.Pet.owner_id == current_user.id).all()
    return pet_records

@pet_record_router.get("/{id}", response_model=schemas.PetRecord)
def get_pet_record_by_id(id: int, db: Session = Depends(get_db), current_user: schemas.TokenData =  Depends(oauth2.get_current_user)):
    """
    Get 1 pet record by id 
    :param id: The id of the pet record
    :param db: Database session
    :return: The PetRecord object
    """

    pet_record = db.query(models.PetRecord).join(models.Pet).filter(models.PetRecord.id == id, models.Pet.owner_id == current_user.id).first()
    if not pet_record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"PetRecord with id: {id} doesn't belong to this owner")
    return pet_record

@pet_record_router.get("/all/{pet_id}", response_model=List[schemas.PetRecord])
def get_all_pet_records(pet_id: int, db: Session = Depends(get_db), current_user: schemas.TokenData =  Depends(oauth2.get_current_user)):
    """
    Get all the pet records owned by the pet

    :param db: Database session
    :return: JSON package containing all the pet records
    """
    
    pet_records = db.query(models.PetRecord).join(models.Pet).filter(models.Pet.owner_id == current_user.id, models.PetRecord.pet_id == pet_id).all()
    if not pet_records: 
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"PetRecord with id: {id} doesn't belong to this owner or the pet doesn't have any records now")
    return pet_records

@pet_record_router.post("/{pet_id}", status_code=status.HTTP_201_CREATED, response_model=schemas.PetRecord)
def create_pet_record(pet_id: int, pet_record: schemas.PetRecord, db: Session = Depends(get_db), current_user: schemas.TokenData =  Depends(oauth2.get_current_user)):
    """
    Create new pet record with their info

    :param pet_record: A JSON data converted to pydantic model by the pydantic library
    :param db: Database session
    :return: The created PetRecord object
    """
    
    pet = db.query(models.Pet).filter(models.Pet.id == pet_id, models.Pet.owner_id == current_user.id).first()
    if not pet:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="You are not allowed to create a record for this pet")

    new_pet_record = models.PetRecord(owner_id=current_user.id, pet_id=pet_id, **pet_record.model_dump())
    db.add(new_pet_record)
    db.commit()
    db.refresh(new_pet_record)
    return new_pet_record

@pet_record_router.put("/{record_id}", response_model=schemas.PetRecord)
def update_pet_record_by_id(record_id: int, pet_record: schemas.PetRecord, db: Session = Depends(get_db), current_user: schemas.TokenData =  Depends(oauth2.get_current_user)):
    """
    Update pet record information by id
    Exception is raised when pet record not found / not belong to the owner 

    :param id: PetRecord id
    :param pet_record: PetRecord object with pydantic
    :param db: Database session
    :return: The updated PetRecord object
    """
    query = db.query(models.PetRecord).filter(models.PetRecord.id == record_id, models.PetRecord.owner_id == current_user.id)
    exist_pet_record = query.first()
    if exist_pet_record is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"PetRecord with id: {id} wasn't found or doesn't belong to you")
    update_data = pet_record.model_dump()
    update_data['date'] = datetime.now()  # Update the date to the current datetime

    # Perform the update
    query.update(update_data, synchronize_session=False)
    db.commit()
    return query.first()

@pet_record_router.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_pet_record_by_id(record_id: int, db: Session = Depends(get_db), current_user: schemas.TokenData = Depends(oauth2.get_current_user)):
    """
    Delete pet record by id

    :param id: PetRecord's id
    :param db: Database session
    :return: Response with code 204
    """

    pet_record_query = db.query(models.PetRecord).filter(models.PetRecord.id == record_id, models.PetRecord.owner_id == current_user.id)
    pet_record = pet_record_query.first()
    if not pet_record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"DELETION: PetRecord with id: {id} wasn't found or doesn't belong to you")
    pet_record_query.delete(synchronize_session=False)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@pet_record_router.delete("/all/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_all_pet_record(id: int, db: Session = Depends(get_db), current_user: schemas.TokenData = Depends(oauth2.get_current_user)):
    """
    Delete all the records owned by a specific pet

    Args:
        id (int): The id of the pet
        db (Session, optional): Database session. Defaults to Depends(get_db).
        current_user (schemas.TokenData, optional): Token data of the current user. Defaults to Depends(oauth2.get_current_user).

    Returns:
        Response with status code 204
    """
    print(current_user.id)
    # Ensure the pet belongs to the current user
    pet = db.query(models.Pet).filter(models.Pet.id == id, models.Pet.owner_id == current_user.id).first()
    if not pet:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Pet with id: {id} doesn't belong to this owner")
    
    # Delete all records associated with the specified pet ID
    
    pet_records_query = db.query(models.PetRecord).filter(models.PetRecord.pet_id == id)
    pet_records_query.delete(synchronize_session=False)
    db.commit()
    
    return Response(status_code=status.HTTP_204_NO_CONTENT)



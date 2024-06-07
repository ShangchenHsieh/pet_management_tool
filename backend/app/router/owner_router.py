import fastapi 
from schemas import Owner
from fastapi import Response, status, HTTPException

owner_router = fastapi.APIRouter(
    prefix="/owners",
    tags=['Owners']
)


@owner_router.get("/all")
async def get_all_owners(): 
    """
    get all the owners
    
    :return: JSON package containing all the owners
    """
    return {"message": "Here are the owners"}

@owner_router.get("/{id}")
def get_owner_by_id(id: int):
    """
    get the owner by id 
    
    :param id: the id of the owner
    :return Owner: the Owner object(from pydantic) 
    """
    found = False
    
    # if found
    found = True
    
    if not found: 
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail=f"owner with id: {id} wasn't found")
    return {"id": id}


@owner_router.post("/", status_code=status.HTTP_201_CREATED)
def create_owner(new_owner: Owner): 
    """
    create new owner with their personal info

    :param new_owner: a JSON data converted to pydantic model by the pydantic library
    :return: temp. info 
    """  
    # new_owner.dict() -> convert the pydantic model to a dictionary 
    return {"new_owner": new_owner.last_name}


@owner_router.put("/{id}")
def update_owner_by_id(id: int, owner: Owner):
    """
    update owner information by id
    
    :param id: owner id
    :param owner: Owner object with pydantic
    :return: 
    """
    found = False
    # found 
    found = True
    # not found
    if not found: 
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail=f"UPDATE: owner with id: {id} wasn't found")
        
    return {"message": "updated!"}

    
@owner_router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_owner_by_id(id: int):
    """
    delete owner by id
    
    :param id: owner's id
    :return: Response with code 204
    """
    found = False
    # found 
    found = True
    # not found
    if not found: 
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail=f"DELETION: owner with id: {id} wasn't found")
    return Response(status_code=status.HTTP_204_NO_CONTENT)



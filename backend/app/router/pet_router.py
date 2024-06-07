import fastapi 

pet_router = fastapi.APIRouter()

@pet_router.get("/pets")
def get_pets(): 
    return {"message": "This is your pets"}
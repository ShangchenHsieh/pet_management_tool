import fastapi 


router = fastapi.APIRouter()

@router.get("/easteregg")
def test(): 
    return {"message": "Hello World!",}
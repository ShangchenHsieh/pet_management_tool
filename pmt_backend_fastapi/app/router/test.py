import fastapi 


router = fastapi.APIRouter()

@router.get("/test")
def test(): 
    return {"message": "hello from test"}
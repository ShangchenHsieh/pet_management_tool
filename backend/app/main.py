from fastapi import FastAPI
from fastapi.responses import FileResponse 
from router import test, pet_router, owner_router
from sqlalchemy.orm import Session
from database import engine
import models




# source venv/bin/activate

# start server on MacOS: "$ python3 -m uvicorn main:app --reload" (system path not configured correctly)
# start server on Linux: "$ uvicorn main:app --reload"

models.Base.metadata.create_all(bind=engine)


app = FastAPI()
app.include_router(test.router)
app.include_router(owner_router.owner_router)
app.include_router(pet_router.pet_router)

# this is an Easter Egg
@app.get("/")
async def root(): 
    return FileResponse("../../public_assets/cats.jpg")


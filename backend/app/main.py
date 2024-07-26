from fastapi import FastAPI
from fastapi.responses import FileResponse 
from router import pet_router, pet_record_router,owner_router, auth
from sqlalchemy.orm import Session
from database import engine
import models
from fastapi.middleware.cors import CORSMiddleware



# source venv/bin/activate

# start server on Linux: "$ uvicorn main:app --reload"

models.Base.metadata.create_all(bind=engine)


app = FastAPI()
app.include_router(owner_router.owner_router)
app.include_router(pet_router.pet_router)
app.include_router(auth.auth)
app.include_router(pet_record_router.pet_record_router)
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# this is an Easter Egg
@app.get("/34ST3R366")
async def root(): 
    return FileResponse("../../public_assets/cats.jpg")


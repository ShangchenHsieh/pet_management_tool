from fastapi import FastAPI 
from router import test
from sqlalchemy.orm import Session
from database import engine
import models


# activate venv
# source env/bin/activate

models.Base.metadata.create_all(bind=engine)


app = FastAPI()
app.include_router(test.router)





@app.get("/")
async def root(): 
    return {"message": "hello world !!!"}

@app.post("")
async def post():
    return {"message": "hello from the post route"}
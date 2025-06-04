from datetime import datetime
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from supabase import create_client, Client
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"]
)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Creación de modelos
class Product(BaseModel):
    id: int
    nombre: str
    talla : str
    descripcion: str
    precio: float
    cantidad: float

    
class clientes(BaseModel):
    id: int
    name: str
    apellido: str
    telefono: float
    email: str
    
class facturas(BaseModel):
    id: int
    fecha: datetime
    idClientes: int
    total: float
    
    
@app.post("/products") # Ruta
def create_product(prod: Product): # Endpoint
    try:
        supabase.table("productos").insert(prod.model_dump()).execute()
        return {"status":"ok", "msg":"Guardado con éxito"}
    except Exception as ex:
        return {"status": "error", "msg": ex}

@app.get("/products", response_model=List[Product]) # Ruta
def list_products():
    res = supabase.table("productos").select("").execute()
    return res.data
    






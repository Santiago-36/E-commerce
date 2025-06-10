from datetime import datetime
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from supabase import create_client, Client
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime


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
    nombre: str
    talla : str
    descripcion: str
    precio: float
    cantidad: float

    
class clientes(BaseModel):
    nombre: str
    apellido: str
    correo: str
    telefono: float
    password: str
    
    
class factura(BaseModel):
    fecha: str
    total: float
    nombre: str
    
    
@app.post("/products") # Ruta
def create_product(prod: Product): # Endpoint
    try:
        print(prod.model_dump())
        supabase.table("productos").insert(prod.model_dump()).execute()
        return {"status":"ok", "msg":"Guardado con éxito"}
    except Exception as ex:
        return {"status": "error", "msg": ex}

@app.get("/products", response_model=List[Product]) # Ruta
def list_products():
    res = supabase.table("productos").select("").execute()
    return res.data
# ingreso de factura
@app.post("/factura") # Ruta
def create_factura(prod: factura): # Endpoint
    try:
        print(prod.model_dump())
        res = supabase.table("factura").insert(prod.model_dump()).execute()
        print(res)
        return {"status":"ok", "msg":"Compra exitosa"}
    except Exception as ex:
        return {"status": "error", "msg": ex}

@app.get("/factura", response_model=List[factura]) # Ruta
def list_factura():
    res = supabase.table("factura").select("").execute()
    return res.data





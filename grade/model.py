from flask import Flask
from flaskext.mysql import MySQL
from flask_sqlalchemy import SQLAlchemy

mysql = MySQL()
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:1004@localhost/my_grade'
db = SQLAlchemy(app)


class Images(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    size = db.Column(db.String(255), nullable=False)
    image_name = db.Column(db.String(255), nullable=False, unique=True)
    image_dir = db.Column(db.String(255), nullable=False)

class Outputs(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    size = db.Column(db.String(255), nullable=False)
    image_name = db.Column(db.String(255), nullable=False, unique=True)
    image_dir = db.Column(db.String(255), nullable=False)

class Contours(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    size = db.Column(db.String(255), nullable=False)
    image_name = db.Column(db.String(255), nullable=False, unique=True)
    image_dir = db.Column(db.String(255), nullable=False)

def create():
    db.create_all()
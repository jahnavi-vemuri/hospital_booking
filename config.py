import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = 'your-secret'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'hospital.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

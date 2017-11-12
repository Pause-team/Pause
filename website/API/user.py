"""
    User API : User CRUD functionality
"""
from sqlalchemy.orm import sessionmaker
from .models import User


class UserAPI:
    def __init__(self, engine):
        self.engine = engine
        self.session = sessionmaker(bind=engine)

    def create(self, email, name):
        new_user = User(name=name, email=email)
        session = self.session()
        session.add(new_user)

    def read(self, email):
        session = self.session()
        user = session.query(User).filter(User.email == email).first()
        if user is not None:
            return user.as_dict()
        return None

    def update(self, email, name):
        session = self.session()
        user = session.query(User).filter(User.email == email).first()
        if user is not None:
            user.name = name
            session.update(user)
            return True
        return False

    def delete(self, email):
        session = self.session()
        user = session.query(User).filter(User.email == email).first()
        if user is not None:
            session.delete(user)

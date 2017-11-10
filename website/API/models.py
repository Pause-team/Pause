"""
    Database Models
    ~~~~~~~~~~~~~~~

    This file contains the SQL models found in the <project-root>/database directory. We leverage the power of
    SQLAlchemy to use any server we want by setting the following environment variable.
    *   PAUSE_DB - URL for connecting with DB, default: "sqlite:///data.db",
        see link: http://docs.sqlalchemy.org/en/latest/core/engines.html for more information

"""
# SQLAlchemy imports
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, Boolean

# Other imports
from datetime import datetime
import os

Base = declarative_base()


class User(Base):
    __tablename__ = "user"
    user_id = Column(Integer, autoincrement=True, primary_key=True)
    email = Column(String(45), primary_key=True)
    name = Column(String(45))
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, onupdate=datetime.now)


class Video(Base):
    __tablename__ = "video"
    video_id = Column(Integer, autoincrement=True, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.user_id"))
    url = Column(Text, nullable=False)
    title = Column(String(45), nullable=False)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, onupdate=datetime.now)


class Playlist(Base):
    __tablename__ = "playlist"
    playlist_id = Column(Integer, autoincrement=True, primary_key=True)
    name = Column(String(45), nullable=False)
    description = Column(Text)
    private = Column(Boolean, default=False)
    user_id = Column(Integer, ForeignKey("user.user_id"))


class PlayListVideo(Base):
    __tablename__ = "playlist_video"
    playlist_id = Column(Integer, ForeignKey("playlist.playlist_id"))
    video_id = Column(Integer, ForeignKey("video.video_id"))


def init():
    """
        Initializes the database and return the connection pool engine.
        For more info: http://docs.sqlalchemy.org/en/latest/core/pooling.html
    """
    engine = create_engine(os.environ.setdefault("PAUSE_DB", 'sqlite:///data.db'))
    Base.metadata.create_all(engine)
    return engine

"""
    Video API : Video CRUD functionality
"""
from sqlalchemy.orm import sessionmaker
from .models import Video


class VideoAPI:
    def __init__(self, engine):
        self.engine = engine
        self.session = sessionmaker(bind=engine)

    def create(self, user_id, url, title, progress):
        new_video = Video(user_id=user_id, url=url, title=title, progress=progress)
        session = self.session()
        session.add(new_video)
        session.commit()

    def read(self, user_id, video_id=None, page=0, rows_per_page=10):
        session = self.session()
        videos = session.query(Video).filter(Video.user_id == user_id)
        if video_id is not None:
            videos = videos.filter(Video.video_id == video_id)
        count = videos.count()
        offset = page * rows_per_page
        videos = videos.slice(offset, offset + rows_per_page)
        resp = []
        for each in videos.all():
            resp.append(each.as_dist())
        return {
            "count": count,
            "videos": resp
        }

    def update(self, user_id, url, progress):
        session = self.session()
        video = session.query(Video).filter(Video.user_id == user_id).filter(Video.url == url).first()
        if video is not None:
            video.progress = progress
            session.update(video)
            session.commit()
            return True
        return False

    def delete(self, video_id):
        session = self.session()
        video = session.query(Video).filter(Video.video_id == video_id).first()
        if video is not None:
            session.delete(video)
            session.commit()

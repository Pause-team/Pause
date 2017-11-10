"""
    Validator
    ~~~~~~~~~

    Regex for validation of various fields in the models.py.
"""
import re

EMAIL_REGEX = re.compile('^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$')

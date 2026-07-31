class InvalidWidthException(Exception):
    def __init__(self, message: str):
        super().__init__(message)


class InvalidHeightException(Exception):
    def __init__(self, message: str):
        super().__init__(message)

class quakeData:
    def __init__(self,idi, mag, place, prof, date, time, country, lon, lat, tmssp) -> None:
        self.id = idi
        self.magnitud = mag
        self.lugar = place
        self.profundidad = prof
        self.date = date
        self.time = time
        self.pais = country
        self.longitud = lon
        self.latitud = lat
        self.timestamp = tmssp

    def toJSON(self):
        return {
            "id": self.id,
            "magnitud": self.magnitud,
            "lugar": self.lugar,
            "profundidad": self.profundidad,
            "date": self.date.isoformat(),
            "time": self.time.isoformat(),
            "pais": self.pais,
            "longitud": self.longitud,
            "latitud": self.latitud,
            "timestamp": self.timestamp
        }        
    
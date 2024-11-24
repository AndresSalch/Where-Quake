import os, sys
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.dirname(CURRENT_DIR))

import requests
import json
from datetime import datetime
import reverse_geocode
from Factory.quakeData import quakeData

class quakeService:
    def __init__(self) -> None:
        self.quakeList = []
        self.index = 0
    
    def createZero(self):
        self.quakeList = []
        self.index = 0
        try:
            response = requests.get("https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&eventtype=earthquake&limit=100&minmagnitude=1")
            dataRaw = json.loads(response.text)
            for data in dataRaw['features']:
                mag = float(data['properties']['mag'])
                d = datetime.fromtimestamp(data['properties']['time'] / 1000).date()
                t = datetime.fromtimestamp(data['properties']['time'] / 1000).time()
                t = t.replace(microsecond=0)
                lon = data['geometry']['coordinates'][0]
                lat = data['geometry']['coordinates'][1]
                coords = (lat,lon)
                country = reverse_geocode.search([coords])[0]['country_code']

                self.quakeList.append(quakeData(self.index,round(mag,1),data['properties']['place'],round(data['geometry']['coordinates'][2],2),d,t,country,lon,lat,data['properties']['time']).toJSON())
                self.index += 1
            return self.quakeList
        except:
            print(f'Error: {Exception}')
            return None

    def update(self,starttime):
        self.quakeList = []
        self.index = 0
        dt = datetime.utcfromtimestamp(starttime / 1000)
        dt = dt.strftime('%Y-%m-%dT%H:%M:%S.%f%z')
        print(dt)
        try:
            response = requests.get(f"https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&eventtype=earthquake&limit=100&starttime={dt}")
            dataRaw = json.loads(response.text)
            for data in dataRaw['features']:
                d = datetime.fromtimestamp(data['properties']['time'] / 1000).date()
                t = datetime.fromtimestamp(data['properties']['time'] / 1000).time()
                t = t.replace(microsecond=0)
                lon = data['geometry']['coordinates'][0]
                lat = data['geometry']['coordinates'][1]
                coords = (lat,lon)
                country = reverse_geocode.search([coords])[0]['country_code']

                self.quakeList.append(quakeData(self.index,round(data['properties']['mag'],1),data['properties']['place'],round(data['geometry']['coordinates'][2],2),d,t,country,lon,lat,data['properties']['time']).toJSON())
                self.index += 1
            return self.quakeList
        except:
            print(f'Error: {Exception}')
            return None



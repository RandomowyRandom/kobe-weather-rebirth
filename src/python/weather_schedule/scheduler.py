from datetime import date
import schedule
import json
import requests

def get_temperature(apiKey: str, locationKey: str):
    response = requests.get(f'http://dataservice.accuweather.com/currentconditions/v1/{locationKey}?apikey={apiKey}&language=pl-pl&details=true')

    if response.status_code == 200:
        return response.json()
    else:
        return None
 
def cache_weather(confs: dict, json_data: dict):
    data = get_temperature(confs["apiKey"], confs["locationKey"])
    print(data)

    today = date.today()
    today.strftime(r"%Y/%m/%d")

    json_data["data"].append({
        "locationKey": confs["locationKey"],
        "metricTemp": data[0].get("Temperature").get("Metric").get("Value"),
        "imperialTemp": data[0].get("Temperature").get("Imperial").get("Value"),
        "date": f'{today}'
    })

    with open('weather_history.json', 'w') as file:
        json.dump(json_data, file)

def main():

    json_data = {
    "data": []
}

    # json loading
    try:
        with open('weather_history.json', 'r') as file:
            json_data = json.load(file)
    except:
        with open('weather_history.json', 'w') as file:
            json.dump(json_data, file)
        print('Creating new file!')

    try:
        with open('scheduler_confs.json', 'r') as file:
            confs = json.load(file)
    except Exception as e:
        print(r'Could not load config file "scheduler_confs.json"! ', e)
        return

    # schedule the task
    schedule.every().day.at(confs["time"]).do(cache_weather, confs, json_data)

    # handle scheduled tasks
    while True:
        schedule.run_pending()

if __name__ == '__main__':
    main()
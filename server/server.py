from flask import Flask, jsonify, request
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
API_KEY = "API_KEY"
# @app.route('/search2', methods=['GET'])
# def search2():
#     
#     Latitude = request.args.get('lat')
#     Longitude = request.args.get('lng')
#     range_value = request.args.get('range')
#     print(f"Latitude: {Latitude}")
#     return f"Latitude: {Latitude}"


@app.route('/search', methods=['GET'])
def search():
    Latitude = request.args.get('lat')
    Longitude = request.args.get('lng')
    range_value = request.args.get('range')
    print(f"Latitude: {Latitude}")

    base_url = 'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/'
    params = {
        'key': API_KEY,
        'lat': Latitude,
        'lng': Longitude,
        'range': range_value,
        "count": 100,
        "format": "json"
    }

    try:
        response = requests.get(base_url, params=params)
        print(response)
        if response.status_code == 200:
            try:
                search_data = response.json()
                shop_list = search_data['results']['shop']
                extracted_data = [{'name': shop['name'], 'address': shop['address'], 'photo':shop['photo']['pc']["l"], "open":shop["open"], "access":shop["access"],"id":shop["id"], "genre":shop['genre']['name']} for shop in shop_list]
                print(extracted_data)
                print(len(extracted_data))
                return extracted_data
            except ValueError:
                return jsonify({'error': 'Invalid JSON response'})
        else:
            return jsonify({'error': f'Failed to fetch data. Status code: {response.status_code}'})
    except requests.RequestException as e:
        return jsonify({'error': f'Error fetching data: {e}'})

@app.route('/shopinformation', methods=['GET'])
def shopinformation():
    id = request.args.get('id')
    base_url = 'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/'
    params = {
        'key': API_KEY,
        'id': id,
        "format": "json"
    }
    try:
        response = requests.get(base_url, params=params)
        print(response)
        if response.status_code == 200:
            try:
                search_data = response.json()
                shop_list = search_data['results']['shop']
                extracted_data = [{'name': shop['name'], 'address': shop['address'], 'photo':shop['photo']['pc']["l"], "open":shop["open"], "access":shop["access"],"urls": shop["urls"]["pc"], "lat":shop["lat"], "lng":shop["lng"], "midnight":shop["midnight"],"karaoke":shop["karaoke"],"budget":shop["budget"]["average"]} for shop in shop_list]
                print(shop_list)
                return extracted_data
            except ValueError:
                return jsonify({'error': 'Invalid JSON response'})
        else:
            return jsonify({'error': f'Failed to fetch data. Status code: {response.status_code}'})
    except requests.RequestException as e:
        return jsonify({'error': f'Error fetching data: {e}'})

if __name__ == '__main__':
    app.run(host="localhost", port=8000)

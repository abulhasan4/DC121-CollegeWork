import requests

base_url = 'http://127.0.0.1:8000/'

def test_endpoint(endpoint, num1, num2):
    url = base_url + endpoint + f'?num1={num1}&num2={num2}'
    resp = requests.get(url)
    json_response = resp.json()
    result = json_response['result']
    print(f'{endpoint} result: {result}')

test_endpoint('add', 5, 6)
test_endpoint('subtract', 10, 4)
test_endpoint('divide', 20, 5)
test_endpoint('multiply', 3, 7)
test_endpoint('exponential', 2, 3)

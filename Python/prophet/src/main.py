import sys
sys.path.insert(0, './http')
sys.path.insert(0, './prophet')

from router import HTTP_ROUTER

if __name__ == '__main__':
    API = HTTP_ROUTER()
    API.run(debug=True)

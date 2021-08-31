import requests
from bs4 import BeautifulSoup
import lxml

def digi_vat_lib():
    url = "https://digi.vatlib.it/mss/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "lxml")
    # print(response.status_code)
    # print(soup)
    urls = []
    items = soup.findAll("li", class_="capital-top")
    for item in items:
        # print(item.find("a").text)
        # print(item.find("a").get("href"))
        name = item.find("a").get("href")
        if name.find(".gr") != -1:
            urls.append(url + item.find("a").get("href"))
    print(urls)



if __name__ == '__main__':
    digi_vat_lib()
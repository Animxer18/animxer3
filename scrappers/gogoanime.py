from bs4 import BeautifulSoup
import requests


def search(url):
    r = requests.get("https://gogoanime3.net/search.html?keyword="+url)
    html = BeautifulSoup(r.content, 'html.parser')
    result = html.select(".items li a")
    links=[]
    for a in result:
        links.append(f"{a['href'].replace('/category/','')}")
    return links[0]

def getEpisodes(url):
    r= requests.get("https://gogoanime3.net/category/"+url)
    html = BeautifulSoup(r.content)
    id = html.select("#movie_id")[0]["value"]
    name = html.select("#alias_anime")[0]["value"]
    ajaxUrl = f"https://ajax.gogo-load.com/ajax/load-list-episode?ep_start=0&ep_end=9999&id={id}&alias={name}"
    r2 = requests.get(ajaxUrl)
    epis = BeautifulSoup(r2.content, 'html.parser')
    link_arr = []
    links = epis.select("a")
    for link in links:
        link_arr.append(f'{link["href"].replace(" /","")}')
    return link_arr[::-1]

def getDownloadUrl(epUrl):
    r = requests.get("https://gogoanime3.net"+epUrl)
    html = BeautifulSoup(r.content,"html.parser")
    dUrl = html.select(".streamsb a")[0]["data-video"]
    download= requests.get(f"{dUrl.replace('https://streamsss.net/e/','https://streamsss.net/d/')}")
    html2 = BeautifulSoup(download.content,"html.parser")
    downloadUrl = [] 
    epsize = []
    for x in html2.select(".contentbox a"):
        downloadUrl.append(x["onclick"])
        epsize.append(x.get_text())
    directDlinks = [] 
    for d in downloadUrl:
        params = ((d.replace("download_video('","")).replace("')","")).split("','")
        directDlink = f"https://streamsss.net/dl?op=download_orig&id={params[0]}&mode={params[1]}&hash={params[2]}"
        directDlinks.append(directDlink)
    arr = {"dlinks":directDlinks,"size":epsize,"embed_url":dUrl}
    return arr

if __name__ == "__main__":
    None
    

from serpapi import GoogleSearch

params = {
  "engine": "google",
  "q": "Coffee",
  "api_key": "d0fc5bfd4731d1098ed82ef2111cb6e77e65b1644897a05a018efd65f6c62765"
}

search = GoogleSearch(params)
results = search.get_dict()
organic_results = results["organic_results"]
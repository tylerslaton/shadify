import os
from langchain.tools import tool
from tavily import TavilyClient

def _get_client():
    return TavilyClient(api_key=os.environ["TAVILY_API_KEY"])

@tool
def search_internet(query: str):
    """Search the internet for a given query."""
    return _get_client().search(query)

@tool
def extract_site(website: str):
    """Extract information from a given website."""
    return _get_client().extract(website)

@tool
def crawl_site(website: str, instructions: str):
    """Extract information from a given website."""
    return _get_client().crawl(website, instructions)

search_tools = [search_internet, extract_site, crawl_site]

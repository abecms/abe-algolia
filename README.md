# abe-algolia
Add search feature on your Abe frontend with Algolia

## Introduction
This plugin will index all you published content to Algolia so that you can add a search feature to your static frontend !

## Pre-requisites
An account on Algolia

## Configuration
Configure the Algolia parameters in your abe.json file.

```
"algolia":{
  "active":"true",
  "apiKey":"Secured API Key",
  "applicationID":"your appid",
  "index":"optional value"
 }
```

you can deactivate this plugin by setting "active" to false
If you don't provide an "index" value, the plugin will take the name of your project directory

## How it works

### On your Abe CMS
Every time you publish a content, abe-algolia will publish the whole document to Algolia.
Every time you unpublish a content, abe-algolia will delete this content from Algolia.

The algolia console : /abe/plugin/abe-algolia/console
It will display the number of indexed posts in Algolia. You'll be able to launch a full index or reindex your blog with algolia.

### On your client

You'll find a specific recipe on this plugin here: https://github.com/abejs/recipe-algolia

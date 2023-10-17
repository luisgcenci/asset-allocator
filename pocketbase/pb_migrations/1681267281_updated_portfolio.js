migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fil9ch7rglcdaij")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vwmat5ux",
    "name": "portfolio_userid",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fil9ch7rglcdaij")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vwmat5ux",
    "name": "userid",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})

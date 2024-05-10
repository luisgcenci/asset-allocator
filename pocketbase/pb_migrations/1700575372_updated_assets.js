migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fil9ch7rglcdaij")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jmlkcgua",
    "name": "asset_name",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 1,
      "max": 16,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fil9ch7rglcdaij")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jmlkcgua",
    "name": "asset_name",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 3,
      "max": 16,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})

migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fil9ch7rglcdaij")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z2zyjtem",
    "name": "asset_class",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "d0ysk1m38rmls5t",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "asset_classes_name"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fil9ch7rglcdaij")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z2zyjtem",
    "name": "asset_class",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "d0ysk1m38rmls5t",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})

migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d0ysk1m38rmls5t")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ak4y4h94",
    "name": "asset_classes_target",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 0.1,
      "max": 1
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d0ysk1m38rmls5t")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ak4y4h94",
    "name": "asset_classes_target",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 1,
      "max": 100
    }
  }))

  return dao.saveCollection(collection)
})

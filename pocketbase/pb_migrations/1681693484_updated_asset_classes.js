migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d0ysk1m38rmls5t")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tpi0hwrw",
    "name": "asset_classes_name",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": 24,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d0ysk1m38rmls5t")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tpi0hwrw",
    "name": "asset_classes_name",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 4,
      "max": 24,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})

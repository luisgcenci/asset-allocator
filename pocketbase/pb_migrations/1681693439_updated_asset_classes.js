migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d0ysk1m38rmls5t")

  // remove
  collection.schema.removeField("not8txnw")

  // add
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d0ysk1m38rmls5t")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "not8txnw",
    "name": "asset_classes_name",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "STOCKS",
        "BONDS",
        "REITs",
        "CRYPTO",
        "CASH"
      ]
    }
  }))

  // remove
  collection.schema.removeField("tpi0hwrw")

  return dao.saveCollection(collection)
})

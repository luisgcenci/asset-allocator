migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d0ysk1m38rmls5t")

  // update
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
        "REITs"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d0ysk1m38rmls5t")

  // update
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
        "STOCK",
        "BOND",
        "REIT"
      ]
    }
  }))

  return dao.saveCollection(collection)
})

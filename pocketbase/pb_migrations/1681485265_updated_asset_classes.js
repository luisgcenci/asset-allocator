migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d0ysk1m38rmls5t")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lc9wxpj9",
    "name": "asset_classes_amount",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d0ysk1m38rmls5t")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lc9wxpj9",
    "name": "asset_classes_amount",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 1,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})

migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d0ysk1m38rmls5t")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lc9wxpj9",
    "name": "asset_class_amount",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 1,
      "max": null
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ak4y4h94",
    "name": "asset_class_target",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 0.01,
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
    "id": "lc9wxpj9",
    "name": "asset_class_amount",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ak4y4h94",
    "name": "asset_class_target",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 1
    }
  }))

  return dao.saveCollection(collection)
})

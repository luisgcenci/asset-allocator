migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fil9ch7rglcdaij")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d9c5blhr",
    "name": "asset_avg_price",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fil9ch7rglcdaij")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d9c5blhr",
    "name": "asset_price",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})

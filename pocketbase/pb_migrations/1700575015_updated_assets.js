migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fil9ch7rglcdaij")

  // remove
  collection.schema.removeField("2xaoljri")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d9c5blhr",
    "name": "asset_market_value",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2xaoljri",
    "name": "asset_quantity",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

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
})

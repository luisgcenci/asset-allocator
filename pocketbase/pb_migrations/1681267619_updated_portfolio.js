migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fil9ch7rglcdaij")

  collection.name = "assets"

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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jmlkcgua",
    "name": "asset_name",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 4,
      "max": 16,
      "pattern": ""
    }
  }))

  // add
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

  // add
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vwmat5ux",
    "name": "asset_userid",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fil9ch7rglcdaij")

  collection.name = "portfolio"

  // remove
  collection.schema.removeField("2xaoljri")

  // remove
  collection.schema.removeField("jmlkcgua")

  // remove
  collection.schema.removeField("d9c5blhr")

  // remove
  collection.schema.removeField("z2zyjtem")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vwmat5ux",
    "name": "portfolio_userid",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})

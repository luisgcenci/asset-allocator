migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d0ysk1m38rmls5t")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_yqZrfOK` ON `asset_classes` (\n  `asset_classes_userid`,\n  `asset_classes_name`\n)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oipcsdyv",
    "name": "asset_classes_userid",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ak4y4h94",
    "name": "asset_classes_target",
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

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_yqZrfOK` ON `asset_classes` (\n  `asset_class_userid`,\n  `asset_class_name`\n)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oipcsdyv",
    "name": "asset_class_userid",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "not8txnw",
    "name": "asset_class_name",
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
})

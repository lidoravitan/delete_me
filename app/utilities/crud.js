

exports.bulkInsertToArray = (Model, documentProperty) => (req, res) => {
  Model.findOneAndUpdate(
    { _id: req.params.id },
    {
      $addToSet: { [documentProperty]: { $each: req.body } },
    },
    { new: true },
    (err, document) => {
      if (err) return res.status(400).json(err)
      return res.json(document)
    }
  )
}

exports.bulkRemoveFromArray = (Model, documentProperty) => (req, res) => {
  Model.findOneAndUpdate(
    { _id: req.params.id },
    {
      $pullAll: { [documentProperty]: req.body },
    },
    { new: true },
    (err, document) => {
      if (err) return res.status(400).json(err)
      return res.json(document)
    }
  )
}

exports.bulkInsertUniqueObjectsToArray = (
  Model,
  documentProperty,
  entityUniqueProperty
) => (req, res) => {
  const { params, body } = req
  Model.bulkWrite(
    body.map((entity) => ({
      updateOne: {
        filter: {
          _id: params.id,
          [`${documentProperty}.${entityUniqueProperty}`]: {
            $ne: entity[entityUniqueProperty],
          },
        },
        update: { $push: { [documentProperty]: entity } },
        upsert: false,
      },
    })),
    (err, document) => {
      if (err) return res.status(400).json(err)
      return res.json(document)
    }
  )
}

exports.bulkRemoveObjectsFromArrayByIds = (Model, documentProperty) => (
  req,
  res
) => {
  const { params, body } = req
  Model.bulkWrite(
    body.map((objectId) => ({
      updateOne: {
        filter: { _id: req.params.id },
        update: {
          $pull: { [documentProperty]: { _id: objectId } },
        },
        upsert: false,
      },
    })),
    (err, document) => {
      if (err) return res.status(400).json(err)
      return res.json(document)
    }
  )
}

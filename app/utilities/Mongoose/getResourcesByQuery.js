const { result } = require('lodash')

const ObjectId = require('mongoose').Types.ObjectId

const { ErrorHandler } = require('../ErrorHandler')

const resolveMetaData = ({ total, page, perPage }) => {
  const data = total[0] || {}
  return {
    pagination: {
      page: page,
      perPage: perPage,
      total: data.count ? data.count : 0,
    },
  }
}
const getResourcesByQuery = (
  Model,
  { enhancePipline = [], resolveObjectIdQuery = [] } = {}
) => (req, res, next) => {
  const perPage = Math.abs(req.query.perPage) || 10
  const page = (Math.abs(req.query.page) || 1) - 1
  const actualPage = Math.abs(req.query.page) || 1
  delete req.query.perPage
  delete req.query.page

  resolveObjectIdQuery.forEach((key) => {
    if (req.query[key]) req.query[key] = ObjectId(req.query[key])
  })

  Model.aggregate([
    { $match: req.query },
    ...enhancePipline,
    {
      $facet: {
        data: [{ $skip: page * perPage }, { $limit: perPage }],
        total: [{ $count: 'count' }],
      },
    },
  ])
    .then((results) => {
      const [{ data, total }] = results
      req.document = data
      req.documentData = resolveMetaData({ total, perPage, page: actualPage })

      next()
    })
    .catch((err) => {
      next(new ErrorHandler({ message: err }))
    })
}

module.exports = getResourcesByQuery

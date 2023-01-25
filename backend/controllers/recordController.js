import asyncHandler from 'express-async-handler'
import Record from '../models/recordModel.js'

// @desc    Fetch all records
// @route   GET /api/records
// @access  Public
const getRecords = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Record.countDocuments({ ...keyword })
  const records = await Record.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ records, page, pages: Math.ceil(count / pageSize) }).end();
})

// @desc    Fetch single record
// @route   GET /api/record/:id
// @access  Public
const getRecordById = asyncHandler(async (req, res) => {
  const record = await Record.findById(req.params.id)

  if (record) {
    res.json(record)
  } else {
    res.status(404)
    throw new Error('Video not found')
  }
})

// @desc    Delete a record
// @route   DELETE /api/records/:id
// @access  Private/Record
const deleteRecord = asyncHandler(async (req, res) => {
  const record = await Record.findById(req.params.id)

  if (record) {
    await record.remove()
    res.json({ message: 'Video removed' })
  } else {
    res.status(404)
    throw new Error('Video not found')
  }
})

// @desc    Create a record
// @route   POST /api/records
// @access  Private/Admin
const createRecord = asyncHandler(async (req, res) => {
  const record = new Record({
    title: req.body.title,
    user: req.user._id,
    url: req.body.url,
    description: req.body.description
  })

  const createdRecord = await record.save()
  res.status(201).json(createdRecord)
})

// @desc    Update a record
// @route   PUT /api/records/:id
// @access  Private/Admin
const updateRecord = asyncHandler(async (req, res) => {
  const {
    title,
    url,
    description,
  } = req.body

  const record = await Record.findById(req.params.id)

  if (record) {
    record.title = title
    record.url = url
    record.description = description
    
    const updatedRecord = await record.save()
    res.json(updatedRecord)
  } else {
    res.status(404)
    throw new Error('Video not found')
  }
})

// @desc    Create new review
// @route   POST /api/episodes/:id/reviews
// @access  Private
const createRecordReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const record = await Record.findById(req.params.id)

  if (record) {
    const alreadyReviewed = record.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Video already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    record.reviews.push(review)

    record.numReviews = record.reviews.length

    record.rating =
      record.reviews.reduce((acc, item) => item.rating + acc, 0) /
      record.reviews.length

    await record.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Video not found')
  }
})

// @desc    Get top rated records
// @route   GET /api/records/top
// @access  Public
const getTopRecords = asyncHandler(async (req, res) => {
  const records = await Record.find({}).sort({ rating: -1 }).limit(3)

  res.json(records)
})

export {
  getRecords,
  getRecordById,
  deleteRecord,
  createRecord,
  updateRecord,
  createRecordReview,
  getTopRecords,
}
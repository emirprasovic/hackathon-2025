const catchAsync = require("../utils/catchAsync");
const QueryFeatures = require("../utils/queryFeatures");

exports.deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) return next(/* TODO APP ERROR */);

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
};

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        data: newDoc,
      },
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(/* TODO */);
    }

    res.status(200).json({
      status: "Success",
      data: {
        data: doc,
      },
    });
  });

// exports.getAll = (Model) =>
//   catchAsync(async (req, res, next) => {
//     const docs = await Model.find();

//     // SEND RESPONSE
//     res.status(200).json({
//       status: "Success",
//       results: docs.length,
//       data: {
//         data: docs,
//       },
//     });
//   });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};

    const query = Model.find(filter);

    const featurizedQuery = new QueryFeatures(query, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // console.log(req.query);
    // { year: { gt: '300' }, director: 'Sergio Leone' }
    // { sort: 'title,year' }

    const docs = await featurizedQuery.query;

    // SEND RESPONSE
    res.status(200).json({
      status: "Success",
      results: docs.length,
      data: {
        data: docs,
      },
    });
  });

const express = require('express');
const { isLoggedIn } = require('@Helpers/middlewares');
const UserDataService = require('./UserDataService');

const router = express.Router({ mergeParams: true });

// GET get customer key challenges - standard authentication
router.get('/:type', isLoggedIn, (req, res) => {
  const { type } = req.params;
  const companyId = req.user.company._id;

  UserDataService.getByType(companyId, type).then((challenge) => {
    res.json(challenge);
  }).catch((errors) => {
    res.status(500).json(errors);
  });
});

// POST save customer key challenges - standard authentication
router.post('/:type', isLoggedIn, (req, res) => {
  const { type } = req.params;
  const companyId = req.user.company._id;

  const newChallenge = {
    company: {
      _id: companyId
    },
    type,
    data: req.body.challenge,
    created: Date.now()
  };

  UserDataService.add(companyId, type, newChallenge).then(() => {
    res.sendStatus(200);
  }).catch((errors) => {
    res.status(400).json(errors);
  });
});

module.exports = router;

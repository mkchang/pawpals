'use strict';
const express = require('express');
const router = express.Router();
const ApiController = require('../controllers').Api;

router.route('/walks/search')
  .post(ApiController.getFilteredWalks);

router.route('/walks/fetch')
  .get(ApiController.getAll);

router.route('/walks/create')
  .post(ApiController.create);

router.route('/signup/owner')
  .post(ApiController.saveDog);

router.route('/signup/walker')
  .post(ApiController.saveWalker);


router.route('/walks/destroy')
  .delete(ApiController.destroy);

router.route('/profile/owner')
  .get(ApiController.getOwnerProfile);

router.route('/profile/dog')
  .get(ApiController.getDogProfile);

router.route('/profileupdate/owner')
  .post(ApiController.updateOwnerProfile);

router.route('/profile/walker')
  .get(ApiController.getWalkerProfile);

router.route('/profileupdate/walker')
  .post(ApiController.updateWalkerProfile);

router.route('/')
  .get((req, res) => {
    res.status(200).send('Hello World!');
  })
  .post((req, res) => {
    console.log('in the correct route');
    res.status(201).send({ data: 'Posted!' });
  });

router.route('/signup/payment/stripeid')
  .get(ApiController.getAndSaveStripeID);

router.route('/signup/payment/tokenizecard')
  .get((req, res) => {
    res.render('cardtoken.ejs');
  });

router.route('/signup/payment/savecardtoken') //post request from the ejs file
  .post(ApiController.getAndsaveCardToken);

router.route('/walks/payment')
  .post(ApiController.processPayment);

router.route('/walks/refund')
  .post(ApiController.refundPayment);

router.route('/walks/track')
  .post(ApiController.saveWalkGeolocation);

module.exports = router;

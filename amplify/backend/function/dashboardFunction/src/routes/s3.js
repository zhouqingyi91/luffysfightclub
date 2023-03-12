const express = require('express');
const router = express.Router();
const s3Controller = require('../controllers/s3Controller');

router.get('/albums', s3Controller.listAlbums);
router.get('/album/photos', s3Controller.listAlbumPhotos);
router.delete('/object', s3Controller.delObject);
// router.del('/objects', s3Controller.delObjects);
router.get('/credential/identitypoolid', s3Controller.getIdentityPoolId)
router.put('/album', s3Controller.addAlbum);
router.delete('/album', s3Controller.delAlbum);

module.exports = router;
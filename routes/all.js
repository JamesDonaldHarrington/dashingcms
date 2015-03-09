var express = require('express'),
    router = express.Router();

router.use(App.require('/middlewares/logging'));
router.use(App.require('/middlewares/successHandler'));


router.use('/start',  App.require('/routes/start/start'));
router.use('/signup', App.require('/routes/signup/signup'));
router.use('/login',  App.require('/routes/login/login'));

router.use('/cms', 
  App.require('/routes/modules/dashboard'),
  App.require('/routes/modules/posts'),
  App.require('/routes/modules/galleries'),
  App.require('/routes/modules/files'),
  App.require('/routes/modules/inquiries'),
  App.require('/routes/modules/users'),
  App.require('/routes/modules/events')
)


router.all('*', App.require('/middlewares/404'));
router.use(App.require('/middlewares/errorHandeling'));


module.exports = router

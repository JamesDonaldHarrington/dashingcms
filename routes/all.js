var express = require('express'),
    router = express.Router();

router.use(App.require('/middlewares/logging'));
router.use(App.require('/middlewares/successHandler'));


router.use('/start', App.require('/routes/start/start'));
router.use('/signup', App.require('/routes/signup/signup'));
router.use('/login', App.require('/routes/login/login'));

router.use('/cms', 
  App.require('/routes/dashboard/dashboard'),
  App.require('/routes/actions/posts'),
  App.require('/routes/actions/galleries'),
  App.require('/routes/actions/files'),
  App.require('/routes/actions/inquiries'),
  App.require('/routes/actions/users')
)


router.all('*', App.require('/middlewares/404'));
router.use(App.require('/middlewares/errorHandeling'));


module.exports = router

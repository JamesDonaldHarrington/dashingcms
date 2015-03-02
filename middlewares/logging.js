// REQUEST LOGGING
// =============================================================================
module.exports = function(req, res, next) {
	    console.log('==============================================================================');
	    console.log('Making a '+ req.method +' request ( To API: ' + req.url + ' --  From Client: ' + req.originalUrl + ' )');
	    console.time('Complete. This request took');
	    
	    next(); 
};

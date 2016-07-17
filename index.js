var extend = require('extend');
var debug = require('debug')('jSaturday::settings');

module.exports = function(settings){

  var baseDir;
  if(!settings || !settings.baseDir)
    baseDir = '';
  else
    baseDir = settings.baseDir + '/';

  return {
    load: function(filesArray, env){

      var i;

      if(filesArray && !Array.isArray(filesArray))
        filesArray = [filesArray];

      if(!filesArray)
        filesArray = [baseDir + '/Config/settings.json'];
      else
        for(i = 0; i < filesArray.length; i++)
          filesArray[i] = baseDir + filesArray[i];


      if(!env)
        env = process.env.NODE_ENV || 'development';

      var settings = require(filesArray[0]);

      for(i = 1; i < filesArray.length; i++){
        extend(true, settings, require(filesArray[i]));
      }

      var returnSettings = settings.default || {};

      delete require.cache[require.resolve(filesArray[0])]

      if(!settings[env])
        return returnSettings;
      else{
        extend(true, returnSettings, settings[env])
        return returnSettings;
      }

    }
  }

};

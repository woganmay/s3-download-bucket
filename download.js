/**
 * S3 Bucket Downloader
 * Setup: npm install aws-sdk minimist
 * Configure: ~/.aws/credentials
 * With: [default]
 *       aws_access_key_id = __________
 *       aws_secret_access_key = _____________
 *
 * @author Wogan May <wmay@acceleration.biz>
 */
var argv = require('minimist')(process.argv.slice(2));
var AWS = require('aws-sdk');
var fs = require('fs');
var s3 = new AWS.S3();

// Check for mandatory parameters
if (argv.bucket == undefined) {
  console.log('Please define a --bucket!');
  return;
}

// Create a bucket subfolder
fs.mkdirSync(argv.bucket);

// Go!
s3.listObjects({ Bucket: argv.bucket }, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {

    console.log(data.Contents.length + " files found in '"+argv.bucket+"' bucket");

    data.Contents.forEach(function(currentValue, index, array){

      // Check if the file already exists?
      fs.exists(argv.bucket + "/" + currentValue.Key, function(exists){

        if (exists)
        {
          console.log("Skipping: " + currentValue.Key);
        }
        else
        {
          console.log("Retrieving: " + currentValue.Key);
          s3.getObject({ Bucket: argv.bucket, Key: currentValue.Key }, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else {

              fs.writeFile(argv.bucket + "/" + currentValue.Key, data.Body, function(){
                console.log("Finished: " + currentValue.Key);
              });

            }
          });

        }

      });



    });

  }
});

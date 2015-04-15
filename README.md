# s3-download-bucket
Simple NodeJS script to download Amazon S3 buckets

# Setup

Clone the project:

```
git clone git@github.com:woganmay/s3-download-bucket.git
cd s3-download-bucket/
```

Install the required node modules:

```
npm install aws-sdk minimist
```

Configure the credentials by creating a credentials file at ~/.aws/credentials on Mac/Linux or C:\Users\USERNAME\.aws\credentials on Windows

```
[default]
aws_access_key_id = your_access_key
aws_secret_access_key = your_secret_key
```

Run the download with:

```
node download.js --bucket=BUCKETNAME
```

If all goes well, it will create a folder named after the bucket, with all the files downloaded into it.

# License

MIT

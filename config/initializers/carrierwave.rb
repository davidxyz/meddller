CarrierWave.configure do |config|
  config.fog_credentials = {
    :provider               => 'AWS',                        # required
    :aws_access_key_id      => ENV['s3__access_key'],                        # required
    :aws_secret_access_key  => ENV['s3_secret_access_key'],                        # required
   # :host                   => 's3.example.com',             # optional, defaults to nil
   # :endpoint               => 'https://s3.example.com:8080' # optional, defaults to nil
  }
  config.fog_directory  = 'meddller_images'                     # required
  config.fog_public     = false                                   # optional, defaults to true
  config.fog_attributes = {'Cache-Control'=>'max-age=315576000'}  # optional, defaults to {}
end

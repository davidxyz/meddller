# This file is used by Rack-based servers to start the application.
# Load the rails application
require File.expand_path('../config/application.rb', __FILE__)

# Initialize the rails application
SampleApp::Application.initialize!

run SampleApp::Application

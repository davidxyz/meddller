SampleApp::Application.configure do
# Settings specified here will take precedence over those in config/application.rb
 
  # Code is not reloaded between requests
  config.cache_classes = true #..........
# .....................................
end
 
#paste this at the bottom and edit this part with your own relevant paths
 
ENV['GEM_HOME']='/usr/local/rvm/gems/ruby-2.0.0-p0/gems/' # take note for webapp2 it will be /usr/local/rvm/gems/ruby-1.9.2-p290@webapp2/gems
ENV['GEM_PATH']='/usr/local/rvm/gems/ruby-2.0.0-p0/gems/'
ENV['PATH']='/usr/local/rvm/gems/ruby-2.0.0-p0/bin:$PATH'
ENV['MY_RUBY_HOME']='/usr/local/rvm/wrappers/ruby-2.0.0-p0/ruby'


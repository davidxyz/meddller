class ApplicationController < ActionController::Base
  protect_from_forgery
  include SessionsHelper
  include MicropostsHelper
  include UsersHelper
  include ApplicationHelper
  include MedchannelHelper
end

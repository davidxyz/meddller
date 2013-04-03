class RelationshipsMController < ApplicationController
	  before_filter :signed_in_user
  def create
    @user =User.find(params[:relationships_m][:subscribed_id])
    current_user.subscribe!(@user)
    respond_to do |format|
      format.html {redirect_to @user}
      format.js
    end
  end
  def destroy
    @user = Relationships_m.find(params[:id]).subscriber
    current_user.unsubcribe!(@user)
      respond_to do |format|
      format.html {redirect_to @user}
      format.js
     end
  end
end

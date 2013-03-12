class StaticPagesController < ApplicationController
  def home#aka popular posts
    if signed_in?
    # dont need @micropost =current_user.microposts.build
    @feed_items = Micropost.default_feed.paginate(page: params[:page])
    @name="Medfeed"
    @orig="Medfeed"
    else
      @feed_items=Micropost.default_feed.paginate(page: params[:page])
    @name="Medfeed"
    @orig="Medfeed"
    end
     respond_to do |format|
      format.json { render :json => { :feed=>@feed_items} }
      format.html
      end
  end
  def hall_of_fame# best posts of all time
#self.calculate_feed(user,medchannel,popularity,default=false)
    @feed_items = Micropost.calculate_feed(nil,nil,:hall_of_fame,nil).paginate(page: params[:page])
     @name="Hall Of Fame"
     @orig="Medfeed"
     respond_to do |format|
      format.json { render :json => { :feed=>@feed_items} }# since this is the top 10 posts of all time return false when user accesses the hall of fame
      format.html
      end
  end
  
  def risingposts# rising posts in algorithm
   @feed_items = Micropost.calculate_feed(current_user,nil,:rising)
    @name="Trending"
    @orig="Medfeed"
     respond_to do |format|
      format.json { render :json => { :feed=>@feed_items} }
      format.html
      end
  end
  def newposts# newest posts in last 5 hours
      @feed_items = Micropost.calculate_feed(current_user,nil,:new)
      @name="New"
      @orig="Medfeed"
     respond_to do |format|
      format.json { render :json => { :feed=>@feed_items} }
      format.html
      end
  end
  def help
  end
  def about
  end
  def contact
  end
  def ask
    
  end
end
